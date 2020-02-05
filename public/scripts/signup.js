document.querySelector(".signup").addEventListener("click", signup);

function signup() {
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
    fetch("/users/signup", options)
        .then(res => console.log(res));
}