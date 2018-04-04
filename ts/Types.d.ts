import * as $protobuf from 'protobufjs'

/** Properties of a Bounds. */
export interface IBounds {

    /** Bounds min */
  min: IPoint3

    /** Bounds max */
  max: IPoint3
}

/** Represents a Bounds. */
export class Bounds implements IBounds {

    /** Bounds min. */
  public min: IPoint3

    /** Bounds max. */
  public max: IPoint3

  /**
   * Constructs a new Bounds.
   * @param [properties] Properties to set
   */
  constructor (properties?: IBounds);

    /**
     * Creates a new Bounds instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Bounds instance
     */
  public static create (properties?: IBounds): Bounds

    /**
     * Encodes the specified Bounds message. Does not implicitly {@link Bounds.verify|verify} messages.
     * @param message Bounds message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encode (message: IBounds, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified Bounds message, length delimited. Does not implicitly {@link Bounds.verify|verify} messages.
     * @param message Bounds message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encodeDelimited (message: IBounds, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Bounds message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Bounds
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decode (reader: ($protobuf.Reader | Uint8Array), length?: number): Bounds

    /**
     * Decodes a Bounds message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Bounds
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decodeDelimited (reader: ($protobuf.Reader | Uint8Array)): Bounds

    /**
     * Verifies a Bounds message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
  public static verify (message: { [k: string]: any }): (string | null)

    /**
     * Creates a Bounds message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Bounds
     */
  public static fromObject (object: { [k: string]: any }): Bounds

    /**
     * Creates a plain object from a Bounds message. Also converts values to other types if specified.
     * @param message Bounds
     * @param [options] Conversion options
     * @returns Plain object
     */
  public static toObject (message: Bounds, options?: $protobuf.IConversionOptions): { [k: string]: any }

    /**
     * Converts this Bounds to JSON.
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

/** Properties of a Node. */
export interface INode {

    /** Node treeId */
  treeId: string

    /** Node address */
  address?: (Oct[] | null)

    /** Node info */
  info: string
}

/** Represents a Node. */
export class Node implements INode {

    /** Node treeId. */
  public treeId: string

    /** Node address. */
  public address: Oct[]

    /** Node info. */
  public info: string

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
  features?: (IFeature[] | null)
}

/** Represents a NodeRequest. */
export class NodeRequest implements INodeRequest {

    /** NodeRequest nodes. */
  public nodes: INode[]

    /** NodeRequest features. */
  public features: IFeature[]

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

/** Properties of a PerspectiveCamera. */
export interface IPerspectiveCamera {

    /** PerspectiveCamera pos */
  pos: IPoint3

    /** PerspectiveCamera fov */
  fov: number

    /** PerspectiveCamera aspect */
  aspect: number

    /** PerspectiveCamera near */
  near: number

    /** PerspectiveCamera far */
  far: number
}

/** Represents a PerspectiveCamera. */
export class PerspectiveCamera implements IPerspectiveCamera {

    /** PerspectiveCamera pos. */
  public pos: IPoint3

    /** PerspectiveCamera fov. */
  public fov: number

    /** PerspectiveCamera aspect. */
  public aspect: number

    /** PerspectiveCamera near. */
  public near: number

    /** PerspectiveCamera far. */
  public far: number

    /**
     * Constructs a new PerspectiveCamera.
     * @param [properties] Properties to set
     */
  constructor (properties?: IPerspectiveCamera);

    /**
     * Creates a new PerspectiveCamera instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PerspectiveCamera instance
     */
  public static create (properties?: IPerspectiveCamera): PerspectiveCamera

    /**
     * Encodes the specified PerspectiveCamera message. Does not implicitly {@link PerspectiveCamera.verify|verify} messages.
     * @param message PerspectiveCamera message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encode (message: IPerspectiveCamera, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified PerspectiveCamera message, length delimited. Does not implicitly {@link PerspectiveCamera.verify|verify} messages.
     * @param message PerspectiveCamera message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encodeDelimited (message: IPerspectiveCamera, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a PerspectiveCamera message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PerspectiveCamera
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decode (reader: ($protobuf.Reader | Uint8Array), length?: number): PerspectiveCamera

    /**
     * Decodes a PerspectiveCamera message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PerspectiveCamera
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decodeDelimited (reader: ($protobuf.Reader | Uint8Array)): PerspectiveCamera

    /**
     * Verifies a PerspectiveCamera message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
  public static verify (message: { [k: string]: any }): (string | null)

    /**
     * Creates a PerspectiveCamera message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PerspectiveCamera
     */
  public static fromObject (object: { [k: string]: any }): PerspectiveCamera

    /**
     * Creates a plain object from a PerspectiveCamera message. Also converts values to other types if specified.
     * @param message PerspectiveCamera
     * @param [options] Conversion options
     * @returns Plain object
     */
  public static toObject (message: PerspectiveCamera, options?: $protobuf.IConversionOptions): { [k: string]: any }

