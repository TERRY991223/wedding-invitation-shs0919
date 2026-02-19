<script lang="ts">
    import { createEventDispatcher } from 'svelte';
	import { db } from '../firebase-config';
	import { showToast, toastMessage, showGuestbookWriteModal } from '../stores';
	import { addDoc, collection } from 'firebase/firestore';
	import { _ } from 'svelte-i18n';

    const dispatch = createEventDispatcher();

	// 상태 변수
	let name = '';
	let password = '';
	let message = '';
	let isSubmitting = false; // 중복 제출 방지용 상태 변수

	// 상수
	const max_name_length = 10;
	const max_password_length = 10;
	const max_text_length = 300;

	function closeModal() {
		showGuestbookWriteModal.set(false);
	}

	// 현재 날짜를 "MM월 DD일" 형식으로 반환
	function getCurrentFormattedDate() {
		const now = new Date();
		const month = `${now.getMonth() + 1}`.padStart(2, '0');
		const day = `${now.getDate()}`.padStart(2, '0');
		return `${month}월 ${day}일`;
	}

	function showToastMessage(msg: string) {
		toastMessage.set(msg);
		showToast.set(true);
		return new Promise((resolve) => {
			setTimeout(() => {
				showToast.set(false);
				resolve(true);
			}, 2000);
		});
	}

	// 댓글 등록
	const onCommentSubmit = async () => {
		if (isSubmitting) return; // 이미 제출 중이면 중복 호출 방지

		if (!name || !password || !message) {
			showToastMessage($_('guestbook.input_required'))
		}
		if (name.trim() === '' || password.trim() === '') {
			showToastMessage($_('guestbook.input_valid'))
			return;
		}

		isSubmitting = true; // 제출 시작

		try {
			const formattedDate = getCurrentFormattedDate(); // 현재 날짜를 문자열로 가져옴
			await addDoc(collection(db, 'comItem'), {
				name,
				password,
				message,
				date: formattedDate // 문자열 날짜 저장
			});

			// 입력 필드 초기화
			name = '';
			password = '';
			message = '';

			showToastMessage($_('guestbook.submit_success'));
            dispatch('commentSubmitted');
            closeModal();
		} catch (error) {
			console.error('Error adding document: ', error);
			showToastMessage($_('guestbook.submit_error'));
		} finally {
			isSubmitting = false; // 제출 완료 (성공 또는 실패)
		}
	};
</script>

{#if $showGuestbookWriteModal}
<div class="modal-bg" on:click={closeModal}>
	<div class="modal-content" on:click|stopPropagation>
        <div class="modal-header-container">
            <div class="title">{$_('guestbook.write_title')}</div>
            <button class="modal-close-x-btn" on:click={closeModal}>×</button>
        </div>
		<div class="modal-body">
            <div class="commment_content">
                <div class="input-row">
                    <input
                        type="text"
                        bind:value={name}
                        placeholder={$_('guestbook.name_placeholder')}
                        maxlength={max_name_length}
                    />
                    <input
                        type="password"
                        bind:value={password}
                        placeholder={$_('guestbook.password_placeholder')}
                        maxlength={max_password_length}
                    />
                </div>

                <textarea
                    class="comment__message"
                    bind:value={message}
                    placeholder={$_('guestbook.message_placeholder')}
                    maxlength={max_text_length}
                />

                <button class="comment__btn" on:click={onCommentSubmit} disabled={isSubmitting}>
                    {$_('guestbook.write_button')}
                </button>
            </div>
        </div>
    </div>
</div>
{/if}

<style lang="scss">
	@import '../styles/variables';

    .modal-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10000;
	}

	.modal-content {
		background: #fff;
		border-radius: 10px;
		width: 90%;
		max-width: 500px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
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
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
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

	.title {
		@extend .title-font-kr;
		font-size: 1.8rem;
		color: $primary-color-dark;
		text-align: center;
	}

	.commment_content {
		display: flex;
		flex-direction: column;
	}

	.input-row {
		display: flex;
		gap: 10px;
		margin-bottom: 10px;

		input {
			flex: 1 1 0;
			min-width: 0;
			padding: 12px 15px;
			border: 1px solid $primary-color-light;
			border-radius: 8px;
			font-size: 1rem;
			font-family: 'GangwonEdu', sans-serif;
			background: $white-2;

			&:focus {
				outline: 2px solid $blue-1;
			}
		}
	}

	.comment__message {
		padding: 12px 15px;
		width: 100%;
		height: 100px;
		border: 1px solid $primary-color-light;
		border-radius: 8px;
		font-family: 'GangwonEdu', sans-serif;
		font-size: 1rem;
		background: $white-2;
		resize: vertical;

		&:focus {
			outline: 2px solid $blue-1;
		}
	}

	.comment__btn {
		margin-top: 15px;
		padding: 12px;
		background: $primary-color;
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;

		&:hover {
			background: $primary-color-dark;
		}
	}

	@media (max-width: 600px) {
		.input-row {
			flex-direction: column;
			gap: 8px;
		}
	}
</style>