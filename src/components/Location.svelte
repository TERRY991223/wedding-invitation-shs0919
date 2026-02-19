<script lang="ts">
	// 기존 에셋 및 라이브러리 임포트
	import locationTopWave from '$lib/assets/location-top-wave.svg';
	import locationDeco from '$lib/assets/location-deco.svg';
	import { _ } from 'svelte-i18n'; // svelte-i18n
	import { localeStore } from '../i18n.svelte'; // svelte-i18n
	import { Clipboard } from '@lucide/svelte'; // Lucide Svelte 아이콘
	// 새롭게 추가될 지도 아이콘 이미지 임포트 (경로를 실제 이미지 경로로 수정해주세요)
	// 예: src/lib/assets/naver_map_icon.webp, src/lib/assets/kakao_map_icon.png
	import naverMapIcon from '$lib/assets/naver.webp';
	import kakaoMapIcon from '$lib/assets/kakao.png';
	import tMapIcon from '$lib/assets/tmap.jpg';
	import { onMount } from 'svelte';
	import LocationInfoRow from './LocationInfoRow.svelte';
	import BusInfoRow from './BusInfoRow.svelte'; // Svelte 라이프사이클 훅
	import { showToast, toastMessage, trafficModal } from '../stores';

	let isMobile = false;

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

	function showTrafficModal() {
		trafficModal.set(true);
	}

	// --- Naver Map API 관련 설정 ---
	// Naver Maps API 클라이언트 ID를 여기에 입력해주세요.
	// https://developers.naver.com/main/ 에 로그인하여 애플리케이션 등록 후 발급받을 수 있습니다.
	const PUBLIC_NAVER_MAPS_CLIENT_ID = import.meta.env.VITE_NAVER_MAPS_CLIENT_ID; // <-- !!! 이 값을 실제 클라이언트 ID로 변경해야 합니다. !!!

	// 맵이 렌더링될 DOM 요소에 대한 참조
	let mapContainer: HTMLDivElement;
	const lat = 37.48407; // 위도
	const lng = 127.122833; // 경도
	const venueName = $_('location.venue_name');
	const venueAddress = $_('location.venue_address');

	// --- 지도 API 로드 및 초기화 로직 ---
	onMount(() => {
		isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	});
	onMount(() => {
		const loadNaverMapsApi = () => {
			return new Promise<void>((resolve, reject) => {
				if (typeof window.naver !== 'undefined' && window.naver.maps) {
					resolve();
					return;
				}
				const script = document.createElement('script');
				script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${PUBLIC_NAVER_MAPS_CLIENT_ID}&submodules=geocoder`;
				script.async = true;
				script.onload = () => resolve();
				script.onerror = () => reject(new Error('네이버 지도 API 로드 실패'));
				document.head.appendChild(script);
			});
		};

		loadNaverMapsApi()
			.then(() => {
				if (mapContainer) {
					const { naver } = window as any;
					const location = new naver.maps.LatLng(lat, lng);

					const map = new naver.maps.Map(mapContainer, {
						center: location,
						zoom: 16, // 100m 반경
						minZoom: 16,
						maxZoom: 16,
						draggable: false,
						pinchZoom: false,
						scrollWheel: false,
						keyboardShortcuts: false,
						disableDoubleClickZoom: true,
						zoomControl: false // 줌 버튼 숨김
					});

					// 커스텀 마커 생성
					const marker = new naver.maps.Marker({
						position: location,
						map,
						title: venueName // 마우스 오버시 툴팁
					});

					// 마커 위에 InfoWindow(타이틀) 표시
					const infoWindow = new naver.maps.InfoWindow({
						content: `<div style="padding:8px 16px;font-size:14px;font-weight:bold;color:#8e5f5d;border-radius:16px;background:#fff;border:1px solid #B99493;box-shadow:0 2px 6px rgba(0,0,0,0.1);">${venueName}</div>`,
						borderWidth: 0,
						disableAnchor: true,
						backgroundColor: 'transparent'
					});
					infoWindow.open(map, marker);
				}
			})
			.catch((error) => {
				console.error('네이버 지도 API 로드 중 오류 발생:', error);
				alert('지도를 로드할 수 없습니다. 잠시 후 다시 시도해주세요.');
			});
	});

	// --- 외부 지도 앱/웹사이트로 이동하는 함수 ---
	function gotoNavermap() {
		const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		const appName = 'com.example.myapp'; // 실제 앱 이름(패키지명)으로 변경
		if (isMobile) {
			// 네이버 지도 앱 딥링크 (목적지로 바로 이동)
			window.location.href = `nmap://place?lat=${lat}&lng=${lng}&name=${encodeURIComponent(venueName)}&appname=${appName}`;
		} else {
			// PC/웹에서는 검색 결과만 가능
			window.open(`https://map.naver.com/v5/search/${encodeURIComponent(venueName)}`, '_blank');
		}
	}

	function gotoKakaomap() {
		// 카카오 지도 웹 링크 예시 (주소 검색)
		// 더 정확한 딥링크는 카카오 지도 개발자 문서를 참고해주세요.
		window.open(
			`https://map.kakao.com/link/map/${encodeURIComponent(venueName)},${lat},${lng}`,
			'_blank'
		);
	}

	function gotoTmap() {
		// 모바일에서는 tmap://, PC에서는 웹 링크로 분기 가능
		if (isMobile) {
			// Tmap 앱 딥링크 (목적지 좌표, 이름)
			window.open(
				`tmap://route?goalx=${lng}&goaly=${lat}&goalname=${encodeURIComponent(venueName)}`,
				'_blank'
			);
		}
	}

	// --- 주소 복사 함수 (기존 로직 유지) ---
	function copyAddress() {
		navigator.clipboard
			.writeText(venueAddress) // venueAddress 변수 사용
			.then(() => showToastMessage($_('location.address_copied'))) // i18n 키는 프로젝트에 맞게 확인
			.catch(() => showToastMessage($_('location.copy_address_fail'))); // 에러 처리
	}
</script>

<!-- HTML 구조 -->
<img src={locationTopWave} class="location-top-wave" alt="" />
<section class="location">
	<h2 class="title {localeStore.locale}">{$_('location.title')}</h2>
	<p class="venue en">{venueName}</p>
	<p class="address">{venueAddress}</p>
	<!-- 주소는 텍스트로 직접 표시 -->

	<!-- 주소 복사 버튼 -->
	<button class="copy-address" on:click={copyAddress}>
		<span class="clipboard-icon">
			<Clipboard size="1.1em" />
		</span>
		<span>{$_('location.copy_address_button')}</span>
	</button>

	<!-- 네이버 지도가 렌더링될 컨테이너 -->
	<div bind:this={mapContainer} class="map"></div>

	<!-- 지도 앱 바로가기 아이콘 박스 -->
	<div class="location__map-icon-box">
		<div class="location__map-item" on:click={gotoNavermap}>
			<img src={naverMapIcon} class="location__map-icon" alt={$_('location.naver_map')} />
			<span>{$_('location.naver_map')}</span>
		</div>
		<div class="location__map-item" on:click={gotoKakaomap}>
			<img src={kakaoMapIcon} class="location__map-icon" alt={$_('location.kakao_map')} />
			<span>{$_('location.kakao_map')}</span>
		</div>
		{#if isMobile}
			<div class="location__map-item" on:click={gotoTmap()}>
				<img src={tMapIcon} class="location__map-icon" alt={$_('location.tmap')} />
				<span>{$_('location.tmap')}</span>
			</div>
		{/if}
	</div>

	<!-- 교통 정보 -->
	<button class="show-traffic-btn" on:click={() => (showTrafficModal())}>
		{$_('location.show_traffic_button')}
	</button>


	<img class="location-deco" src={locationDeco} alt="" />
</section>



<!-- 스타일 -->
<style lang="scss">
	/* 기존 스타일 유지 */
	img.location-top-wave {
		max-width: $content-max-width;
		margin: auto;
	}

	section.location {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		background-color: $bg-color-1;
		padding: 1em 2em 1em 2em;
	}

	h2.title {
		color: $primary-color;
		text-align: center;
		margin-bottom: 1em;

		&.kr {
			@extend .title-font-kr;
			letter-spacing: 1px;
		}

		&.en {
			@extend .title-font-en;
			letter-spacing: 1px;
		}
	}

	p.venue {
		&.en {
			font-size: 1.1rem;
		}
	}

	p.address {
		font-size: 1.2rem;
		margin-top: 0.5em;
		text-align: center;
	}

	button.copy-address {
		display: flex;
		align-items: center;
		margin-top: 0.5em;
		padding: 0.5em 1em;
		border: 1px solid $font-color-default;
		border-radius: 5px;
		background-color: transparent;
		cursor: pointer;
		color: $font-color-default; /* 버튼 텍스트 색상 */

		.clipboard-icon {
			height: 1em;
			display: inline-block;
			margin-right: 0.2em;
			color: $font-color-default;
		}

		span {
			display: inline-block;
			font-size: 1rem; /* 버튼 내 텍스트 크기 조정 */
		}
	}

	/* 지도 컨테이너 스타일 */
	.map {
		margin-top: 2em;
		width: 100%;
		height: 16em;
		margin-bottom: 2em; /* 아래 여백 조정 */
		background-color: #e0e0e0; /* 지도 로딩 중 배경색 */
		border-radius: 8px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	}

	/* 지도 아이콘 박스 스타일 */
	.location__map-icon-box {
		display: flex;
		justify-content: center;
		gap: 1.5em; /* 아이콘 간 간격 */
		margin-top: 1.5em;
		margin-bottom: 2em; /* 아래 여백 추가 */
	}

	.location__map-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
		font-size: 0.9rem;
		color: $font-color-default; /* 텍스트 색상 */

		.location__map-icon {
			width: 3em; /* 아이콘 크기 */
			height: 3em;
			margin-bottom: 0.5em;
			border-radius: 50%; /* 원형 아이콘 */
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		}
	}

	/* 교통 정보 스타일 */
	.location__info {
		font-size: 1rem;
		margin-bottom: 2em; /* 아래 여백 추가 */
		text-align: center;
	}

	p.signature {
		font-size: 1rem;
	}

	.github-icon {
		margin-top: 0.2em;
		color: $font-color-default;
		cursor: pointer;
	}

	img.location-deco {
		position: absolute;
		bottom: 2.5em;
		right: 0.5em;
	}

	.location-info-table {
		max-width: 500px;
		margin: 2em auto;
		padding: 1.5em 1em;
		background: #fafafa;
		border-radius: 16px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
	}
	.show-traffic-btn {
		margin: 0 auto 1em auto;
		display: block;
		padding: 0.9em 2em;
		font-size: 1.1rem;
		color: #fff;
		background: $primary-color;
		border: none;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
		transition: background 0.2s;
		&:hover {
			background: $primary-color-dark;
		}
	}


</style>
