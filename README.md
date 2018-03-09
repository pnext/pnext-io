# <abbr title="Work in progress">**[WIP]**</abbr> Pointcloud query API abstraction layer

This work-in-progress document _(and eventually more)_ is the starting point for a
more well rounded storage and access API to pointclouds _(and maybe even other 3D data formats)_

## Purpose
This document is focussed on an API specification to download parts of a [point cloud][1] to
a client-software (Browser, or native App) in order for the client to view the data.
The browser needs to be able to tell communicate what part of the Pointcloud is relevant to
it and the necessary restrictions.

## API
The API consists of a [Query](#query) API that allows the browser to select Nodes from an Oct-tree of
Pointcloud data and a [Looku](#lookup) API that allows to receive one oct-tree node.

### Query

#### Input
- [FOV](https://en.wikipedia.org/wiki/Field_of_view), Camera Position or [Frustum](https://en.wikipedia.org/wiki/Frustum): The currently viewed area of the pointcloud.
- Range of relevant points: In order to limit based on the memory/cpu limits of the device it needs to be
   able to limit towards the maximum amount of points renderable (max amount of points).
   Once the browser did ask for a given max set though it should also be able to download further parts of the query
   by limiting it also to exclude the first set of points.
- PointCloud features (optional): In case the server is capable of reducing pointcloud features, the browser should be
   specify which features are interesting to it.
- Octree density range: The browser might be working on a small device that might be capable to render all the points
   but it wouldn't matter because the user couldn't see more detail on the device (screen size). It has to be able to
   define the density of nodes it is maximally interested in.
- Bounding Box: One common problem of pointclouds is to create slices of data for profiles. By providing a bounding
   box its possible for the browser to receive only a slice of data.

#### Output
- more points available: Are more points available behind the range of relevant points?
- available point features.
- list of octree nodes to display. ordered by density.

### Nodes lookup
The lookup of the nodes should be based on a cachable ID basis. For a given ID, the API should return consistently the same data.

## API but not just
This is technically an API but it should be written with the goal in mind that the
result-set can be computed with as little effort as possible by a precomputed data-set.

## Prior Art
- [Potree File format][2] - The Potree File format works entirely without an API, which
    means, the use of the Potree file format required some additional operation on the
    client side, essentially what this document describes
- Entwine/Greyhound - Todo.

[1]: TODO
[2]; TODO
