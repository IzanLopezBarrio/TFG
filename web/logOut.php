<?php
    session_start();

    $_SESSION = [];
    setcookie(session_name(), "Adios", time() - 3600);

    header("Location: index.html");