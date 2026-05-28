const listaIdiomas = document.getElementById("idiomasExistentes")

getIdiomas()

async function getIdiomas() {

    await fetch("http://localhost:9999/languages/all").then((response) => {
        if (response.status !== 200) {
            throw new Error("Something went wrong on API server!");
        }
        return response.json();
    }).then((response) => {
        response.forEach(async (element) => {
            const option = document.createElement("option")
            option.innerHTML = element.nombre
            option.value = element.nombre
            listaIdiomas.appendChild(option)
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