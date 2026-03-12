const logIn = document.getElementById("botonPrincipal")

logIn.style.cursor = "pointer";
logIn.addEventListener("click", () => {
    window.location.replace("logIn.php")
})