<script lang="ts">


	import PhotoSwipeLightBox from 'photoswipe/lightbox';
	import PhotoSwipe from 'photoswipe';
	import 'photoswipe/style.css';
	import { onMount } from 'svelte';
	import { localeStore } from '../i18n.svelte';
	import { _ } from 'svelte-i18n';

	let { photos } = $props();

	onMount(() => {
		const lightbox = new PhotoSwipeLightBox({
			gallery: '#gallery',
			children: 'a',
			showHideAnimationType: 'fade',
			pswpModule: PhotoSwipe,
			initialZoomLevel: 'fit',
			secondaryZoomLevel: 'fit',
			maxZoomLevel: 'fit',
			loop: true,
		});

		lightbox.init();
	});
</script>

<section class="gallery">
	<div class="header">
		<h2 class="title {localeStore.locale}">{$_('gallery.title')}</h2>
		<!--		<p class="sub-title {localeStore.locale}">{$_('gallery.sub_title')}</p>-->
	</div>
	<div class="gallery-horizontal" id="gallery">
		{#each photos as photo, i}
			<a
				href={photo.src}
				class="slide"
				data-pswp-width={photo.width}
				data-pswp-height={photo.height}
				target="_blank"
			>
				<img class="thumbnail" src={photo.src} alt={`갤러리 사진 ${i + 1}`} />
			</a>
		{/each}
	</div>
</section>

<style lang="scss">
	section.gallery {
		padding: 4.5em 2em 2em 2em;
		background-color: $white;
	}

	.header {
		margin-bottom: 2em;
	}

	.gallery__more {
		margin-top: 2em;
		text-align: center;

		button {
			background: $primary-color;
			color: $white;
			border: none;
			border-radius: 6px;
			padding: 0.6em 2em;
			font-size: 1em;
			font-weight: 600;
			cursor: pointer;
			transition: background 0.2s;
			&:hover {
				background: $primary-color-dark;
			}
		}
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

	p.sub-title {
		text-align: center;
		&.kr {
			margin-top: 0.9em;
			font-size: 0.9rem;
		}
		&.en {
			margin-top: 0.5em;
			font-size: 1.2rem;
		}
	}

	/* 가로 스크롤 갤러리 */
	.gallery-horizontal {
		display: flex;
		overflow-x: auto;
		overflow-y: hidden;
		padding-bottom: 1em;
		gap: 1em;
		scrollbar-width: thin;
		scrollbar-color: $primary-color-light $white-2;

		&::-webkit-scrollbar {
			height: 10px;
		}
		&::-webkit-scrollbar-thumb {
			background: $primary-color-light;
			border-radius: 6px;
		}
		&::-webkit-scrollbar-track {
			background: $white-2;
		}

		.slide {
			flex: 0 0 auto;
			width: calc(100vw / 10 - 1em); // 기본 10개
			min-width: 80px;
			max-width: 140px;
			aspect-ratio: 2/3;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: transform 0.15s;
			box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
			border-radius: 4px;
			background: $white-2;

			&:hover {
				transform: scale(1.06);
				box-shadow: 0 4px 12px rgba($primary-color-dark, 0.15);
				z-index: 2;
			}
		}

		.thumbnail {
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: 4px;
			user-select: none;
			pointer-events: none;
		}
	}

	/* 반응형: 모바일/태블릿 썸네일 크기 조정 */
	@media (max-width: 600px) {
		.gallery-horizontal .slide {
			width: calc(100vw / 4 - 1em);
			min-width: 70px;
			max-width: 120px;
		}
	}
	@media (min-width: 601px) and (max-width: 1200px) {
		.gallery-horizontal .slide {
			width: calc(100vw / 8 - 1em);
			min-width: 80px;
			max-width: 120px;
		}
	}
	@media (min-width: 1201px) {
		.gallery-horizontal .slide {
			width: calc(100vw / 12 - 1em);
			min-width: 100px;
			max-width: 140px;
		}
	}
	.slide:nth-child(1),
	.slide:nth-child(2),
	.slide:nth-child(3),
	.slide:nth-child(5),
	.slide:nth-child(7),
	.slide:nth-child(8),
	.slide:nth-child(9),
	.slide:nth-child(10),
	.slide:nth-child(11),
	.slide:nth-child(12),
	.slide:nth-child(13),
	.slide:nth-child(14),
	.slide:nth-child(15),
	.slide:nth-child(16),
	.slide:nth-child(17),
	.slide:nth-child(18),
	.slide:nth-child(19),
	.slide:nth-child(20),
	.slide:nth-child(21),
	.slide:nth-child(22),
	.slide:nth-child(23),
	.slide:nth-child(24),
	.slide:nth-child(25) {
		grid-row: span 2;
	}
</style>
