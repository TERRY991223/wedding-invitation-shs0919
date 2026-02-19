<script lang="ts">
	export let label: string;
	export let info: string;
</script>

<div class="info-row">
	<div class="info-label">{label}</div>
	<div class="info-value">{info}</div>
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
	}
	.info-value {
		color: #333;
		font-size: 1em;
		white-space: pre-line; /* 줄바꿈(\n) 인식! */
		line-height: 1.7;
		word-break: keep-all;
	}
</style>
