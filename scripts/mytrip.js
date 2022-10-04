import {getCookie, setCookie, deleteCookie} from "../module/cookie.js";

let map;
let MARKER_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function initMap(lat, lng) {
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

    initMap(myTrips.x, myTrips.y);

    // 쿠키 데이터 잡아와서 마리 리스트 생성
    let myTripList = document.querySelector('#mytrip-list');
    let bounds = new google.maps.LatLngBounds();
    myTrips.forEach((data, idx) => {
        let markerLabel = MARKER_LABELS[idx];

        let item = generateMyTripList(data, markerLabel);
        myTripList.append(item);

        let pos = {
            lat: data.x,
            lng: data.y
        };

        // Map에 Marker 생성
        new google.maps.Marker({
            position: pos,
            laebl: markerLabel,
            map: map
        });
        // 위도, 경도로 구성된 좌표 오브젝트를 삽입.
        // 해당 영역이 좌표를 모두 포함할 수 있을정도로 넓어짐.
        bounds.extend(pos);
    })
    // 표현해야 할 좌표를 모두 보여주는 최적의 zoom 레벨을 자동으로 생성
    map.fitBounds(bounds);
}

function generateMyTripList(data, markerLabel) {
    const template = document.querySelector('#mytrip-item-template').cloneNode(true);
    template.removeAttribute('id');
    template.querySelector('.item-name').innerHTML = `${markerLabel}. ${data.name}`;
    template.querySelector('.item-city-name').innerHTML = data.cityName;

    template.querySelector('.item-remove').addEventListener('click', function (e) {
        e.preventDefault();

        console.log(this);
        this.closest('.mytrip-item').remove(); // 겉보기에만 제거
    })

    return template
}

getData()