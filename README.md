# Team BobaTea | NASA Space Apps Challenge KL/MY | Automated Detection of Hazards | Phenomena Detection Challenge

Monitoring surface air quality helps ensure the protection of human health and property. However, surface air quality data is sparsely monitored. To help fill in these gaps, inferences are derived from other sources including remote sensing.

Air Quality Data: s3://impact-datashare/pm2.5-labeled
The CSV formatted data and labels are provided below. It contains the following fields which have been described.

station_id: Unique identifier of the PM 2.5 monitors stationed across US
stime: Time and date of sample recorded
air_data_value: EPA air data PM2.5 readings
RH: relative humidity from HRRR
UGRD, VGRD: Wind speed vectors from HRRR
HPBL: Height of Planetary Boundary Layer from HRRR
TMP: Temperature recorded from HRRR
goes_measurement: AOD reading from GOES R


### References
--
1. United States Environmental Protection Agency | US EPA (https://www.epa.gov).
2. Air Quality System (AQS) API (https://aqs.epa.gov/aqsweb/documents/data_api.html)
3. Pre-Labeled Datasets for Air Quality Data (https://github.com/nasa/spaceapps-phenomena_detection/tree/dev/data/labeled)
