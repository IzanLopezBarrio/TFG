const listaIdiomas = document.getElementById("listaIdiomas")

getIdiomas()

async function getIdiomas() {

    await fetch("http://localhost:9999/languages/all").then((response) => {
        if (response.status !== 200) {
            throw new Error("Something went wrong on API server!");
        }
        return response.json();
    }).then((response) => {
        response.forEach(async (element) => {
            const li = document.createElement("li")
            li.innerHTML = element.nombre
            await fetch("http://localhost:9999/languages/niveles/" + element.nombre).then((responseB) => {
                if (responseB.status !== 200) {
                    throw new Error("Something went wrong on API server!");
                }
                return responseB.json();
            }).then((responseB) => {
                responseB.forEach(elementB => {
                    const liB = document.createElement("li")
                    liB.classList.add("tabbed")
                    const a = document.createElement("a")
                    a.classList.add("listaIdiomasLink")
                    a.href = "detallesIdioma.html?idioma=" + elementB.ID
                    a.innerHTML = elementB.Nivel

                    liB.appendChild(a)
                    li.appendChild(liB)
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