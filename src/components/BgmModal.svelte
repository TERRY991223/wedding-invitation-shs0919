<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { showBgmModal } from '../stores';
	import Fa from 'svelte-fa';
	import { faDownload } from '@fortawesome/free-solid-svg-icons';

	function closeBgmModal() {
		showBgmModal.set(false);
	}

	function downloadBgm() {
		const link = document.createElement('a');
		link.href = '/assets/bgm.mp3';
		link.download = 'bgm.mp3';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<div class="modal-bg" class:show={$showBgmModal} on:click={closeBgmModal}>
	<div class="modal-content" on:click|stopPropagation>
        <div class="modal-header-container">
            <h2 class="modal-header">
                {$_('bgm.modal_title')}
                <button on:click={downloadBgm} class="download-btn">
                    <Fa icon={faDownload} size="1x" />
                </button>
            </h2>
            <button class="modal-close-x-btn" on:click={closeBgmModal}>×</button>
        </div>
		<div class="bgm-modal-body">
			<p class="description">
				{$_('bgm.modal_description')}
			</p>
			<pre class="lyrics">{$_('bgm.modal_lyrics')}</pre>
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
		display: flex; /* Flexbox를 사용하여 제목과 버튼을 한 줄에 정렬 */
		justify-content: center; /* 가운데 정렬 */
		align-items: center; /* 세로 가운데 정렬 */

		.download-btn {
			background: none;
			border: none;
			color: $primary-color; /* 아이콘 색상 */
			cursor: pointer;
			margin-left: 0.5em; /* 제목과의 간격 */
			padding: 0;
			font-size: 1em; /* 아이콘 크기 조정 */
			transition: color 0.2s;

			&:hover {
				color: $primary-color-dark;
			}
		}
	}

	.bgm-modal-body {
		padding: 1.5em;
		text-align: center;
        overflow-y: auto;

		.description {
			margin-bottom: 1.5em;
			line-height: 1.6;
			white-space: pre-line;
			font-weight: bold;
		}

		.lyrics {
			white-space: pre-wrap;
			text-align: left;
			font-size: 0.9em;
			background-color: #f9f9f9;
			border: 1px solid #eee;
			padding: 1em;
			border-radius: 5px;
			max-height: 300px;
			overflow-y: auto;
			font-family: 'Noto Sans KR', sans-serif; /* 폰트 변경 */
			line-height: 1.8; /* 가독성을 위한 줄 간격 조정 */
		}
	}
</style>