<?php
    session_start();
    if (!empty($_SESSION["user"])) {
        header("Location: acceso/index.php");
    }