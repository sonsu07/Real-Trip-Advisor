import {getCookie, setCookie, deleteCookie} from "../module/cookie.js";

let map;

function initMap() {
    let mapTag = document.querySelector('#map');
    map = new google.maps.Map(mapTag, {
        zoom: 12,
        center: {
            lat: 33.3617,
            lng: 126.5292,
        }
    });
}

function getData() {
    let myTrips = getCookie('MYTRIPS');
    console.log(myTrips);
    if (myTrips === undefined) {
        myTrips = [];
    } else {
        myTrips = JSON.parse(myTrips);
    }

    initMap();

    // 쿠키 데이터 잡아와서 마리 리스트 생성
    let myTripList = document.querySelector('#mytrip-list');
    myTrips.forEach(data => {
        let item = generateMyTripList(data);
        myTripList.append(item);
    })
}

function generateMyTripList(data) {
    const template = document.querySelector('#mytrip-item-template').cloneNode(true);
    template.removeAttribute('id');
    template.querySelector('.item-name').innerHTML = data.name;
    template.querySelector('.item-city-name').innerHTML = data.cityName;

    return template
}

getData()