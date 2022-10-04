# Real Trip Advisor

## Description
> 2022.09.25. ~

## Summary
* 국내 여행 정보사이트 제작
* 국내 주요 도시 및 여행지 ( 우선적으로 제주도 위주 )
* 클론코딩 => 대다수의 기능을 입맛에 맞춰 변형시키는 중
  - [ ] jQuery 기반으로 제작된 페이지를 Vanilla Javascript로 변경
  - [ ] 사용한 라이브러리들을 Vanilla Javascript로 변경
  - [ ] 제주도를 기반으로 한 여행지를 일본 오카야마 기반으로 변경
  - [ ] 대략 5년 전에 작성된 코드들로 구성된 내용이니 만큼, 모던하게 변경 및 작동하지 않는 부분은 임의로 수정.

## Technical Stack
### Language
* Javascript

### Library
* Datepicker (jQuery)
* Swiper



## Requirements
- [X] 스크롤 이동시 헤더 가시성 유지
- [ ] 마이트립 어드바이저 메인 페이지
  - [X] 원하는 기간(from, to)을 선택하여 여행지 검색, 날짜는 달력으로 선택
    - [ ] datePicker 대신 직접 캘린더 위젯 만들기 
- [ ] 회원가입 페이지
    - [ ] 이메일
    - [ ] 비밀번호
    - [ ] 성별
    - [ ] 출생년도
    - [ ] 회원약관 동의
- [ ] 여행지 상세보기 페이지
  - [X] 여행지의 이미지들을 갤러리 형태로 보여줌
  - [X] 여행지의 위치를 지도로 표시
- [ ] 마이트립 페이지
  - [X] 특정 여행지를 마이 트립에 추가
  - [ ] 마이 트립에 추가된 여행지를 클릭할경우 해당 여행지 페이지로 이동
  - [X] 마이트립에 추가한 여행지들을 지도에 표시
  - [X] 마이트립에 추가한 여행지를 제거


---
# Issue note
* 페이지 레이아웃은 이미 만들어져있다고 가정
  * layouts 폴더 참고
* 프론트엔드 작업이니만큼 로그인/로그아웃 기능은 구현하지 않음
  * 차후 붙일 예정.
* 서버에 올라가 있는 JSON 파일들은 임의로 다른 서버를 생성하여 데이터를 올리고, 그 데이터를 이용하여 페이지를 새로 꾸밀 예정. 

## jQuery 사용에 대한 고민
* 현재 jQuery의 DatePicker 라이브러리를 기용중인 상황이기도 하고, 부득이하게 ajax도 사용해야 하는 상황이기에 일관성 강화를 위해 jQuery에 대한 사용도 고려.
* 성능상의 이슈가 있음에도 불구하고 IE와의 호환성 문제로만 사용되던 jQuery를 IE가 사장된 지금 다시 사용하는것은 좋지 않다고 판단.
* 따라서 jQuery의 사용은 지양한 채, DatePicker 같은 추가 라이브러리를 이용해야만 하는 상황에서만 이용하고, ajax 또한 순수 ajax(xmlhttprequest)만 사용 가능한 바닐라 자바스크립트로 프로젝트를 진행.
  >차후 캘린더 위젯은 **스카이스캐너** 처럼 직접 UI를 구성해볼 예정 


## 09.27
#### 데모용으로 만들어진 서버 API의 인코딩이 EUC-KR로 되어 있는 것을 확인.
  * Ajax로 통신할 경우에는 json파일 내용을 그대로 받아 올 수 있기에 상관없지만, fetch로 통신할 경우 json파일을 별도의 객체로 변환하는 과정에서 인코딩이 깨지는 현상을 확인
  * 자바스크립트 내부적으로는 EUC-KR을 UTF-8로 바꾸기가 힘들다고 판단.
  * 서버에서 인코딩 형식을 UTF-8로 변경하여 JSON 파일을 다시 올리거나, ajax로 통신을 해야하는 상황으로 보고, 현재 프로젝트에서 서버통신에 사용되는 함수를 ajax로 교체
  * ajax의 사용방법은 xmlhttprequest 형식으로 사용하는 방법과 jQuery를 이용한 방식으로 나뉨.
  * 본 프로젝트에서 가능한 바닐라 자바스크립트로만 구성해본다는 대원칙을 지키기 위해 순수 ajax(xmlhttprequest) 방식을 사용하기로 결정

