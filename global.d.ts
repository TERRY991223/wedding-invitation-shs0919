declare global {
	interface Window {
		naver: any;
		Kakao: any; // Kakao SDK 전역 객체 선언
		gtag(
			event: string,
			coverView: string,
			param3: { event_category: string; event_label: string }
		): void;
	}
}

export {};
