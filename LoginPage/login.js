var container = document.getElementById('container');
var loginBtn = document.getElementById('login');

var form = document.getElementById('form');
var email = document.getElementById('email');
var password = document.getElementById('password');
var confirmPassword = document.getElementById('confirmPassword');


form.addEventListener('submit', function(e) {
    e.preventDefault();
    checkInputs();
});

email.addEventListener('input', () => {
    checkEmail();
});

password.addEventListener('input', () => {
    checkPassword();
});

confirmPassword.addEventListener('input', () => {
    checkConfirmPassword();
});

function checkInputs() {
    const emailValid = checkEmail();
    const passwordValid = checkPassword();
    const confirmPasswordValid = checkConfirmPassword();

    if (emailValid && passwordValid && confirmPasswordValid) {
        localStorage.setItem('userEmail', email.value);
        window.location.href = '../HomePage/home.html';
    }
}

function checkEmail() {
    const emailValue = email.value.trim();

    if (emailValue === '') {
        setErrorFor(email, 'Email is required');
        return false;
    } else if (!isEmailValid(emailValue)) {
        setErrorFor(email, 'Email is not valid');
        return false;
    } else {
        setSuccessFor(email);
        return true;
    }
}

function checkPassword() {
    const passwordValue = password.value.trim();

    if (passwordValue === '') {
        setErrorFor(password, 'Password is required');
        return false;
    } else if (passwordValue.length < 8 || !/[a-z]/.test(passwordValue) || !/[A-Z]/.test(passwordValue)) {
        setErrorFor(password, 'Password must be at least 8 characters');
        return false;
    } else {
        setSuccessFor(password);
        return true;
    }
}

function checkConfirmPassword() {
    const confirmPasswordValue = confirmPassword.value.trim();
    const passwordValue = password.value.trim();

    if (confirmPasswordValue === '') {
        setErrorFor(confirmPassword, 'Confirm Password is required');
        return false;
    } else if (confirmPasswordValue !== passwordValue) {
        setErrorFor(confirmPassword, 'Passwords do not match');
        return false;
    } else {
        setSuccessFor(confirmPassword);
        return true;
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');



    formControl.className = 'form-control error';
    small.innerText = message;
    small.style.visibility = 'visible';
    input.style.margin = '8px 0'; 
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    formControl.className = 'form-control success';
    small.style.visibility = 'hidden';
    input.style.margin = '8px 0';
}

function isEmailValid(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

}

