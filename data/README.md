# Sample Data in EPT format

The following dataset may be used for visualization and testing purposes. This point cloud sample dataset was originally prepared by Markus Neteler and Helena Mitasova in their book ["Open Source GIS: A GRASS GIS Approach"](https://grassbook.org/datasets/datasets-3rd-edition/). From their description:
> We developed a completely new free geospatial dataset and substituted all Spearfish (SD) examples in the previous editions with this new, much richer North Carolina (NC, USA) data set. This data set is a comprehensive collection of raster, vector and imagery data covering parts of North Carolina (NC), USA (map), prepared from public data sources provided by the North Carolina state and local government agencies and Global Land Cover Facility (GLCF)

We will only use the sample lidar data.

```bash
curl https://www.grassbook.org/wp-content/uploads/ncexternal/lidar_raleigh_nc_spm_height_feet.las -o .data/lidar_raleigh_nc_spm_height_feet.las
```
Once it is downloaded, we can use pdal (or pdal in docker) to set the srs (as it is undefined in the data itself, but described on database [webpage](https://grassbook.org/datasets/datasets-3rd-edition/)).

```bash
pdal pipeline data/set_srs.json
```

And then, using docker we can convert the laz file to the [EPT format](https://github.com/connormanning/ept):

```bash
docker run -it -v /Users/iosefa/repos/pnext-io/data:/data connormanning/entwine build -i data/lidar_raleigh_nc_spm_height_feet.laz -o /data/NorthCarolina
```
