const logIn = document.getElementById("logInForm")
const errorTag = document.getElementById("errorTag")

logIn.addEventListener("submit", async (event) => {
    event.preventDefault()

    const email = document.getElementById("email").value
    const passwd = document.getElementById("passwd").value

    const data = {
        email: email,
        passwd: passwd
    }

    await fetch("http://localhost:9999/users/login", {method: 'POST', headers: {'Content-Type': 'application/json',},body: JSON.stringify(data)})
    .then((response) => {
        if (response.status !== 200) {
            errorTag.innerHTML = "Usuario y/o contraseña incorrectos."
            throw new Error('Autenticación Incorrecta');
        }
        return response.json();
    }).then((response) => {
        setCookie("email", response[0].email, 1)
        setCookie("UserName", response[0].UserName, 1)
        window.location.replace("acceso/index.html")
    })
})

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}