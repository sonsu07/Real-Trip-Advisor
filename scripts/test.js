let a = 'id=0'
let b = a.split('&');
b.forEach(arg => {
    let tokens = arg.split('='); // 배열 args 원소들을 각각 = 기준으로 분리
    if (tokens[0] === 'id') return console.log(tokens[1]); // 만약 분리된 원소배열의 첫번째 원소가 id라면 그 다음 값을 리턴.
})
