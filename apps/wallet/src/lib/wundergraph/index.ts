import { createSvelteClient } from '@wundergraph/svelte-query';
import { createClient } from '../../../../../packages/generated-wundergraph/client';
import type { Operations } from '../../../../../packages/generated-wundergraph/client';

const client = createClient();

const { createFileUpload, createMutation, createQuery, createSubscription, getAuth, getUser, queryKey, prefetchQuery } =
	createSvelteClient<Operations>(client);

export { createFileUpload, createMutation, createQuery, createSubscription, getAuth, getUser, queryKey, prefetchQuery };
