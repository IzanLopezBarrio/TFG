const params = new URLSearchParams(document.location.search);
const idiomaID = params.get("idioma")

const introTXT = document.getElementById("queIdiomaSoy")
const error = document.getElementById("soyUnError")
const listado = document.getElementById("listaTests")

listarTest()

async function listarTest() {
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
        response.forEach((element) => {
            const li = document.createElement("li")
            const txt = document.createTextNode(element.Titulo + "; Tipo: " + element.Tipo)

            li.appendChild(txt)
            listado.appendChild(li)
        });
    })
}