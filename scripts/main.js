// 헤더 개선
// 스크롤을 아래로 내렸을 때, 헤더 배경색을 흰색으로 바꾸고 글자색도 진하게 변경
function scrollEvent() {
    window.addEventListener('scroll', function () {
        let top = document.scrollingElement.scrollTop; // 스크롤바 위치
        let header = document.querySelector('#header');
        // console.log(top);
        if (top > 0) { // 스크롤 최상단 이외에서 inverted 클래스 추가
            header.classList.add('inverted');
        } else {
            header.classList.remove('inverted');
        }
    })
    window.scroll(); // 스크롤 강제호출, 페이지 리로드시 클래스 추가 이벤트가 제대로 먹지 않는 상황 대비.
}

// DatePicker
function CalendarWidget() {
    let dpFrom = $('#from').datepicker({ // datePicker 라이브러리 사용.
        dateFormat: 'yy-mm-dd', // 날짜 출력 형식 제한
        minDate: 0 // 입력 가능한 날짜 제한
    });
    dpFrom.datepicker('setDate', new Date);

    let dpTo = $('#to').datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: 1
    });
    dpTo.datepicker('setDate', 4); // setDate 의 인자값은 여행 기간을 뜻함.
}

// ajax를 이용한 검색기능.
function search(from, to) {
    const params = {
        from: from,
        to: to,
    }
    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
    let url = 'https://javascript-basic.appspot.com/searchLocation?' + query;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = (e) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const res = JSON.parse(xhr.responseText);
            console.log(res);
            // console.log(document.querySelectorAll('.list-item').length);
            if (document.querySelectorAll('.list-item').length <= 1) {
                let listPanel = document.querySelector('#list-panel');
                res.forEach(data => {
                    let item = createListItem(data);
                    // listPanel.appendChild(item);
                    listPanel.append(item);
                })
                const listBg = document.querySelector('#list-bg');
                listBg.style.display = 'block';
            }
        } else {
            console.error('Error', xhr.status, xhr.statusText);
        }
    }
}


// 폼 제출 기능
function formSubmit() {
    let formSearch = document.querySelector('#form-search');
    formSearch.addEventListener('submit', function (e) {
        e.preventDefault();

        let from = document.querySelector('#from').value;
        let to = document.querySelector('#to').value;

        search(from, to);
    })
}

// 템플릿 사용하여 이미지 리스트 생성.
function createListItem(data) {
    const template1 = document.querySelector('#list-item-template').cloneNode(true);
    template1.removeAttribute('id');
    template1.querySelector('.list-item-image').src = data.titleImageUrl;
    template1.querySelector('.list-item-name').innerHTML = data.name;
    template1.querySelector('.list-item-city-name').innerHTML = data.cityName;

    template1.addEventListener('click', function () {
        window.location = 'detail.html?id=' + data.id;
    })

    return template1;
}

scrollEvent()
CalendarWidget();
formSubmit();