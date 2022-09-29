import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'

function getDetail(id) {
    const params = {
        id: id,
    }
    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
    let url = 'https://javascript-basic.appspot.com/locationDetail?' + query;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = (e) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const res = JSON.parse(xhr.responseText);
            console.log(res);
            // console.log(xhr.response);

            // useSwiper(res);

        } else {
            console.error('Error', xhr.status, xhr.statusText);
        }
    }
}

function getId() {
    let id = parseId(window.location.search);
    console.log(window.location.search);
    console.log(id);


    getDetail(id);
}

function parseId(str) {
    let newStr = str.substring(1); // 0번째 문자 빼고 문자열 리턴
    let args = newStr.split('&'); // & 기준으로 분리해서 배열로 리턴

    for (let i = 0; i < args.length; i++) {
        let arg = args[i];
        let tokens = arg.split('=');
        if (tokens[0] === 'id') {
            return tokens[1];
        }
    }
    return null;
}




// useSwiper
function useSwiper(data) {
    let detailImgs = document.querySelector('#detail-images');
    let swiperElem = document.createElement('div');
    swiperElem.setAttribute('class', 'swiper');
    detailImgs.appendChild(swiperElem);

    let swiperWrapper = document.createElement('div');
    swiperWrapper.setAttribute('class', 'swiper-wrapper');
    swiperElem.appendChild(swiperWrapper);

    data.subImageList.forEach((item, idx) => {
        let swiperSlide = document.createElement('div');
        swiperSlide.setAttribute('class', 'swiper-slide');
        swiperSlide.setAttribute('css', `background:url(${item})`)
        swiperWrapper.appendChild(swiperSlide);

        // swiperSlide.src = item;

    })
}

getId();


const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'vertical',
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});

swiper.nextEl