    /**
     * Converts this PerspectiveCamera to JSON.
     * @returns JSON object
     */
  public toJSON (): { [k: string]: any }
}

/** Properties of a Point3. */
export interface IPoint3 {

    /** Point3 x */
  x: number

    /** Point3 y */
  y: number

    /** Point3 z */
  z: number
}

/** Represents a Point3. */
export class Point3 implements IPoint3 {

    /** Point3 x. */
  public x: number

    /** Point3 y. */
  public y: number

    /** Point3 z. */
  public z: number

    /**
     * Constructs a new Point3.
     * @param [properties] Properties to set
     */
  constructor (properties?: IPoint3);

    /**
     * Creates a new Point3 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Point3 instance
     */
  public static create (properties?: IPoint3): Point3

    /**
     * Encodes the specified Point3 message. Does not implicitly {@link Point3.verify|verify} messages.
     * @param message Point3 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encode (message: IPoint3, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified Point3 message, length delimited. Does not implicitly {@link Point3.verify|verify} messages.
     * @param message Point3 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encodeDelimited (message: IPoint3, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Point3 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Point3
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decode (reader: ($protobuf.Reader | Uint8Array), length?: number): Point3

    /**
     * Decodes a Point3 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Point3
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  public static decodeDelimited (reader: ($protobuf.Reader | Uint8Array)): Point3

    /**
     * Verifies a Point3 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
  public static verify (message: { [k: string]: any }): (string | null)

    /**
     * Creates a Point3 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Point3
     */
  public static fromObject (object: { [k: string]: any }): Point3

    /**
     * Creates a plain object from a Point3 message. Also converts values to other types if specified.
     * @param message Point3
     * @param [options] Conversion options
     * @returns Plain object
     */
  public static toObject (message: Point3, options?: $protobuf.IConversionOptions): { [k: string]: any }

    /**
     * Converts this Point3 to JSON.
     * @returns JSON object
     */
  public toJSON (): { [k: string]: any }
}

/** Properties of a Query. */
export interface IQuery {

    /** Query cam */
  cam: IPerspectiveCamera

    /** Query relevance */
  relevance: IRelevanceRange

    /** Query density */
  density?: (IDensityRange | null)

    /** Query cut */
  cut?: (IBounds | null)

    /** Query feature */
  feature?: (string[] | null)
}

/** Represents a Query. */
export class Query implements IQuery {

    /** Query cam. */
  public cam: IPerspectiveCamera

    /** Query relevance. */
  public relevance: IRelevanceRange

    /** Query density. */
  public density?: (IDensityRange | null)

    /** Query cut. */
  public cut?: (IBounds | null)

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

    /** QueryResponse feature */
  feature?: (IFeature[] | null)
}

/** Represents a QueryResponse. */
export class QueryResponse implements IQueryResponse {

    /** QueryResponse nodes. */
  public nodes: INode[]

    /** QueryResponse feature. */
  public feature: IFeature[]

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
  bounds: IBounds

    /** Tree scale */
  scale?: (IPoint3 | null)

    /** Tree offset */
  offset?: (IPoint3 | null)

    /** Tree numPoints */
  numPoints?: (number | Long | null)

    /** Tree boundsConforming */
  boundsConforming?: (IBounds | null)

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
  public bounds: IBounds

    /** Tree scale. */
  public scale?: (IPoint3 | null)

    /** Tree offset. */
  public offset?: (IPoint3 | null)

    /** Tree numPoints. */
  public numPoints: (number | Long)

    /** Tree boundsConforming. */
  public boundsConforming?: (IBounds | null)

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
            /* tslint:disable-next-line:variable-name */
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
export interface ITreeRequest {

    /** TreeQuery id */
  id: string

    /** TreeQuery metadataProperties */
  metadataProperties?: (string[] | null)
}

/** Represents a TreeQuery. */
export class TreeQuery implements ITreeRequest {

    /** TreeQuery id. */
  public id: string

    /** TreeQuery metadataProperties. */
  public metadataProperties: string[]

    /**
     * Constructs a new TreeQuery.
     * @param [properties] Properties to set
     */
  constructor (properties?: ITreeRequest);

    /**
     * Creates a new TreeQuery instance using the specified properties.
     * @param [properties] Properties to set
     * @returns TreeQuery instance
     */
  public static create (properties?: ITreeRequest): TreeQuery

    /**
     * Encodes the specified TreeQuery message. Does not implicitly {@link TreeQuery.verify|verify} messages.
     * @param message TreeQuery message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encode (message: ITreeRequest, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Encodes the specified TreeQuery message, length delimited. Does not implicitly {@link TreeQuery.verify|verify} messages.
     * @param message TreeQuery message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
  public static encodeDelimited (message: ITreeRequest, writer?: $protobuf.Writer): $protobuf.Writer

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
