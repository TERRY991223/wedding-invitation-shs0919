<script lang="ts">
	import ContactButton from './ContactButton.svelte';
	export let modalContacts = [];
	export let closeModal: () => void;
</script>

<div class="modal-bg" on:click={closeModal}>
	<div class="modal-list-content" on:click|stopPropagation>
		<h3>{$_('modal.account_info')}</h3>
		{#each modalContacts as contact}
			<ContactButton {...contact} />
		{/each}
		<button on:click={closeModal} class="modal-close-btn">{$_('modal.close')}</button>
	</div>
</div>

<style lang="scss">
	.modal-bg {
		position: sticky;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}
	.modal-list-content {
		background: #fff;
		border-radius: 10px;
		padding: 2em 2em 1.5em 2em;
		min-width: 320px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
		text-align: center;
	}
	.modal-close-btn {
		margin-top: 1em;
		padding: 0.5em 2em;
		background: #b99493;
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 1em;
		cursor: pointer;
		transition: background 0.2s;
		&:hover {
			background: #8e5f5d;
		}
	}
</style>
