const users = JSON.parse(localStorage.getItem('users')) || [];


let activeUser;

const findAndValidate = () => {
    const validateUser = document.querySelector('#username').value;
    const validatePassword = document.querySelector('#password').value;

    const credentialConfirmation = users.find(o => o.username === validateUser && o.password === validatePassword);

    if (credentialConfirmation) {
        Swal.fire({
            title: 'Congratulations!',
            text: 'You have successfully logged in to the GameHub!',
            icon: 'success',
            confirmButtonText: 'Go to The GameHub!',
            background: '#212121',
            color: '#FFFF',
            confirmButtonColor: '#FF4545'
        }).then(function () {
            window.location = "pages/home.html";
        });
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Username or password incorrect, please try again',
            icon: 'error',
            confirmButtonText: 'Try Again',
            background: '#212121',
            color: '#FFFF',
            confirmButtonColor: '#FF4545'
        });
    }
};

const loginBtn = document.querySelector('#login-btn');
if (loginBtn) {
    loginBtn.addEventListener('click', findAndValidate);
}
