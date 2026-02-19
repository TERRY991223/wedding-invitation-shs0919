<script lang="ts">
	export let day: number;
	export let dayOfWeek: number;
	export let isWeddingDay: boolean = false;
	export let isHoliday: boolean = false;

	$: colorClass = dayOfWeek === 0 ? 'red' : dayOfWeek === 6 ? 'blue' : '';
	$: holidayClass = isHoliday ? 'red' : '';
	$: heartClass = isWeddingDay ? 'heart' : '';
</script>

<div class="calendar__day {colorClass} {holidayClass} {heartClass}">
	{day}
	{#if isWeddingDay}
		<span class="heart-icon">♥</span>
	{/if}
</div>

<style lang="scss">
	@import '../styles/variables.scss';

	.calendar__day {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		border-radius: 50%;
		font-weight: 500;
		font-size: 1em;
		position: relative;
		background: $white;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
		transition: all 0.2s ease;

		&:hover {
			transform: translateY(-2px);
			box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
		}
	}

	.red {
		color: $red-1;
		font-weight: 600;
	}

	.blue {
		color: $blue-1;
		font-weight: 600;
	}

	.heart-icon {
		position: absolute;
		left: 50%;
		top: 55%;
		transform: translate(-50%, -50%);
		font-size: 1.8em;
		color: $heart-icon-color;
		opacity: 0.7;
		pointer-events: none;
		z-index: 1;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}
</style>
