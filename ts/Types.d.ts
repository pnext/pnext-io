import * as $protobuf from 'protobufjs'
import { Readable } from 'stream'
import THREE from 'three'

/** Represents a Box. */
export class Box3 extends THREE.Box3 {
  /**
   * Constructs a new Box.
   * @param [properties] Properties to set
   */
  constructor (properties?: Box3);

    /**
     * Creates a new Box instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Box instance
     */
  public static create (properties?: Box3): Box3

    /**
     * Encodes the specified Box message. Does not implicitly {@link Box.verify|verify} messages.
     * @param message Box message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encode (message: Box3, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified Box message, length delimited. Does not implicitly {@link Box.verify|verify} messages.
     * @param message Box message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encodeDelimited (message: Box3, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Box message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Box
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decode (reader: ($protobuf.Reader | Uint8Array), length?: number): Box3

    /**
     * Decodes a Box message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Box
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decodeDelimited (reader: ($protobuf.Reader | Uint8Array)): Box3

    /**
     * Verifies a Box message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
  public static verify (message: { [k: string]: any }): (string | null)

    /**
     * Creates a Box message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Box
     */
  public static fromObject (object: { [k: string]: any }): Box3

    /**
     * Creates a plain object from a Box message. Also converts values to other types if specified.
     * @param message Box
     * @param [options] Conversion options
     * @returns Plain object
     */
  public static toObject (message: Box3, options?: $protobuf.IConversionOptions): { [k: string]: any }

    /**
     * Converts this Box to JSON.
     * @returns JSON object
     */
  public toJSON (): { [k: string]: any }
}

/** Properties of a DensityRange. */
export interface IDensityRange {

    /** DensityRange min */
  min?: (number | null)

    /** DensityRange max */
  max: number
}

/** Represents a DensityRange. */
export class DensityRange implements IDensityRange {

  /** DensityRange min. */
  public min: number

  /** DensityRange max. */
  public max: number

    /**
     * Constructs a new DensityRange.
     * @param [properties] Properties to set
     */
  constructor (properties?: IDensityRange);

    /**
     * Creates a new DensityRange instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DensityRange instance
     */
  public static create (properties?: IDensityRange): DensityRange

    /**
     * Encodes the specified DensityRange message. Does not implicitly {@link DensityRange.verify|verify} messages.
     * @param message DensityRange message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encode (message: IDensityRange, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified DensityRange message, length delimited. Does not implicitly {@link DensityRange.verify|verify} messages.
     * @param message DensityRange message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encodeDelimited (message: IDensityRange, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a DensityRange message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DensityRange
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decode (reader: ($protobuf.Reader | Uint8Array), length?: number): DensityRange

    /**
     * Decodes a DensityRange message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DensityRange
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decodeDelimited (reader: ($protobuf.Reader | Uint8Array)): DensityRange

    /**
     * Verifies a DensityRange message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
  public static verify (message: { [k: string]: any }): (string | null)

    /**
     * Creates a DensityRange message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DensityRange
     */
  public static fromObject (object: { [k: string]: any }): DensityRange

    /**
     * Creates a plain object from a DensityRange message. Also converts values to other types if specified.
     * @param message DensityRange
     * @param [options] Conversion options
     * @returns Plain object
     */
  public static toObject (message: DensityRange, options?: $protobuf.IConversionOptions): { [k: string]: any }

    /**
     * Converts this DensityRange to JSON.
     * @returns JSON object
     */
  public toJSON (): { [k: string]: any }
}

/** Properties of a Feature. */
export interface IFeature {

    /** Feature type */
  type: string

    /** Feature byteCount */
  byteCount: number
}

/** Represents a Feature. */
export class Feature implements IFeature {

    /** Feature type. */
  public type: string

    /** Feature byteCount. */
  public byteCount: number

  /**
   * Constructs a new Feature.
   * @param [properties] Properties to set
   */
  constructor (properties?: IFeature);

    /**
     * Creates a new Feature instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Feature instance
     */
  public static create (properties?: IFeature): Feature

