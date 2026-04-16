const params = new URLSearchParams(document.location.search);
const idiomaID = params.get("idioma")

const introTXT = document.getElementById("queIdiomaSoy")
const error = document.getElementById("soyUnError")
const listado = document.getElementById("listaTests")

listarTest()

async function listarTest() {

    const mail = getCookie("email")

    await fetch("http://localhost:9999/languages/all/" + idiomaID).then((response) => {
        if (response.status !== 200) {
            throw new Error("Something went wrong on API server!");
        }
        return response.json()
    }).then((response) => {
        introTXT.innerHTML = "Lista de test del " + response[0].nivel + " de " + response[0].nombre + "."
    })

    await fetch("http://localhost:9999/tests/" + idiomaID).then((response) => {
         if (response.status !== 200) {
            error.innerHTML = "¡UPS! ¡NO SE HAN ENCONTRADO TESTS EN ESTE IDIOMA!"
            throw new Error("Something went wrong on API server!");
        }
        return response.json()
    }).then((response) => {
        response.forEach(async (element) => {
            console.log(element)
            const li = document.createElement("li")
            let nota

            await fetch("http://localhost:9999/results/" + mail + "/" + element.ID).then((responseB) => {
                if (responseB.status !== 200) {
                    nota = "Sin Intentos.";
                }
                return responseB.json()
            }).then((responseB) => {
                if (responseB !== null && responseB !== undefined) {
                    const respuesta = responseB[0]
                    nota = "Mejor Nota: " + respuesta.Nota
                    return responseB
                }
            })

            const txt = document.createTextNode(element.Titulo + "; Tipo: " + element.Tipo + "; " + nota)

            li.appendChild(txt)
            listado.appendChild(li)
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