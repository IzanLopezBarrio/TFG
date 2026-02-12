const menu = document.getElementById("menu")
const logIn = document.getElementById("botonPrincipal")

menu.addEventListener("click", (event) => {
    event.preventDefault()

    if (menu.innerHTML == "=") {
        menu.innerHTML = "x"
    } else {
        menu.innerHTML= "="
    }
})

logIn.style.cursor = "pointer";
logIn.addEventListener("click", () => {
    window.location.replace("logIn.php")
})