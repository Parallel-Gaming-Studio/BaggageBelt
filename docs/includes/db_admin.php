<?php

$db_type = "pdo";
$db_location = "azure";

$conn = null;
$pdo = null;

switch($db_location) {
	case "hexed":
		$file = "hexed_settings.ini";
		break;
	case "azure":
		$file = "baggageBelt.ini";
		break;
    case "local":
        $file = "twisted_arrow.ini";
        break;
	case "xampp":
		$file = "xampp.ini";
		break;
}

if (!$settings = parse_ini_file($file, TRUE)) throw new exception('Unable to open ' . $file . '.');

if ($db_type == "mysqli") {
	/* MySQLi TEST */
	$conn = mysqli_connect(
		// URL
		$settings['database']['host'],
		// Username
		$settings['database']['username'],
		// Password
		$settings['database']['password'],
		// Database
		$settings['database']['db']);
	
	if ($conn) {
		//echo "<script>console.log('(" . $db_type . ")<" . $settings['database']['driver'] . "> connection to [" . $db_location . "] successful.');</script>";
	} else {
		//echo "<script>console.log('(" . $db_type . ")<" . $settings['database']['driver'] . "> connection to [" . $db_location . "] unsuccessful.');</script>";
		die();
	}
} else if ($db_type == "sqlsrv" && $db_location == "azure") {
	$connectionInfo = array(
		"UID"=>$settings['database']['username'],
		"pwd"=>$settings['database']['password'],
		"LoginTimeout"=>30,
		"Encrypt"=>False,
		"TrustServerCertificate"=>False,
		"ApplicationIntent"=>"ReadWrite",
		"MultiSubnetFailover"=>False);
	$serverName = $settings['database']['host'];
	$conn = sqlsrv_connect($serverName, $connectionInfo);
	if ($conn) {
		//echo "<script>console.log('(" . $db_type . ")<" . $settings['database']['driver'] . "> connection to [" . $db_location . "] successful.');</script>";
		// Force connection to close
		// sqlsrv_close($conn);
	} else {
		// die(print_r( sqlsrv_errors(), true));
		//echo "<script>console.log('(" . $db_type . ")<" . $settings['database']['driver'] . "> connection to " . $db_location . " unsuccessful.\n" . print_r( sqlsrv_errors(), true) . "');</script>";
		die();
	}
} else if ($db_type == "pdo" && ($db_location == "azure" || $db_location == "local" )) {
	$dns = $settings['database']['driver'] .
		':Server=' . $settings['database']['host'] .
		((!empty($settings['database']['port'])) ? ( "," . $settings['database']['port']) : '') .
		';Database=' . $settings['database']['db'];

	try {
		//$conn = new PDO($dns, "", "");//$settings['database']['username'], $settings['database']['password']);
		$conn = new PDO($dns, $settings['database']['username'], $settings['database']['password']);
		
		//echo "<script>console.log('(" . $db_type . ")<" . $settings['database']['driver'] . "> connection to [" . $db_location . "] successful.');</script>";
	} catch(PDOException $e) {
		
		//die("<script>console.log('(" . $db_type . ")<" . $settings['database']['driver'] . "> connection to " . $db_location . " unsuccessful.\n" . print_r($e->getMessage()) . "');</script>");
		die();
	}
} else if ($db_type == "pdo" && $db_location != "azure") {
	$dns = 
	// Set driver
	$settings['database']['driver'] .
	// Set server
	':host=' . $settings['database']['host'] .
	// Set port
	// ((!empty($settings['database']['port'])) ? ( "," . $settings['database']['port']) : '') .
	// Set database
	';dbname=' . $settings['database']['db'] . 
	// Set charset
	';charset=' . $settings['database']['charset'];
	
	
	// $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
	
	
	$options = [
		PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		PDO::ATTR_EMULATE_PREPARES   => false,
	];

	try {
		$conn = new PDO($dns, $settings['database']['username'], $settings['database']['password'], $options);
		//$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		// DEBUG
		// echo "<script>console.log('(" . $db_type . ")<" . $settings['database']['driver'] . "> connection to [" . $db_location . "] successful.');</script>";
	}
	catch (PDOException $e) {
		//die("<script>console.log('(" . $db_type . ")<" . $settings['database']['driver'] . "> connection to " . $db_location . " unsuccessful.\n" . print_r($e) . "');</script>");
		//die();
		throw new PDOException($e->getMessage(), (int)$e->getCode());
	}
}

$pdo = $conn;

?>