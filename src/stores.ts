import { writable } from 'svelte/store';

export const showToast = writable(false);
export const toastMessage = writable('');

export const accountModal = writable({
    open: false,
    groom: false,
    bride: false,
});

export const trafficModal = writable(false);

export const showTmiModal = writable(false);
export const showBgmModal = writable(false);
export const showGuestbookWriteModal = writable(false);