    /**
     * Encodes the specified Feature message. Does not implicitly {@link Feature.verify|verify} messages.
     * @param message Feature message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encode (message: IFeature, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified Feature message, length delimited. Does not implicitly {@link Feature.verify|verify} messages.
     * @param message Feature message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encodeDelimited (message: IFeature, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Feature message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Feature
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decode (reader: ($protobuf.Reader | Uint8Array), length?: number): Feature

    /**
     * Decodes a Feature message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Feature
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decodeDelimited (reader: ($protobuf.Reader | Uint8Array)): Feature

    /**
     * Verifies a Feature message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
  public static verify (message: { [k: string]: any }): (string | null)

    /**
     * Creates a Feature message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Feature
     */
  public static fromObject (object: { [k: string]: any }): Feature

    /**
     * Creates a plain object from a Feature message. Also converts values to other types if specified.
     * @param message Feature
     * @param [options] Conversion options
     * @returns Plain object
     */
  public static toObject (message: Feature, options?: $protobuf.IConversionOptions): { [k: string]: any }

    /**
     * Converts this Feature to JSON.
     * @returns JSON object
     */
  public toJSON (): { [k: string]: any }
}

/** Represents a Frustum. */
export class Frustum extends THREE.Frustum {

    /**
     * Constructs a new Frustum.
     * @param [properties] Properties to set
     */
  constructor (properties?: Frustum);

    /**
     * Creates a new Frustum instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Frustum instance
     */
  public static create (properties?: Frustum): Frustum

    /**
     * Encodes the specified Frustum message. Does not implicitly {@link Frustum.verify|verify} messages.
     * @param message Frustum message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encode (message: Frustum, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified Frustum message, length delimited. Does not implicitly {@link Frustum.verify|verify} messages.
     * @param message Frustum message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encodeDelimited (message: Frustum, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Frustum message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Frustum
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decode (reader: ($protobuf.Reader | Uint8Array), length?: number): Frustum

    /**
     * Decodes a Frustum message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Frustum
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decodeDelimited (reader: ($protobuf.Reader | Uint8Array)): Frustum

    /**
     * Verifies a Frustum message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
  public static verify (message: { [k: string]: any }): (string | null)

    /**
     * Creates a Frustum message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Frustum
     */
  public static fromObject (object: { [k: string]: any }): Frustum

    /**
     * Creates a plain object from a Frustum message. Also converts values to other types if specified.
     * @param message Frustum
     * @param [options] Conversion options
     * @returns Plain object
     */
  public static toObject (message: Frustum, options?: $protobuf.IConversionOptions): { [k: string]: any }

    /**
     * Converts this Frustum to JSON.
     * @returns JSON object
     */
  public toJSON (): { [k: string]: any }
}

/** Properties of a Node. */
export interface INode {

    /** Node treeId */
  treeId: string

    /** Node address */
  address?: (Oct[] | null)

    /** Node info */
  info: string

    /** Node numPoints */
  numPoints: (number | Long)
}

/** Represents a Node. */
export class Node implements INode {

    /** Node treeId. */
  public treeId: string

    /** Node address. */
  public address: Oct[]

    /** Node info. */
  public info: string

  /** Node numPoints. */
  public numPoints: (number | Long)

    /**
     * Constructs a new Node.
     * @param [properties] Properties to set
     */
  constructor (properties?: INode);

    /**
     * Creates a new Node instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Node instance
     */
  public static create (properties?: INode): Node

    /**
     * Encodes the specified Node message. Does not implicitly {@link Node.verify|verify} messages.
     * @param message Node message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encode (message: INode, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified Node message, length delimited. Does not implicitly {@link Node.verify|verify} messages.
     * @param message Node message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encodeDelimited (message: INode, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Node message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Node
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decode (reader: ($protobuf.Reader | Uint8Array), length?: number): Node

    /**
     * Decodes a Node message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Node
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decodeDelimited (reader: ($protobuf.Reader | Uint8Array)): Node

    /**
     * Verifies a Node message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
  public static verify (message: { [k: string]: any }): (string | null)

    /**
     * Creates a Node message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Node
     */
  public static fromObject (object: { [k: string]: any }): Node

    /**
     * Creates a plain object from a Node message. Also converts values to other types if specified.
     * @param message Node
     * @param [options] Conversion options
     * @returns Plain object
     */
  public static toObject (message: Node, options?: $protobuf.IConversionOptions): { [k: string]: any }

    /**
     * Converts this Node to JSON.
     * @returns JSON object
     */
  public toJSON (): { [k: string]: any }
}

