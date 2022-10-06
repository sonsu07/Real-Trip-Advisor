/** 이메일 검증 */
let inputEmail = document.querySelector('#inp-email');
inputEmail.addEventListener('input', function (e) {
    e.preventDefault();

    let emailRule= /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;// 이메일 정규식
    let emailValue = inputEmail.value;
    let checkEmail = emailRule.test(emailValue);

    let emailWarning = document.querySelector('#email-warning');

    if (emailValue === '') {
        emailWarning.innerHTML = '이메일을 입력해주세요.';
    } else if (checkEmail === false) {
        emailWarning.innerHTML = '이메일 형식으로 적어주세요.';
    } else {
        emailWarning.innerHTML = '';
    }
    console.log(emailValue);
})

/** 비밀번호 검증 */
let inputPW = document.querySelector('#inp-password');
inputPW.addEventListener('input', function (e) {
    e.preventDefault();

    // 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식
    let passwordRule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    let passwordValue = inputPW.value;
    let checkPW = passwordRule.test(passwordValue);

    let passwordWarning = document.querySelector('#pw-warning');

    if (passwordValue === '') {
        passwordWarning.innerHTML = '비밀번호를 입력하세요';
    } else if (checkPW === false) {
        passwordWarning.innerHTML = '최소 8자리 이상. 영어 대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 입력해 주세요.';
    } else {
        passwordWarning.innerHTML = '';
    }
})

// 임시로 제출기능 막기
document.querySelector('#form-register').addEventListener('submit', function (e) {
    e.preventDefault();
})