## 09.28
### 쿼리스트링 데이터를 받아서 문자열을 쪼개는 함수값이 제대로 동작하지 않는 문제 발생
* split 함수의 리턴값으로 생겨난 배열을 반복문으로 돌리는 방식으로 처리.
* forEach 반복문을 사용하고, 반복문 외부에 에러 캐치용으로 null 값을 준 클로져 하나. 그리고 forEach 반복문 내부에서 결과값을 받는 클로져 하나를 둠.

### 디버깅 과정
* forEach 반복문과 비슷한 역할을 하는 for 반복문을 시도해보니 잘 작동함.
* 하나하나 로그를 찍어가며 값을 추적해보니 forEach 반복문 내부의 클로져 값을 계속 받아오지 못하는 것이 확인됨.

### 예상되었던 문제 지점
1. 반복문 외부 클로져만 작동을 하는 것으로 보아 반복문 내부에 설정해둔 클로져는 어디론가 날아가 있는 상황인거 아닐까? 

### 해결 방법
* 이유를 찾기위해 구글링을 하다보니 forEach 반복문은 비동기 방식으로 운영되고 for 반복문(for...in, for...of 포함)은 동기 방식으로 진행된다는 사실을 발견.
* 비동기 방식으로 진행된다면 Queue로 빠졌다가 마지막에 실행될테니 forEach 반복문 외부의 클로져 값을 받아오는게 당연했음.


## 09.29
### swiper가 먹히지 않는 현상 발생
* JSON 데이터에서 각 배열 객체에 담겨진 img의 개수가 다른 상황
* img url 개수에 맞춰 태그를 재설정해줘야하기에 document.createElement() 함수를 사용.
* 다 작성하고 보니 swiper가 먹통이 되는 상황 발생.

#### 예상되었던 문제 지점
1. document.createElement 함수가 비동기 함수여서 실행 순서가 꼬인것인가?
2. 브라우저 실행 순서 문제로 실행 순서가 꼬인 것인가?

#### 디버깅 과정
1. 첫번째 예상 문제 지점을 해결해보기 위해 async를 사용해 보았다.<br/>
   => 여전히 먹통. DOM 자체는 비동기가 아님. 
2. XMLHttpRequest.open 함수를 통해 async 설정을 별도로 해 보았다.<br/>
   => 그나마 불러와지던 사진도 불러오지 못함.
3. 두번째 예상 문제 지점을 해결해보기 위해 HTML단에서 CSS와 JS CDN의 위치를 바꿔보았다.<br/>
   => 소용 없음 

**예상했던 문제들이 모두 틀렸기에 다시 생각을 해 보았다.** 

우선 이벤트리스너가 통하지 않는 상황이니 자바스크립트 문제일 확률이 크고, 자바스크립트 파일만 못읽고 있다는 것은 코드 자체에 문제가 없는 이상 HTML, CSS 파일보다 먼저 읽어버리는 상황일 것이다. <br/>
현재 createElement 함수를 사용중이기에, HTML이 그려지는 것과 DOM을 통해 새로 그려지는 태그들은 읽는 순서상의 차이가 발생한다. <br/>
swiper 인스턴스는 DOM을 통해 새로 그려진 태그들을 대상으로 움직이도록 코딩해두었기 때문에 여기서 문제가 발생하는 거라면 DOM을 통해 새로 그려진 태그들이 swiper 인스턴스보다 뒤에 그려진다는 말이다 <br/>
즉, DOM을 통해 새로 그려진 태그들은 비동기처리가 되어 Queue로 빠졌다는 소린데, DOM이 비동기 처리를 지원하는것이 아니라면 어디서 비동기 처리가 된걸까?</br></br>

어디서 착각하고 있는게 있나 해서 비동기 함수에 대해 다시 짚어보았다. 
> **비동기 함수**란 작동에 시간이 걸리는 함수를 말하며, 그로인해 Queue으로 이동하여 Stack이 비워진 이후에 순차적으로 작동하는 함수를 말한다. 

