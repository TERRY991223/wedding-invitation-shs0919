<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { showTmiModal } from '../stores';

	// 각 여행지 정보 (사진 경로 포함)
	const honeymoonDestinations = [
		{ name: $_('tmi.paris'), image: '/assets/honeymoon/paris.webp' },
		{ name: $_('tmi.nice'), image: '/assets/honeymoon/nice.webp' },
		{ name: $_('tmi.adelboden'), image: '/assets/honeymoon/kambrian.webp' },
		{ name: $_('tmi.interlaken'), image: '/assets/honeymoon/interlaken.webp' },
		{ name: $_('tmi.jungfrau'), image: '/assets/honeymoon/jungfrau.webp' },
		{ name: $_('tmi.milano'), image: '/assets/honeymoon/milano.webp' },
		{ name: $_('tmi.venezia'), image: '/assets/honeymoon/venezia.webp' },
		{ name: $_('tmi.rome'), image: '/assets/honeymoon/rome.webp' }
	];

	function closeTmiModal() {
		showTmiModal.set(false);
	}
</script>

<div class="modal-bg" class:show={$showTmiModal} on:click={closeTmiModal}>
	<div class="modal-content" on:click|stopPropagation>
        <div class="modal-header-container">
            <h2 class="modal-header">{$_('tmi.honeymoon_modal_title')}</h2>
            <button class="modal-close-x-btn" on:click={closeTmiModal}>×</button>
        </div>
		<div class="tmi-modal-body">
			<p class="description">
				{$_('tmi.honeymoon_description')}
			</p>

			<div class="destination-gallery">
				{#each honeymoonDestinations as destination, i}
					<div class="destination-item">
						<h3>{destination.name}</h3>
						<div class="image-placeholder" style="background-image: url('{destination.image}');">
						</div>
					</div>
					{#if i < honeymoonDestinations.length - 1}
						<span class="arrow">↓</span> <!-- 세로 레이아웃에 맞게 아래 화살표로 변경 -->
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import '../styles/variables';

	.modal-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10000;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.2s ease-in-out;
	}

	.modal-bg.show {
		opacity: 1;
		pointer-events: auto;
	}

	.modal-content {
		background: #fff;
		border-radius: 10px;
		width: 90%;
		max-width: 450px; /* 최대 너비 설정 */
		max-height: 85vh; /* 최대 높이 설정 */
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
		position: relative;
        display: flex;
        flex-direction: column;
	}

    .modal-header-container {
        position: sticky;
        top: 0;
        background: #fff;
        z-index: 1;
        padding: 1.5em 1.5em 1em 1.5em;
        border-bottom: 1px solid #eee;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

	.modal-close-x-btn {
		position: absolute;
		top: 0.5em;
		right: 0.7em;
		background: none;
		border: none;
		font-size: 2em;
		color: #bbb;
		cursor: pointer;
		transition: color 0.15s;
		&:hover {
			color: #d62520;
		}
	}

	.modal-header {
		font-size: 1.4rem;
		color: $primary-color-dark;
        text-align: center;
	}

	.tmi-modal-body {
		padding: 1.5em;
		text-align: center;
        overflow-y: auto;

		.description {
			margin-bottom: 1.5em;
			line-height: 1.6;
			white-space: pre-line;
		}

		.destination-gallery {
			display: flex;
			flex-direction: column; /* 세로 정렬 */
			align-items: center;
			gap: 0.5em;
			margin-top: 1.5em;

			.destination-item {
                display: flex;
                flex-direction: column;
                align-items: center;

				h3 {
					font-size: 0.9rem;
					margin-bottom: 0.5em;
					color: $primary-color-dark;
				}

				.image-placeholder {
					width: 150px;
					height: 150px;
					background-color: #f0f0f0;
					border: 1px solid #ddd;
					border-radius: 8px;
					background-size: cover;
					background-position: center;
				}
			}

			.arrow {
				font-size: 1.5rem;
				color: $primary-color;
				margin: 0.75em 0; /* 상하 마진 조정 */
			}
		}
	}
</style>