<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { Confetti } from 'svelte-confetti';

	import { _ } from 'svelte-i18n';

	const dispatch = createEventDispatcher();
	const fullText = $_('intro.welcome_message');
	let displayedText = '';
	let showCursor = true;
	let dissolving = false;

	onMount(() => {
		let i = 0;
		const typingInterval = setInterval(() => {
			if (i < fullText.length) {
				displayedText += fullText.charAt(i);
				i++;
			} else {
				clearInterval(typingInterval);
				showCursor = false;

				// 타이핑이 끝난 후 1초 대기하고 꽃잎 효과 시작
				setTimeout(() => {
					dissolving = true;
					// 애니메이션 시간(1.5초) 후 done 이벤트 발생
					setTimeout(() => {
						dispatch('done');
					}, 1500);
				}, 1000);
			}
		}, 150);

		return () => {
			clearInterval(typingInterval);
		};
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="intro-container">
	<div class="confetti-area">
	<Confetti
		x={[-50, 50]}
		y={[0.1, 0.3]}
		colorArray={['#588adb', '#fbcf28', '#d62520', '#9aa3f5']}
		delay={[0, 200]}
		infinite
		duration={5000}
		amount={300}
		fallDistance="100dvh"
		size={20}
	/>
	</div>
	<p class="typing-text" class:dissolve={dissolving}>
		{#each displayedText as char, i}
			<span style="--i: {i}" class:red-heart={char === '❤'}>{char === ' ' ? '\u00A0' : char}</span>
		{/each}
		{#if showCursor}<span class="cursor"></span>{/if}
	</p>
</div>

<style>
	.intro-container {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
		overflow: hidden; /* 꽃잎이 밖으로 나가도 잘리지 않게 */
	}
  .confetti-area {
      position: absolute;
      top: -2.0em;
      left: 1.0em;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 10000; /* Cover 컴포넌트보다 높게 설정 */
  }

	.typing-text {
		font-family: 'Gowun Batang', serif;
		font-size: 1.5rem;
		color: #333;
		white-space: nowrap;
		padding-right: 5px;
		perspective: 400px; /* 3D 효과를 위한 원근감 */
	}

	.typing-text span {
		display: inline-block;
	}

	.typing-text.dissolve span {
		animation: dissolve 1.5s forwards;
		animation-delay: calc(var(--i) * 0.05s);
	}

	@keyframes dissolve {
		0% {
			opacity: 1;
			transform: translateY(0) rotate(0) scale(1);
		}
		100% {
			opacity: 0;
			transform: translateY(100px) rotate(calc(var(--i) * 20deg)) scale(0.5);
		}
	}

	.cursor {
		display: inline-block;
		width: 2px;
		height: 1.5rem;
		background-color: #333;
		animation: blink 0.7s step-end infinite;
		vertical-align: bottom;
	}

	.red-heart {
		color: red; /* 빨간색 하트 */
	}

	@keyframes blink {
		from,
		to {
			background-color: transparent;
		}
		50% {
			background-color: #333;
		}
	}

	@media (orientation: portrait) {
		.typing-text {
			font-size: 6vw;
		}
		.cursor {
			height: 6vw;
		}
	}
</style>