/** Properties of a NodeData. */
export interface INodeData {

    /** NodeData data */
  data?: (Uint8Array[] | null)
}

/** Represents a NodeData. */
export class NodeData implements INodeData {

    /** NodeData data. */
  public data: Uint8Array[]

    /**
     * Constructs a new NodeData.
     * @param [properties] Properties to set
     */
  constructor (properties?: INodeData);

    /**
     * Creates a new NodeData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns NodeData instance
     */
  public static create (properties?: INodeData): NodeData

    /**
     * Encodes the specified NodeData message. Does not implicitly {@link NodeData.verify|verify} messages.
     * @param message NodeData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encode (message: INodeData, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified NodeData message, length delimited. Does not implicitly {@link NodeData.verify|verify} messages.
     * @param message NodeData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encodeDelimited (message: INodeData, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a NodeData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns NodeData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decode (reader: ($protobuf.Reader | Uint8Array), length?: number): NodeData

    /**
     * Decodes a NodeData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns NodeData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decodeDelimited (reader: ($protobuf.Reader | Uint8Array)): NodeData

    /**
     * Verifies a NodeData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
  public static verify (message: { [k: string]: any }): (string | null)

    /**
     * Creates a NodeData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns NodeData
     */
  public static fromObject (object: { [k: string]: any }): NodeData

    /**
     * Creates a plain object from a NodeData message. Also converts values to other types if specified.
     * @param message NodeData
     * @param [options] Conversion options
     * @returns Plain object
     */
  public static toObject (message: NodeData, options?: $protobuf.IConversionOptions): { [k: string]: any }

    /**
     * Converts this NodeData to JSON.
     * @returns JSON object
     */
  public toJSON (): { [k: string]: any }
}

/** Properties of a NodeRequest. */
export interface INodeRequest {

    /** NodeRequest nodes */
  nodes?: (INode[] | null)

    /** NodeRequest features */
  schema?: (IFeature[] | null)
}

/** Represents a NodeRequest. */
export class NodeRequest implements INodeRequest {

    /** NodeRequest nodes. */
  public nodes: INode[]

    /** NodeRequest schema. */
  public schema: IFeature[]

    /**
     * Constructs a new NodeRequest.
     * @param [properties] Properties to set
     */
  constructor (properties?: INodeRequest);

    /**
     * Creates a new NodeRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns NodeRequest instance
     */
  public static create (properties?: INodeRequest): NodeRequest

    /**
     * Encodes the specified NodeRequest message. Does not implicitly {@link NodeRequest.verify|verify} messages.
     * @param message NodeRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encode (message: INodeRequest, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified NodeRequest message, length delimited. Does not implicitly {@link NodeRequest.verify|verify} messages.
     * @param message NodeRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encodeDelimited (message: INodeRequest, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a NodeRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns NodeRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decode (reader: ($protobuf.Reader | Uint8Array), length?: number): NodeRequest

    /**
     * Decodes a NodeRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns NodeRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decodeDelimited (reader: ($protobuf.Reader | Uint8Array)): NodeRequest

    /**
     * Verifies a NodeRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
  public static verify (message: { [k: string]: any }): (string | null)

    /**
     * Creates a NodeRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns NodeRequest
     */
  public static fromObject (object: { [k: string]: any }): NodeRequest

    /**
     * Creates a plain object from a NodeRequest message. Also converts values to other types if specified.
     * @param message NodeRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
  public static toObject (message: NodeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any }

    /**
     * Converts this NodeRequest to JSON.
     * @returns JSON object
     */
  public toJSON (): { [k: string]: any }
}

/** Oct enum. */
export enum Oct {
    AAA = 0,
    AAB = 1,
    ABA = 2,
    ABB = 3,
    BAA = 4,
    BAB = 5,
    BBA = 6,
    BBB = 7
}

/** Represents a Plane. */
export class Plane extends THREE.Plane {

    /**
     * Constructs a new Plane.
     * @param [properties] Properties to set
     */
  constructor (properties?: Plane);

    /**
     * Creates a new Plane instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Plane instance
     */
  public static create (properties?: Plane): Plane

