const listaIdiomas = document.getElementById("listaIdiomas")
const bienvenida = document.getElementById("introTXT")
const error = document.getElementById("errorTXT")

getIdiomas()

async function getIdiomas() {
    const name = getCookie("UserName")
    const email = getCookie("email")
    bienvenida.innerHTML = "¡Bienvenido, " + name + "!"

    let idiomaID

    await fetch("http://localhost:9999/languages/user/" + email).then((response) => {
        if (response.status !== 200) {
            error.innerHTML = "No estás dado de alta en ningún idioma."
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
                const a = document.createElement("a")
                let txt
                a.classList.add("listaIdiomasLink")
                a.href = "listaTests.html?idioma=" + element.Idioma
                a.innerHTML = idioma.nombre + " " + idioma.nivel

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

                        txt = document.createTextNode(" | Progreso: " + progreso + "%")
                    })
                })

                li.appendChild(a)
                li.appendChild(txt)
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