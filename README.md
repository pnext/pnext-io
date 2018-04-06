# <abbr title="Work in progress">**[WIP]**</abbr> Pointcloud query API abstraction layer

This work-in-progress document _(and eventually more)_ is the starting point for a
more well rounded storage and access API to pointclouds _(and maybe even other 3D data formats)_

## Purpose
This document is focussed on an API specification to download parts of a [point cloud][] to
a client-software (Browser, or native App) in order for the client to view the data.
The browser needs to be able to tell communicate what part of the Pointcloud is relevant to
it and the necessary restrictions.

## API
The API consists of a [Query](#query) API that allows the browser to select Nodes from an Oct-tree of
Pointcloud data and a [Lookup](#lookup) API that allows to receive one oct-tree node.

This is technically an API but it was designed with the goal in mind that the
result-set can be computed with as little effort as possible by a prepared data-set.

## Specification
The Specification of the service can be found at [`./spec/pnext-io.proto`](./spec/pnext-io.proto).

## Prior Art
- [Potree File format][] - The Potree File format works entirely without an API, which
    means, the use of the Potree file format required some additional operation on the
    client side, essentially what this document describes
- Greyhound - Greyhound has an extended [query language][Greyhound Query Format] that
    has many of the same features of this query system.

[point cloud]: https://en.wikipedia.org/wiki/Point_cloud
[Potree File format]: https://github.com/potree/potree/blob/0df4f0d0ef0abe87793dc56ad56cc3aac5633354/docs/potree-file-format.md
[Greyhound Query Format]: https://github.com/hobu/greyhound/tree/4cd6ca0590df54f3cbf60151cdb509d289f0d587
