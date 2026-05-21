const listaIdiomas = document.getElementById("listaIdiomas")
const bienvenida = document.getElementById("introTXT")
const error = document.getElementById("errorTXT")

const params = new URLSearchParams(document.location.search);
const email = params.get("user")

document.getElementById("killUserButton").addEventListener("click", (e) => {
    e.preventDefault()
    fetch("http://localhost:9999/languages/user/remove/all/" + email, {method: 'DELETE'}).then((response) => {
        return response;
    }).then((response) => {
        fetch("http://localhost:9999/results/" + email, {method: 'DELETE'}).then((response) => {
            return response;
        }).then((response) => {
            fetch("http://localhost:9999/users/unregister/" + email, {method: 'DELETE'}).then((response) => {
                window.location.replace("./listaAdmins.html")
            })
        })
    })
})

if (email === getCookie("email")) {
    document.getElementById("killUserButton").classList.add("hidden")
    document.getElementById("killUserTXT").classList.add("hidden")
}

document.getElementById("downUserButton").addEventListener("click", (e) => {
    e.preventDefault()
    fetch("http://localhost:9999/users/downgrade/" + email, {method: 'GET'}).then((response) => {
        return response;
    }).then((response) => {
        window.location.replace("./listaAdmins.html")
    })
})

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}