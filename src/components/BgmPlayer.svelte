<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { writable } from 'svelte/store';
    import { browser } from '$app/environment';

    let audio: HTMLAudioElement;
    const isPlaying = writable(false);

    let audioPromise: Promise<void> | undefined;

    function togglePlay() {
        if (!browser) return; // Ensure this only runs in the browser

        if ($isPlaying) {
            audio.pause();
            isPlaying.set(false);
        } else {
            audioPromise = audio.play();
            audioPromise.then(() => {
                isPlaying.set(true);
            }).catch(error => {
                console.error("Audio play failed:", error);
                isPlaying.set(false);
            });
        }
    }

    onMount(() => {
        if (browser) {
            audio = new Audio('/assets/bgm.mp3'); // Initialize Audio object only in browser
            audio.loop = true;
            // Autoplay on mount (consider user experience for autoplay)
            // audio.play().then(() => isPlaying.set(true)).catch(e => console.log("Autoplay prevented:", e));
        }
    });

    onDestroy(() => {
        if (browser && audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
</script>

<div class="bgm-player">
    <button on:click={togglePlay} class="bgm-button" class:playing={$isPlaying}>
        {#if $isPlaying}
            <!-- Animated Wave Icon -->
            <svg class="icon wave-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="3" y2="12"></line>
                <line x1="7" y1="12" x2="7" y2="12"></line>
                <line x1="11" y1="12" x2="11" y2="12"></line>
                <line x1="15" y1="12" x2="15" y2="12"></line>
                <line x1="19" y1="12" x2="19" y2="12"></line>
            </svg>
        {:else}
            <!-- Play Triangle Icon -->
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
        {/if}
    </button>
</div>

<style lang="scss">
    .bgm-player {
        z-index: 1000; /* Ensure it's above other content */

        /* Default position for mobile (bottom left) */
        position: fixed;
        bottom: 10px;
        left: 10px;

        @media (min-width: 768px) { /* Adjust breakpoint as needed for PC frame */
            /* Position for PC (inside iPhone frame) */
            position: absolute; /* Relative to its parent (.iphone9-frame) */
            bottom: 18px; /* Adjust based on your iPhone frame's bottom padding/border */
            left: 18px; /* Adjust based on your iPhone frame's left padding/border */
        }
    }

    .bgm-button {
        background-color: rgba(0, 0, 0, 0.6);
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        transition: background-color 0.3s ease;

        &:hover {
            background-color: rgba(0, 0, 0, 0.8);
        }

        .icon {
            width: 24px;
            height: 24px;
        }
    }

    /* Wave animation for playing state */
    .bgm-button.playing .wave-icon line {
        animation: wave 1.2s ease-in-out infinite;
        transform-origin: center;
    }

    .bgm-button.playing .wave-icon line:nth-child(1) { animation-delay: 0s; }
    .bgm-button.playing .wave-icon line:nth-child(2) { animation-delay: 0.1s; }
    .bgm-button.playing .wave-icon line:nth-child(3) { animation-delay: 0.2s; }
    .bgm-button.playing .wave-icon line:nth-child(4) { animation-delay: 0.3s; }
    .bgm-button.playing .wave-icon line:nth-child(5) { animation-delay: 0.4s; }

    @keyframes wave {
        0%, 100% { transform: scaleY(0.5); }
        50% { transform: scaleY(1.5); }
    }
</style>
