<?php
    include "./PHP/ConexionDB.php";
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $pdo = Conexion::getPDO();

        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email=:email and Contraseña=:passwd");
        $stmt->bindParam(":email", $_POST["email"]);
        $stmt->bindParam(":passwd", $_POST["passwd"]);

        $stmt->execute();

        $row = $stmt->fetch();

        if ($row != null) {
            session_start();
            $_SESSION["user"] = $row["UserName"];
            header("Location: index.html");
        } else {
            echo "<p class='afterNav red'>Las credenciales son incorrectas.</p><a href='#'>¿Desea crear un nuevo usuario?</a>";
        }
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Identificarse</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="CSS/style.css">
        <script defer type="module" src="JS/header.js"></script>
    </head>
    <body class="bgIMG">
        <header class="topNav">
            <a href="#" id="menu" class="fakeLink c1">=</a>
            <img class="c3 makeItSmall" src="IMG/userIcon.png">
        </header>
        <main class="afterNav">
            <h1 class="introTXT overIMG"><b>Página de log in.</b></h1><br>
            <form class="logInForm center" method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>">
                <label class="center">Correo: </label><br>
                <input class="center" type="email" name="email" id="email" required placeholder="Correo asignado al usuario"><br>
                <label class="center">Contraseña: </label><br>
                <input class="center" type="password" name="passwd" id="passwd" required placeholder="Contraseña..."><br>
                <input class="center" type="submit" value="Identificarse">
            </form>

            <a href="#" class="betterLink BL">Registrarse</a>
        </main>
    </body>
</html>