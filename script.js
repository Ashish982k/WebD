document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login');
    const signUpForm = document.querySelector('.login-sign-up');

    const toSignUp = document.getElementById('sign-up');
    const toLogin = document.getElementById('login');

    toSignUp.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signUpForm.style.display = 'block';
    });

    toLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signUpForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    loginForm.style.display = 'block';
    signUpForm.style.display = 'none';

    function func() {
        let name = document.getElementById("user").value;
        let password = document.getElementById("pass").value;
    
        let a = "Ashish";
        let b = "ashish@123";
    
        if (name === a && password === b) {
           
            sessionStorage.setItem("username", name);
    

            window.location.href = "gamify.html";
        } else {
            alert("Username or Password is INCORRECT");
        }
    }

    document.getElementById("login-form").addEventListener("submit", function(e) {
        e.preventDefault();
        func();
    });
});
