<?php
include("connection.php");
session_start();
?>

<!DOCTYPE html>
<html lang="en">
    <head>

    </head>
    <body>


<?php
	$sql = "SELECT station_id, DATE_FORMAT(stime, '%Y-%m-%d') AS date, AVG(air_data_value) AS avg FROM `nasa_ad_data` GROUP BY station_id, date ORDER BY `nasa_ad_data`.`station_id` ASC";
	$result=mysqli_query($conn, $sql);


    while($row = mysqli_fetch_assoc($result))
    { 

        echo $row['station_id'].'-'.$row['date'].'-'.$row['avg'];
        echo '<br>';

    }

    ?>
    </body>
    </html>
