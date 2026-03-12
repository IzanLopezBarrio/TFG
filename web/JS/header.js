const menu = document.getElementById("menu")
const dropDown = document.getElementById("dropDown")

menu.addEventListener("click", (event) => {
    event.preventDefault()

    if (menu.innerHTML == "=") {
        menu.innerHTML = "x"
        dropDown.classList.remove("hidden")
    } else {
        menu.innerHTML= "="
        dropDown.classList.add("hidden")
    }
})