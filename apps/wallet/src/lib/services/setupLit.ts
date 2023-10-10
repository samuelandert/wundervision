import {
    LitAuthClient,
    WebAuthnProvider,
} from '@lit-protocol/lit-auth-client';
import { ProviderType } from '@lit-protocol/constants';
import { LitNodeClient } from '@lit-protocol/lit-node-client';

let provider: WebAuthnProvider | undefined;

export async function connectProvider() {
    const litNodeClient = new LitNodeClient({
        litNetwork: 'cayenne',
        debug: false
    });
    await litNodeClient.connect();

    const litAuthClient = new LitAuthClient({
        litRelayConfig: {
            relayApiKey: 'test-api-key'
        },
        litNodeClient
    });

    provider = litAuthClient.initProvider<WebAuthnProvider>(ProviderType.WebAuthn);

    return provider;
}
