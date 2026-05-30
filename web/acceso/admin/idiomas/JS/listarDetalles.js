const params = new URLSearchParams(document.location.search);
const idiomaID = params.get("idioma")

const introTXT = document.getElementById("queIdiomaSoy")
const error = document.getElementById("soyUnError")
const listado = document.getElementById("detallesIdioma")

listarTest()

async function listarTest() {

    // Obtener el usuario que está usando el programa.
    const mail = getCookie("email")

    let idioma

    // Petición de los datos del idioma seleccionado.
    await fetch("http://localhost:9999/languages/all/" + idiomaID).then((response) => {
        if (response.status !== 200) {
            throw new Error("Something went wrong on API server!");
        }
        return response.json()
    }).then((response) => {
        idioma = response
        introTXT.innerHTML = "Detalles del " + response[0].nivel + " de " + response[0].nombre + "."
    })

    // Petición de los test relacionados con el idioma y nivel seleccionado.
    await fetch("http://localhost:9999/tests/" + idiomaID).then((response) => {
         if (response.status !== 200) {
            // throw new Error("Something went wrong on API server!");
        }
        return response.json()
    }).then(async (response) => {

        let txt = document.createTextNode("Nombre general del idioma: " + idioma[0].nombre)
        let h2 = document.createElement("h3") // Ha habido un cambio de planes.
        h2.classList.add("tabbed")
        h2.appendChild(txt)
        listado.appendChild(h2)

        txt = document.createTextNode("Nivel del idioma: " + idioma[0].nivel)
        h2 = document.createElement("h3") // Ha habido un cambio de planes.
        h2.classList.add("tabbed")
        h2.appendChild(txt)
        listado.appendChild(h2)

        txt = document.createTextNode("Este idioma dispone de un total de " + response.length + " tests.")
        h2 = document.createElement("h3") // Ha habido un cambio de planes.
        h2.classList.add("tabbed")
        h2.appendChild(txt)
        listado.appendChild(h2)

        await fetch("http://localhost:9999/languages/count/" + idiomaID).then((response) => {
          if (response.status !== 200) {
              throw new Error("Something went wrong on API server!");
          }
          return response.json()
        }).then((response) => {
          txt = document.createTextNode("Hay " + response[0].Personas + " usuarios registrados en este nivel.")
          h2 = document.createElement("h3") // Ha habido un cambio de planes.
          h2.classList.add("tabbed")
          h2.appendChild(txt)
          listado.appendChild(h2)
        })

        const a = document.createElement("a")
        a.href = "eliminarIdioma.html?idioma=" + idiomaID
        a.classList.add("listaIdiomasLink")
        a.classList.add("tabbed")
        a.innerHTML = "Eliminar este nivel."
        listado.appendChild(a)
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