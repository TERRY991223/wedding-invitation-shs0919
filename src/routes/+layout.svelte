<script lang="ts">
	import '/src/styles/global.scss';
	import '/src/i18n.svelte.ts';
	import { localeStore } from '../i18n.svelte';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import Toast from '../components/Toast.svelte';
	import AccountModal from '../components/AccountModal.svelte';
	import TrafficModal from '../components/TrafficModal.svelte';
	import { accountModal, showBgmModal, showTmiModal, showToast, toastMessage, trafficModal, showGuestbookWriteModal } from '../stores';
	import { init, register, getLocaleFromNavigator } from 'svelte-i18n';
	import BgmPlayer from '../components/BgmPlayer.svelte';

	init({
		fallbackLocale: 'kr',
		initialLocale: getLocaleFromNavigator()
	});

	let { children } = $props();

	let localeLoaded = $derived(!localeStore.isLoading && localeStore.locale);
	let title = $state('');

	const isPC = writable(false);
	let phoneFrame: HTMLDivElement;

	function checkIsPC() {
		isPC.set(window.innerWidth >= 600);
	}

	onMount(() => {
		if (!browser) return;

		const isMobile = /Mobi/i.test(window.navigator.userAgent);

		if (isMobile && phoneFrame) {
			const initialHeight = window.innerHeight;
			phoneFrame.style.height = `${initialHeight}px`;

			if (window.visualViewport) {
				window.visualViewport.addEventListener('resize', () => {
					phoneFrame.style.height = `${initialHeight}px`;
				});
			}
		}

		checkIsPC();
		document.body.classList.add('loaded');
		if (localeLoaded) {
			title = $_('meta.title');
		}
	});

	let isModalOpen = $derived(
		$accountModal.open || $showTmiModal || $showBgmModal || $trafficModal || $showGuestbookWriteModal
	);
</script>

<svelte:head>
	<title>{title}</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Noto+Serif+KR:wght@200..900&family=Sacramento&display=swap"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
	/>
	<meta property="og:type" content="website" />
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-E97ZKEB3C2"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'G-E97ZKEB3C2');
	</script>
</svelte:head>

<Toast bind:show={$showToast} message={$toastMessage} />
<AccountModal />
<TrafficModal />

{#if browser && $isPC}
	<!-- PC에서는 아이폰 프레임 적용 -->
	<div class="iphone9-frame">
		<div class="iphone9-screen">
			{#if localeLoaded}
				{@render children()}
			{/if}
		</div>
		<div class:hidden={isModalOpen}>
			<BgmPlayer /> <!-- BgmPlayer를 iphone9-screen 밖으로 이동 -->
		</div>
	</div>
{:else}
	<!-- 모바일에서는 기존처럼 전체화면 -->
	<div class="phone-frame" bind:this={phoneFrame}>
		{#if localeLoaded}
			{@render children()}
		{/if}
		<div class:hidden={isModalOpen}>
			<BgmPlayer />
		</div>
	</div>
{/if}

<style lang="scss">
	.hidden {
		display: none;
	}

	.iphone-frame {
		width: 442px;
		height: 746px;
		margin: 40px auto 0 auto;
		border-radius: 40px;
		box-shadow:
			0 8px 40px rgba(0, 0, 0, 0.18),
			0 1.5px 0 #fff inset;
		background: #fff;
		overflow: auto;
		position: relative;
		border: 8px solid #222;
		display: flex;
		flex-direction: column;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.iphone-frame::-webkit-scrollbar {
		display: none;
	}

	.notch {
		position: absolute;
		top: 12px;
		left: 50%;
		transform: translateX(-50%);
		width: 120px;
		height: 28px;
		background: #222;
		border-radius: 14px 14px 12px 12px;
		z-index: 2;
	}
	.screen {
		flex: 1 1 auto;
		width: 100%;
		height: 100%;
		overflow: auto;
		position: relative;
		z-index: 1;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.screen::-webkit-scrollbar {
		display: none;
	}
	.home-indicator {
		position: absolute;
		bottom: 18px;
		left: 50%;
		transform: translateX(-50%);
		width: 120px;
		height: 6px;
		background: #e0e0e0;
		border-radius: 3px;
		z-index: 2;
	}

	/* 모바일에서는 기존 phone-frame 스타일 유지 */
	@media (max-width: 599px) {
		.phone-frame {
			width: 100%;
			border: none;
			border-radius: 0;
			box-shadow: none;
			margin: 0;
			position: relative;
			overflow: auto;
		}
	}

	.iphone9-frame {
		width: 442px;
		height: 746px;
		margin: 40px auto;
		border-radius: 48px;
		background: linear-gradient(160deg, #f7f7f7 70%, #e0e0e0 100%);
		box-shadow:
			0 8px 40px rgba(0, 0, 0, 0.18),
			0 1.5px 0 #fff inset,
			0 0 0 12px #fff,
			0 0 24px 4px #d4d4d4 inset;
		border: 8px solid #fff;
		position: relative;
		overflow: visible;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.iphone9-head {
		width: 100%;
		height: 18px; /* 얇은 상단 베젤 */
		background: #e0e0e0;
		border-top-left-radius: 40px;
		border-top-right-radius: 40px;
		box-shadow: 0 2px 6px #bbb inset;
		z-index: 2;
	}

	.iphone9-screen {
		flex: 1 1 auto;
		width: 100%;
		height: 100%;
		background: #fff;
		position: relative;
		z-index: 1;
		overflow: auto;
		border-bottom-left-radius: 40px;
		border-bottom-right-radius: 40px;
		border-top-left-radius: 40px; /* 추가 */
		border-top-right-radius: 40px; /* 추가 */
		box-shadow: 0 2px 12px #e0e0e0 inset;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.iphone9-screen::-webkit-scrollbar {
		display: none;
	}

	.iphone9-home {
		position: absolute;
		bottom: 18px;
		left: 50%;
		transform: translateX(-50%);
		width: 56px;
		height: 56px;
		background: linear-gradient(180deg, #fafafa 60%, #e0e0e0 100%);
		border-radius: 50%;
		border: 4px solid #d4d4d4;
		box-shadow:
			0 2px 8px #bbb inset,
			0 0 0 4px #fff;
		z-index: 3;
	}
</style>
