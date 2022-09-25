// 헤더 개선
// 스크롤을 아래로 내렸을 때, 헤더 배경색을 흰색으로 바꾸고 글자색도 진하게 변경
window.addEventListener('scroll', function () {
    let top = document.scrollingElement.scrollTop; // 스크롤바 위치
    console.log(top);
    if (top > 0) { // 스크롤 최상단 이외에서 inverted 클래스 추가
        document.querySelector('#header').classList.add('inverted');
    } else {
        document.querySelector('#header').classList.remove('inverted');
    }

    window.scroll(); // 스크롤 강제호출, 페이지 리로드시 클래스 추가 이벤트가 제대로 먹지 않는 상황 대비.
})