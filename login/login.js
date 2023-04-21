// Carga la lista de usuarios desde el localStorage
const users = JSON.parse(localStorage.getItem('users')) || [];

// Login del usuario
const findAndValidate = () => {
    // Obtiene los valores de los campos de entrada
    const validateUser = document.querySelector('#username').value;
    const validatePassword = document.querySelector('#password').value;

    // Busca al usuario con las credenciales proporcionadas
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
            window.location = "../pages/home.html";
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
