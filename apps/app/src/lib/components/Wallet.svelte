<script lang="ts">
	import { onMount } from 'svelte';
	import { signInWithWebAuthn } from '../services/signInWithWebAuthn';

	let me = '';
	let authState = '';

	onMount(async () => {
		me = JSON.parse(localStorage.getItem('me'));
		if (me && me.passkey && me.passkey.pkpEthAddress && me.passkey.sessonSigs == null) {
			authState = 'PASSKEYSIGNEDIN';
		} else if (me && me.passkey && me.passkey.sessionSigs != null) {
			authState = 'PASSKEYSESSION';
		} else {
			authState = 'NOTAUTHENTICATED';
		}
	});

	async function handleLogin() {
		try {
			authState = await signInWithWebAuthn();
			me = JSON.parse(localStorage.getItem('me'));
		} catch (err) {
			console.error('Error during sign-in:', err);
		}
	}
</script>

<div class="p-4">
	{#if authState === 'NOTAUTHENTICATED'}
		<div class="mb-10">
			<button on:click={handleLogin} class="btn variant-filled-primary">Sign in</button>
		</div>
	{/if}
	{#if authState === 'PASSKEYSIGNEDIN'}
		<button on:click={handleLogin} class="btn variant-filled-primary">Get Session</button><br />
		<p>Passkey: {me.passkey.pkpEthAddress}</p>
	{/if}

	{#if authState === 'PASSKEYSESSION'}
		<button on:click={handleLogin} class="btn variant-filled-primary">Get Session</button><br />
		<p>Passkey: {me.passkey.pkpEthAddress}</p>
		<p>Session: true</p>
	{/if}
	<div>AuthState: {authState}</div>
</div>
