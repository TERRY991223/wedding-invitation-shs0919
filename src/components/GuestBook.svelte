<script lang="ts">
	import { onMount } from 'svelte';
	import { db } from '../firebase-config';
	import { showToast, toastMessage, showGuestbookWriteModal } from '../stores';
	import { deleteDoc, doc, getDocs, collection, query, orderBy } from 'firebase/firestore';
	import { _ } from 'svelte-i18n';
	import flower from '../lib/assets/flower.png';

	// 상태 변수
	let comItemList: any[] = [];
	let showModal: string | null = null;
	let deletePassword = '';
	let commentToDelete: any = null;
	let visibleComments = 5;
	let isExpanded = false;

    function openWriteModal() {
        showGuestbookWriteModal.set(true);
    }

	// 날짜 형식 변환
	function formatDate(date: any) {
		// Firestore Timestamp 객체면 toDate()로 변환
		if (date && typeof date.toDate === 'function') {
			date = date.toDate();
		}
		if (date instanceof Date) {
			const month = `${date.getMonth() + 1}`.padStart(2, '0');
			const day = `${date.getDate()}`.padStart(2, '0');
			return `${month}월 ${day}일`;
		}
		// 이미 문자열이면 그대로 반환
		if (typeof date === 'string') {
			return date;
		}
		// 그 외는 빈 값
		return '';
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

	// 댓글 불러오기
	const fetchComments = async () => {
		try {
			const q = query(collection(db, 'comItem'), orderBy('date', 'desc'));
			const querySnapshot = await getDocs(q);

			comItemList = querySnapshot.docs.map((doc) => {
				const data = doc.data();
				return {
					id: doc.id,
					name: data.name,
					password: data.password,
					message: data.message,
					date: data.date // 이미 문자열로 저장되어 있으므로 그대로 사용
				};
			});
		} catch (error) {
			console.error('Error fetching comments: ', error);
			showToastMessage($_('guestbook.fetch_error'));
		}
	};

	// 초기 데이터 로드
	onMount(fetchComments);

    // 모달이 닫힐 때 댓글 목록 새로고침
    $: if (!$showGuestbookWriteModal) {
        fetchComments();
    }

	// 댓글 토글
	const toggleCommentsVisibility = () => {
		if (isExpanded) {
			visibleComments = 5;
			isExpanded = false;
		} else {
			visibleComments = comItemList.length;
			isExpanded = true;
		}
	};

	// 댓글 삭제
	const deleteComment = async (id: string, originalPassword: string) => {
		if (deletePassword !== originalPassword) {
			showToastMessage($_('guestbook.password_mismatch'));
			return;
		}

		try {
			await deleteDoc(doc(db, 'comItem', id));
			comItemList = comItemList.filter((comment) => comment.id !== id);
			showModal = null;
			deletePassword = '';
			showToastMessage($_('guestbook.delete_success'));
		} catch (error) {
			console.error('Error deleting document: ', error);
			showToastMessage($_('guestbook.delete_error'));
		}
	};
</script>

<div class="bc-pink container guestbook">
	<img src={flower} class="flower" alt="flower" />
	<div class="title">{$_('guestbook.title')}</div>

    <button class="write-btn" on:click={openWriteModal}>
        {$_('guestbook.button')}
    </button>

	<div class="comment__container-data">
		{#each comItemList.slice(0, visibleComments) as commentItem (commentItem.id)}
			<div class="comment__data">
				<div class="comment__data-p">
					<div class="comment__name">{commentItem.name}</div>
					<div class="comment__data-pp">
						<div class="comment__date">{formatDate(commentItem.date)}</div>
						<button
							class="comment__btn-close"
							on:click={() => {
								showModal = showModal === commentItem.id ? null : commentItem.id;
								commentToDelete = commentItem;
								deletePassword = '';
							}}>×</button
						>
					</div>
				</div>

				<div class="comment__data-com">{commentItem.message}</div>

				{#if showModal === commentItem.id}
					<div class="comment__password">
						<input
							type="password"
							bind:value={deletePassword}
							placeholder={$_('guestbook.delete_password_placeholder')}
						/>
						<button on:click={() => deleteComment(commentToDelete.id, commentToDelete.password)}
							>{$_('guestbook.delete_button')}</button
						>
					</div>
				{/if}
			</div>
		{/each}

		{#if comItemList.length > 5}
			<button class="comment__btn-more" on:click={toggleCommentsVisibility}>
				{isExpanded ? $_('guestbook.close_button') : $_('guestbook.show_more_button')}
			</button>
		{/if}
	</div>
</div>

<style lang="scss">
	@import '../styles/variables';

	.guestbook {
		max-width: $content-max-width;
		margin: 0 auto;
		padding: 2em 1em;
        text-align: center;
	}

	.flower {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100px;
	}

	.title {
		@extend .title-font-kr;
		font-size: 1.8rem;
		color: $primary-color-dark;
		text-align: center;
		margin-bottom: 1em;
	}

    .write-btn {
        //margin-bottom: 1.5em;
		padding: 12px 24px;
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

	.comment__container-data {
		display: flex;
		flex-direction: column;
		gap: 15px;
		margin-top: 2em;
	}

	.comment__data {
		background: white;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
		border: 1px solid $primary-color-light-2;
	}

	.comment__data-p {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	.comment__name {
		font-weight: 600;
		font-size: 1.1rem;
		color: $primary-color-dark;
	}

	.comment__data-pp {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.comment__date {
		color: $font-color-light;
		font-size: 0.9rem;
	}

	.comment__btn-close {
		background: transparent;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: $font-color-light;
		transition: color 0.2s;
		line-height: 1;

		&:hover {
			color: $red-1;
		}
	}

	.comment__data-com {
		font-size: 1rem;
		line-height: 1.5;
		color: $font-color-default;
		white-space: pre-wrap;
        text-align: left;
	}

	.comment__password {
		display: flex;
		gap: 10px;
		margin-top: 15px;

		input {
			flex: 1;
			padding: 10px;
			border: 1px solid $primary-color-light;
			border-radius: 6px;
			font-size: 1rem;
		}

		button {
			padding: 0 15px;
			background: $primary-color;
			color: white;
			border: none;
			border-radius: 6px;
			cursor: pointer;
			transition: background 0.2s;
			white-space: nowrap;
			min-width: 60px;

			&:hover {
				background: $primary-color-dark;
			}
		}
	}

	.comment__btn-more {
		margin-top: 15px;
		padding: 10px;
		background: transparent;
		border: 1px solid $primary-color-light;
		border-radius: 8px;
		color: $primary-color-dark;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s;

		&:hover {
			background: $primary-color-light-2;
		}
	}

	@media (max-width: 600px) {
		.input-row {
			flex-direction: column;
			gap: 8px;
		}
	}
</style>
