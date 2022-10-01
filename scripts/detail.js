import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'

function swiperSetting() {
    const swiper = new Swiper('.swiper', {
        initialSlide : 0,
        loop: true,
        spaceBetween: 30,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            // type: 'fraction',
            // el: '.swiper-scrollbar',
        },
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

// useSwiper
function createSwiperElem(data) {
   let swiperWrapper = document.querySelector('.swiper-wrapper');
   data.subImageList.forEach((item) => {
       let swiperSlide = document.createElement('div');
       swiperSlide.classList.add('swiper-slide');

       let imgTag = document.createElement('img');
       imgTag.src = item;
       imgTag.classList.add('swiper-img-size')
       swiperSlide.append(imgTag);

       swiperWrapper.append(swiperSlide);
   })

}

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

            updateStringData(res);
            createSwiperElem(res);
            swiperSetting();

            initMap(res.position.x, res.position.y);


        } else {
            console.error('Error', xhr.status, xhr.statusText);
        }
    }
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

function getId() {
    let id = parseId(window.location.search);
    console.log(window.location.search);
    getDetail(id)
}


function updateStringData(data) {
    // Location Name
    let headerName = data.name;
    let headerNameDetail = document.querySelector('.detail-header-name');
    headerNameDetail.innerHTML = headerName;

    // city Name
    let cityName = data.cityName;
    let cityNameDetail = document.querySelector('.detail-header-city-name');
    cityNameDetail.innerHTML = cityName;

    // location Detail
    let desc = data.desc;
    let descDetail = document.querySelector('.detail-desc-text');
    descDetail.innerHTML = desc;
}

function initMap(lat, lng) {

    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: lat, lng: lng
        },
        zoom: 12,
    });
    initMarker(map, lat, lng)
}

function initMarker(map, lat, lng) {
    // marker
    const marker = new google.maps.Marker({
        position: {
            lat: lat,
            lng: lng,
        },
        map: map,
    })
}

// window.initMap = initMap;
getId();


