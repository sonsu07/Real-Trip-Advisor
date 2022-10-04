import {getCookie, setCookie, deleteCookie} from "../module/cookie.js";

let map;
let MARKER_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let markers = {};

function initMap() {
    let mapTag = document.querySelector('#map');
    map = new google.maps.Map(mapTag);
}

function getData() {
    let myTrips = getCookie('MYTRIPS'); // 내 여행지 목록 쿠키
    console.log(myTrips);
    if (myTrips === undefined) {
        myTrips = [];
    } else {
        myTrips = JSON.parse(myTrips); // 내 여행지 목록 객체화 (정확히는 배열화되고 객체를 요소로 가진 상태 )
    }

    initMap(myTrips.x, myTrips.y);

    // 쿠키 데이터 잡아와서 마리 리스트 생성
    let myTripList = document.querySelector('#mytrip-list');
    let bounds = new google.maps.LatLngBounds();
    myTrips.forEach((data, idx) => {
        let markerLabel = MARKER_LABELS[idx];

        let item = generateMyTripList(myTrips, data, markerLabel);
        myTripList.append(item);

        let pos = {
            lat: data.x,
            lng: data.y
        };

        // Map에 Marker 생성
        let marker = new google.maps.Marker({
            position: pos,
            label: markerLabel,
            map: map
        });
        markers[data.id] = marker;

        // 위도, 경도로 구성된 좌표 오브젝트를 삽입.
        // 해당 영역이 좌표를 모두 포함할 수 있을정도로 넓어짐.
        bounds.extend(pos);
    })
    // 표현해야 할 좌표를 모두 보여주는 최적의 zoom 레벨을 자동으로 생성
    map.fitBounds(bounds);
}

function generateMyTripList(myTrips, data, markerLabel) {
    const template = document.querySelector('#mytrip-item-template').cloneNode(true);
    template.removeAttribute('id');
    console.log(data);

    let itemName = template.querySelector('.item-name');
    itemName.innerHTML = `${markerLabel}. ${data.name}`;

    let itemCityName = template.querySelector('.item-city-name');
    itemCityName.innerHTML = data.cityName;

    let itemRemove = template.querySelector('.item-remove');
    itemRemove.addEventListener('click', function (e) {
        e.preventDefault();

        this.closest('.mytrip-item').remove(); // 목록 제거
        markers[data.id].setMap(null); // 마커 제거
        markers[data.id] = null; // 저장해둔 마커 객체 데이터 제거

        let newList = removeFromList(myTrips, data); // 삭제한 데이터를 추가한 내 여행지 목록 객체
        // console.log(newList);
        setCookie('MYTRIPS', JSON.stringify(newList));
    })

    return template
}

function removeFromList(myTrips, data) {
    // myTrips === 객체를 요소로 갖는, 배열화된 내 여행지 목록
    // data === 내 여행지 목록의 개별 객체 요소

    let index = -1;

    for (let i = 0; i < myTrips.length; i++) {
        if (myTrips[i].id === data.id) {
            index = i;
            break;
        }
    }

    if (index !== -1) {
        myTrips.splice(index, 1);
    }

    return myTrips;
}


getData();