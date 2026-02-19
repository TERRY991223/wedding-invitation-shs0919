<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import CalendarDay from './CalendarDay.svelte';
	import flower from '../lib/assets/flower.png';
	import { _ } from 'svelte-i18n';

	const daysInMonth = 30;
	const firstDayOfWeek = 1; // 9월 1일 월요일
	const emptyDays = Array(firstDayOfWeek).fill(null);
	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

	let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

	function updateTimer() {
		const now = new Date();
		const target = new Date('2025-09-20T16:40:00+0900');
		const diff = target.getTime() - now.getTime();

		if (diff > 0) {
			timeLeft.days = Math.floor(diff / (1000 * 60 * 60 * 24));
			timeLeft.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			timeLeft.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			timeLeft.seconds = Math.floor((diff % (1000 * 60)) / 1000);
		} else {
			timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
		}
	}

	let timer: ReturnType<typeof setInterval>;
	onMount(() => {
		updateTimer();
		timer = setInterval(updateTimer, 1000);
	});
	onDestroy(() => clearInterval(timer));

	function getDayOfWeek(day: number) {
		return (firstDayOfWeek + day - 1) % 7;
	}

	function handleAddCalendarClick() {
		window.location.href = '/add-to-calendar';
	}
</script>

<div class="calendar">
	<img src={flower} class="flower" alt="flower" />
	<h3>{$_('calendar.date_time')}</h3>
	<div class="calendar__line"></div>
	<div class="calendar__body">
		<div class="calendar__weekdays">
			{#each $_('calendar.weekdays') as day}
				<span class={day === '일' ? 'red' : day === '토' ? 'blue' : ''}>{day}</span>
			{/each}
		</div>
		<div class="calendar__days">
			{#each emptyDays as _}
				<div class="calendar__empty"></div>
			{/each}
			{#each days as day}
				<CalendarDay
					{day}
					dayOfWeek={getDayOfWeek(day)}
					isWeddingDay={day === 20}
					isHoliday={day === 0}
				/>
			{/each}
		</div>
	</div>
	<br />
	<div class="d-day">
		{$_('cover.names.groom')} ♥︎ {$_('cover.names.bride')} {$_('calendar.wedding_phrase')}까지
		<span class="calendar__remain-day">{timeLeft.days}{$_('calendar.day_unit')}</span> 남았습니다.
	</div>

	<button class="calendar-button" on:click={handleAddCalendarClick}>
		캘린더에 일정 추가
	</button>
</div>

<style lang="scss">
	@import '../styles/variables.scss';

	.calendar {
		max-width: $content-max-width;
		margin: 2em auto;
		padding: 1.5em;
		background: $white;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
		text-align: center;
		font-family: 'Noto Sans KR', sans-serif;
		color: $font-color-default;
	}

	.flower {
		width: 3em;
		margin-bottom: 1em;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
	}

	h3 {
		margin: 0.5em 0 1em 0;
		font-size: 1.2em;
		font-weight: 500;
		color: $primary-color-dark;
		letter-spacing: 0.5px;
	}

	.calendar__line {
		width: 85%;
		height: 1px;
		background: linear-gradient(to right, $primary-color-light, $primary-color-dark);
		margin: 0 auto 1.5em;
		border-radius: 2px;
	}

	.calendar__body {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.calendar__weekdays {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		width: 100%;
		margin-bottom: 15px;
		font-weight: 500;
		font-size: 0.9em;

		span {
			padding: 0.5em 0;
			&.red {
				color: $red-1;
			}
			&.blue {
				color: $blue-1;
			}
		}
	}

	.calendar__days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 8px;
		width: 100%;
	}

	.calendar__empty {
		height: 40px;
	}

	.d-day {
		font-size: 1.1em;
		font-weight: 500;
		color: $primary-color-dark;
	}

	.calendar__remain-day {
		color: $primary-color-dark;
		font-weight: 700;
		font-size: 1.2em;
		margin: 0 5px;
	}

	.calendar-button {
		margin-top: 20px;
		padding: 12px 24px;
		background-color: $primary-color;
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1em;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.3s;

		&:hover {
			background-color: $primary-color-dark;
		}
	}

	@media #{$mobile-sm} {
		.calendar {
			padding: 1em;
			margin: 1em auto;
		}

		.calendar__line {
			width: 90%;
		}

		.calendar__days {
			gap: 4px;
		}
	}
</style>
