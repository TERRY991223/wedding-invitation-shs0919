<script lang="ts">
	import { _ } from 'svelte-i18n';
	export let label = $_('location.bus_label');
	export let lines = []; // [{type: "일반", numbers: "30, 31, 32, 100, 119, 331"}, ...]
	export let description = ''; // 하단 설명
</script>

<div class="info-row">
	<div class="info-label">{label}</div>
	<div class="info-value">
		{#each lines as line}
			<div class="bus-line">
				<span class="bus-type">{line.type}</span>
				<span class="bus-numbers">{line.numbers}</span>
			</div>
		{/each}
		{#if description}
			<div class="bus-desc">{description}</div>
		{/if}
	</div>
</div>

<style>
	.info-row {
		display: flex;
		align-items: flex-start;
		gap: 1.5em;
		margin-bottom: 1em;
	}
	.info-label {
		min-width: 3.5em;
		font-weight: 600;
		color: #555;
		font-size: 1.08em;
		flex-shrink: 0;
		text-align: left;
		line-height: 1.7;
		padding-top: 3px;
	}
	.info-value {
		color: #333;
		font-size: 1em;
		line-height: 1.7;
		word-break: keep-all;
		width: 100%;
	}
	.bus-line {
		display: flex;
		gap: 0.5em;
		margin-bottom: 2px;
	}
	.bus-type {
		min-width: 2.5em;
		color: #888;
		font-weight: 500;
	}
	.bus-numbers {
		color: #444;
	}
	.bus-desc {
		margin-top: 0.7em;
		color: #aaa;
		font-size: 0.6em;
		line-height: 1.5;
		white-space: pre-line;
	}
</style>
