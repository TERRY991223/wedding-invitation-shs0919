export function inView(node: HTMLElement, options?: IntersectionObserverInit) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                node.classList.add('in-view');
                // 한 번만 애니메이션을 실행하려면 observer.unobserve(node); 를 추가
                // observer.unobserve(node);
            } else {
                // 뷰포트 밖으로 나갔을 때 클래스를 제거하려면
                // node.classList.remove('in-view');
            }
        });
    }, options);

    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        },
    };
}