    /**
     * Encodes the specified Plane message. Does not implicitly {@link Plane.verify|verify} messages.
     * @param message Plane message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encode (message: Plane, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified Plane message, length delimited. Does not implicitly {@link Plane.verify|verify} messages.
     * @param message Plane message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encodeDelimited (message: Plane, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Plane message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Plane
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decode (reader: ($protobuf.Reader | Uint8Array), length?: number): Plane

    /**
     * Decodes a Plane message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Plane
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decodeDelimited (reader: ($protobuf.Reader | Uint8Array)): Plane

    /**
     * Verifies a Plane message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
  public static verify (message: { [k: string]: any }): (string | null)

    /**
     * Creates a Plane message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Plane
     */
  public static fromObject (object: { [k: string]: any }): Plane

    /**
     * Creates a plain object from a Plane message. Also converts values to other types if specified.
     * @param message Plane
     * @param [options] Conversion options
     * @returns Plain object
     */
  public static toObject (message: Plane, options?: $protobuf.IConversionOptions): { [k: string]: any }

    /**
     * Converts this Plane to JSON.
     * @returns JSON object
     */
  public toJSON (): { [k: string]: any }
}

/** Properties of a Query. */
export interface IQuery {

    /** Query frustum */
  frustum: Frustum

    /** Query relevance */
  relevance?: IRelevanceRange

    /** Query density */
  density?: (IDensityRange | null)

    /** Query cut */
  cut?: (Box3 | null)

    /** Query feature */
  feature?: (string[] | null)
}

/** Represents a Query. */
export class Query implements IQuery {

    /** Query frustum. */
  public frustum: Frustum

    /** Query relevance. */
  public relevance: IRelevanceRange

    /** Query density. */
  public density?: (IDensityRange | null)

    /** Query cut. */
  public cut?: (Box3 | null)

    /** Query feature. */
  public feature: string[]

    /**
     * Constructs a new Query.
     * @param [properties] Properties to set
     */
  constructor (properties?: IQuery);

    /**
     * Creates a new Query instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Query instance
     */
  public static create (properties?: IQuery): Query

    /**
     * Encodes the specified Query message. Does not implicitly {@link Query.verify|verify} messages.
     * @param message Query message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encode (message: IQuery, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified Query message, length delimited. Does not implicitly {@link Query.verify|verify} messages.
     * @param message Query message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encodeDelimited (message: IQuery, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Query message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Query
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decode (reader: ($protobuf.Reader | Uint8Array), length?: number): Query

    /**
     * Decodes a Query message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Query
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decodeDelimited (reader: ($protobuf.Reader | Uint8Array)): Query

    /**
     * Verifies a Query message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
  public static verify (message: { [k: string]: any }): (string | null)

    /**
     * Creates a Query message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Query
     */
  public static fromObject (object: { [k: string]: any }): Query

    /**
     * Creates a plain object from a Query message. Also converts values to other types if specified.
     * @param message Query
     * @param [options] Conversion options
     * @returns Plain object
     */
  public static toObject (message: Query, options?: $protobuf.IConversionOptions): { [k: string]: any }

    /**
     * Converts this Query to JSON.
     * @returns JSON object
     */
  public toJSON (): { [k: string]: any }
}

/** Properties of a QueryResponse. */
export interface IQueryResponse {

    /** QueryResponse nodes */
  nodes?: (INode[] | null)
}

/** Represents a QueryResponse. */
export class QueryResponse implements IQueryResponse {

    /** QueryResponse nodes. */
  public nodes: INode[]

    /**
     * Constructs a new QueryResponse.
     * @param [properties] Properties to set
     */
  constructor (properties?: IQueryResponse);

    /**
     * Creates a new QueryResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns QueryResponse instance
     */
  public static create (properties?: IQueryResponse): QueryResponse

    /**
     * Encodes the specified QueryResponse message. Does not implicitly {@link QueryResponse.verify|verify} messages.
     * @param message QueryResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encode (message: IQueryResponse, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified QueryResponse message, length delimited. Does not implicitly {@link QueryResponse.verify|verify} messages.
     * @param message QueryResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encodeDelimited (message: IQueryResponse, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a QueryResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns QueryResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decode (reader: ($protobuf.Reader | Uint8Array), length?: number): QueryResponse

    /**
     * Decodes a QueryResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns QueryResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decodeDelimited (reader: ($protobuf.Reader | Uint8Array)): QueryResponse

    /**
     * Verifies a QueryResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
  public static verify (message: { [k: string]: any }): (string | null)

    /**
     * Creates a QueryResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns QueryResponse
     */
  public static fromObject (object: { [k: string]: any }): QueryResponse

