import { getLocaleFromQueryString, init, isLoading, locale, register } from 'svelte-i18n';

register('kr', () => import('./locales/kr.json'));

init({
	fallbackLocale: 'kr',
	initialLocale: 'kr'
});

class LocaleStore {
	isLoading = $state(true);
	locale: string | undefined | null = $state(undefined);

	constructor() {
		isLoading.subscribe((isLoading) => {
			this.isLoading = isLoading;
		});

		locale.subscribe((locale) => {
			this.locale = 'kr';
		});
	}
}

export const localeStore = new LocaleStore();
