<script lang="ts">
	import { localeStore } from '../i18n.svelte';
	import { browser } from '$app/environment';
	import { Confetti } from 'svelte-confetti';
	import { _ } from 'svelte-i18n';
</script>

<section class="cover">
	<div class="confetti-area">
		<Confetti
			x={[-50, 50]}
			y={[0.1, 0.3]}
			colorArray={['#588adb', '#f5e298', '#fff', '#9aa3f5']}
			delay={[500, 2000]}
			infinite
			duration={5000}
			amount={300}
			size={5}
			fallDistance="100dvh"
		/>
	</div>
	<div class="names-kr-box">
		<span class="names kr">{$_('cover.names.groom')}</span>
		<span class="names kr">{$_('cover.names.and')}</span>
		<span class="names kr">{$_('cover.names.bride')}</span>
	</div>

	<div class="cover-title-container">
		<div class="event-date-and-place-box">
			<span class="event-date-and-time {localeStore.locale}">{$_('cover.date')}</span>
			<span class="event-place {localeStore.locale}">{$_('cover.place')}</span>
		</div>
	</div>
</section>

<style lang="scss">
	section.cover {
		position: relative;
		background-image: url('/personal-assets/main.webp');
		background-repeat: no-repeat;
		background-position: 35% center;
		background-size: cover;
		height: 100vh;
		width: 100%;
	}
	.confetti-area {
		position: absolute;
		top: -2.0em;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		pointer-events: none;
		z-index: 10000; /* Cover 컴포넌트보다 높게 설정 */
	}
	.names-kr-box {
		position: absolute;
		top: 3em;
		left: 2em;

		span.names {
			color: #616161;
			display: block;
			font-size: 1rem;
			letter-spacing: 0.8em;
			line-height: 2;
		}
	}

	.cover-title-container {
		width: 100%;
		position: absolute;
		bottom: 1.5em;
	}

	.names-en-box {
		width: 100%;
		display: flex;
		justify-content: center;

		span.names {
			display: block;
			color: $white;
			word-spacing: 5px;
			font-size: 1rem;
		}
	}

	.event-date-and-place-box {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		span.event-date-and-time,
		span.event-place {
			display: block;
			color: $white;

			&.kr {
				font-size: 1rem;
			}

			&.en {
				font-size: 1.4rem;
			}
		}

		span.event-date-and-time.kr {
			margin-bottom: 0.4em;
		}
	}
</style>
