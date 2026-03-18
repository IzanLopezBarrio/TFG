const register = document.getElementById("registerForm")
const errorTag = document.getElementById("errorTag")

register.addEventListener("submit", async (event) => {
    event.preventDefault()

    const email = document.getElementById("email").value
    const passwd = document.getElementById("passwd").value
    const userName = document.getElementById("userName").value

    const data = {
        email: email,
        userName: userName,
        passwd: passwd
    }

    await fetch("http://localhost:9999/users/register", {method: 'POST', headers: {'Content-Type': 'application/json',},body: JSON.stringify(data)})
    .then((response) => {
        if (response.status !== 201) {
            errorTag.innerHTML = "Error al registrar el usuario. ¿Ya tiene una cuenta?"
            throw new Error('Error de registro');
        }
        return response.json();
    }).then((response) => {
        window.location.replace("logIn.html")
    })
})

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}