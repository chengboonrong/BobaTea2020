## Bobatea-ML model
We have developed a RandomForest machine learning model which is able to achieve around `91% of accuracy on training dataset` and `52% of accuracy on testing dataset`!  

The prediction was based on the satelite data from HRRR and also GOES measurement, AQI scale (based on the latest US EPA standard) was used for indexing the `EPA air data reading ('air_data_value')` which is our target output in the training dataset.

Since we already know the EPA air data readings was collected from the PM 2.5 monitors stationed across US (based on the documentation) but there is lack of information about the exact location of these monitor stations, therefore we added more details about the location of PM2.5 monitor stations to the dataset such as `latitute, longitude, state_name , county_name` and so on which might be useful for our website integration and for the future investigation as well.
