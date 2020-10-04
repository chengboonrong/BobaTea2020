<?php
include "connection.php";
?>

<html>
<head>
<style>
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  position : relative;
	height: 450px;
	width: 900px;
	margin : 200px auto;
	background-color : #FFF;

}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}

.thumbnail{
    float : left;
	position : relative ;
	left : 30px;
	top : -30px;
	height : 300px;
	width : 530px;
	-webkit-box-shadow: 5px 5px 30px 0px rgba(0,0,0,0.2);
	-moz-box-shadow: 5px 5px 30px 0px rgba(0,0,0,0.2); 
	box-shadow: 5px 5px 30px 0px rgba(0,0,0,0.2);
	overflow: hidden;
}

.img{
    position: absolute;
	left: 50%;
	top: 50%;
	height: 100%;
	width: 100%;
    object-fit: cover;
	-webkit-transform: translate(-50%,-50%);
	-ms-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
}

.right-text{
	margin-left : 590px;
	margin-right : 20px;
}

.card-title{
    padding-top : 15px;
	font-size : 1.5rem;
	color : #4B4B4B;
}

.card-text{

	padding-top : 15px;
	font-size : 0.95rem;
	line-height: 150%;
	color : #4B4B4B;
}

.separator{
    margin-top : 10px;
	border : 1px solid #483DBD;
}

.date{
    position : absolute;
	left : 30px;
	bottom : -120px;
	font-size : 6rem;
	color : #483D8B;
}

.month{
	position : absolute;
	left : 30px;
	bottom : -55px;
	font-size : 2rem;
	color : #9370DB;
}

tr{
    line-height:50px; 
}

th{
    text-align : left;
}

td{
    text-align : right;
}

table {
  margin-top : 20px;
}

h4{
    color : #4B0082;
}

.container{
    margin-left : 300px;
    display: inline-block;
    height: 130px;
    width: 550px;
	background-color : #E6E6FA;
    box-shadow: 2px 2px 10px 0px rgba(0,0,0,0.2);
}

</style>
</head>

    <body>


        <div class="card">
            <div class="thumbnail">
            <img src="img/california.jpg" class="img" alt="States image" >
            </div>

            <div class="right-text">
                    <h1 class="card-title">Air quality of California</h1>
                    <div class="separator"></div>

                    <div class="card-text">
                      <table style="width:100%">
                          <tr>
                              <th>Main Pollutant</th>
                              <td>PM 2.5</td>
                          </tr>
                          <tr>
                          <th>US AQI index</th>
                            <?php
                            $today = strtotime("January 03 2019");
                            $sql = "SELECT station_id, DATE_FORMAT(stime, '%Y-%m-%d') AS date, AVG(air_data_value) AS avg FROM `nasa_ad_data` WHERE station_id='06-011-0007' GROUP BY date ";
	                        $result=mysqli_query($conn, $sql);
                            while($row = mysqli_fetch_assoc($result))
                            { 
                                if($row['date'] == date("Y-m-d",$today))
                                {
                                    echo "<td>".$row['avg']."</td>";
                                }
                            }
                            ?>
                              
                              
                          </tr>
                          <tr>
                              <th>Air Pollution level</th>
                              <?php
                            $today = strtotime("January 03 2019");
                            $sql = "SELECT station_id, DATE_FORMAT(stime, '%Y-%m-%d') AS date, AVG(air_data_value) AS avg FROM `nasa_ad_data` WHERE station_id='06-011-0007' GROUP BY date ";
	                        $result=mysqli_query($conn, $sql);
                            while($row = mysqli_fetch_assoc($result))
                            { 
                                if($row['date'] == date("Y-m-d",$today))
                                {
                                    if($row['avg']<=50)
                                    {
                                        echo "<td>Good</td>";
                                    }
                                    else if($row['avg']>50 && $row['avg']<=100)
                                    {
                                        echo "<td>Moderate</td>";
                                    }
                                    else if($row['avg']>100 && $row['avg']<=150)
                                    {
                                        echo "<td>Unhealthy for sensitive group</td>";
                                    }
                                    else if($row['avg']>150 && $row['avg']<=200)
                                    {
                                        echo "<td>Unhealthy</td>";
                                    }
                                    else if($row['avg']>200 && $row['avg']<=300)
                                    {
                                        echo "<td>Very unhealthy</td>";
                                    }
                                    else if($row['avg']>300)
                                    {
                                        echo "<td>Hazardous</td>";
                                    }
                                }
                            }
                            ?>
                              
                          </tr>
                      </table>                     
                    </div>


                    <h5 class="date"> <?php
                            $today = strtotime("January 03 2019");
                            echo date('d',$today);
                            ?>
                            </h5>
                    <h6 class="month"><?php
                            $today = strtotime("January 03 2019");
                            echo date('F',$today);
                            ?></h6>

            </div>
            <div class="container">
                <h4 style="margin-left:5px;">Health Recommendation</h4>
                <p>Close your window to avoid dirty outdoor air.</p>
                <p>Weak mask when going outside especially when performing outdoor exercise.</p>
            </div>
        </div>
    </body>
</html>