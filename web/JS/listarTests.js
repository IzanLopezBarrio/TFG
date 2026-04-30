const params = new URLSearchParams(document.location.search);
const idiomaID = params.get("idioma")

const introTXT = document.getElementById("queIdiomaSoy")
const error = document.getElementById("soyUnError")
const listado = document.getElementById("listaTests")

listarTest()

async function listarTest() {

    // Obtener el usuario que está usando el programa.
    const mail = getCookie("email")

    // Petición de los datos del idioma seleccionado.
    await fetch("http://localhost:9999/languages/all/" + idiomaID).then((response) => {
        if (response.status !== 200) {
            throw new Error("Something went wrong on API server!");
        }
        return response.json()
    }).then((response) => {
        introTXT.innerHTML = "Lista de test del " + response[0].nivel + " de " + response[0].nombre + "."
    })

    // Petición de los test relacionados con el idioma y nivel seleccionado.
    await fetch("http://localhost:9999/tests/" + idiomaID).then((response) => {
         if (response.status !== 200) {
            error.innerHTML = "¡UPS! ¡NO SE HAN ENCONTRADO TESTS EN ESTE IDIOMA!"
            error.classList.remove("hidden")
            throw new Error("Something went wrong on API server!");
        }
        return response.json()
    }).then((response) => {
        response.forEach(async (element) => {
            const li = document.createElement("li")
            let nota

            // Comprobación de su el usuario ya ha realizado el test en el pasado y cual es su menor nota.
            await fetch("http://localhost:9999/results/" + mail + "/" + element.ID).then((responseB) => {
                if (responseB.status !== 200) {
                    nota = "Sin Intentos.";
                }
                return responseB.json()
            }).then((responseB) => {
                if (responseB !== null && responseB !== undefined) {
                    const respuesta = responseB[0]
                    nota = Number(respuesta.Nota).toFixed(2)
                    return responseB
                }
            })

            // Listado de tests en forma de tabla.
            const tr = document.createElement("tr")

            let td = document.createElement("td")
            let txt = document.createTextNode(element.Titulo)
            td.appendChild(txt)
            tr.appendChild(td)

            td = document.createElement("td")
            txt = document.createTextNode(element.Tipo)
            td.appendChild(txt)
            tr.appendChild(td)

            td = document.createElement("td")
            // Asignar colores en función de si eltest está aprobado o suspendido.
            if (nota == "Sin Intentos.") {
                // nada LOL, blanco.
            } else if (nota < 5.0) {
                td.classList.add("red")
            } else {
                td.classList.add("green")
            }
            txt = document.createTextNode(nota)
            td.appendChild(txt)
            tr.appendChild(td)

            td = document.createElement("td")
            const a = document.createElement("a")
            a.classList.add("listaIdiomasLink")
            a.href = "tests.html?testID=" + element.ID
            a.innerHTML = "Realizar Test"

            td.appendChild(a)
            tr.appendChild(td)
            listado.appendChild(tr)
        });
    })
}

// Funcioón para obtener una cookie. Obtenida de w3school.
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