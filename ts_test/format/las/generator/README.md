# Sample Point Cloud Generator

A bash script that uses pdal to create sample point clouds for testing purposes.

## Requirements

This program requires that you [download and install pdal](https://pdal.io/download.html) (v1.7.1). If you dont have pdal installed, it is suggested that you use [docker](https://pdal.io/quickstart.html).

## Usage

With pdal installed, make the `generator` directory current working directory and run: `./generator.sh`

## Details

A few notes on the naming convention of generated files:

- Files are named with the following convention:`v<LAS minor version number>d<LAS data format>.las`. Therefore, `v1d1.las` is a point cloud with a minor version of `1` and a data format of `1`.
- Each point of each file has a randomly assigned class that (from class numbers that are not reserved by ASPRS).
- Each file has a total of 10 points.
- Point clouds have an SRS assigned.
