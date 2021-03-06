//Width and height of map
 var width = window.innerWidth //960;
 var height = window.innerHeight //500;


 // D3 Projection
 var projection = d3.geo.albersUsa()
				 .translate([width/2, height/2])    // translate to center of screen
				 .scale([1000]);          // scale things down so see entire US
		 
 // Define path generator
 var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
			 .projection(projection);  // tell path generator to use albersUsa projection

		 
 // Define linear scale for output
 var color = d3.scale.linear()
			 .range(["green", "yellow", "orange", "red", "purple", "maroon"]);

 var legendText = ["Good: 1 - 50", "Moderate: 51 - 100", "Unhealthy for Sensitive Groups: 101 - 150", "Unhealthy: 151 - 200", "Very Unhealthy: 201 - 300", "Hazardous: 300+"];

 //Create SVG element and append map to the SVG
 var svg = d3.select("body")
			 .append("svg")
			 .attr("width", width)
			 .attr("height", height);
		 
 // Append Div for tooltip to SVG
 var div = d3.select("body")
			 .append("div")   
			 .attr("class", "tooltip")               
			 .style("opacity", 0);

 // Load in my states data!
 d3.csv("https://chengboonrong.github.io/BobaTea2020/latest_PM2.5_dataset.csv", function(data) {
	 color.domain([0,1,2,3,4,5]); // setting the range of the input data

	 // Load GeoJSON data and merge with states data
	 d3.json("https://chengboonrong.github.io/BobaTea2020/us-states.json", function(json) {

		 // Loop through each state data value in the .csv file
		 for (var i = 0; i < data.length; i++) {

			 // Grab State Name
			 var dataState = data[i].state_name;
			 // Grab data value 
			 var dataValue = data[i].predicted_air_pollution_level;
			 // console.log(dataValue);

			 // Find the corresponding state inside the GeoJSON
			 for (var j = 0; j < json.features.length; j++)  {
				 var jsonState = json.features[j].properties.name;

				 if (dataState == jsonState) {

				 // Copy the data value into the JSON
				 json.features[j].properties.predicted_air_pollution_level = dataValue;
				 json.features[j].properties.AAPL = data[i].AAPL;


				 // Stop looking through the JSON
				 break;
				 }
			 }
		 }


	 // Bind the data to the SVG and create one path per GeoJSON feature
	 svg.selectAll("path")
		 .data(json.features)
		 .enter()
		 .append("path")
		 .attr("d", path)
		 .style("stroke", "#fff")
		 .style("stroke-width", "1")
		 .style("fill", function(d) {
			 // Get data value
			 var value = d.properties.predicted_air_pollution_level;
			 // console.log(value)
			 if (value) {
				 //If value exists…
				 return color(value);
			 } else {
				 //If value is undefined…
				 return "rgb(200,200,200)";
			 }
	  })
	  	.on("mouseover", function(d) {
			 var stateName = d.properties.name;
			 var airDataValue = `AQI: ${d.properties.AAPL}`;
			 if (!d.properties.AAPL) {
				 airDataValue = 'No records.'
			 }
			 // console.log(d.properties)
			 div.transition()        
			 .duration(200)      
			 .style("opacity", .5);
			 div.text(`${stateName}  ${airDataValue}`)
			 .style("left", (d3.event.pageX) + "px")     
			 .style("top", (d3.event.pageY - 28) + "px");    
		 })
		// fade out tooltip on mouse out               
		.on("mouseout", function(d) {       
		div.transition()        
			.duration(500)      
			.style("opacity", 0);   
	});

	 // Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
	 var legend = d3.select("body").append("svg")
					 .attr("class", "legend")
					 .attr("width", 500)
					 .attr("height", 150)
					 .selectAll("g")
					 .data(color.domain().slice())
					 .enter()
					 .append("g")
					 .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	 legend.append("rect")
		 .attr("width", 18)
		 .attr("height", 18)
		 .style("fill", color);

	 legend.append("text")
		 .data(legendText)
		 .attr("x", 24)
		 .attr("y", 9)
		 .attr("dy", ".35em")
		 .text(function(d) { return d; });
	 
 });

});
