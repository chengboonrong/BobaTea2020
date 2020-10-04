# Team BobaTea | NASA Space Apps Challenge KL/MY | Automated Detection of Hazards | Phenomena Detection Challenge

Monitoring surface air quality helps ensure the protection of human health and property. However, surface air quality data is sparsely monitored. To help fill in these gaps, inferences are derived from other sources including remote sensing.

Download the data from aws s3 buckets using this AWS CLI command below: (you can download the CLI tool [here](https://awscli.amazonaws.com/AWSCLIV2.msi))  
```
aws s3 cp s3://impact-datashare/pm2.5-labeled <directory_path-to-save> --recursive --no-sign-request
```

1. station_id: Unique identifier of the PM 2.5 monitors stationed across US
2. stime: Time and date of sample recorded
3. air_data_value: EPA air data PM2.5 readings
4. RH: relative humidity from HRRR
5. UGRD, VGRD: Wind speed vectors from HRRR
6. HPBL: Height of Planetary Boundary Layer from HRRR
7. TMP: Temperature recorded from HRRR
8. goes_measurement: AOD reading from GOES R



### Website Homepage
![](bobatea_homepage)

### References
1. United States Environmental Protection Agency | US EPA (https://www.epa.gov).
2. Air Quality System (AQS) API (https://aqs.epa.gov/aqsweb/documents/data_api.html)
3. Pre-Labeled Datasets for Air Quality Data (https://github.com/nasa/spaceapps-phenomena_detection/tree/dev/data/labeled)
