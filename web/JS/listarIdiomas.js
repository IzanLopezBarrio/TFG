const listaIdiomas = document.getElementById("listaIdiomas")

getIdiomas()

async function getIdiomas() {
    fetch("http://localhost:9999/languages/all").then((response) => {
        if (response.status !== 200) {
            throw new Error("Something went wrong on API server!");
        }
        return response.json();
    }).then((response) => {
        response.forEach(element => {
            const li = document.createElement("li")
            li.innerHTML = element.nombre
            listaIdiomas.appendChild(li)
            fetch("http://localhost:9999/languages/niveles/" + element.nombre).then((responseB) => {
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
                    a.href = "listaTests.php?idioma=" + elementB.ID
                    a.innerHTML = elementB.Nivel

                    li.appendChild(a)
                    listaIdiomas.appendChild(li)
                });
            })
        });
    })
}