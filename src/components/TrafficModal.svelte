<script lang="ts">
	import { _ } from 'svelte-i18n';
	import LocationInfoRow from './LocationInfoRow.svelte';
	import BusInfoRow from './BusInfoRow.svelte';
	import { trafficModal } from '../stores';

	const busLines = [
		{ type: '일반', numbers: '30, 31, 32, 100, 119, 331' },
		{ type: '간선', numbers: '302, 303, 320, 333, 350, 360, 343, 345, 362' },
		{ type: '지선', numbers: '3322, 3420' },
		{ type: '직행', numbers: '500-1, 1009, 1112, 1117, 1650, 500-1A, 3302, G2100, 6600' }
	];
	let subwayInfo = '';
	let busDesc = '';
	let parkInfo = '';
	let atmInfo = '';

	$: subwayInfo = $_('location.subway_info');
	$: busDesc = $_('location.bus_description');
	$: parkInfo = $_('location.parking_info');
	$: atmInfo = $_('location.atm_info');

	function closeModal() {
		trafficModal.set(false);
	}
</script>

{#if $trafficModal}
	<div class="traffic-modal-overlay" on:click={closeModal}>
		<div class="traffic-modal" on:click|stopPropagation>
            <div class="modal-header-container">
                <h3 class="modal-header">{$_('location.traffic_info_title')}</h3>
                <button class="modal-close-btn" on:click={closeModal}>×</button>
            </div>
			<div class="modal-body">
                <div class="location-info-table">
                    <LocationInfoRow label={$_('location.subway_label')} info={subwayInfo} />
                    <BusInfoRow label={$_('location.bus_label')} lines={busLines} description={busDesc} />
                    <LocationInfoRow label={$_('location.parking_label')} info={parkInfo} />
                    <LocationInfoRow label={$_('location.atm_label')} info={atmInfo} />
                </div>
            </div>
		</div>
	</div>
{/if}

<style lang="scss">
	@import '../styles/variables';

	.traffic-modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.45);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2000;
	}

	.traffic-modal {
		background: #fff;
		border-radius: 18px;
		max-width: 480px;
		width: 95vw;
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
		position: relative;
		animation: modalFadeIn 0.2s;
		max-height: 80vh;
        display: flex;
        flex-direction: column;
	}

    .modal-header-container {
        position: sticky;
        top: 0;
        background: #fff;
        z-index: 1;
        padding: 1.5em 1.5em 1em 1.5em;
        border-bottom: 1px solid #eee;
        border-top-left-radius: 18px;
        border-top-right-radius: 18px;
    }

    .modal-body {
        overflow-y: auto;
        padding: 1em;
    }

	@keyframes modalFadeIn {
		from {
			opacity: 0;
			transform: translateY(40px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.modal-close-btn {
		position: absolute;
		top: 0.5em;
		right: 1.1em;
		background: none;
		border: none;
		font-size: 2em;
		color: #bbb;
		cursor: pointer;
		transition: color 0.15s;
		&:hover {
			color: #d62520;
		}
	}

	.modal-header {
		text-align: center;
		font-size: 1.3em;
		color: $primary-color;
	}

	.location-info-table {
		max-width: 500px;
		margin: 1em auto;
		padding: 1.5em 1em;
		background: #fafafa;
		border-radius: 16px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
	}
</style>