    /**
     * Creates a plain object from a QueryResponse message. Also converts values to other types if specified.
     * @param message QueryResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
  public static toObject (message: QueryResponse, options?: $protobuf.IConversionOptions): { [k: string]: any }

    /**
     * Converts this QueryResponse to JSON.
     * @returns JSON object
     */
  public toJSON (): { [k: string]: any }
}

/** Properties of a RelevanceRange. */
export interface IRelevanceRange {

    /** RelevanceRange min */
  min?: (number | null)

    /** RelevanceRange max */
  max: number
}

/** Represents a RelevanceRange. */
export class RelevanceRange implements IRelevanceRange {

    /** RelevanceRange min. */
  public min: number

    /** RelevanceRange max. */
  public max: number

    /**
     * Constructs a new RelevanceRange.
     * @param [properties] Properties to set
     */
  constructor (properties?: IRelevanceRange);

    /**
     * Creates a new RelevanceRange instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RelevanceRange instance
     */
  public static create (properties?: IRelevanceRange): RelevanceRange

    /**
     * Encodes the specified RelevanceRange message. Does not implicitly {@link RelevanceRange.verify|verify} messages.
     * @param message RelevanceRange message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encode (message: IRelevanceRange, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified RelevanceRange message, length delimited. Does not implicitly {@link RelevanceRange.verify|verify} messages.
     * @param message RelevanceRange message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encodeDelimited (message: IRelevanceRange, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a RelevanceRange message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RelevanceRange
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decode (reader: ($protobuf.Reader | Uint8Array), length?: number): RelevanceRange

    /**
     * Decodes a RelevanceRange message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RelevanceRange
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decodeDelimited (reader: ($protobuf.Reader | Uint8Array)): RelevanceRange

    /**
     * Verifies a RelevanceRange message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
  public static verify (message: { [k: string]: any }): (string | null)

    /**
     * Creates a RelevanceRange message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RelevanceRange
     */
  public static fromObject (object: { [k: string]: any }): RelevanceRange

    /**
     * Creates a plain object from a RelevanceRange message. Also converts values to other types if specified.
     * @param message RelevanceRange
     * @param [options] Conversion options
     * @returns Plain object
     */
  public static toObject (message: RelevanceRange, options?: $protobuf.IConversionOptions): { [k: string]: any }

    /**
     * Converts this RelevanceRange to JSON.
     * @returns JSON object
     */
  public toJSON (): { [k: string]: any }
}

/** Properties of a Tree. */
export interface ITree {

    /** Tree id */
  id: string

    /** Tree bounds */
  bounds: Box3

    /** Tree scale */
  scale?: (Vector3 | null)

    /** Tree offset */
  offset?: (Vector3 | null)

    /** Tree numPoints */
  numPoints?: (number | Long | null)

    /** Tree boundsConforming */
  boundsConforming?: (Box3 | null)

    /** Tree schema */
  schema?: (IFeature[] | null)

    /** Tree metadata */
  metadata?: ({ [k: string]: google.protobuf.IAny } | null)
}

/** Represents a Tree. */
export class Tree implements ITree {

    /** Tree id. */
  public id: string

    /** Tree bounds. */
  public bounds: Box3

    /** Tree scale. */
  public scale?: (Vector3 | null)

    /** Tree offset. */
  public offset?: (Vector3 | null)

    /** Tree numPoints. */
  public numPoints: (number | Long)

    /** Tree boundsConforming. */
  public boundsConforming?: (Box3 | null)

    /** Tree schema. */
  public schema: IFeature[]

    /** Tree metadata. */
  public metadata: { [k: string]: google.protobuf.IAny }

    /**
     * Constructs a new Tree.
     * @param [properties] Properties to set
     */
  constructor (properties?: ITree);

    /**
     * Creates a new Tree instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Tree instance
     */
  public static create (properties?: ITree): Tree

