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

    // args.forEach(arg => {
    //     let tokens = arg.split('='); // 배열 args 원소들을 각각 = 기준으로 분리
    //     if (tokens[0] === 'id') {
    //         console.log(tokens[1])
    //         return tokens[1]; // 만약 분리된 원소배열의 첫번째 원소가 id라면 그 다음 값을 리턴.
    //     }
    // })

    for (let i = 0; i < args.length; i++) {
        let arg = args[i];
        let tokens = arg.split('=');
        if (tokens[0] === 'id') {
            return tokens[1];
        }
    }
    return null;
}

getId();