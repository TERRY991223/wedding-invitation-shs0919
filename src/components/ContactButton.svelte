<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
	import { _ } from 'svelte-i18n';

	export let person: string;
	export let account: string;
	export let kakaopay: string;

	let isModalOpen = false;

	function openModal() {
		isModalOpen = true;
		// 자동 복사
		navigator.clipboard.writeText(account);
	}
	function closeModal() {
		isModalOpen = false;
	}
</script>

<div class="contact__box">
	<span>{person}</span>
	<button class="contact__btn" on:click={openModal} title={$_('contact_button.copy_account_title')}>
		<Fa icon={faMoneyCheck} style="font-size:1.3em;" />
	</button>
</div>

{#if isModalOpen}
	<div class="modal-bg" on:click={closeModal}>
		<div class="contact__content" on:click|stopPropagation>
			<h3>{person}</h3>
			<p>{account}</p>
			{#if kakaopay}
				<a href={kakaopay} target="_blank" rel="noopener noreferrer"
					>{$_('contact_button.kakaopay_send')}</a
				>
			{/if}
			<div class="copy-guide">{$_('contact_button.account_copied_message')}</div>
			<button on:click={closeModal} class="modal-close-btn">{$_('contact_button.close')}</button>
		</div>
	</div>
{/if}

<style lang="scss">
	.contact__box {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.8em;
		padding: 1.1em 1.5em;
		border-bottom: 1px solid #f0e4e4;
		background: white;
		font-size: 1.1em;
	}
	.contact__btn {
		background: none;
		border: none;
		cursor: pointer;
		color: #b99493;
		transition: color 0.2s;
		&:hover {
			color: #8e5f5d;
		}
	}
	.modal-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}
	.contact__content {
		background: #fff;
		border-radius: 10px;
		padding: 2em 2em 1.5em 2em;
		min-width: 300px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
		text-align: center;
	}
	.copy-guide {
		margin: 1em 0 0.5em 0;
		color: #31a671;
		font-size: 0.98em;
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
