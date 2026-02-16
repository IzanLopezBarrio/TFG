<?php
    include "./PHP/ConexionDB.php";
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $pdo = Conexion::getPDO();

        $stmt = $pdo->prepare("SELECT email FROM usuarios WHERE email=:email");
        $stmt->bindParam(":email", $_POST["email"]);

        $stmt->execute();

        $row = $stmt->fetch();

        if ($row == null) {
            $stmt =  $pdo->prepare("INSERT INTO `usuarios`(`email`, `UserName`, `Contraseña`) VALUES (:email,:userName,:passwd)");
            $stmt->bindParam(":email", $_POST["email"]);
            $stmt->bindParam(":userName", $_POST["userName"]);
            $stmt->bindParam(":passwd", $_POST["passwd"]);

            $stmt->execute();
            header("Location: login.php");
            return;
        } else {
            echo "<p class='afterNav red'>El correo ya está registrado.</p><a href='logIn.php'>¿Ya tienes una cuenta?</a>";
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
            <h1 class="introTXT overIMG"><b>Página de registro.</b></h1><br>
            <form class="logInForm center" method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>">
                <label class="center">Correo: </label><br>
                <input class="center" type="email" name="email" id="email" required placeholder="Establezca un correo electrónico."><br>
                <label class="center">Contraseña: </label><br>
                <input class="center" type="password" name="passwd" id="passwd" required placeholder="Contraseña..."><br>
                <label class="center">Nombre de Usuario: </label><br>
                <input class="center" type="text" name="userName" id="userName" required placeholder="Introduzca su nombre..."><br>
                <input class="center" type="submit" value="Identificarse">
            </form>

            <a href="logIn.php" class="betterLink BL">Ya tengo una cuenta</a>
        </main>
    </body>
</html>