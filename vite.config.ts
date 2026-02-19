import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	base: '/wedding-invitation-kth9916/',
	ssr: {
		noExternal: ['glob', 'image-size']
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern',
				additionalData: `
				@use '/src/styles/variables.scss' as *;
				`
			}
		}
	}
});
