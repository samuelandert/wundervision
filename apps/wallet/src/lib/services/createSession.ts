import { LitAccessControlConditionResource, LitAbility } from '@lit-protocol/auth-helpers';
import type { IRelayPKP } from "@lit-protocol/types";

async function createLitSession(
    provider: IProvider,
    pkpPublicKey: string,
    authMethod: any,
): Promise<any> {
    const litResource = new LitAccessControlConditionResource('*');
    return await provider.getSessionSigs({
        pkpPublicKey,
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
}

export const createSession = async (provider, authMethod, pkps: IRelayPKP[]) => {
    try {
        let currentPKP;
        if (pkps.length === 0) {
            currentPKP = await provider.mintPKP(authMethod);
            pkps = [...pkps, currentPKP];
        } else {
            currentPKP = pkps[0];
        }

        const sessionSigs = await createLitSession(
            provider,
            currentPKP.publicKey,
            authMethod,
        );

        return { pkps, sessionSigs };
    } catch (error) {
        throw new Error(`Failed to create session: ${error.message}`);
    }
};