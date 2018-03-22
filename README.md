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
Pointcloud data and a [Lookup](#lookup) API that allows to receive one oct-tree node.

### Info Lookup

`getTree(treeQuery: TreeQuery): Tree`

```protobuf
message TreeQuery {
  required string id = 1;
  repeated string metadataProperties = 2; // Optional filter for metadata properties to to be returned. Using minimatch patterns with ! support for negation. If missing, all metadata will be returned, "!*" specifies no metadata.
}

message Feature {
  required string type = 1;

  // Different types of data have different length
  required int32 byteCount = 2;
}

message Tree {
  required string id = 1; // ID of this tree
  required Bounds bounds = 2; // cubic volume of the root of the octree
  Point3 scale = 3; // scale for the points
  Point3 offset = 4; // he offset applied to XYZ, if any (array of length 3)
  int64 numPoints = 5; // total point count in the octree
  Bounds boundsConforming = 6; // cubic volume around 
  repeated Feature schema = 7; // array of point attributes and their types
  map<String, google.protobuf.Any> metadata = 8;
}
```

### Query

`queryPoints(query: Query): QueryResponse`

```protobuf
message Query {

  /*
    [FOV][], Camera Position or [Frustum][]: The currently viewed area of the pointcloud.

    [FOV]: https://en.wikipedia.org/wiki/Field_of_view
    [Frustum]: https://en.wikipedia.org/wiki/Viewing_frustum
  */
  required PerspectiveCamera cam = 1;

  /*
    In order to limit based on the memory/cpu limits of the device it needs to be
    able to limit towards the maximum amount of points renderable (max amount of points).
    Once the browser did ask for a given max set though it should also be able to download further parts of the query
    by limiting it also to exclude the first set of points.
  */
  required RelevanceRange relevance = 2;

  /*
    The browser might be working on a small device that might be capable to render all the points
    but it wouldn't matter because the user couldn't see more detail on the device (screen size). It has to be able to
    define the density of nodes it is maximally interested in.
  */
  DensityRange density = 3;

  /*
    One common problem of pointclouds is to create slices of data for profiles. By providing a bounding
    box its possible for the browser to receive only a slice of data.
  */
  CutRange cut = 4;

  /*
    In case the server is capable of reducing pointcloud features, the client can specify which features are
    interesting to it.
  */
  repeated string feature = 5;

  message Point3 {
    required float x = 1;
    required float y = 2;
    required float z = 3;
  }
  message PerspectiveCamera {
    required Point3 pos = 1;
    required float fov = 2;
    required float aspect = 3;
    required float near = 4;
    required float far = 5;
  }
  message RelevanceRange {
    int32 min = 1;
    required int32 max = 2;
  }
  message DensityRange {
    float min = 1;
    required float max = 2;
  }
  message CutRange {
    required Point3 min = 1;
    required Point3 max = 2;
  }
}

message QueryResponse {
  // Nodes to load. The order specifies the load-order-importance of each node.
  repeated Node nodes = 1;
  
  // Specifies the order of the features in the nodes (The order can be taken when accessing the files)
  repeated Feature feature = 2;

  // All the tree Id's in the response
  repeated string treeIds = 3;
  
  message Node {
    // Tree ID to lookup the node for:
    int32 treeIndex = 1;

    // The address specifies the Nodes position that should be loaded
    repeated Oct address = 2;

    // Optionally to allow for deduplication if different nodes have the same hash.
    // This can also be used by the service to note further information about the 
    string info = 3;
  }

  message Feature {
    required string type = 1;

    // Different types of data have different length
    required int32 byteCount = 2;
  }

  enum Oct {
    AAA = 1;
    AAB = 2;
    ABA = 3;
    ABB = 4;
    BAA = 5;
    BAB = 6;
    BBA = 7;
    BBB = 8;
  }
}
```

### Nodes lookup
The lookup of the nodes should be based on a cachable ID basis. For a given ID, the API should return consistently the same data.

`getNodes(nodes: NodeRequest): NodeData`

```protobuf
message NodeRequest {
  // All the nodes to load
  repeated Node nodes = 1;

  // All the tree Id's in the response
  repeated string treeIds = 2;

  repeated Feature features = 3;

  enum Oct {
    AAA = 1;
    AAB = 2;
    ABA = 3;
    ABB = 4;
    BAA = 5;
    BAB = 6;
    BBA = 7;
    BBB = 8;
  }

  message Node {
    int32 treeIndex = 1; // Referencing the treeIds for the main response
    repeated Oct address = 2;
    string info = 3;
  }

  message Feature {
    required string type = 1;

    // Different types of data have different length
    required int32 byteCount = 2;
  }
}
message NodeData {
  // Streams the data in byte sets in the length of the features given for each node.
  // in the requested order
  repeated bytes data: 1;
}
```

## API but not just
This is technically an API but it should be written with the goal in mind that the
result-set can be computed with as little effort as possible by a precomputed data-set.

## Prior Art
- [Potree File format][] - The Potree File format works entirely without an API, which
    means, the use of the Potree file format required some additional operation on the
    client side, essentially what this document describes
- Greyhound - Greyhound has an extended [query language][Greyhound Query Format] that
    has many of the same features of this query system.

[Potree File format]: https://github.com/potree/potree/blob/0df4f0d0ef0abe87793dc56ad56cc3aac5633354/docs/potree-file-format.md
[Greyhound Query Format]: https://github.com/hobu/greyhound/tree/4cd6ca0590df54f3cbf60151cdb509d289f0d587
