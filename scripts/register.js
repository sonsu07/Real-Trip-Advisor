/** 아이디 검증 */
function  checkId() {
    let inputId = document.querySelector('#inp-id');
    inputId.addEventListener('input', function (e) {
        e.preventDefault();

        // 영문자로 시작하는 영문자 또는 숫자 6~20자
        let idRule = /^[a-z]+[a-z0-9]{5,19}$/g;
        let idValue = inputId.value;
        let checkId = idRule.test(idValue);

        let idWarning = document.querySelector('#id-warning');

        if (idValue === '') {
            idWarning.innerHTML = '아이디를 입력해 주세요.';
        } else if (checkId === false) {
            idWarning.innerHTML = '다른 아이디를 사용해 주세요';
        } else {
            idWarning.innerHTML = '';
        }
    })
}

/** 비밀번호 검증 */
function checkPW() {
    /** 비밀번호 */
    let inputPW = document.querySelector('#inp-password');
    inputPW.addEventListener('input', function (e) {
        e.preventDefault();

        // 특수문자, 문자, 숫자 포함 형태의 8~15자리 이내의 암호 정규식
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

    /** 비밀번호 확인 */
    let inputConfirm = document.querySelector('#inp-confirm');
    inputConfirm.addEventListener('input', function (e) {
        e.preventDefault();

        let passwordValue = inputPW.value; // 비밀번호 칸 값

        // 특수문자, 문자, 숫자 포함 형태의 8~15자리 이내의 암호 정규식
        let passwordRule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        let PWValueConfirmVal = inputConfirm.value;
        let checkPWConfirm = passwordRule.test(PWValueConfirmVal);

        let PWConfirmWarning = document.querySelector('#pwConfirm-warning');

        if (PWValueConfirmVal === '') {
            PWConfirmWarning.innerHTML = '비밀번호를 입력하세요';
        } else if (checkPWConfirm === false) {
            PWConfirmWarning.innerHTML = '최소 8자리 이상. 영어 대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 입력해 주세요.';
        } else if(passwordValue !== PWValueConfirmVal) {
            PWConfirmWarning.innerHTML = '비밀번호가 동일하지 않습니다.';
        } else {
            PWConfirmWarning.innerHTML = '';
        }
    })
}

/** 이메일 검증 */
function checkEmail() {
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
            emailWarning.innerHTML = '올바른 이메일 형식이 아닙니다.';
        } else {
            emailWarning.innerHTML = '';
        }
    })
}

/** 이름 검증 */
function checkName() {
    let inputName = document.querySelector('#inp-user-name');
    inputName.addEventListener('input', function (e) {
        e.preventDefault();

        let nameRule =  /^[가-힣a-zA-Z]{2,}$/;
        let nameValue = inputName.value;
        let checkName = nameRule.test(nameValue);

        let nameWarning = document.querySelector('#user-name-warning');

        if (nameValue === '') {
            nameWarning.innerHTML = '이름을 입력해주세요';
        } else if (checkName === false) {
            nameWarning.innerHTML = `2글자 이상의 한글 또는 영문으로 입력해주세요.`
        } else {
            nameWarning.innerHTML = '';
        }
    })
}

/** 출생년도 체크 */
function yearCheck() {
    let inputYear = document.querySelector('#inp-year-birth');
    inputYear.addEventListener('input', function (e) {
        e.preventDefault();

        let yearRule = /^\d{4}$/; // 숫자 4자리까지
        let yearValue = inputYear.value;
        let checkYear = yearRule.test(yearValue);
        console.log(checkYear);
        let yearWarning = document.querySelector('#year-warning');
        // console.log(yearValue);

        if (checkYear === false) {
            yearWarning.innerHTML = '정확히 입력해주세요.';
        } else {
            yearWarning.innerHTML = '';
        }
    })
}

/** 성별 체크란 */
function genderCheck() {
    // check male
    let male = document.querySelector('#inp-male');
    male.addEventListener('click', function (e) {
        if (male.className === 'background-blue') {
            male.classList.remove('background-blue')
        } else {
            male.classList.add('background-blue');
        }
    })

    // check female
    let female = document.querySelector('#inp-female');
    female.addEventListener('click', function (e) {
        if (female.className === 'background-blue') {
            female.classList.remove('background-blue')
        } else {
            female.classList.add('background-blue');
        }
    })
}

checkId();
checkEmail();
checkPW();
checkName();
genderCheck();
yearCheck();

// 임시로 제출기능 막기
document.querySelector('#form-register').addEventListener('submit', function (e) {
    e.preventDefault();
})