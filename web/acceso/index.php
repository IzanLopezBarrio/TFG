<?php
    require "../PHP/VerificarLogIn.php";
    include "../PHP/ConexionDB.php";
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Listado Idiomas</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../CSS/style.css">
        <script defer type="module" src="../JS/header.js"></script>
    </head>
    <body class="bgIMG">
        <header class="topNav">
            <a href="#" id="menu" class="fakeLink c1">=</a>
            <section id="dropDown" class="hidden">
                <ul>
                    <li><a href="#" class="white linkDisabled">Perfil</a></li>
                    <li><a href="index.php" class="betterLinkLite">Lista de Idiomas</a></li>
                </ul>
            </section>
            <img class="c3 makeItSmall" src="../IMG/userIcon.png">
        </header>
        <main class="afterNav">
            <h1 class="introTXT overIMG">¡Bienvenido, <?php echo $_SESSION["user"];?>!</h1><br>
            <h2 class="center overIMG biggerTXT">¿Qué idioma desea practicar hoy?</h2><br>
            <section class="listaIdiomas">
            <ul>
                <?php
                    $pdo = Conexion::getPDO();

                    $stmt = $pdo->prepare("SELECT nombre FROM idiomas GROUP BY nombre");
                    $stmt->execute();

                    $row = $stmt->fetchAll();

                    foreach ($row as $value) {
                        echo "<li>" . $value["nombre"] . "</li>";
                        $stmt = $pdo->prepare("SELECT ID, Nivel FROM idiomas WHERE Nombre=:nombre");
                        $stmt->bindParam(":nombre", $value["nombre"]);
                        $stmt->execute();
                        $rowB = $stmt->fetchAll();
                        foreach ($rowB as $values) {
                            echo "<li class='tabbed'><a class='listaIdiomasLink' href='listaTests.php?idioma=" . $values["ID"] . "'>" . $values["Nivel"] . "</a></li>";
                        }
                    }
                ?>
            </ul>
            </section>

            <a href="../logOut.php" class="betterLink BL">Cerrar Sesión</a>
        </main>
    </body>
</html>