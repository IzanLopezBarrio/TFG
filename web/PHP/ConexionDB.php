<?php
    class Conexion {

        public static function getPDO(): PDO {
            $dsn = "mysql:host=localhost;dbname=tfg;port=3306";

            $db = new PDO($dsn, "root", "mysql");
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $db;
        }
    }