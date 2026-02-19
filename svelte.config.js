import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'dist', // 빌드 결과물을 dist 폴더에 생성
			assets: 'dist', // 정적 자산도 dist에
			fallback: 'index.html' // SPA 라우팅 지원(필요시)
		}),
		env: {
			publicPrefix: 'VITE_'
		}
	}
};

export default config;
