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
                window.location.replace("./listaUsuarios.html")
            })
        })
    })
})

getIdiomas()

async function getIdiomas() {

    let idiomaID

    await fetch("http://localhost:9999/languages/user/" + email).then((response) => {
        if (response.status !== 200) {
            error.innerHTML = "Este usuario no está dado de alta en ningún idioma."
            error.classList.remove("hidden")
            throw new Error("Something went wrong on API server!");
        }
        return response.json();
    }).then(async (response) => {
        response.forEach(async (element) => {
            await fetch("http://localhost:9999/languages/all/" + element.Idioma).then((response) => {
                if (response.status !== 200) {
                    throw new Error("Something went wrong on API server!");
                }
                return response.json();
            }).then(async (response) => {
                const idioma = response[0]
                let li = document.createElement("li")
                let txt
                let button
                const p = document.createElement("a")
                p.innerHTML = idioma.nombre + " " + idioma.nivel

                await fetch("http://localhost:9999/tests/" + element.Idioma).then((response) => {
                    if (response.status !== 200) {
                        throw new Error("Something went wrong on API server!");
                    }
                    return response.json()
                }).then(async (response) => {
                    const test = response.length

                    await fetch("http://localhost:9999/results/idioma/" + email + "/" + element.Idioma).then((responseB) => {
                        
                        return responseB.json()
                    }).then((responseB) => {
                        let testUser = 0
                        if (responseB !== null) {
                            responseB.forEach(element => {
                                if (element.Nota >= 5) {
                                    testUser++
                                }
                            });
                        } else {
                            testUser = 0
                        }

                        const progreso = (testUser/test)*100

                        txt = document.createTextNode(" | Progreso: " + progreso + "% | ")

                        button = document.createElement("button")
                        button.type = "button"
                        button.addEventListener("click", (e) => {
                            e.preventDefault()

                            const data = {
                                user: email,
                                idioma: element.Idioma
                            }

                            fetch("http://localhost:9999/languages/user/remove", {method: 'DELETE', headers: {'Content-Type': 'application/json',},body: JSON.stringify(data)}).then((response) => {
                                return response;
                            }).then((response) => {
                                fetch("http://localhost:9999/results/filter/" + email + "/" + element.Idioma, {method: 'DELETE'}).then((response) => {
                                    window.location.replace("./listaUsuarios.html")
                                })
                            })
                        })
                        button.innerHTML = "Eliminarle de este idioma"
                    })
                })

                li.appendChild(p)
                li.appendChild(txt)
                li.appendChild(button)
                listaIdiomas.appendChild(li)
            })
        })
    })
}

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