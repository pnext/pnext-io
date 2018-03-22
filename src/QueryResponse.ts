import { Readable } from 'stream'
import Feature from './Feature'
import Node from './Node'

export default class QueryResponse {
  nodes: Readable
  feature: Array<Feature>
}

  
  // Specifies the order of the features in the nodes (The order can be taken when accessing the files)
  repeated Feature feature = 2;
  
  message Node {
    // The address specifies the Nodes position that should be loaded
    repeated Oct address = 1;

    // Optionally to allow for deduplication if different nodes have the same hash.
    // This can also be used by the service to note further information about the 
    string info = 2;
  }

  message Feature {
    required string type;

    // Different types of data have different length
    required int32 byteCount;
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