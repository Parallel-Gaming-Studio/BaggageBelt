<?php
// Link to the database connection string
include( "../includes/db_admin.php" );

// Pull the connection from the database connection string
$conn = $pdo;

// Get the variables sent from AJAX
$user = $_GET[ 'u' ];
$score = $_GET[ 's' ];

// Insert player into the leaderboard
$sql = "INSERT INTO [FlyWithButchOhareDB_Copy].[dbo].[baggagebeltleaderboard] ([user], [score]) VALUES (:user, :score);";
// Prepare the SQL query statement
$stmt = $conn->prepare( $sql );

// Bind parameters
$stmt->bindParam( ':user', $user, PDO::PARAM_STR );
$stmt->bindParam( ':score', $score, PDO::PARAM_INT );

// Perform the SQL query
$stmt->execute();

// Notify the calling AJAX function of completion
echo "Input Recieved";

// Clear and close the connection
$conn = null;
?>
