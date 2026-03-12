<?php
    require "../PHP/VerificarLogIn.php";
    include "../PHP/ConexionDB.php";
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Listado Tests</title>
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
            <?php
                $pdo = Conexion::getPDO();

                $stmt = $pdo->prepare("SELECT nombre, nivel FROM idiomas WHERE ID=:id");
                $stmt->bindParam(":id", $_GET["idioma"]);
                $stmt->execute();

                $row = $stmt->fetchAll();
                foreach ($row as $value) {
                    echo "<h1 class='introTXT overIMG'>Lista de test del " . $value["nivel"] . " de " . $value["nombre"] . ".</h1><br>";
                }
            ?>
            <section class="listaIdiomas">
                <?php
                    $pdo = Conexion::getPDO();

                    $stmt = $pdo->prepare("SELECT * FROM test WHERE Idioma=:id");
                    $stmt->bindParam(":id", $_GET["idioma"]);
                    $stmt->execute();

                    $row = $stmt->fetchAll();

                    if (empty($row)) {
                        echo "<p class='red tabbed'>¡UPS! ¡NO SE HAN ENCONTRADO TESTS EN ESTE IDIOMA!";
                    } else {
                        echo "<ul>";
                        foreach ($row as $value) {
                            $stmt = $pdo->prepare("SELECT Nota FROM resultados WHERE Usuario=:id AND Test=:testID");
                            $stmt->bindParam(":id", $_SESSION["userMail"]);
                            $stmt->bindParam(":testID", $value["ID"]);
                            $stmt->execute();

                            $rowB = $stmt->fetch();

                            if(empty($rowB["Nota"])) {
                                $display = "Sin Intentos";
                            } else {
                                $display = "Mejor nota: " . $rowB["Nota"];
                            }

                            echo "<li>";
                            echo $value["Titulo"] . "; Tipo: " . $value["Tipo"] . "; " . $display;
                            echo "</li>";
                        }
                        echo "</ul>";
                    }
                ?>
            </section>

            <a href="./index.php" class="betterLink BL">Volver</a>
        </main>
    </body>
</html>