여기서 **작동에 시간이 걸리는 함수** 는 유저와의 상호작용이 필요한 함수들을 포함하며 크게 EventListener, setTimeout 같은 스케줄러, ajax 함수의 3가지 종류를 뜻한다. </br>
하지만 나는 **ajax가 비동기 함수라는 사실을 망각하고 있었다**.</br> 
정확하게 말하면 서버에서 데이터를 받아오는 과정 자체가 응답시간이 걸리는 과정이기 때문에 비동기 통신으로 데이터를 받아오는 것이고, 따라서 기본적으로 지원되는 fetch 함수 또한 비동기 통신에 포함된다.</br>
다만, promise나 async, await 같은 경우에는 비동기 통신을 동기 통신으로 바꿔주는 역할을 할 뿐인 것이다.</br>
즉, DOM을 통해 그려진 태그들은 서버에서 받아온 데이터를 인자로 사용하고 있기 때문에 비동기 처리가 되는 상황이었던 것이다.

#### 해결 방법
어디서 비동기처리가 되고있는지 확인되었으니, 해결방법은 간단했다. swiper 인스턴스도 비동기처리가 되고 있는 부분에 같이 넣어주면 되는 것이다. 
전역변수처럼 함수를 설정해두었던 swiper 인스턴스를 DOM을 통해 그려진 태그 바로 뒤에 넣어두니 정상적으로 작동하였다.

## 10.04
### Cookie에 배열 데이터가 들어가지 않는 현상 발생
* JSON 데이터로 포맷하여 쿠키를 생성하는데 까진 성공하지만, 생성한 쿠키 데이터를 객체로 파싱하는 과정에서 계속 문제가 발생
* 파싱하여 다시 객체로 변환한 배열에 .push를 하는 과정에서 에러가 발생

#### 예상되었던 문제 지점 및 시도 방안
1. Cookie 데이터는 JSON 파일로 삽입되기 때문에 문자열로 저장이 된다. 이 과정에서 JSON 객체의 형식에 잘못맞춰 string 데이터가 삽있되었는지 의심하였다. 
2. JSON 객체의 형식에 잘못 맞추었다면 JSON.stringify 메서드를 통해 문자열화 시키는 과정에서 형식을 다시 맞춰주면 되는 일인데, 수정을 거듭해봐도 똑같은 문제가 발생하였다. 
3. 차선책으로 웹 스토리지에 대한 사용도 고려하였다. 사실 쿠키는 보안문제로 더이상 예전처럼 자주 쓰이지 않고, 웹 스토리지가 그 역할을 대신하고 있는 상황이기에 굳이 Cookie를 사용해야 하는지 의문이 잠깐 들었다.
4. 그래도 어차피 둘다 쓰긴 써야하는 기능들이기에 다시 시도를 해 보았다. 
5. js-cookie 라이브러리를 많이 사용하는 모양이길래 써 보았지만, 이 라이브러리에서 JSON으로 자동 변환시켜주는 메서드가 모종의 사유로 delete된 모양이길래 다시 직접 함수를 구현하기로 하였다. 
6. 로컬스토리지를 이용하여 다시 재구성해보니 잘 들어갔다. 로컬스토리지는 배열 변환을 자동으로 이루어주는 모양이었다. 
7. 하지만 다시 로컬스토리지에 배열데이터를 넣응 방식을 그대로 활용하여 쿠키에 데이터를 삽입해보니 잘 들어갔다. 
8. 그냥 JSON 활용을 잘못한 듯


#### 부족한 개념
* 쿠키가 어디에 사용되는지, 웹스토리지가 아닌 쿠키를 굳이 사용해야하는 이유에 대해 좀 더 고찰해볼 수 있는 기회가 되었다. 
* 쿠키를 활용하기 위한 인코딩 방식과 보안 방식에 대해 알 수 있었다 (XSRF공격 대비 등)
* 쿠키에는 JSON 데이터가 삽입되며 JSON 데이터는 문자열로만 존재한다는 사실을 알게 되었다. 
