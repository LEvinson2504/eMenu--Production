document.querySelector(".login").addEventListener("click", login);

function login() {
    const userName = document.getElementById("email").value;
    const userPass = document.getElementById("password").value;
    const user = {
        name: userName,
        password: userPass,
    };
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // body: {
        //     "name": userName,
        //     "password": userPass,
        // }
        body: JSON.stringify(user),
    };
    fetch("/users/login", options)
        .then(res => console.log(res));
}