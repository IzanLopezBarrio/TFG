const form = document.getElementById("registerForm")

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const idioma = document.getElementById("idiomasExistentes").value
    const nivel = document.getElementById("lv").value

    const data = {
        name: idioma,
        lv: nivel
    }

    await fetch("http://localhost:9999/languages/all", {method: 'POST', headers: {'Content-Type': 'application/json',},body: JSON.stringify(data)})
    .then((response) => {
        if (response.status !== 200) {
            errorTag.innerHTML = "Usuario y/o contraseña incorrectos."
            throw new Error('Autenticación Incorrecta');
        }
        return response.json();
    }).then((response) => {
        window.location.replace("index.html")
    })
})