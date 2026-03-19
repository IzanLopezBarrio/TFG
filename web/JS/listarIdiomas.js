const listaIdiomas = document.getElementById("listaIdiomas")
const bienvenida = document.getElementById("introTXT")

getIdiomas()

async function getIdiomas() {
    const name = getCookie("UserName")
    bienvenida.innerHTML = "¡Bienvenido, " + name + "!"

    await fetch("http://localhost:9999/languages/all").then((response) => {
        if (response.status !== 200) {
            throw new Error("Something went wrong on API server!");
        }
        return response.json();
    }).then((response) => {
        response.forEach(async (element) => {
            const li = document.createElement("li")
            li.innerHTML = element.nombre
            listaIdiomas.appendChild(li)
            await fetch("http://localhost:9999/languages/niveles/" + element.nombre).then((responseB) => {
                if (responseB.status !== 200) {
                    throw new Error("Something went wrong on API server!");
                }
                return responseB.json();
            }).then((responseB) => {
                responseB.forEach(elementB => {
                    const li = document.createElement("li")
                    li.classList.add("tabbed")
                    const a = document.createElement("a")
                    a.classList.add("listaIdiomasLink")
                    a.href = "listaTests.html?idioma=" + elementB.ID
                    a.innerHTML = elementB.Nivel

                    li.appendChild(a)
                    listaIdiomas.appendChild(li)
                });
            })
        });
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