    /**
     * Encodes the specified Tree message. Does not implicitly {@link Tree.verify|verify} messages.
     * @param message Tree message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encode (message: ITree, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified Tree message, length delimited. Does not implicitly {@link Tree.verify|verify} messages.
     * @param message Tree message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encodeDelimited (message: ITree, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Tree message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Tree
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decode (reader: ($protobuf.Reader | Uint8Array), length?: number): Tree

    /**
     * Decodes a Tree message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Tree
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decodeDelimited (reader: ($protobuf.Reader | Uint8Array)): Tree

    /**
     * Verifies a Tree message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
  public static verify (message: { [k: string]: any }): (string | null)

    /**
     * Creates a Tree message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Tree
     */
  public static fromObject (object: { [k: string]: any }): Tree

    /**
     * Creates a plain object from a Tree message. Also converts values to other types if specified.
     * @param message Tree
     * @param [options] Conversion options
     * @returns Plain object
     */
  public static toObject (message: Tree, options?: $protobuf.IConversionOptions): { [k: string]: any }

    /**
     * Converts this Tree to JSON.
     * @returns JSON object
     */
  public toJSON (): { [k: string]: any }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of an Any. */
        interface IAny {

            /** Any type_url */
          type_url?: (string | null)

            /** Any value */
          value?: (Uint8Array | null)
        }

        /** Represents an Any. */
        class Any implements IAny {

            /** Any type_url. */
          // tslint:disable-next-line
          public type_url: string

            /** Any value. */
          public value: Uint8Array

            /**
             * Constructs a new Any.
             * @param [properties] Properties to set
             */
          constructor (properties?: google.protobuf.IAny);

            /**
             * Creates a new Any instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Any instance
             */
          public static create (properties?: google.protobuf.IAny): google.protobuf.Any

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
          public static encode (message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
          public static encodeDelimited (message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
          public static decode (reader: ($protobuf.Reader | Uint8Array), length?: number): google.protobuf.Any

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
          public static decodeDelimited (reader: ($protobuf.Reader | Uint8Array)): google.protobuf.Any

            /**
             * Verifies an Any message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
          public static verify (message: { [k: string]: any }): (string | null)

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Any
             */
          public static fromObject (object: { [k: string]: any }): google.protobuf.Any

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @param message Any
             * @param [options] Conversion options
             * @returns Plain object
             */
          public static toObject (message: google.protobuf.Any, options?: $protobuf.IConversionOptions): { [k: string]: any }

            /**
             * Converts this Any to JSON.
             * @returns JSON object
             */
          public toJSON (): { [k: string]: any }
        }
    }
}

/** Properties of a TreeQuery. */
export interface ITreeQuery {

    /** TreeQuery id */
  id: string

    /** TreeQuery metadataProperties */
  metadataProperties?: (string[] | null)
}

/** Represents a TreeQuery. */
export class TreeQuery implements ITreeQuery {

    /** TreeQuery id. */
  public id: string

    /** TreeQuery metadataProperties. */
  public metadataProperties: string[]

    /**
     * Constructs a new TreeQuery.
     * @param [properties] Properties to set
     */
  constructor (properties?: ITreeQuery);

    /**
     * Creates a new TreeQuery instance using the specified properties.
     * @param [properties] Properties to set
     * @returns TreeQuery instance
     */
  public static create (properties?: ITreeQuery): TreeQuery

    /**
     * Encodes the specified TreeQuery message. Does not implicitly {@link TreeQuery.verify|verify} messages.
     * @param message TreeQuery message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encode (message: ITreeQuery, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified TreeQuery message, length delimited. Does not implicitly {@link TreeQuery.verify|verify} messages.
     * @param message TreeQuery message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encodeDelimited (message: ITreeQuery, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a TreeQuery message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns TreeQuery
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decode (reader: ($protobuf.Reader | Uint8Array), length?: number): TreeQuery

    /**
     * Decodes a TreeQuery message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns TreeQuery
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decodeDelimited (reader: ($protobuf.Reader | Uint8Array)): TreeQuery

    /**
     * Verifies a TreeQuery message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
  public static verify (message: { [k: string]: any }): (string | null)

    /**
     * Creates a TreeQuery message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns TreeQuery
     */
  public static fromObject (object: { [k: string]: any }): TreeQuery

    /**
     * Creates a plain object from a TreeQuery message. Also converts values to other types if specified.
     * @param message TreeQuery
     * @param [options] Conversion options
     * @returns Plain object
     */
  public static toObject (message: TreeQuery, options?: $protobuf.IConversionOptions): { [k: string]: any }

