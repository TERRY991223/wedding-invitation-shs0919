<script lang="ts">
	import flower from '../lib/assets/flower.png';
	import { _ } from 'svelte-i18n';

	let activeTab: 'groom' | 'bride' = 'groom';

	import { accountModal } from '../stores';

	function openTab(tab: 'groom' | 'bride') {
		activeTab = tab;
		accountModal.set({ open: true, groom: tab === 'groom', bride: tab === 'bride' });
	}


</script>

<div class="container account">
	<img src={flower} class="flower" alt="flower" />
	<div class="contact__title">{$_('account.title')}</div>

	<div class="tabs">
		<button class:active={activeTab === 'groom'} on:click={() => openTab('groom')}>
			{$_('account.groom_button')}
		</button>
		<button class:active={activeTab === 'bride'} on:click={() => openTab('bride')}>
			{$_('account.bride_button')}
		</button>
	</div>
</div>



<style lang="scss">
	@import '../styles/variables';

	.account {
		max-width: $content-max-width;
		margin: 0 auto;
		padding: 2em 1em;
		text-align: center;
	}

	.flower {
		max-width: 300px;
		margin-bottom: 1em;
	}

	.contact__title {
		@extend .title-font-kr;
		font-size: 1.8rem;
		color: $primary-color-dark;
		margin-bottom: 1.5em;
	}

	.tabs {
		display: flex;
		flex-direction: column; // ← 세로(수직) 배치!
		align-items: center; // ← 가운데 정렬
		gap: 1em; // ← 버튼 사이 간격
		margin-bottom: 1.5em;

		button {
			padding: 0.8em 1.8em;
			font-size: 1.1rem;
			border: 2px solid $primary-color;
			border-radius: 8px;
			background: white;
			color: $primary-color-dark;
			cursor: pointer;
			transition: all 0.2s;

			&.active {
				background: $primary-color;
				color: white;
			}

			&:hover:not(.active) {
				background: $primary-color-light-2;
			}
		}
	}

	.contact__guide {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
		font-size: 1rem;
		color: $font-color-light;
		margin-top: 1em;
	}

	/* 모달 스타일 */
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal-content {
		background: white;
		border-radius: 12px;
		padding: 2em;
		width: 90%;
		max-width: 500px;
		box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
	}

	.modal-title {
		@extend .title-font-kr;
		color: $primary-color-dark;
		margin-bottom: 1.5em;
		font-size: 1.6rem;
		text-align: center;
	}

	.contact-list {
		display: flex;
		flex-direction: column;
		gap: 1.2em;
	}

	.contact-item {
		display: flex;
		justify-content: center;
		gap: 2em;
		align-items: center;
		padding: 1.2em;
		background: $white-2;
		border-radius: 8px;
		border: 1px solid $primary-color-light;

		.person {
			font-size: 1.1rem;
			font-weight: 500;
			color: $font-color-default;
		}
	}

	.copy-btn {
		background: none;
		border: none;
		cursor: pointer;
		color: $primary-color-dark;
		transition: transform 0.2s;

		&:hover {
			transform: scale(1.1);
			color: $primary-color;
		}
	}

	.copy-notice {
		margin-top: 1.5em;
		padding: 0.8em;
		background: $green-1;
		color: white;
		border-radius: 6px;
		font-weight: 500;
		animation: fadeOut 2s forwards;
	}

	.flower {
		display: block;
		margin-left: auto;
		margin-right: auto;
		max-width: 100px;
	}

	.copied-account {
		margin: 2em 0 1em 0;
		padding: 1em;
		font-size: 1.2rem;
		font-weight: 700;
		color: $font-color-default;
		background: #f0e4e4;
		border-radius: 8px;
		letter-spacing: 0.05em;
		text-align: center;
		word-break: break-all;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
		transition:
			background 0.2s,
			color 0.2s;
	}

	.close-btn {
		display: block;
		width: 100%;
		margin-top: 2em;
		padding: 1em;
		background: $primary-color;
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;

		&:hover {
			background: $primary-color-dark;
		}
	}

	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		70% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
