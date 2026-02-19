<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { _ } from 'svelte-i18n';

	onMount(() => {
		const ua = navigator.userAgent.toLowerCase();
		const isIOS = /iphone|ipad|ipod/.test(ua);
		const isAndroid = /android/.test(ua);
		const isKakaoInApp = ua.includes('kakaotalk');
		const isSamsungInternet = ua.includes('samsungbrowser');
		const isChrome = ua.includes('chrome') && !isSamsungInternet;

		// i18n 값
		const title = `${get(_)('cover.names.groom')}❤${get(_)('cover.names.bride')} ${get(_)('calendar.wedding_phrase')}`;
		const details = get(_)('meta.og_description');
		const location = `${get(_)('location.venue_name')}, ${get(_)('location.venue_address')}`;

		// KST 2025-09-20 16:40 ~ 18:40 -> UTC 07:40Z ~ 09:40Z
		const startDate = '20250920T074000Z';
		const endDate = '20250920T094000Z';

		// 구글 웹 템플릿 파라미터(간결 유지 권장)
		const params = new URLSearchParams({
			action: 'TEMPLATE',
			text: title,
			dates: `${startDate}/${endDate}`,
			details,
			location
		});

		const webGoogle = `https://calendar.google.com/calendar/render?${params.toString()}`;
		const icsUrl = '/event/wedding.ics';

		if (isAndroid) {
			const samsungIntent =
				`intent://calendar.google.com/calendar/render?${params.toString()}#Intent;` +
				`scheme=https;package=com.samsung.android.calendar;` +
				`S.browser_fallback_url=${encodeURIComponent(webGoogle)};end`;

			const googleIntent =
				`intent://calendar.google.com/calendar/render?${params.toString()}#Intent;` +
				`scheme=https;package=com.google.android.calendar;` +
				`S.browser_fallback_url=${encodeURIComponent(webGoogle)};end`;

			let step = 0;
			const tryNext = () => {
				step += 1;
				if (step === 1) {
					window.location.href = samsungIntent;     // 삼성 먼저 시도(성공률 미보장)
					setTimeout(tryNext, 800);
				} else if (step === 2) {
					window.location.href = googleIntent;      // 구글 시도
					setTimeout(tryNext, 800);
				} else {
					window.location.replace(webGoogle);       // 최종 웹 폴백
				}
			};

			tryNext();
			return;
		}

		if (isIOS) {
			if (isKakaoInApp) {
				// 인앱: Safari로 열기 안내
				const guide = document.getElementById('guide');
				if (guide) guide.style.display = 'block';
			} else {
				// iOS Safari: ICS 바로 열기
				window.location.replace(icsUrl);
			}
			return;
		}

		// 데스크톱/기타
		window.location.replace(webGoogle);
	});

	function openInSafari() {
		// iOS 인앱에서 Safari로 열기 유도
		window.location.href = '/event/wedding.ics';
	}
</script>

<div id="guide" style="display:none; text-align:center; padding:1rem;">
	iOS 카카오 인앱에서는 앱 자동 실행이 제한될 수 있어요.
	아래 버튼을 눌러 Safari로 열어 주세요.
	<br /><br />
	<button on:click={openInSafari} style="padding:10px 16px; border-radius:8px; background:#007aff; color:#fff;">
		Safari로 열기
	</button>
	<p style="margin-top:8px; color:#666; font-size:0.9rem;">
		Safari가 열리면 캘린더로 자동 연결돼요.
	</p>
</div>

<p style="text-align:center;">일정 등록 페이지로 이동 중…</p>