    /**
     * Converts this TreeQuery to JSON.
     * @returns JSON object
     */
  public toJSON (): { [k: string]: any }
}

/** Represents a Vector3. */
export class Vector3 extends THREE.Vector3 {

    /** Vector3 x. */
  public x: number

    /** Vector3 y. */
  public y: number

    /** Vector3 z. */
  public z: number

    /**
     * Constructs a new Vector3.
     * @param [properties] Properties to set
     */
  constructor (properties?: Vector3);

    /**
     * Creates a new Vector3 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Vector3 instance
     */
  public static create (properties?: Vector3): Vector3

    /**
     * Encodes the specified Vector3 message. Does not implicitly {@link Vector3.verify|verify} messages.
     * @param message Vector3 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encode (message: Vector3, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified Vector3 message, length delimited. Does not implicitly {@link Vector3.verify|verify} messages.
     * @param message Vector3 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encodeDelimited (message: Vector3, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Vector3 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Vector3
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decode (reader: ($protobuf.Reader | Uint8Array), length?: number): Vector3

    /**
     * Decodes a Vector3 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Vector3
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decodeDelimited (reader: ($protobuf.Reader | Uint8Array)): Vector3

    /**
     * Verifies a Vector3 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
  public static verify (message: { [k: string]: any }): (string | null)

    /**
     * Creates a Vector3 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Vector3
     */
  public static fromObject (object: { [k: string]: any }): Vector3

    /**
     * Creates a plain object from a Vector3 message. Also converts values to other types if specified.
     * @param message Vector3
     * @param [options] Conversion options
     * @returns Plain object
     */
  public static toObject (message: Vector3, options?: $protobuf.IConversionOptions): { [k: string]: any }

    /**
     * Converts this Vector3 to JSON.
     * @returns JSON object
     */
  public toJSON (): { [k: string]: any }
}

/** Represents a PnextIO */
export interface IPnextIO {

  /**
   * Calls getTree.
   * @param request TreeQuery message or plain object
   * @returns Promise
   */
  getTree (request: ITreeQuery): Promise<ITree>

  /**
   * Calls queryPoints.
   * @param request Query message or plain object
   * @returns Promise
   */
  queryPoints (request: IQuery): Promise<IQueryResponse>

  /**
   * Calls getNodes.
   * @param request NodeRequest message or plain object
   * @returns Readable
   */
  getNodes (request: INodeRequest): Readable
}

/** Represents a PnextIO */
export class PnextIO extends $protobuf.rpc.Service implements IPnextIO {

    /**
     * Constructs a new PnextIO service.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     */
  constructor (rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

    /**
     * Creates new PnextIO service using the specified rpc implementation.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     * @returns RPC service. Useful where requests and/or responses are streamed.
     */
  public static create (rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): PnextIO

    /**
     * Calls getTree.
     * @param request TreeQuery message or plain object
     * @param callback Node-style callback called with the error, if any, and Tree
     */
  public getTree (request: ITreeQuery, callback: PnextIO.getTreeCallback): void

    /**
     * Calls getTree.
     * @param request TreeQuery message or plain object
     * @returns Promise
     */
  public getTree (request: ITreeQuery): Promise<Tree>

    /**
     * Calls queryPoints.
     * @param request Query message or plain object
     * @param callback Node-style callback called with the error, if any, and QueryResponse
     */
  public queryPoints (request: IQuery, callback: PnextIO.queryPointsCallback): void

    /**
     * Calls queryPoints.
     * @param request Query message or plain object
     * @returns Promise
     */
  public queryPoints (request: IQuery): Promise<QueryResponse>

    /**
     * Calls getNodes.
     * @param request NodeRequest message or plain object
     * @returns Readable
     */
  public getNodes (request: INodeRequest): Readable
}

export namespace PnextIO {

    /**
     * Callback as used by {@link PnextIO#getTree}.
     * @param error Error, if any
     * @param [response] Tree
     */
    type getTreeCallback = (error: (Error | null), response?: Tree) => void

    /**
     * Callback as used by {@link PnextIO#queryPoints}.
     * @param error Error, if any
     * @param [response] QueryResponse
     */
    type queryPointsCallback = (error: (Error | null), response?: QueryResponse) => void
}
