<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { localeStore } from '../i18n.svelte';
	import { _ } from 'svelte-i18n';
	import { showBgmModal, showTmiModal, showToast, toastMessage } from '../stores'; // showTmiModal 추가

	onMount(() => {
		// Kakao SDK가 로드되었는지 확인
		if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
			// Kakao.init('YOUR_JAVASCRIPT_KEY'); // app.html에서 이미 초기화됨
			console.log('Kakao SDK initialized in ShareButtons.svelte', Kakao.isInitialized());
		}
	});
	function shareKakao() {
		if (typeof Kakao !== 'undefined' && Kakao.isInitialized()) {
			const baseUrl = 'https://wedding-invitation-kth9916.pages.dev';
			const addToCalendarUrl = `${baseUrl}/add-to-calendar`;

			Kakao.Share.sendDefault({
				objectType: 'feed',
				content: {
					title: get(_)('meta.og_title'),
					description: get(_)('meta.og_description'),
					imageUrl: `${baseUrl}/personal-assets/preview.webp`,
					link: {
						mobileWebUrl: baseUrl,
						webUrl: baseUrl
					}
				},
								buttons: [
					{
						title: '청첩장 보기',
						link: {
							mobileWebUrl: baseUrl,
							webUrl: baseUrl
						}
					},
									{
										title: '일정 등록',
										link: {
											mobileWebUrl: addToCalendarUrl,
											webUrl: addToCalendarUrl
										}
									},
				]
			});
		} else {
			showToastMessage('카카오톡 SDK가 초기화되지 않았습니다.');
			console.error('Kakao SDK is not initialized.');
		}
	}

	function shareSMS() {
		const message = `${get(_)('meta.og_title')}\n${get(_)('meta.og_description')}\nhttps://wedding-invitation-kth9916.pages.dev/`;
		const smsLink = `sms:?body=${encodeURIComponent(message)}`;
		window.location.href = smsLink;
	}

	function copyLink() {
		const link = 'https://wedding-invitation-kth9916.pages.dev/';
		navigator.clipboard.writeText(link).then(() => {
			showToastMessage('링크가 복사되었습니다!');
		}).catch(err => {
			console.error('링크 복사 실패:', err);
			showToastMessage('링크 복사에 실패했습니다.');
		});
	}

	function showToastMessage(msg: string) {
		toastMessage.set(msg);
		showToast.set(true);
		return new Promise((resolve) => {
			setTimeout(() => {
				showToast.set(false);
				resolve(true);
			}, 2000);
		});
	}
</script>

<section class="share-buttons">
	<div class="header">
		<h2 class="title {localeStore.locale}">{$_('share.title')}</h2>
	</div>
	<div class="buttons-container">
		<div class="button-row">
			<button on:click={shareKakao} class="share-button kakao">
				<img src="/icons/kakao.png" alt="카카오톡" class="icon" />
				<span>카카오톡</span>
			</button>
			<button on:click={shareSMS} class="share-button sms">
				<img src="/icons/sms.png" alt="문자" class="icon" />
				<span>문자</span>
			</button>
			<button on:click={copyLink} class="share-button copy">
				<img src="/icons/link.png" alt="링크 복사" class="icon" />
				<span>링크</span>
			</button>
		</div>
	</div>
	<div class="header second-row">
		<h2 class="title {localeStore.locale}">{$_('tmi.title')}</h2>
	</div>
	<div class="buttons-container">
		<div class="button-row">
			<button on:click={() => showTmiModal.set(true)} class="share-button tmi-info">
				<img src="/icons/tmi.png" alt="신혼여행 확인" class="icon" />
				<span>신혼여행</span>
			</button>
			<button on:click={() => showBgmModal.set(true)} class="share-button tmi-info">
				<img src="/icons/bgm.png" alt="배경음악 확인" class="icon" />
				<span>배경음악</span>
			</button>
		</div>
	</div>
	<!-- 서명 및 GitHub 링크 (기존 유지) -->
	<p class="signature">Handcrafted with love, for SJ.</p>
</section>

<style lang="scss">
	@import '../styles/variables.scss';

	section.share-buttons {
		padding: 4.5em 2em 2em 2em;
		background-color: $white;
		text-align: center;
	}

	.header {
		margin-bottom: 2em;
	}

  .header.second-row {
    margin-top: 2em; /* 두 번째 줄 상단에 약간의 여백 추가 */
  }

	h2.title {
		text-align: center;
		&.en {
			@extend .title-font-en;
			letter-spacing: 1px;
		}
		&.kr {
			@extend .title-font-kr;
			letter-spacing: 1px;
		}
	}

	.buttons-container {
		display: flex;
		flex-direction: column; /* 버튼 행들을 세로로 쌓습니다 */
		align-items: center; /* 컨테이너 내에서 행들을 가운데 정렬합니다 */
		gap: 1em; /* 행들 사이의 간격 */
	}

	.button-row {
		display: flex;
		justify-content: center; /* 버튼들을 행 내에서 가운데 정렬합니다 */
		gap: 0.8em; /* 버튼들 사이의 간격 */
		flex-wrap: nowrap;

		@media (max-width: 480px) {
			gap: 0.4em;
		}
	}





	.share-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5em;
		font-size: 0.9em;
		color: $font-color-default;
		transition: transform 0.2s;

		&:hover {
			transform: translateY(-5px);
		}

		.icon {
			width: 50px;
			height: 50px;
			margin-bottom: 0.5em;
			border-radius: 50%;
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		}

		span {
			font-weight: 600;
		}
	}

	/* 아이콘별 스타일 (선택 사항) */
	.share-button.kakao .icon {
		background-color: #FEE500; /* 카카오 노란색 */
	}
	.share-button.sms .icon {
		background-color: #6c757d; /* 회색 */
	}
	.share-button.copy .icon {
		background-color: #007bff; /* 파란색 */
	}
	.share-button.tmi-info .icon {
		background-color: #6f42c1; /* 보라색 (예시) */
		color: white; /* 아이콘 색상 */
	}
  .signature {
    font-size: 1rem;
    color: $font-color-light;
    text-align: center;
    margin: 2.5em 0 1.5em 0;
    letter-spacing: 0.05em;
    user-select: none;
  }
  .signature.en {
    font-family: 'Noto Sans KR', cursive, sans-serif;
    font-size: 1.15rem;
    font-weight: 500;
    color: $primary-color;
  }
</style>
