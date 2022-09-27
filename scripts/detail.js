function getDetail(id) {
    const params = {
        id: id,
    }
    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
    let url = 'https://javascript-basic.appspot.com/locationDetail?' + query;
    // url = decodeURIComponent(url)
    console.log(url)

    // let url = new URL('https://javascript-basic.appspot.com/locationDetail');
    // url = decodeURIComponent(url);
    const xhr = new XMLHttpRequest();
    // url.searchParams.set('id', id);
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = (e) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const res = JSON.parse(xhr.responseText);
            console.log(res);
        }
    }
}

function getId() {
    // window.location.href = '/'
    let id = parseId(window.location.search);
    console.log('id', id);

    getDetail(id);
}

function parseId(str) {
    let newStr = str.substring(1); // 0번째 문자 빼고 문자열 리턴
    let args = newStr.split('&'); // & 기준으로 분리해서 배열로 리턴

    args.forEach(arg => {
        let tokens = arg.split('='); // 배열 args 원소들을 각각 = 기준으로 분리
        if (tokens[0] === 'id') return tokens[1]; // 만약 분리된 원소배열의 첫번째 원소가 id라면 그 다음 값을 리턴.
    })
    return null;
}

console.log(window.location.search);
getId();