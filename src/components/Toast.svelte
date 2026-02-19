<script lang="ts">
	export let message = '';
	export let show = false;
</script>

{#if show}
	<div class="toast">{message}</div>
{/if}

<style lang="scss">
	.toast {
		position: fixed;
		left: 50%;
		top: 8%;
		transform: translateX(-50%);
		background: #b99493;
		color: #fff;
		padding: 1em 1.5em;
		border-radius: 2em;
		font-size: 1.1em;
		font-weight: 500;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.13);
		z-index: 9999;
		animation:
			toast-fadein 0.3s,
			toast-fadeout 0.5s 1.8s;
		pointer-events: none;
		text-align: center;
		letter-spacing: 0.03em;
    white-space: normal; /* 한 줄로 표시되는 것을 방지 */
    word-break: keep-all; /* 한글 단어가 잘리지 않고 줄 바꿈되도록 */
    max-width: 80vw; /* 최대 너비 조정 */
    overflow-x: hidden; /* 가로 스크롤바 제거 */
	}

	@keyframes toast-fadein {
		from {
			opacity: 0;
			transform: translate(-50%, -50%);
		}
		to {
			opacity: 1;
			transform: translateX(-50%);
		}
	}
	@keyframes toast-fadeout {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
</style>
