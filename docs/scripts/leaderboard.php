<?php
// Link to the database connection string
include( "../includes/db_admin.php" );

// Pull the connection from the database connection string
$conn = $pdo;

// Select top 7 players from the leaderboard
// Prepare the SQL query statement
$stmt = $conn->prepare( "SELECT TOP (10) [user], [score] FROM [FlyWithButchOhareDB_Copy].[dbo].[baggagebeltleaderboard] ORDER BY [score] DESC;" );

// Perform the SQL query
$stmt->execute();

// Save the query results
$result = $stmt->fetchAll();

// Pack the result with JSON and return to AJAX
echo json_encode( $result );
?>