const users = JSON.parse(localStorage.getItem('users')) || [];


const newUser = () => {
    const yourName = document.querySelector('#new-name').value;
    const mail = document.querySelector('#new-email').value;
    const username = document.querySelector('#new-username').value;
    const password = document.querySelector('#new-password').value;
    const confirmPassword = document.querySelector('#new-confirmPass').value;

    if (!yourName || !mail || !username || !password || !confirmPassword) {
        Swal.fire({
            title: 'Error!',
            text: 'You missed a field! Please try again.',
            icon: 'error',
            confirmButtonText: 'Try Again',
            background: '#212121',
            color: '#FFFF',
            confirmButtonColor: '#FF4545'
        });
    } else if (password !== confirmPassword) {
        Swal.fire({
            title: 'Error!',
            text: 'Passwords do not match! Please try again.',
            icon: 'error',
            confirmButtonText: 'Try Again',
            background: '#212121',
            color: '#FFFF',
            confirmButtonColor: '#FF4545'
        });
    } else {
        const compareUser = users.find(o => o.username === username);
        const compareEmail = users.find(o => o.mail === mail);

        if (compareUser && compareEmail) {
            Swal.fire({
                title: 'Error!',
                text: 'That email and username are already registered in The GameHub',
                icon: 'error',
                confirmButtonText: 'Try Again',
                background: '#212121',
                color: '#FFFF',
                confirmButtonColor: '#FF4545'
            });
        } else if (compareUser) {
            Swal.fire({
                title: 'Error!',
                text: 'That username is already registered in The GameHub',
                icon: 'error',
                confirmButtonText: 'Try Again',
                background: '#212121',
                color: '#FFFF',
                confirmButtonColor: '#FF4545'
            });
        } else if (compareEmail) {
            Swal.fire({
                title: 'Error!',
                text: 'That email is already registered in The GameHub',
                icon: 'error',
                confirmButtonText: 'Try Again',
                background: '#212121',
                color: '#FFFF',
                confirmButtonColor: '#FF4545'
            });
        } else {
            Swal.fire({
                title: 'Congratulations!',
                text: 'You have successfully registered to the GameHub!',
                icon: 'success',
                confirmButtonText: 'Now, Login!',
                background: '#212121',
                color: '#FFFF',
                confirmButtonColor: '#FF4545'
            }).then(function () {
                window.location = "../index.html";
            });

            const addNewUser = {
                name: yourName,
                mail: mail,
                username: username,
                password: password
            };

            users.push(addNewUser);

            const jsonParse = JSON.stringify(users);
            localStorage.setItem('users', jsonParse);

            let gettingUsers = localStorage.getItem('users');
            gettingUsers = JSON.parse(gettingUsers);
        }
    }
};


const btnRegister = document.querySelector('#register-btn');
if (btnRegister) {
    btnRegister.addEventListener('click', newUser);
}
