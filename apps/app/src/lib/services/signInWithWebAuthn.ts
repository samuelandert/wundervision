import { connectProvider } from "./setupLit";
import { LitAccessControlConditionResource, LitAbility } from '@lit-protocol/auth-helpers';

const litResource = new LitAccessControlConditionResource('*');

export const signInWithWebAuthn = async () => {
    if (typeof window !== 'undefined') {
        try {
            const provider = await connectProvider();

            let me = JSON.parse(localStorage.getItem('me'));

            if (me && me.passkey != null) {
                const authMethod = await provider.authenticate();
                const pkps = await provider.fetchPKPsThroughRelayer(authMethod)
                console.log("publicKey: " + pkps[0].publicKey)

                const sessionSigs = await provider.getSessionSigs({
                    pkpPublicKey: pkps[0].publicKey,
                    authMethod,
                    sessionSigsParams: {
                        chain: 'xdai',
                        resourceAbilityRequests: [
                            {
                                resource: litResource,
                                ability: LitAbility.PKPSigning
                            }
                        ]
                    }
                });
                me = {
                    passkey: {
                        ...me.passkey,
                        pkpPublicKey: pkps[0].publicKey,
                        sessionSigs
                    }
                }
                console.log("me authenticated" + JSON.stringify(me))
                localStorage.setItem('me', JSON.stringify(me));
                return "PASSKEYSESSION"
            }

            // Register new WebAuthn credential
            const options = await provider.register("Sam");

            // Verify registration and mint PKP through relay server
            const txHash = await provider.verifyAndMintPKPThroughRelayer(options);
            const response = await provider.relay.pollRequestUntilTerminalState(
                txHash
            );

            me = {
                passkey: {
                    pkpPublicKey: response.pkpPublicKey,
                    pkpEthAddress: response.pkpEthAddress
                }
            };

            // Store the combined object in local storage
            localStorage.setItem('me', JSON.stringify(me));

            // Return the combined object
            return "PASSKEYSIGNEDIN";

        } catch (err) {
            console.error('Error during sign-in:', err);
            throw err;
        }
    } else {
        throw new Error("Cannot sign in with WebAuthn in a non-browser environment.");
    }
};
