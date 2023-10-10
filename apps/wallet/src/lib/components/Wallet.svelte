<script lang="ts">
	import { signInWithWebAuthn } from '../services/signInWithWebAuthn';
	let me = '';
	let authState = '';

	async function handleLogin() {
		try {
			if (me != null) {
				authState = await signInWithWebAuthn();
				me = JSON.parse(localStorage.getItem('me'));
			} else {
				me = JSON.parse(localStorage.getItem('me'));
			}
		} catch (err) {
			console.error('Error during sign-in:', err);
		}
	}
</script>

<br />
<button on:click={handleLogin} class="btn variant-filled-primary">Sign in</button>

<br /><br />
{authState ? `Authstate: ${authState}` : ''}
{#if me}
	<p>{me.passkey ? `Passkey: ${me.passkey.pkpEthAddress}` : ''}</p>
{/if}
