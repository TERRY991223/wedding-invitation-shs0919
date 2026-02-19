<script lang="ts">
	import { accountModal } from '../stores';
	import { _ } from 'svelte-i18n';

	let groom_contact = [];
	let bride_contact = [];

	$: groom_contact = [
		{
			relationship: $_('account.groom'),
			person: $_('account.groom_name'),
			bank: $_('account.groom_bank'),
			account: $_('account.groom_account'),
			kakaopay: ''
		},
		{
			relationship: $_('account.father'),
			person: $_('account.groom_father_name'),
			bank: $_('account.groom_father_bank'),
			account: $_('account.groom_father_account'),
			kakaopay: ''
		},
		{
			relationship: $_('account.mother'),
			person: $_('account.groom_mother_name'),
			bank: $_('account.groom_mother_bank'),
			account: $_('account.groom_mother_account'),
			kakaopay: ''
		}
	];

	$: bride_contact = [
		{
			relationship: $_('account.bride'),
			person: $_('account.bride_name'),
			bank: $_('account.bride_bank'),
			account: $_('account.bride_account'),
			kakaopay: ''
		},
		{
			relationship: $_('account.father'),
			person: $_('account.bride_father_name'),
			bank: $_('account.bride_father_bank'),
			account: $_('account.bride_father_account'),
			kakaopay: ''
		},
		{
			relationship: $_('account.mother'),
			person: $_('account.bride_mother_name'),
			bank: $_('account.bride_mother_bank'),
			account: $_('account.bride_mother_account'),
			kakaopay: ''
		}
	];

	$: copyGuide = $_('account.copy_guide_initial');
	let copiedAccount = ''; // 복사된 계좌번호
	let copyTimeout: ReturnType<typeof setTimeout>;

	function closeModal() {
		accountModal.set({ open: false, groom: false, bride: false });
		if (copyTimeout) clearTimeout(copyTimeout);
		copiedAccount = ''; // Add this line to reset copiedAccount
	}

	function copyAccount(bank:string,  account: string, person: string) {
		navigator.clipboard.writeText(bank + ' ' + account).then(() => {
			copyGuide = $_('account.copy_guide_success');
			copiedAccount = bank + '\n' + account + '\n' + person;
			if (copyTimeout) clearTimeout(copyTimeout);
			copyTimeout = setTimeout(() => {
				copyGuide = $_('account.copy_guide_initial');
			}, 2000);
		});
	}

	$: currentContacts = $accountModal.groom ? groom_contact : bride_contact;
</script>

{#if $accountModal.open}
	<div class="modal" on:click={closeModal}>
		<div class="modal-content" on:click|stopPropagation>
            <div class="modal-header-container">
                <h3 class="modal-title">
                    {$accountModal.groom ? $_('account.groom_side') : $_('account.bride_side')}
                </h3>
                <button class="modal-close-x-btn" on:click={closeModal}>×</button>
            </div>
			<div class="modal-body">
                <div class="contact-list">
                    {#each currentContacts as contact}
                        <div class="contact-item" on:click={() => copyAccount(contact.bank, contact.account, contact.person)}>
                            <span class="person"><b>{contact.relationship} {contact.person}</b></span>
                        </div>
                    {/each}
                    <div class="contact__guide">{copyGuide}</div>
                </div>

                {#if copiedAccount}
                    <div class="copied-account">
                        {copiedAccount}
                    </div>
                {/if}
            </div>
		</div>
	</div>
{/if}

<style lang="scss">
	@import '../styles/variables';

	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal-content {
		background: white;
		border-radius: 12px;
		width: 90%;
		max-width: 500px;
		box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
		position: relative;
        display: flex;
        flex-direction: column;
        max-height: 85vh;
	}

    .modal-header-container {
        position: sticky;
        top: 0;
        background: #fff;
        z-index: 1;
        padding: 1.5em 1.5em 1em 1.5em;
        border-bottom: 1px solid #eee;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
    }

    .modal-body {
        overflow-y: auto;
        padding: 1.5em;
    }

	.modal-close-x-btn {
		position: absolute;
		top: 0.5em;
		right: 0.7em;
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

	.modal-title {
		@extend .title-font-kr;
		color: $primary-color-dark;
		font-size: 1.6rem;
		text-align: center;
	}

	.contact-list {
		display: flex;
		flex-direction: column;
		gap: 1.2em;
	}

	.contact-item {
		display: flex;
		justify-content: center;
		gap: 2em;
		align-items: center;
		padding: 1.2em;
		background: $white-2;
		border-radius: 8px;
		border: 1px solid $primary-color-light;

		.person {
			font-size: 1.1rem;
			font-weight: 500;
			color: $font-color-default;
		}
	}

  .contact__guide {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    font-size: 1rem;
    color: $font-color-light;
    margin-top: 1em;
  }

	.copy-btn {
		background: none;
		border: none;
		cursor: pointer;
		color: $primary-color-dark;
		transition: transform 0.2s;

		&:hover {
			transform: scale(1.1);
			color: $primary-color;
		}
	}

	.copy-notice {
		margin-top: 1.5em;
		padding: 0.8em;
		background: $green-1;
		color: white;
		border-radius: 6px;
		font-weight: 500;
		animation: fadeOut 2s forwards;
	}

	.flower {
		display: block;
		margin-left: auto;
		margin-right: auto;
		max-width: 100px;
	}

	.copied-account {
		margin: 2em 0 1em 0;
		padding: 1em;
		font-size: 1.2rem;
		font-weight: 700;
		color: $font-color-default;
		background: #f0e4e4;
		border-radius: 8px;
		letter-spacing: 0.05em;
		text-align: center;
		word-break: break-all;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
		transition:
			background 0.2s,
			color 0.2s;
		white-space: pre-wrap; /* Add this line */
	}

	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		70% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>