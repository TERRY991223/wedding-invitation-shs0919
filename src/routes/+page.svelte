<script lang="ts">
	import Calendar from '../components/Calendar.svelte';
	import Letter from '../components/Letter.svelte';
	import Cover from '../components/Cover.svelte';
	import Location from '../components/Location.svelte';
	import type { PageData } from './$types';
	import Gallery from '../components/Gallery.svelte';
	import Account from '../components/Account.svelte';
	import GuestBook from '../components/GuestBook.svelte';
	import TmiModal from '../components/TmiModal.svelte'; // TmiModal 컴포넌트 임포트
	import BgmModal from '../components/BgmModal.svelte'; // BgmModal 컴포넌트 임포트
	import GuestbookWriteModal from '../components/GuestbookWriteModal.svelte';
	import ShareButtons from '../components/ShareButtons.svelte';
	import Intro from '../components/Intro.svelte';
	import { writable } from 'svelte/store';
	import { Confetti } from 'svelte-confetti';
	import { onMount } from 'svelte';
	import { inView } from '$lib/actions/inView'; // inView 액션 임포트

	let { data }: { data: PageData } = $props();
	const showIntro = writable(true);

	function handleIntroDone() {
		showIntro.set(false);
	}
</script>

<svelte:head>
	<link rel="preload" as="image" href="/personal-assets/main.webp" />
</svelte:head>

{#if $showIntro}
	<Intro on:done={handleIntroDone} />
{:else}
	<div class="main-content">
		<div class="fade-in-section" use:inView={{ rootMargin: '-100px 0px' }}><Cover /></div>
		<div class="fade-in-section" use:inView={{ rootMargin: '-100px 0px' }}><Letter /></div>
		<div class="fade-in-section" use:inView={{ rootMargin: '-100px 0px' }}><Gallery photos={data.photos} /></div>
		<div class="fade-in-section" use:inView={{ rootMargin: '-100px 0px' }}><Calendar /></div>
		<div class="fade-in-section" use:inView={{ rootMargin: '-100px 0px' }}><Location /></div>
		<div class="fade-in-section" use:inView={{ rootMargin: '-100px 0px' }}><Account /></div>
		<div class="fade-in-section" use:inView={{ rootMargin: '-100px 0px' }}><GuestBook /></div>
		<div class="fade-in-section" use:inView={{ rootMargin: '-100px 0px' }}><ShareButtons /></div>
	</div>
	<TmiModal />
	<BgmModal />
	<GuestbookWriteModal />
{/if}

<style lang="scss">
	/* 애니메이션 제거 */
</style>