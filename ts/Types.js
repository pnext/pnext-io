/* eslint-disable one-var, no-mixed-operators */
import * as $protobuf from 'protobufjs/minimal'

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util

// Exported root namespace
const $root = $protobuf.roots['default'] || ($protobuf.roots['default'] = {})

export const Bounds = $root.Bounds = (() => {
  /**
     * Properties of a Bounds.
     * @exports IBounds
     * @interface IBounds
     * @property {IPoint3} min Bounds min
     * @property {IPoint3} max Bounds max
     */

  /**
     * Constructs a new Bounds.
     * @exports Bounds
     * @classdesc Represents a Bounds.
     * @implements IBounds
     * @constructor
     * @param {IBounds=} [properties] Properties to set
     */
  function Bounds (properties) {
    if (properties) {
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
      }
    }
  }

  /**
     * Bounds min.
     * @member {IPoint3} min
     * @memberof Bounds
     * @instance
     */
  Bounds.prototype.min = null

  /**
     * Bounds max.
     * @member {IPoint3} max
     * @memberof Bounds
     * @instance
     */
  Bounds.prototype.max = null

  /**
     * Creates a new Bounds instance using the specified properties.
     * @function create
     * @memberof Bounds
     * @static
     * @param {IBounds=} [properties] Properties to set
     * @returns {Bounds} Bounds instance
     */
  Bounds.create = function create (properties) {
    return new Bounds(properties)
  }

  /**
     * Encodes the specified Bounds message. Does not implicitly {@link Bounds.verify|verify} messages.
     * @function encode
     * @memberof Bounds
     * @static
     * @param {IBounds} message Bounds message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  Bounds.encode = function encode (message, writer) {
    if (!writer) { writer = $Writer.create() }
    $root.Point3.encode(message.min, writer.uint32(/* id 1, wireType 2 = */10).fork()).ldelim()
    $root.Point3.encode(message.max, writer.uint32(/* id 2, wireType 2 = */18).fork()).ldelim()
    return writer
  }

  /**
     * Encodes the specified Bounds message, length delimited. Does not implicitly {@link Bounds.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Bounds
     * @static
     * @param {IBounds} message Bounds message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  Bounds.encodeDelimited = function encodeDelimited (message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
     * Decodes a Bounds message from the specified reader or buffer.
     * @function decode
     * @memberof Bounds
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Bounds} Bounds
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  Bounds.decode = function decode (reader, length) {
    if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Bounds()
    while (reader.pos < end) {
      let tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.min = $root.Point3.decode(reader, reader.uint32())
          break
        case 2:
          message.max = $root.Point3.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    if (!message.hasOwnProperty('min')) { throw $util.ProtocolError("missing required 'min'", { instance: message }) }
    if (!message.hasOwnProperty('max')) { throw $util.ProtocolError("missing required 'max'", { instance: message }) }
    return message
  }

  /**
     * Decodes a Bounds message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Bounds
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Bounds} Bounds
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  Bounds.decodeDelimited = function decodeDelimited (reader) {
    if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
    return this.decode(reader, reader.uint32())
  }

  /**
     * Verifies a Bounds message.
     * @function verify
     * @memberof Bounds
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
  Bounds.verify = function verify (message) {
    if (typeof message !== 'object' || message === null) { return 'object expected' }
    {
      let error = $root.Point3.verify(message.min)
      if (error) { return 'min.' + error }
    }
    {
      let error = $root.Point3.verify(message.max)
      if (error) { return 'max.' + error }
    }
    return null
  }

  /**
     * Creates a Bounds message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Bounds
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Bounds} Bounds
     */
  Bounds.fromObject = function fromObject (object) {
    if (object instanceof $root.Bounds) { return object }
    let message = new $root.Bounds()
    if (object.min != null) {
      if (typeof object.min !== 'object') { throw TypeError('.Bounds.min: object expected') }
      message.min = $root.Point3.fromObject(object.min)
    }
    if (object.max != null) {
      if (typeof object.max !== 'object') { throw TypeError('.Bounds.max: object expected') }
      message.max = $root.Point3.fromObject(object.max)
    }
    return message
  }

  /**
     * Creates a plain object from a Bounds message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Bounds
     * @static
     * @param {Bounds} message Bounds
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
  Bounds.toObject = function toObject (message, options) {
    if (!options) { options = {} }
    let object = {}
    if (options.defaults) {
      object.min = null
      object.max = null
    }
    if (message.min != null && message.hasOwnProperty('min')) { object.min = $root.Point3.toObject(message.min, options) }
    if (message.max != null && message.hasOwnProperty('max')) { object.max = $root.Point3.toObject(message.max, options) }
    return object
  }

  /**
     * Converts this Bounds to JSON.
     * @function toJSON
     * @memberof Bounds
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
  Bounds.prototype.toJSON = function toJSON () {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  return Bounds
})()

export const DensityRange = $root.DensityRange = (() => {
  /**
     * Properties of a DensityRange.
     * @exports IDensityRange
     * @interface IDensityRange
     * @property {number|null} [min] DensityRange min
     * @property {number} max DensityRange max
     */

  /**
     * Constructs a new DensityRange.
     * @exports DensityRange
     * @classdesc Represents a DensityRange.
     * @implements IDensityRange
     * @constructor
     * @param {IDensityRange=} [properties] Properties to set
     */
  function DensityRange (properties) {
    if (properties) {
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
      }
    }
  }

  /**
     * DensityRange min.
     * @member {number} min
     * @memberof DensityRange
     * @instance
     */
  DensityRange.prototype.min = 0

  /**
     * DensityRange max.
     * @member {number} max
     * @memberof DensityRange
     * @instance
     */
  DensityRange.prototype.max = 0

  /**
     * Creates a new DensityRange instance using the specified properties.
     * @function create
     * @memberof DensityRange
     * @static
     * @param {IDensityRange=} [properties] Properties to set
     * @returns {DensityRange} DensityRange instance
     */
  DensityRange.create = function create (properties) {
    return new DensityRange(properties)
  }

  /**
     * Encodes the specified DensityRange message. Does not implicitly {@link DensityRange.verify|verify} messages.
     * @function encode
     * @memberof DensityRange
     * @static
     * @param {IDensityRange} message DensityRange message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  DensityRange.encode = function encode (message, writer) {
    if (!writer) { writer = $Writer.create() }
    if (message.min != null && message.hasOwnProperty('min')) { writer.uint32(/* id 1, wireType 5 = */13).float(message.min) }
    writer.uint32(/* id 2, wireType 5 = */21).float(message.max)
    return writer
  }

  /**
     * Encodes the specified DensityRange message, length delimited. Does not implicitly {@link DensityRange.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DensityRange
     * @static
     * @param {IDensityRange} message DensityRange message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  DensityRange.encodeDelimited = function encodeDelimited (message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
     * Decodes a DensityRange message from the specified reader or buffer.
     * @function decode
     * @memberof DensityRange
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DensityRange} DensityRange
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  DensityRange.decode = function decode (reader, length) {
    if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.DensityRange()
    while (reader.pos < end) {
      let tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.min = reader.float()
          break
        case 2:
          message.max = reader.float()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    if (!message.hasOwnProperty('max')) { throw $util.ProtocolError("missing required 'max'", { instance: message }) }
    return message
  }

  /**
     * Decodes a DensityRange message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DensityRange
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DensityRange} DensityRange
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  DensityRange.decodeDelimited = function decodeDelimited (reader) {
    if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
    return this.decode(reader, reader.uint32())
  }

  /**
     * Verifies a DensityRange message.
     * @function verify
     * @memberof DensityRange
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
  DensityRange.verify = function verify (message) {
    if (typeof message !== 'object' || message === null) { return 'object expected' }
    if (message.min != null && message.hasOwnProperty('min')) {
      if (typeof message.min !== 'number') { return 'min: number expected' }
    }
    if (typeof message.max !== 'number') { return 'max: number expected' }
    return null
  }

  /**
     * Creates a DensityRange message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DensityRange
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DensityRange} DensityRange
     */
  DensityRange.fromObject = function fromObject (object) {
    if (object instanceof $root.DensityRange) { return object }
    let message = new $root.DensityRange()
    if (object.min != null) { message.min = Number(object.min) }
    if (object.max != null) { message.max = Number(object.max) }
    return message
  }

  /**
     * Creates a plain object from a DensityRange message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DensityRange
     * @static
     * @param {DensityRange} message DensityRange
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
  DensityRange.toObject = function toObject (message, options) {
    if (!options) { options = {} }
    let object = {}
    if (options.defaults) {
      object.min = 0
      object.max = 0
    }
    if (message.min != null && message.hasOwnProperty('min')) { object.min = options.json && !isFinite(message.min) ? String(message.min) : message.min }
    if (message.max != null && message.hasOwnProperty('max')) { object.max = options.json && !isFinite(message.max) ? String(message.max) : message.max }
    return object
  }

  /**
     * Converts this DensityRange to JSON.
     * @function toJSON
     * @memberof DensityRange
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
  DensityRange.prototype.toJSON = function toJSON () {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  return DensityRange
})()

export const Feature = $root.Feature = (() => {
  /**
     * Properties of a Feature.
     * @exports IFeature
     * @interface IFeature
     * @property {string} type Feature type
     * @property {number} byteCount Feature byteCount
     */

  /**
     * Constructs a new Feature.
     * @exports Feature
     * @classdesc Represents a Feature.
     * @implements IFeature
     * @constructor
     * @param {IFeature=} [properties] Properties to set
     */
  function Feature (properties) {
    if (properties) {
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
      }
    }
  }

  /**
     * Feature type.
     * @member {string} type
     * @memberof Feature
     * @instance
     */
  Feature.prototype.type = ''

  /**
     * Feature byteCount.
     * @member {number} byteCount
     * @memberof Feature
     * @instance
     */
  Feature.prototype.byteCount = 0

  /**
     * Creates a new Feature instance using the specified properties.
     * @function create
     * @memberof Feature
     * @static
     * @param {IFeature=} [properties] Properties to set
     * @returns {Feature} Feature instance
     */
  Feature.create = function create (properties) {
    return new Feature(properties)
  }

  /**
     * Encodes the specified Feature message. Does not implicitly {@link Feature.verify|verify} messages.
     * @function encode
     * @memberof Feature
     * @static
     * @param {IFeature} message Feature message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  Feature.encode = function encode (message, writer) {
    if (!writer) { writer = $Writer.create() }
    writer.uint32(/* id 1, wireType 2 = */10).string(message.type)
    writer.uint32(/* id 2, wireType 0 = */16).int32(message.byteCount)
    return writer
  }

  /**
     * Encodes the specified Feature message, length delimited. Does not implicitly {@link Feature.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Feature
     * @static
     * @param {IFeature} message Feature message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  Feature.encodeDelimited = function encodeDelimited (message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
     * Decodes a Feature message from the specified reader or buffer.
     * @function decode
     * @memberof Feature
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Feature} Feature
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  Feature.decode = function decode (reader, length) {
    if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Feature()
    while (reader.pos < end) {
      let tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string()
          break
        case 2:
          message.byteCount = reader.int32()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    if (!message.hasOwnProperty('type')) { throw $util.ProtocolError("missing required 'type'", { instance: message }) }
    if (!message.hasOwnProperty('byteCount')) { throw $util.ProtocolError("missing required 'byteCount'", { instance: message }) }
    return message
  }

  /**
     * Decodes a Feature message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Feature
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Feature} Feature
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  Feature.decodeDelimited = function decodeDelimited (reader) {
    if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
    return this.decode(reader, reader.uint32())
  }

  /**
     * Verifies a Feature message.
     * @function verify
     * @memberof Feature
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
  Feature.verify = function verify (message) {
    if (typeof message !== 'object' || message === null) { return 'object expected' }
    if (!$util.isString(message.type)) { return 'type: string expected' }
    if (!$util.isInteger(message.byteCount)) { return 'byteCount: integer expected' }
    return null
  }

  /**
     * Creates a Feature message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Feature
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Feature} Feature
     */
  Feature.fromObject = function fromObject (object) {
    if (object instanceof $root.Feature) { return object }
    let message = new $root.Feature()
    if (object.type != null) { message.type = String(object.type) }
    if (object.byteCount != null) { message.byteCount = object.byteCount | 0 }
    return message
  }

  /**
     * Creates a plain object from a Feature message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Feature
     * @static
     * @param {Feature} message Feature
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
  Feature.toObject = function toObject (message, options) {
    if (!options) { options = {} }
    let object = {}
    if (options.defaults) {
      object.type = ''
      object.byteCount = 0
    }
    if (message.type != null && message.hasOwnProperty('type')) { object.type = message.type }
    if (message.byteCount != null && message.hasOwnProperty('byteCount')) { object.byteCount = message.byteCount }
    return object
  }

  /**
     * Converts this Feature to JSON.
     * @function toJSON
     * @memberof Feature
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
  Feature.prototype.toJSON = function toJSON () {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  return Feature
})()

export const Node = $root.Node = (() => {
  /**
     * Properties of a Node.
     * @exports INode
     * @interface INode
     * @property {string} treeId Node treeId
     * @property {Array.<Oct>|null} [address] Node address
     * @property {string} info Node info
     */

  /**
     * Constructs a new Node.
     * @exports Node
     * @classdesc Represents a Node.
     * @implements INode
     * @constructor
     * @param {INode=} [properties] Properties to set
     */
  function Node (properties) {
    this.address = []
    if (properties) {
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
      }
    }
  }

  /**
     * Node treeId.
     * @member {string} treeId
     * @memberof Node
     * @instance
     */
  Node.prototype.treeId = ''

  /**
     * Node address.
     * @member {Array.<Oct>} address
     * @memberof Node
     * @instance
     */
  Node.prototype.address = $util.emptyArray

  /**
     * Node info.
     * @member {string} info
     * @memberof Node
     * @instance
     */
  Node.prototype.info = ''

  /**
     * Creates a new Node instance using the specified properties.
     * @function create
     * @memberof Node
     * @static
     * @param {INode=} [properties] Properties to set
     * @returns {Node} Node instance
     */
  Node.create = function create (properties) {
    return new Node(properties)
  }

  /**
     * Encodes the specified Node message. Does not implicitly {@link Node.verify|verify} messages.
     * @function encode
     * @memberof Node
     * @static
     * @param {INode} message Node message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  Node.encode = function encode (message, writer) {
    if (!writer) { writer = $Writer.create() }
    writer.uint32(/* id 1, wireType 2 = */10).string(message.treeId)
    if (message.address != null && message.address.length) {
      for (let i = 0; i < message.address.length; ++i) { writer.uint32(/* id 2, wireType 0 = */16).int32(message.address[i]) }
    }
    writer.uint32(/* id 3, wireType 2 = */26).string(message.info)
    return writer
  }

  /**
     * Encodes the specified Node message, length delimited. Does not implicitly {@link Node.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Node
     * @static
     * @param {INode} message Node message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  Node.encodeDelimited = function encodeDelimited (message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
     * Decodes a Node message from the specified reader or buffer.
     * @function decode
     * @memberof Node
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Node} Node
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  Node.decode = function decode (reader, length) {
    if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Node()
    while (reader.pos < end) {
      let tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.treeId = reader.string()
          break
        case 2:
          if (!(message.address && message.address.length)) { message.address = [] }
          if ((tag & 7) === 2) {
            let end2 = reader.uint32() + reader.pos
            while (reader.pos < end2) { message.address.push(reader.int32()) }
          } else { message.address.push(reader.int32()) }
          break
        case 3:
          message.info = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    if (!message.hasOwnProperty('treeId')) { throw $util.ProtocolError("missing required 'treeId'", { instance: message }) }
    if (!message.hasOwnProperty('info')) { throw $util.ProtocolError("missing required 'info'", { instance: message }) }
    return message
  }

  /**
     * Decodes a Node message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Node
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Node} Node
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  Node.decodeDelimited = function decodeDelimited (reader) {
    if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
    return this.decode(reader, reader.uint32())
  }

  /**
     * Verifies a Node message.
     * @function verify
     * @memberof Node
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
  Node.verify = function verify (message) {
    if (typeof message !== 'object' || message === null) { return 'object expected' }
    if (!$util.isString(message.treeId)) { return 'treeId: string expected' }
    if (message.address != null && message.hasOwnProperty('address')) {
      if (!Array.isArray(message.address)) { return 'address: array expected' }
      for (let i = 0; i < message.address.length; ++i) {
        switch (message.address[i]) {
          default:
            return 'address: enum value[] expected'
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            break
        }
      }
    }
    if (!$util.isString(message.info)) { return 'info: string expected' }
    return null
  }

  /**
     * Creates a Node message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Node
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Node} Node
     */
  Node.fromObject = function fromObject (object) {
    if (object instanceof $root.Node) { return object }
    let message = new $root.Node()
    if (object.treeId != null) { message.treeId = String(object.treeId) }
    if (object.address) {
      if (!Array.isArray(object.address)) { throw TypeError('.Node.address: array expected') }
      message.address = []
      for (let i = 0; i < object.address.length; ++i) {
        switch (object.address[i]) {
          default:
          case 'AAA':
          case 1:
            message.address[i] = 1
            break
          case 'AAB':
          case 2:
            message.address[i] = 2
            break
          case 'ABA':
          case 3:
            message.address[i] = 3
            break
          case 'ABB':
          case 4:
            message.address[i] = 4
            break
          case 'BAA':
          case 5:
            message.address[i] = 5
            break
          case 'BAB':
          case 6:
            message.address[i] = 6
            break
          case 'BBA':
          case 7:
            message.address[i] = 7
            break
          case 'BBB':
          case 8:
            message.address[i] = 8
            break
        }
      }
    }
    if (object.info != null) { message.info = String(object.info) }
    return message
  }

  /**
     * Creates a plain object from a Node message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Node
     * @static
     * @param {Node} message Node
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
  Node.toObject = function toObject (message, options) {
    if (!options) { options = {} }
    let object = {}
    if (options.arrays || options.defaults) { object.address = [] }
    if (options.defaults) {
      object.treeId = ''
      object.info = ''
    }
    if (message.treeId != null && message.hasOwnProperty('treeId')) { object.treeId = message.treeId }
    if (message.address && message.address.length) {
      object.address = []
      for (let j = 0; j < message.address.length; ++j) { object.address[j] = options.enums === String ? $root.Oct[message.address[j]] : message.address[j] }
    }
    if (message.info != null && message.hasOwnProperty('info')) { object.info = message.info }
    return object
  }

  /**
     * Converts this Node to JSON.
     * @function toJSON
     * @memberof Node
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
  Node.prototype.toJSON = function toJSON () {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  return Node
})()

export const NodeData = $root.NodeData = (() => {
  /**
     * Properties of a NodeData.
     * @exports INodeData
     * @interface INodeData
     * @property {Array.<Uint8Array>|null} [data] NodeData data
     */

  /**
     * Constructs a new NodeData.
     * @exports NodeData
     * @classdesc Represents a NodeData.
     * @implements INodeData
     * @constructor
     * @param {INodeData=} [properties] Properties to set
     */
  function NodeData (properties) {
    this.data = []
    if (properties) {
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
      }
    }
  }

  /**
     * NodeData data.
     * @member {Array.<Uint8Array>} data
     * @memberof NodeData
     * @instance
     */
  NodeData.prototype.data = $util.emptyArray

  /**
     * Creates a new NodeData instance using the specified properties.
     * @function create
     * @memberof NodeData
     * @static
     * @param {INodeData=} [properties] Properties to set
     * @returns {NodeData} NodeData instance
     */
  NodeData.create = function create (properties) {
    return new NodeData(properties)
  }

  /**
     * Encodes the specified NodeData message. Does not implicitly {@link NodeData.verify|verify} messages.
     * @function encode
     * @memberof NodeData
     * @static
     * @param {INodeData} message NodeData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  NodeData.encode = function encode (message, writer) {
    if (!writer) { writer = $Writer.create() }
    if (message.data != null && message.data.length) {
      for (let i = 0; i < message.data.length; ++i) { writer.uint32(/* id 1, wireType 2 = */10).bytes(message.data[i]) }
    }
    return writer
  }

  /**
     * Encodes the specified NodeData message, length delimited. Does not implicitly {@link NodeData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof NodeData
     * @static
     * @param {INodeData} message NodeData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  NodeData.encodeDelimited = function encodeDelimited (message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
     * Decodes a NodeData message from the specified reader or buffer.
     * @function decode
     * @memberof NodeData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {NodeData} NodeData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  NodeData.decode = function decode (reader, length) {
    if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NodeData()
    while (reader.pos < end) {
      let tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (!(message.data && message.data.length)) { message.data = [] }
          message.data.push(reader.bytes())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  }

  /**
     * Decodes a NodeData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof NodeData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {NodeData} NodeData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  NodeData.decodeDelimited = function decodeDelimited (reader) {
    if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
    return this.decode(reader, reader.uint32())
  }

  /**
     * Verifies a NodeData message.
     * @function verify
     * @memberof NodeData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
  NodeData.verify = function verify (message) {
    if (typeof message !== 'object' || message === null) { return 'object expected' }
    if (message.data != null && message.hasOwnProperty('data')) {
      if (!Array.isArray(message.data)) { return 'data: array expected' }
      for (let i = 0; i < message.data.length; ++i) {
        if (!(message.data[i] && typeof message.data[i].length === 'number' || $util.isString(message.data[i]))) { return 'data: buffer[] expected' }
      }
    }
    return null
  }

  /**
     * Creates a NodeData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof NodeData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {NodeData} NodeData
     */
  NodeData.fromObject = function fromObject (object) {
    if (object instanceof $root.NodeData) { return object }
    let message = new $root.NodeData()
    if (object.data) {
      if (!Array.isArray(object.data)) { throw TypeError('.NodeData.data: array expected') }
      message.data = []
      for (let i = 0; i < object.data.length; ++i) {
        if (typeof object.data[i] === 'string') { $util.base64.decode(object.data[i], message.data[i] = $util.newBuffer($util.base64.length(object.data[i])), 0) } else if (object.data[i].length) { message.data[i] = object.data[i] }
      }
    }
    return message
  }

  /**
     * Creates a plain object from a NodeData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof NodeData
     * @static
     * @param {NodeData} message NodeData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
  NodeData.toObject = function toObject (message, options) {
    if (!options) { options = {} }
    let object = {}
    if (options.arrays || options.defaults) { object.data = [] }
    if (message.data && message.data.length) {
      object.data = []
      for (let j = 0; j < message.data.length; ++j) { object.data[j] = options.bytes === String ? $util.base64.encode(message.data[j], 0, message.data[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.data[j]) : message.data[j] }
    }
    return object
  }

  /**
     * Converts this NodeData to JSON.
     * @function toJSON
     * @memberof NodeData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
  NodeData.prototype.toJSON = function toJSON () {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  return NodeData
})()

export const NodeRequest = $root.NodeRequest = (() => {
  /**
     * Properties of a NodeRequest.
     * @exports INodeRequest
     * @interface INodeRequest
     * @property {Array.<INode>|null} [nodes] NodeRequest nodes
     * @property {Array.<IFeature>|null} [features] NodeRequest features
     */

  /**
     * Constructs a new NodeRequest.
     * @exports NodeRequest
     * @classdesc Represents a NodeRequest.
     * @implements INodeRequest
     * @constructor
     * @param {INodeRequest=} [properties] Properties to set
     */
  function NodeRequest (properties) {
    this.nodes = []
    this.features = []
    if (properties) {
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
      }
    }
  }

  /**
     * NodeRequest nodes.
     * @member {Array.<INode>} nodes
     * @memberof NodeRequest
     * @instance
     */
  NodeRequest.prototype.nodes = $util.emptyArray

  /**
     * NodeRequest features.
     * @member {Array.<IFeature>} features
     * @memberof NodeRequest
     * @instance
     */
  NodeRequest.prototype.features = $util.emptyArray

  /**
     * Creates a new NodeRequest instance using the specified properties.
     * @function create
     * @memberof NodeRequest
     * @static
     * @param {INodeRequest=} [properties] Properties to set
     * @returns {NodeRequest} NodeRequest instance
     */
  NodeRequest.create = function create (properties) {
    return new NodeRequest(properties)
  }

  /**
     * Encodes the specified NodeRequest message. Does not implicitly {@link NodeRequest.verify|verify} messages.
     * @function encode
     * @memberof NodeRequest
     * @static
     * @param {INodeRequest} message NodeRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  NodeRequest.encode = function encode (message, writer) {
    if (!writer) { writer = $Writer.create() }
    if (message.nodes != null && message.nodes.length) {
      for (let i = 0; i < message.nodes.length; ++i) { $root.Node.encode(message.nodes[i], writer.uint32(/* id 1, wireType 2 = */10).fork()).ldelim() }
    }
    if (message.features != null && message.features.length) {
      for (let i = 0; i < message.features.length; ++i) { $root.Feature.encode(message.features[i], writer.uint32(/* id 3, wireType 2 = */26).fork()).ldelim() }
    }
    return writer
  }

  /**
     * Encodes the specified NodeRequest message, length delimited. Does not implicitly {@link NodeRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof NodeRequest
     * @static
     * @param {INodeRequest} message NodeRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  NodeRequest.encodeDelimited = function encodeDelimited (message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
     * Decodes a NodeRequest message from the specified reader or buffer.
     * @function decode
     * @memberof NodeRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {NodeRequest} NodeRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  NodeRequest.decode = function decode (reader, length) {
    if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NodeRequest()
    while (reader.pos < end) {
      let tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (!(message.nodes && message.nodes.length)) { message.nodes = [] }
          message.nodes.push($root.Node.decode(reader, reader.uint32()))
          break
        case 3:
          if (!(message.features && message.features.length)) { message.features = [] }
          message.features.push($root.Feature.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  }

  /**
     * Decodes a NodeRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof NodeRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {NodeRequest} NodeRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  NodeRequest.decodeDelimited = function decodeDelimited (reader) {
    if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
    return this.decode(reader, reader.uint32())
  }

  /**
     * Verifies a NodeRequest message.
     * @function verify
     * @memberof NodeRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
  NodeRequest.verify = function verify (message) {
    if (typeof message !== 'object' || message === null) { return 'object expected' }
    if (message.nodes != null && message.hasOwnProperty('nodes')) {
      if (!Array.isArray(message.nodes)) { return 'nodes: array expected' }
      for (let i = 0; i < message.nodes.length; ++i) {
        let error = $root.Node.verify(message.nodes[i])
        if (error) { return 'nodes.' + error }
      }
    }
    if (message.features != null && message.hasOwnProperty('features')) {
      if (!Array.isArray(message.features)) { return 'features: array expected' }
      for (let i = 0; i < message.features.length; ++i) {
        let error = $root.Feature.verify(message.features[i])
        if (error) { return 'features.' + error }
      }
    }
    return null
  }

  /**
     * Creates a NodeRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof NodeRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {NodeRequest} NodeRequest
     */
  NodeRequest.fromObject = function fromObject (object) {
    if (object instanceof $root.NodeRequest) { return object }
    let message = new $root.NodeRequest()
    if (object.nodes) {
      if (!Array.isArray(object.nodes)) { throw TypeError('.NodeRequest.nodes: array expected') }
      message.nodes = []
      for (let i = 0; i < object.nodes.length; ++i) {
        if (typeof object.nodes[i] !== 'object') { throw TypeError('.NodeRequest.nodes: object expected') }
        message.nodes[i] = $root.Node.fromObject(object.nodes[i])
      }
    }
    if (object.features) {
      if (!Array.isArray(object.features)) { throw TypeError('.NodeRequest.features: array expected') }
      message.features = []
      for (let i = 0; i < object.features.length; ++i) {
        if (typeof object.features[i] !== 'object') { throw TypeError('.NodeRequest.features: object expected') }
        message.features[i] = $root.Feature.fromObject(object.features[i])
      }
    }
    return message
  }

  /**
     * Creates a plain object from a NodeRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof NodeRequest
     * @static
     * @param {NodeRequest} message NodeRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
  NodeRequest.toObject = function toObject (message, options) {
    if (!options) { options = {} }
    let object = {}
    if (options.arrays || options.defaults) {
      object.nodes = []
      object.features = []
    }
    if (message.nodes && message.nodes.length) {
      object.nodes = []
      for (let j = 0; j < message.nodes.length; ++j) { object.nodes[j] = $root.Node.toObject(message.nodes[j], options) }
    }
    if (message.features && message.features.length) {
      object.features = []
      for (let j = 0; j < message.features.length; ++j) { object.features[j] = $root.Feature.toObject(message.features[j], options) }
    }
    return object
  }

  /**
     * Converts this NodeRequest to JSON.
     * @function toJSON
     * @memberof NodeRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
  NodeRequest.prototype.toJSON = function toJSON () {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  return NodeRequest
})()

/**
 * Oct enum.
 * @exports Oct
 * @enum {string}
 * @property {number} AAA=0 AAA value
 * @property {number} AAB=1 AAB value
 * @property {number} ABA=2 ABA value
 * @property {number} ABB=3 ABB value
 * @property {number} BAA=4 BAA value
 * @property {number} BAB=5 BAB value
 * @property {number} BBA=6 BBA value
 * @property {number} BBB=7 BBB value
 */
$root.Oct = (function () {
  const valuesById = {}, values = Object.create(valuesById)
  values[valuesById[0] = 'AAA'] = 0
  values[valuesById[1] = 'AAB'] = 1
  values[valuesById[2] = 'ABA'] = 2
  values[valuesById[3] = 'ABB'] = 3
  values[valuesById[4] = 'BAA'] = 4
  values[valuesById[5] = 'BAB'] = 5
  values[valuesById[6] = 'BBA'] = 6
  values[valuesById[7] = 'BBB'] = 7
  return values
})()

export const PerspectiveCamera = $root.PerspectiveCamera = (() => {
  /**
     * Properties of a PerspectiveCamera.
     * @exports IPerspectiveCamera
     * @interface IPerspectiveCamera
     * @property {IPoint3} pos PerspectiveCamera pos
     * @property {number} fov PerspectiveCamera fov
     * @property {number} aspect PerspectiveCamera aspect
     * @property {number} near PerspectiveCamera near
     * @property {number} far PerspectiveCamera far
     */

  /**
     * Constructs a new PerspectiveCamera.
     * @exports PerspectiveCamera
     * @classdesc Represents a PerspectiveCamera.
     * @implements IPerspectiveCamera
     * @constructor
     * @param {IPerspectiveCamera=} [properties] Properties to set
     */
  function PerspectiveCamera (properties) {
    if (properties) {
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
      }
    }
  }

  /**
     * PerspectiveCamera pos.
     * @member {IPoint3} pos
     * @memberof PerspectiveCamera
     * @instance
     */
  PerspectiveCamera.prototype.pos = null

  /**
     * PerspectiveCamera fov.
     * @member {number} fov
     * @memberof PerspectiveCamera
     * @instance
     */
  PerspectiveCamera.prototype.fov = 0

  /**
     * PerspectiveCamera aspect.
     * @member {number} aspect
     * @memberof PerspectiveCamera
     * @instance
     */
  PerspectiveCamera.prototype.aspect = 0

  /**
     * PerspectiveCamera near.
     * @member {number} near
     * @memberof PerspectiveCamera
     * @instance
     */
  PerspectiveCamera.prototype.near = 0

  /**
     * PerspectiveCamera far.
     * @member {number} far
     * @memberof PerspectiveCamera
     * @instance
     */
  PerspectiveCamera.prototype.far = 0

  /**
     * Creates a new PerspectiveCamera instance using the specified properties.
     * @function create
     * @memberof PerspectiveCamera
     * @static
     * @param {IPerspectiveCamera=} [properties] Properties to set
     * @returns {PerspectiveCamera} PerspectiveCamera instance
     */
  PerspectiveCamera.create = function create (properties) {
    return new PerspectiveCamera(properties)
  }

  /**
     * Encodes the specified PerspectiveCamera message. Does not implicitly {@link PerspectiveCamera.verify|verify} messages.
     * @function encode
     * @memberof PerspectiveCamera
     * @static
     * @param {IPerspectiveCamera} message PerspectiveCamera message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  PerspectiveCamera.encode = function encode (message, writer) {
    if (!writer) { writer = $Writer.create() }
    $root.Point3.encode(message.pos, writer.uint32(/* id 1, wireType 2 = */10).fork()).ldelim()
    writer.uint32(/* id 2, wireType 5 = */21).float(message.fov)
    writer.uint32(/* id 3, wireType 5 = */29).float(message.aspect)
    writer.uint32(/* id 4, wireType 5 = */37).float(message.near)
    writer.uint32(/* id 5, wireType 5 = */45).float(message.far)
    return writer
  }

  /**
     * Encodes the specified PerspectiveCamera message, length delimited. Does not implicitly {@link PerspectiveCamera.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PerspectiveCamera
     * @static
     * @param {IPerspectiveCamera} message PerspectiveCamera message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  PerspectiveCamera.encodeDelimited = function encodeDelimited (message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
     * Decodes a PerspectiveCamera message from the specified reader or buffer.
     * @function decode
     * @memberof PerspectiveCamera
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PerspectiveCamera} PerspectiveCamera
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  PerspectiveCamera.decode = function decode (reader, length) {
    if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PerspectiveCamera()
    while (reader.pos < end) {
      let tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pos = $root.Point3.decode(reader, reader.uint32())
          break
        case 2:
          message.fov = reader.float()
          break
        case 3:
          message.aspect = reader.float()
          break
        case 4:
          message.near = reader.float()
          break
        case 5:
          message.far = reader.float()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    if (!message.hasOwnProperty('pos')) { throw $util.ProtocolError("missing required 'pos'", { instance: message }) }
    if (!message.hasOwnProperty('fov')) { throw $util.ProtocolError("missing required 'fov'", { instance: message }) }
    if (!message.hasOwnProperty('aspect')) { throw $util.ProtocolError("missing required 'aspect'", { instance: message }) }
    if (!message.hasOwnProperty('near')) { throw $util.ProtocolError("missing required 'near'", { instance: message }) }
    if (!message.hasOwnProperty('far')) { throw $util.ProtocolError("missing required 'far'", { instance: message }) }
    return message
  }

  /**
     * Decodes a PerspectiveCamera message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PerspectiveCamera
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PerspectiveCamera} PerspectiveCamera
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  PerspectiveCamera.decodeDelimited = function decodeDelimited (reader) {
    if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
    return this.decode(reader, reader.uint32())
  }

  /**
     * Verifies a PerspectiveCamera message.
     * @function verify
     * @memberof PerspectiveCamera
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
  PerspectiveCamera.verify = function verify (message) {
    if (typeof message !== 'object' || message === null) { return 'object expected' }
    {
      let error = $root.Point3.verify(message.pos)
      if (error) { return 'pos.' + error }
    }
    if (typeof message.fov !== 'number') { return 'fov: number expected' }
    if (typeof message.aspect !== 'number') { return 'aspect: number expected' }
    if (typeof message.near !== 'number') { return 'near: number expected' }
    if (typeof message.far !== 'number') { return 'far: number expected' }
    return null
  }

  /**
     * Creates a PerspectiveCamera message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PerspectiveCamera
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PerspectiveCamera} PerspectiveCamera
     */
  PerspectiveCamera.fromObject = function fromObject (object) {
    if (object instanceof $root.PerspectiveCamera) { return object }
    let message = new $root.PerspectiveCamera()
    if (object.pos != null) {
      if (typeof object.pos !== 'object') { throw TypeError('.PerspectiveCamera.pos: object expected') }
      message.pos = $root.Point3.fromObject(object.pos)
    }
    if (object.fov != null) { message.fov = Number(object.fov) }
    if (object.aspect != null) { message.aspect = Number(object.aspect) }
    if (object.near != null) { message.near = Number(object.near) }
    if (object.far != null) { message.far = Number(object.far) }
    return message
  }

  /**
     * Creates a plain object from a PerspectiveCamera message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PerspectiveCamera
     * @static
     * @param {PerspectiveCamera} message PerspectiveCamera
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
  PerspectiveCamera.toObject = function toObject (message, options) {
    if (!options) { options = {} }
    let object = {}
    if (options.defaults) {
      object.pos = null
      object.fov = 0
      object.aspect = 0
      object.near = 0
      object.far = 0
    }
    if (message.pos != null && message.hasOwnProperty('pos')) { object.pos = $root.Point3.toObject(message.pos, options) }
    if (message.fov != null && message.hasOwnProperty('fov')) { object.fov = options.json && !isFinite(message.fov) ? String(message.fov) : message.fov }
    if (message.aspect != null && message.hasOwnProperty('aspect')) { object.aspect = options.json && !isFinite(message.aspect) ? String(message.aspect) : message.aspect }
    if (message.near != null && message.hasOwnProperty('near')) { object.near = options.json && !isFinite(message.near) ? String(message.near) : message.near }
    if (message.far != null && message.hasOwnProperty('far')) { object.far = options.json && !isFinite(message.far) ? String(message.far) : message.far }
    return object
  }

  /**
     * Converts this PerspectiveCamera to JSON.
     * @function toJSON
     * @memberof PerspectiveCamera
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
  PerspectiveCamera.prototype.toJSON = function toJSON () {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  return PerspectiveCamera
})()

export const Point3 = $root.Point3 = (() => {
  /**
     * Properties of a Point3.
     * @exports IPoint3
     * @interface IPoint3
     * @property {number} x Point3 x
     * @property {number} y Point3 y
     * @property {number} z Point3 z
     */

  /**
     * Constructs a new Point3.
     * @exports Point3
     * @classdesc Represents a Point3.
     * @implements IPoint3
     * @constructor
     * @param {IPoint3=} [properties] Properties to set
     */
  function Point3 (properties) {
    if (properties) {
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
      }
    }
  }

  /**
     * Point3 x.
     * @member {number} x
     * @memberof Point3
     * @instance
     */
  Point3.prototype.x = 0

  /**
     * Point3 y.
     * @member {number} y
     * @memberof Point3
     * @instance
     */
  Point3.prototype.y = 0

  /**
     * Point3 z.
     * @member {number} z
     * @memberof Point3
     * @instance
     */
  Point3.prototype.z = 0

  /**
     * Creates a new Point3 instance using the specified properties.
     * @function create
     * @memberof Point3
     * @static
     * @param {IPoint3=} [properties] Properties to set
     * @returns {Point3} Point3 instance
     */
  Point3.create = function create (properties) {
    return new Point3(properties)
  }

  /**
     * Encodes the specified Point3 message. Does not implicitly {@link Point3.verify|verify} messages.
     * @function encode
     * @memberof Point3
     * @static
     * @param {IPoint3} message Point3 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  Point3.encode = function encode (message, writer) {
    if (!writer) { writer = $Writer.create() }
    writer.uint32(/* id 1, wireType 5 = */13).float(message.x)
    writer.uint32(/* id 2, wireType 5 = */21).float(message.y)
    writer.uint32(/* id 3, wireType 5 = */29).float(message.z)
    return writer
  }

  /**
     * Encodes the specified Point3 message, length delimited. Does not implicitly {@link Point3.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Point3
     * @static
     * @param {IPoint3} message Point3 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  Point3.encodeDelimited = function encodeDelimited (message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
     * Decodes a Point3 message from the specified reader or buffer.
     * @function decode
     * @memberof Point3
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Point3} Point3
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  Point3.decode = function decode (reader, length) {
    if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Point3()
    while (reader.pos < end) {
      let tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.x = reader.float()
          break
        case 2:
          message.y = reader.float()
          break
        case 3:
          message.z = reader.float()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    if (!message.hasOwnProperty('x')) { throw $util.ProtocolError("missing required 'x'", { instance: message }) }
    if (!message.hasOwnProperty('y')) { throw $util.ProtocolError("missing required 'y'", { instance: message }) }
    if (!message.hasOwnProperty('z')) { throw $util.ProtocolError("missing required 'z'", { instance: message }) }
    return message
  }

  /**
     * Decodes a Point3 message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Point3
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Point3} Point3
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  Point3.decodeDelimited = function decodeDelimited (reader) {
    if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
    return this.decode(reader, reader.uint32())
  }

  /**
     * Verifies a Point3 message.
     * @function verify
     * @memberof Point3
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
  Point3.verify = function verify (message) {
    if (typeof message !== 'object' || message === null) { return 'object expected' }
    if (typeof message.x !== 'number') { return 'x: number expected' }
    if (typeof message.y !== 'number') { return 'y: number expected' }
    if (typeof message.z !== 'number') { return 'z: number expected' }
    return null
  }

  /**
     * Creates a Point3 message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Point3
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Point3} Point3
     */
  Point3.fromObject = function fromObject (object) {
    if (object instanceof $root.Point3) { return object }
    let message = new $root.Point3()
    if (object.x != null) { message.x = Number(object.x) }
    if (object.y != null) { message.y = Number(object.y) }
    if (object.z != null) { message.z = Number(object.z) }
    return message
  }

  /**
     * Creates a plain object from a Point3 message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Point3
     * @static
     * @param {Point3} message Point3
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
  Point3.toObject = function toObject (message, options) {
    if (!options) { options = {} }
    let object = {}
    if (options.defaults) {
      object.x = 0
      object.y = 0
      object.z = 0
    }
    if (message.x != null && message.hasOwnProperty('x')) { object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x }
    if (message.y != null && message.hasOwnProperty('y')) { object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y }
    if (message.z != null && message.hasOwnProperty('z')) { object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z }
    return object
  }

  /**
     * Converts this Point3 to JSON.
     * @function toJSON
     * @memberof Point3
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
  Point3.prototype.toJSON = function toJSON () {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  return Point3
})()

export const Query = $root.Query = (() => {
  /**
     * Properties of a Query.
     * @exports IQuery
     * @interface IQuery
     * @property {IPerspectiveCamera} cam Query cam
     * @property {IRelevanceRange} relevance Query relevance
     * @property {IDensityRange|null} [density] Query density
     * @property {IBounds|null} [cut] Query cut
     * @property {Array.<string>|null} [feature] Query feature
     */

  /**
     * Constructs a new Query.
     * @exports Query
     * @classdesc Represents a Query.
     * @implements IQuery
     * @constructor
     * @param {IQuery=} [properties] Properties to set
     */
  function Query (properties) {
    this.feature = []
    if (properties) {
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
      }
    }
  }

  /**
     * Query cam.
     * @member {IPerspectiveCamera} cam
     * @memberof Query
     * @instance
     */
  Query.prototype.cam = null

  /**
     * Query relevance.
     * @member {IRelevanceRange} relevance
     * @memberof Query
     * @instance
     */
  Query.prototype.relevance = null

  /**
     * Query density.
     * @member {IDensityRange|null|undefined} density
     * @memberof Query
     * @instance
     */
  Query.prototype.density = null

  /**
     * Query cut.
     * @member {IBounds|null|undefined} cut
     * @memberof Query
     * @instance
     */
  Query.prototype.cut = null

  /**
     * Query feature.
     * @member {Array.<string>} feature
     * @memberof Query
     * @instance
     */
  Query.prototype.feature = $util.emptyArray

  /**
     * Creates a new Query instance using the specified properties.
     * @function create
     * @memberof Query
     * @static
     * @param {IQuery=} [properties] Properties to set
     * @returns {Query} Query instance
     */
  Query.create = function create (properties) {
    return new Query(properties)
  }

  /**
     * Encodes the specified Query message. Does not implicitly {@link Query.verify|verify} messages.
     * @function encode
     * @memberof Query
     * @static
     * @param {IQuery} message Query message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  Query.encode = function encode (message, writer) {
    if (!writer) { writer = $Writer.create() }
    $root.PerspectiveCamera.encode(message.cam, writer.uint32(/* id 1, wireType 2 = */10).fork()).ldelim()
    $root.RelevanceRange.encode(message.relevance, writer.uint32(/* id 2, wireType 2 = */18).fork()).ldelim()
    if (message.density != null && message.hasOwnProperty('density')) { $root.DensityRange.encode(message.density, writer.uint32(/* id 3, wireType 2 = */26).fork()).ldelim() }
    if (message.cut != null && message.hasOwnProperty('cut')) { $root.Bounds.encode(message.cut, writer.uint32(/* id 4, wireType 2 = */34).fork()).ldelim() }
    if (message.feature != null && message.feature.length) {
      for (let i = 0; i < message.feature.length; ++i) { writer.uint32(/* id 5, wireType 2 = */42).string(message.feature[i]) }
    }
    return writer
  }

  /**
     * Encodes the specified Query message, length delimited. Does not implicitly {@link Query.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Query
     * @static
     * @param {IQuery} message Query message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  Query.encodeDelimited = function encodeDelimited (message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
     * Decodes a Query message from the specified reader or buffer.
     * @function decode
     * @memberof Query
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Query} Query
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  Query.decode = function decode (reader, length) {
    if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Query()
    while (reader.pos < end) {
      let tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.cam = $root.PerspectiveCamera.decode(reader, reader.uint32())
          break
        case 2:
          message.relevance = $root.RelevanceRange.decode(reader, reader.uint32())
          break
        case 3:
          message.density = $root.DensityRange.decode(reader, reader.uint32())
          break
        case 4:
          message.cut = $root.Bounds.decode(reader, reader.uint32())
          break
        case 5:
          if (!(message.feature && message.feature.length)) { message.feature = [] }
          message.feature.push(reader.string())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    if (!message.hasOwnProperty('cam')) { throw $util.ProtocolError("missing required 'cam'", { instance: message }) }
    if (!message.hasOwnProperty('relevance')) { throw $util.ProtocolError("missing required 'relevance'", { instance: message }) }
    return message
  }

  /**
     * Decodes a Query message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Query
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Query} Query
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  Query.decodeDelimited = function decodeDelimited (reader) {
    if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
    return this.decode(reader, reader.uint32())
  }

  /**
     * Verifies a Query message.
     * @function verify
     * @memberof Query
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
  Query.verify = function verify (message) {
    if (typeof message !== 'object' || message === null) { return 'object expected' }
    {
      let error = $root.PerspectiveCamera.verify(message.cam)
      if (error) { return 'cam.' + error }
    }
    {
      let error = $root.RelevanceRange.verify(message.relevance)
      if (error) { return 'relevance.' + error }
    }
    if (message.density != null && message.hasOwnProperty('density')) {
      let error = $root.DensityRange.verify(message.density)
      if (error) { return 'density.' + error }
    }
    if (message.cut != null && message.hasOwnProperty('cut')) {
      let error = $root.Bounds.verify(message.cut)
      if (error) { return 'cut.' + error }
    }
    if (message.feature != null && message.hasOwnProperty('feature')) {
      if (!Array.isArray(message.feature)) { return 'feature: array expected' }
      for (let i = 0; i < message.feature.length; ++i) {
        if (!$util.isString(message.feature[i])) { return 'feature: string[] expected' }
      }
    }
    return null
  }

  /**
     * Creates a Query message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Query
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Query} Query
     */
  Query.fromObject = function fromObject (object) {
    if (object instanceof $root.Query) { return object }
    let message = new $root.Query()
    if (object.cam != null) {
      if (typeof object.cam !== 'object') { throw TypeError('.Query.cam: object expected') }
      message.cam = $root.PerspectiveCamera.fromObject(object.cam)
    }
    if (object.relevance != null) {
      if (typeof object.relevance !== 'object') { throw TypeError('.Query.relevance: object expected') }
      message.relevance = $root.RelevanceRange.fromObject(object.relevance)
    }
    if (object.density != null) {
      if (typeof object.density !== 'object') { throw TypeError('.Query.density: object expected') }
      message.density = $root.DensityRange.fromObject(object.density)
    }
    if (object.cut != null) {
      if (typeof object.cut !== 'object') { throw TypeError('.Query.cut: object expected') }
      message.cut = $root.Bounds.fromObject(object.cut)
    }
    if (object.feature) {
      if (!Array.isArray(object.feature)) { throw TypeError('.Query.feature: array expected') }
      message.feature = []
      for (let i = 0; i < object.feature.length; ++i) { message.feature[i] = String(object.feature[i]) }
    }
    return message
  }

  /**
     * Creates a plain object from a Query message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Query
     * @static
     * @param {Query} message Query
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
  Query.toObject = function toObject (message, options) {
    if (!options) { options = {} }
    let object = {}
    if (options.arrays || options.defaults) { object.feature = [] }
    if (options.defaults) {
      object.cam = null
      object.relevance = null
      object.density = null
      object.cut = null
    }
    if (message.cam != null && message.hasOwnProperty('cam')) { object.cam = $root.PerspectiveCamera.toObject(message.cam, options) }
    if (message.relevance != null && message.hasOwnProperty('relevance')) { object.relevance = $root.RelevanceRange.toObject(message.relevance, options) }
    if (message.density != null && message.hasOwnProperty('density')) { object.density = $root.DensityRange.toObject(message.density, options) }
    if (message.cut != null && message.hasOwnProperty('cut')) { object.cut = $root.Bounds.toObject(message.cut, options) }
    if (message.feature && message.feature.length) {
      object.feature = []
      for (let j = 0; j < message.feature.length; ++j) { object.feature[j] = message.feature[j] }
    }
    return object
  }

  /**
     * Converts this Query to JSON.
     * @function toJSON
     * @memberof Query
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
  Query.prototype.toJSON = function toJSON () {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  return Query
})()

export const QueryResponse = $root.QueryResponse = (() => {
  /**
     * Properties of a QueryResponse.
     * @exports IQueryResponse
     * @interface IQueryResponse
     * @property {Array.<INode>|null} [nodes] QueryResponse nodes
     * @property {Array.<IFeature>|null} [feature] QueryResponse feature
     */

  /**
     * Constructs a new QueryResponse.
     * @exports QueryResponse
     * @classdesc Represents a QueryResponse.
     * @implements IQueryResponse
     * @constructor
     * @param {IQueryResponse=} [properties] Properties to set
     */
  function QueryResponse (properties) {
    this.nodes = []
    this.feature = []
    if (properties) {
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
      }
    }
  }

  /**
     * QueryResponse nodes.
     * @member {Array.<INode>} nodes
     * @memberof QueryResponse
     * @instance
     */
  QueryResponse.prototype.nodes = $util.emptyArray

  /**
     * QueryResponse feature.
     * @member {Array.<IFeature>} feature
     * @memberof QueryResponse
     * @instance
     */
  QueryResponse.prototype.feature = $util.emptyArray

  /**
     * Creates a new QueryResponse instance using the specified properties.
     * @function create
     * @memberof QueryResponse
     * @static
     * @param {IQueryResponse=} [properties] Properties to set
     * @returns {QueryResponse} QueryResponse instance
     */
  QueryResponse.create = function create (properties) {
    return new QueryResponse(properties)
  }

  /**
     * Encodes the specified QueryResponse message. Does not implicitly {@link QueryResponse.verify|verify} messages.
     * @function encode
     * @memberof QueryResponse
     * @static
     * @param {IQueryResponse} message QueryResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  QueryResponse.encode = function encode (message, writer) {
    if (!writer) { writer = $Writer.create() }
    if (message.nodes != null && message.nodes.length) {
      for (let i = 0; i < message.nodes.length; ++i) { $root.Node.encode(message.nodes[i], writer.uint32(/* id 1, wireType 2 = */10).fork()).ldelim() }
    }
    if (message.feature != null && message.feature.length) {
      for (let i = 0; i < message.feature.length; ++i) { $root.Feature.encode(message.feature[i], writer.uint32(/* id 2, wireType 2 = */18).fork()).ldelim() }
    }
    return writer
  }

  /**
     * Encodes the specified QueryResponse message, length delimited. Does not implicitly {@link QueryResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof QueryResponse
     * @static
     * @param {IQueryResponse} message QueryResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  QueryResponse.encodeDelimited = function encodeDelimited (message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
     * Decodes a QueryResponse message from the specified reader or buffer.
     * @function decode
     * @memberof QueryResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {QueryResponse} QueryResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  QueryResponse.decode = function decode (reader, length) {
    if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.QueryResponse()
    while (reader.pos < end) {
      let tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (!(message.nodes && message.nodes.length)) { message.nodes = [] }
          message.nodes.push($root.Node.decode(reader, reader.uint32()))
          break
        case 2:
          if (!(message.feature && message.feature.length)) { message.feature = [] }
          message.feature.push($root.Feature.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  }

  /**
     * Decodes a QueryResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof QueryResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {QueryResponse} QueryResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  QueryResponse.decodeDelimited = function decodeDelimited (reader) {
    if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
    return this.decode(reader, reader.uint32())
  }

  /**
     * Verifies a QueryResponse message.
     * @function verify
     * @memberof QueryResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
  QueryResponse.verify = function verify (message) {
    if (typeof message !== 'object' || message === null) { return 'object expected' }
    if (message.nodes != null && message.hasOwnProperty('nodes')) {
      if (!Array.isArray(message.nodes)) { return 'nodes: array expected' }
      for (let i = 0; i < message.nodes.length; ++i) {
        let error = $root.Node.verify(message.nodes[i])
        if (error) { return 'nodes.' + error }
      }
    }
    if (message.feature != null && message.hasOwnProperty('feature')) {
      if (!Array.isArray(message.feature)) { return 'feature: array expected' }
      for (let i = 0; i < message.feature.length; ++i) {
        let error = $root.Feature.verify(message.feature[i])
        if (error) { return 'feature.' + error }
      }
    }
    return null
  }

  /**
     * Creates a QueryResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof QueryResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {QueryResponse} QueryResponse
     */
  QueryResponse.fromObject = function fromObject (object) {
    if (object instanceof $root.QueryResponse) { return object }
    let message = new $root.QueryResponse()
    if (object.nodes) {
      if (!Array.isArray(object.nodes)) { throw TypeError('.QueryResponse.nodes: array expected') }
      message.nodes = []
      for (let i = 0; i < object.nodes.length; ++i) {
        if (typeof object.nodes[i] !== 'object') { throw TypeError('.QueryResponse.nodes: object expected') }
        message.nodes[i] = $root.Node.fromObject(object.nodes[i])
      }
    }
    if (object.feature) {
      if (!Array.isArray(object.feature)) { throw TypeError('.QueryResponse.feature: array expected') }
      message.feature = []
      for (let i = 0; i < object.feature.length; ++i) {
        if (typeof object.feature[i] !== 'object') { throw TypeError('.QueryResponse.feature: object expected') }
        message.feature[i] = $root.Feature.fromObject(object.feature[i])
      }
    }
    return message
  }

  /**
     * Creates a plain object from a QueryResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof QueryResponse
     * @static
     * @param {QueryResponse} message QueryResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
  QueryResponse.toObject = function toObject (message, options) {
    if (!options) { options = {} }
    let object = {}
    if (options.arrays || options.defaults) {
      object.nodes = []
      object.feature = []
    }
    if (message.nodes && message.nodes.length) {
      object.nodes = []
      for (let j = 0; j < message.nodes.length; ++j) { object.nodes[j] = $root.Node.toObject(message.nodes[j], options) }
    }
    if (message.feature && message.feature.length) {
      object.feature = []
      for (let j = 0; j < message.feature.length; ++j) { object.feature[j] = $root.Feature.toObject(message.feature[j], options) }
    }
    return object
  }

  /**
     * Converts this QueryResponse to JSON.
     * @function toJSON
     * @memberof QueryResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
  QueryResponse.prototype.toJSON = function toJSON () {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  return QueryResponse
})()

export const RelevanceRange = $root.RelevanceRange = (() => {
  /**
     * Properties of a RelevanceRange.
     * @exports IRelevanceRange
     * @interface IRelevanceRange
     * @property {number|null} [min] RelevanceRange min
     * @property {number} max RelevanceRange max
     */

  /**
     * Constructs a new RelevanceRange.
     * @exports RelevanceRange
     * @classdesc Represents a RelevanceRange.
     * @implements IRelevanceRange
     * @constructor
     * @param {IRelevanceRange=} [properties] Properties to set
     */
  function RelevanceRange (properties) {
    if (properties) {
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
      }
    }
  }

  /**
     * RelevanceRange min.
     * @member {number} min
     * @memberof RelevanceRange
     * @instance
     */
  RelevanceRange.prototype.min = 0

  /**
     * RelevanceRange max.
     * @member {number} max
     * @memberof RelevanceRange
     * @instance
     */
  RelevanceRange.prototype.max = 0

  /**
     * Creates a new RelevanceRange instance using the specified properties.
     * @function create
     * @memberof RelevanceRange
     * @static
     * @param {IRelevanceRange=} [properties] Properties to set
     * @returns {RelevanceRange} RelevanceRange instance
     */
  RelevanceRange.create = function create (properties) {
    return new RelevanceRange(properties)
  }

  /**
     * Encodes the specified RelevanceRange message. Does not implicitly {@link RelevanceRange.verify|verify} messages.
     * @function encode
     * @memberof RelevanceRange
     * @static
     * @param {IRelevanceRange} message RelevanceRange message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  RelevanceRange.encode = function encode (message, writer) {
    if (!writer) { writer = $Writer.create() }
    if (message.min != null && message.hasOwnProperty('min')) { writer.uint32(/* id 1, wireType 0 = */8).int32(message.min) }
    writer.uint32(/* id 2, wireType 0 = */16).int32(message.max)
    return writer
  }

  /**
     * Encodes the specified RelevanceRange message, length delimited. Does not implicitly {@link RelevanceRange.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RelevanceRange
     * @static
     * @param {IRelevanceRange} message RelevanceRange message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  RelevanceRange.encodeDelimited = function encodeDelimited (message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
     * Decodes a RelevanceRange message from the specified reader or buffer.
     * @function decode
     * @memberof RelevanceRange
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RelevanceRange} RelevanceRange
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  RelevanceRange.decode = function decode (reader, length) {
    if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RelevanceRange()
    while (reader.pos < end) {
      let tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.min = reader.int32()
          break
        case 2:
          message.max = reader.int32()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    if (!message.hasOwnProperty('max')) { throw $util.ProtocolError("missing required 'max'", { instance: message }) }
    return message
  }

  /**
     * Decodes a RelevanceRange message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RelevanceRange
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RelevanceRange} RelevanceRange
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  RelevanceRange.decodeDelimited = function decodeDelimited (reader) {
    if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
    return this.decode(reader, reader.uint32())
  }

  /**
     * Verifies a RelevanceRange message.
     * @function verify
     * @memberof RelevanceRange
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
  RelevanceRange.verify = function verify (message) {
    if (typeof message !== 'object' || message === null) { return 'object expected' }
    if (message.min != null && message.hasOwnProperty('min')) {
      if (!$util.isInteger(message.min)) { return 'min: integer expected' }
    }
    if (!$util.isInteger(message.max)) { return 'max: integer expected' }
    return null
  }

  /**
     * Creates a RelevanceRange message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RelevanceRange
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RelevanceRange} RelevanceRange
     */
  RelevanceRange.fromObject = function fromObject (object) {
    if (object instanceof $root.RelevanceRange) { return object }
    let message = new $root.RelevanceRange()
    if (object.min != null) { message.min = object.min | 0 }
    if (object.max != null) { message.max = object.max | 0 }
    return message
  }

  /**
     * Creates a plain object from a RelevanceRange message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RelevanceRange
     * @static
     * @param {RelevanceRange} message RelevanceRange
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
  RelevanceRange.toObject = function toObject (message, options) {
    if (!options) { options = {} }
    let object = {}
    if (options.defaults) {
      object.min = 0
      object.max = 0
    }
    if (message.min != null && message.hasOwnProperty('min')) { object.min = message.min }
    if (message.max != null && message.hasOwnProperty('max')) { object.max = message.max }
    return object
  }

  /**
     * Converts this RelevanceRange to JSON.
     * @function toJSON
     * @memberof RelevanceRange
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
  RelevanceRange.prototype.toJSON = function toJSON () {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  return RelevanceRange
})()

export const Tree = $root.Tree = (() => {
  /**
     * Properties of a Tree.
     * @exports ITree
     * @interface ITree
     * @property {string} id Tree id
     * @property {IBounds} bounds Tree bounds
     * @property {IPoint3|null} [scale] Tree scale
     * @property {IPoint3|null} [offset] Tree offset
     * @property {number|Long|null} [numPoints] Tree numPoints
     * @property {IBounds|null} [boundsConforming] Tree boundsConforming
     * @property {Array.<IFeature>|null} [schema] Tree schema
     * @property {Object.<string,google.protobuf.IAny>|null} [metadata] Tree metadata
     */

  /**
     * Constructs a new Tree.
     * @exports Tree
     * @classdesc Represents a Tree.
     * @implements ITree
     * @constructor
     * @param {ITree=} [properties] Properties to set
     */
  function Tree (properties) {
    this.schema = []
    this.metadata = {}
    if (properties) {
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
      }
    }
  }

  /**
     * Tree id.
     * @member {string} id
     * @memberof Tree
     * @instance
     */
  Tree.prototype.id = ''

  /**
     * Tree bounds.
     * @member {IBounds} bounds
     * @memberof Tree
     * @instance
     */
  Tree.prototype.bounds = null

  /**
     * Tree scale.
     * @member {IPoint3|null|undefined} scale
     * @memberof Tree
     * @instance
     */
  Tree.prototype.scale = null

  /**
     * Tree offset.
     * @member {IPoint3|null|undefined} offset
     * @memberof Tree
     * @instance
     */
  Tree.prototype.offset = null

  /**
     * Tree numPoints.
     * @member {number|Long} numPoints
     * @memberof Tree
     * @instance
     */
  Tree.prototype.numPoints = $util.Long ? $util.Long.fromBits(0, 0, false) : 0

  /**
     * Tree boundsConforming.
     * @member {IBounds|null|undefined} boundsConforming
     * @memberof Tree
     * @instance
     */
  Tree.prototype.boundsConforming = null

  /**
     * Tree schema.
     * @member {Array.<IFeature>} schema
     * @memberof Tree
     * @instance
     */
  Tree.prototype.schema = $util.emptyArray

  /**
     * Tree metadata.
     * @member {Object.<string,google.protobuf.IAny>} metadata
     * @memberof Tree
     * @instance
     */
  Tree.prototype.metadata = $util.emptyObject

  /**
     * Creates a new Tree instance using the specified properties.
     * @function create
     * @memberof Tree
     * @static
     * @param {ITree=} [properties] Properties to set
     * @returns {Tree} Tree instance
     */
  Tree.create = function create (properties) {
    return new Tree(properties)
  }

  /**
     * Encodes the specified Tree message. Does not implicitly {@link Tree.verify|verify} messages.
     * @function encode
     * @memberof Tree
     * @static
     * @param {ITree} message Tree message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  Tree.encode = function encode (message, writer) {
    if (!writer) { writer = $Writer.create() }
    writer.uint32(/* id 1, wireType 2 = */10).string(message.id)
    $root.Bounds.encode(message.bounds, writer.uint32(/* id 2, wireType 2 = */18).fork()).ldelim()
    if (message.scale != null && message.hasOwnProperty('scale')) { $root.Point3.encode(message.scale, writer.uint32(/* id 3, wireType 2 = */26).fork()).ldelim() }
    if (message.offset != null && message.hasOwnProperty('offset')) { $root.Point3.encode(message.offset, writer.uint32(/* id 4, wireType 2 = */34).fork()).ldelim() }
    if (message.numPoints != null && message.hasOwnProperty('numPoints')) { writer.uint32(/* id 5, wireType 0 = */40).int64(message.numPoints) }
    if (message.boundsConforming != null && message.hasOwnProperty('boundsConforming')) { $root.Bounds.encode(message.boundsConforming, writer.uint32(/* id 6, wireType 2 = */50).fork()).ldelim() }
    if (message.schema != null && message.schema.length) {
      for (let i = 0; i < message.schema.length; ++i) { $root.Feature.encode(message.schema[i], writer.uint32(/* id 7, wireType 2 = */58).fork()).ldelim() }
    }
    if (message.metadata != null && message.hasOwnProperty('metadata')) {
      for (let keys = Object.keys(message.metadata), i = 0; i < keys.length; ++i) {
        writer.uint32(/* id 8, wireType 2 = */66).fork().uint32(/* id 1, wireType 2 = */10).string(keys[i])
        $root.google.protobuf.Any.encode(message.metadata[keys[i]], writer.uint32(/* id 2, wireType 2 = */18).fork()).ldelim().ldelim()
      }
    }
    return writer
  }

  /**
     * Encodes the specified Tree message, length delimited. Does not implicitly {@link Tree.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Tree
     * @static
     * @param {ITree} message Tree message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  Tree.encodeDelimited = function encodeDelimited (message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
     * Decodes a Tree message from the specified reader or buffer.
     * @function decode
     * @memberof Tree
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Tree} Tree
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  Tree.decode = function decode (reader, length) {
    if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Tree(), key
    while (reader.pos < end) {
      let tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        case 2:
          message.bounds = $root.Bounds.decode(reader, reader.uint32())
          break
        case 3:
          message.scale = $root.Point3.decode(reader, reader.uint32())
          break
        case 4:
          message.offset = $root.Point3.decode(reader, reader.uint32())
          break
        case 5:
          message.numPoints = reader.int64()
          break
        case 6:
          message.boundsConforming = $root.Bounds.decode(reader, reader.uint32())
          break
        case 7:
          if (!(message.schema && message.schema.length)) { message.schema = [] }
          message.schema.push($root.Feature.decode(reader, reader.uint32()))
          break
        case 8:
          reader.skip().pos++
          if (message.metadata === $util.emptyObject) { message.metadata = {} }
          key = reader.string()
          reader.pos++
          message.metadata[key] = $root.google.protobuf.Any.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    if (!message.hasOwnProperty('id')) { throw $util.ProtocolError("missing required 'id'", { instance: message }) }
    if (!message.hasOwnProperty('bounds')) { throw $util.ProtocolError("missing required 'bounds'", { instance: message }) }
    return message
  }

  /**
     * Decodes a Tree message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Tree
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Tree} Tree
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  Tree.decodeDelimited = function decodeDelimited (reader) {
    if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
    return this.decode(reader, reader.uint32())
  }

  /**
     * Verifies a Tree message.
     * @function verify
     * @memberof Tree
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
  Tree.verify = function verify (message) {
    if (typeof message !== 'object' || message === null) { return 'object expected' }
    if (!$util.isString(message.id)) { return 'id: string expected' }
    {
      let error = $root.Bounds.verify(message.bounds)
      if (error) { return 'bounds.' + error }
    }
    if (message.scale != null && message.hasOwnProperty('scale')) {
      let error = $root.Point3.verify(message.scale)
      if (error) { return 'scale.' + error }
    }
    if (message.offset != null && message.hasOwnProperty('offset')) {
      let error = $root.Point3.verify(message.offset)
      if (error) { return 'offset.' + error }
    }
    if (message.numPoints != null && message.hasOwnProperty('numPoints')) {
      if (!$util.isInteger(message.numPoints) && !(message.numPoints && $util.isInteger(message.numPoints.low) && $util.isInteger(message.numPoints.high))) { return 'numPoints: integer|Long expected' }
    }
    if (message.boundsConforming != null && message.hasOwnProperty('boundsConforming')) {
      let error = $root.Bounds.verify(message.boundsConforming)
      if (error) { return 'boundsConforming.' + error }
    }
    if (message.schema != null && message.hasOwnProperty('schema')) {
      if (!Array.isArray(message.schema)) { return 'schema: array expected' }
      for (let i = 0; i < message.schema.length; ++i) {
        let error = $root.Feature.verify(message.schema[i])
        if (error) { return 'schema.' + error }
      }
    }
    if (message.metadata != null && message.hasOwnProperty('metadata')) {
      if (!$util.isObject(message.metadata)) { return 'metadata: object expected' }
      let key = Object.keys(message.metadata)
      for (let i = 0; i < key.length; ++i) {
        let error = $root.google.protobuf.Any.verify(message.metadata[key[i]])
        if (error) { return 'metadata.' + error }
      }
    }
    return null
  }

  /**
     * Creates a Tree message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Tree
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Tree} Tree
     */
  Tree.fromObject = function fromObject (object) {
    if (object instanceof $root.Tree) { return object }
    let message = new $root.Tree()
    if (object.id != null) { message.id = String(object.id) }
    if (object.bounds != null) {
      if (typeof object.bounds !== 'object') { throw TypeError('.Tree.bounds: object expected') }
      message.bounds = $root.Bounds.fromObject(object.bounds)
    }
    if (object.scale != null) {
      if (typeof object.scale !== 'object') { throw TypeError('.Tree.scale: object expected') }
      message.scale = $root.Point3.fromObject(object.scale)
    }
    if (object.offset != null) {
      if (typeof object.offset !== 'object') { throw TypeError('.Tree.offset: object expected') }
      message.offset = $root.Point3.fromObject(object.offset)
    }
    if (object.numPoints != null) {
      if ($util.Long) { (message.numPoints = $util.Long.fromValue(object.numPoints)).unsigned = false } else if (typeof object.numPoints === 'string') { message.numPoints = parseInt(object.numPoints, 10) } else if (typeof object.numPoints === 'number') { message.numPoints = object.numPoints } else if (typeof object.numPoints === 'object') { message.numPoints = new $util.LongBits(object.numPoints.low >>> 0, object.numPoints.high >>> 0).toNumber() }
    }
    if (object.boundsConforming != null) {
      if (typeof object.boundsConforming !== 'object') { throw TypeError('.Tree.boundsConforming: object expected') }
      message.boundsConforming = $root.Bounds.fromObject(object.boundsConforming)
    }
    if (object.schema) {
      if (!Array.isArray(object.schema)) { throw TypeError('.Tree.schema: array expected') }
      message.schema = []
      for (let i = 0; i < object.schema.length; ++i) {
        if (typeof object.schema[i] !== 'object') { throw TypeError('.Tree.schema: object expected') }
        message.schema[i] = $root.Feature.fromObject(object.schema[i])
      }
    }
    if (object.metadata) {
      if (typeof object.metadata !== 'object') { throw TypeError('.Tree.metadata: object expected') }
      message.metadata = {}
      for (let keys = Object.keys(object.metadata), i = 0; i < keys.length; ++i) {
        if (typeof object.metadata[keys[i]] !== 'object') { throw TypeError('.Tree.metadata: object expected') }
        message.metadata[keys[i]] = $root.google.protobuf.Any.fromObject(object.metadata[keys[i]])
      }
    }
    return message
  }

  /**
     * Creates a plain object from a Tree message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Tree
     * @static
     * @param {Tree} message Tree
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
  Tree.toObject = function toObject (message, options) {
    if (!options) { options = {} }
    let object = {}
    if (options.arrays || options.defaults) { object.schema = [] }
    if (options.objects || options.defaults) { object.metadata = {} }
    if (options.defaults) {
      object.id = ''
      object.bounds = null
      object.scale = null
      object.offset = null
      if ($util.Long) {
        let long = new $util.Long(0, 0, false)
        object.numPoints = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long
      } else { object.numPoints = options.longs === String ? '0' : 0 }
      object.boundsConforming = null
    }
    if (message.id != null && message.hasOwnProperty('id')) { object.id = message.id }
    if (message.bounds != null && message.hasOwnProperty('bounds')) { object.bounds = $root.Bounds.toObject(message.bounds, options) }
    if (message.scale != null && message.hasOwnProperty('scale')) { object.scale = $root.Point3.toObject(message.scale, options) }
    if (message.offset != null && message.hasOwnProperty('offset')) { object.offset = $root.Point3.toObject(message.offset, options) }
    if (message.numPoints != null && message.hasOwnProperty('numPoints')) {
      if (typeof message.numPoints === 'number') { object.numPoints = options.longs === String ? String(message.numPoints) : message.numPoints } else { object.numPoints = options.longs === String ? $util.Long.prototype.toString.call(message.numPoints) : options.longs === Number ? new $util.LongBits(message.numPoints.low >>> 0, message.numPoints.high >>> 0).toNumber() : message.numPoints }
    }
    if (message.boundsConforming != null && message.hasOwnProperty('boundsConforming')) { object.boundsConforming = $root.Bounds.toObject(message.boundsConforming, options) }
    if (message.schema && message.schema.length) {
      object.schema = []
      for (let j = 0; j < message.schema.length; ++j) { object.schema[j] = $root.Feature.toObject(message.schema[j], options) }
    }
    let keys2
    if (message.metadata && (keys2 = Object.keys(message.metadata)).length) {
      object.metadata = {}
      for (let j = 0; j < keys2.length; ++j) { object.metadata[keys2[j]] = $root.google.protobuf.Any.toObject(message.metadata[keys2[j]], options) }
    }
    return object
  }

  /**
     * Converts this Tree to JSON.
     * @function toJSON
     * @memberof Tree
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
  Tree.prototype.toJSON = function toJSON () {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  return Tree
})()

export const google = $root.google = (() => {
  /**
     * Namespace google.
     * @exports google
     * @namespace
     */
  const google = {}

  google.protobuf = (function () {
    /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
    const protobuf = {}

    protobuf.Any = (function () {
      /**
             * Properties of an Any.
             * @memberof google.protobuf
             * @interface IAny
             * @property {string|null} [type_url] Any type_url
             * @property {Uint8Array|null} [value] Any value
             */

      /**
             * Constructs a new Any.
             * @memberof google.protobuf
             * @classdesc Represents an Any.
             * @implements IAny
             * @constructor
             * @param {google.protobuf.IAny=} [properties] Properties to set
             */
      function Any (properties) {
        if (properties) {
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
          }
        }
      }

      /**
             * Any type_url.
             * @member {string} type_url
             * @memberof google.protobuf.Any
             * @instance
             */
      Any.prototype.type_url = ''

      /**
             * Any value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.Any
             * @instance
             */
      Any.prototype.value = $util.newBuffer([])

      /**
             * Creates a new Any instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny=} [properties] Properties to set
             * @returns {google.protobuf.Any} Any instance
             */
      Any.create = function create (properties) {
        return new Any(properties)
      }

      /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
      Any.encode = function encode (message, writer) {
        if (!writer) { writer = $Writer.create() }
        if (message.type_url != null && message.hasOwnProperty('type_url')) { writer.uint32(/* id 1, wireType 2 = */10).string(message.type_url) }
        if (message.value != null && message.hasOwnProperty('value')) { writer.uint32(/* id 2, wireType 2 = */18).bytes(message.value) }
        return writer
      }

      /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
      Any.encodeDelimited = function encodeDelimited (message, writer) {
        return this.encode(message, writer).ldelim()
      }

      /**
             * Decodes an Any message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      Any.decode = function decode (reader, length) {
        if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Any()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.type_url = reader.string()
              break
            case 2:
              message.value = reader.bytes()
              break
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      Any.decodeDelimited = function decodeDelimited (reader) {
        if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
        return this.decode(reader, reader.uint32())
      }

      /**
             * Verifies an Any message.
             * @function verify
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
      Any.verify = function verify (message) {
        if (typeof message !== 'object' || message === null) { return 'object expected' }
        if (message.type_url != null && message.hasOwnProperty('type_url')) {
          if (!$util.isString(message.type_url)) { return 'type_url: string expected' }
        }
        if (message.value != null && message.hasOwnProperty('value')) {
          if (!(message.value && typeof message.value.length === 'number' || $util.isString(message.value))) { return 'value: buffer expected' }
        }
        return null
      }

      /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Any} Any
             */
      Any.fromObject = function fromObject (object) {
        if (object instanceof $root.google.protobuf.Any) { return object }
        let message = new $root.google.protobuf.Any()
        if (object.type_url != null) { message.type_url = String(object.type_url) }
        if (object.value != null) {
          if (typeof object.value === 'string') { $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0) } else if (object.value.length) { message.value = object.value }
        }
        return message
      }

      /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.Any} message Any
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
      Any.toObject = function toObject (message, options) {
        if (!options) { options = {} }
        let object = {}
        if (options.defaults) {
          object.type_url = ''
          object.value = options.bytes === String ? '' : []
        }
        if (message.type_url != null && message.hasOwnProperty('type_url')) { object.type_url = message.type_url }
        if (message.value != null && message.hasOwnProperty('value')) { object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value }
        return object
      }

      /**
             * Converts this Any to JSON.
             * @function toJSON
             * @memberof google.protobuf.Any
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
      Any.prototype.toJSON = function toJSON () {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
      }

      return Any
    })()

    return protobuf
  })()

  return google
})()

export const TreeRequest = $root.TreeRequest = (() => {
  /**
     * Properties of a TreeQuery.
     * @exports ITreeRequest
     * @interface ITreeRequest
     * @property {string} id TreeQuery id
     * @property {Array.<string>|null} [metadataProperties] TreeRequest metadataProperties
     */

  /**
     * Constructs a new TreeRequest.
     * @exports TreeRequest
     * @classdesc Represents a TreeRequest.
     * @implements ITreeRequest
     * @constructor
     * @param {ITreeQuery=} [properties] Properties to set
     */
  function TreeRequest (properties) {
    this.metadataProperties = []
    if (properties) {
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
      }
    }
  }

  /**
     * TreeRequest id.
     * @member {string} id
     * @memberof TreeRequest
     * @instance
     */
  TreeRequest.prototype.id = ''

  /**
     * TreeRequest metadataProperties.
     * @member {Array.<string>} metadataProperties
     * @memberof TreeRequest
     * @instance
     */
  TreeRequest.prototype.metadataProperties = $util.emptyArray

  /**
     * Creates a new TreeRequest instance using the specified properties.
     * @function create
     * @memberof TreeRequest
     * @static
     * @param {ITreeRequest=} [properties] Properties to set
     * @returns {TreeRequest} TreeRequest instance
     */
  TreeRequest.create = function create (properties) {
    return new TreeRequest(properties)
  }

  /**
     * Encodes the specified TreeRequest message. Does not implicitly {@link TreeRequest.verify|verify} messages.
     * @function encode
     * @memberof TreeRequest
     * @static
     * @param {ITreeRequest} message TreeRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  TreeRequest.encode = function encode (message, writer) {
    if (!writer) { writer = $Writer.create() }
    writer.uint32(/* id 1, wireType 2 = */10).string(message.id)
    if (message.metadataProperties != null && message.metadataProperties.length) {
      for (let i = 0; i < message.metadataProperties.length; ++i) { writer.uint32(/* id 2, wireType 2 = */18).string(message.metadataProperties[i]) }
    }
    return writer
  }

  /**
     * Encodes the specified TreeRequest message, length delimited. Does not implicitly {@link TreeRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof TreeRequest
     * @static
     * @param {ITreeRequest} message TreeRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
  TreeRequest.encodeDelimited = function encodeDelimited (message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
     * Decodes a TreeRequest message from the specified reader or buffer.
     * @function decode
     * @memberof TreeRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TreeRequest} TreeRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  TreeRequest.decode = function decode (reader, length) {
    if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.TreeQuery()
    while (reader.pos < end) {
      let tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        case 2:
          if (!(message.metadataProperties && message.metadataProperties.length)) { message.metadataProperties = [] }
          message.metadataProperties.push(reader.string())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    if (!message.hasOwnProperty('id')) { throw $util.ProtocolError("missing required 'id'", { instance: message }) }
    return message
  }

  /**
     * Decodes a TreeRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof TreeQuery
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {TreeRequest} TreeRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  TreeRequest.decodeDelimited = function decodeDelimited (reader) {
    if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
    return this.decode(reader, reader.uint32())
  }

  /**
     * Verifies a TreeRequest message.
     * @function verify
     * @memberof TreeRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
  TreeRequest.verify = function verify (message) {
    if (typeof message !== 'object' || message === null) { return 'object expected' }
    if (!$util.isString(message.id)) { return 'id: string expected' }
    if (message.metadataProperties != null && message.hasOwnProperty('metadataProperties')) {
      if (!Array.isArray(message.metadataProperties)) { return 'metadataProperties: array expected' }
      for (let i = 0; i < message.metadataProperties.length; ++i) {
        if (!$util.isString(message.metadataProperties[i])) { return 'metadataProperties: string[] expected' }
      }
    }
    return null
  }

  /**
     * Creates a TreeRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TreeRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TreeRequest} TreeRequest
     */
  TreeRequest.fromObject = function fromObject (object) {
    if (object instanceof $root.TreeRequest) { return object }
    let message = new $root.TreeRequest()
    if (object.id != null) { message.id = String(object.id) }
    if (object.metadataProperties) {
      if (!Array.isArray(object.metadataProperties)) { throw TypeError('.TreeRequest.metadataProperties: array expected') }
      message.metadataProperties = []
      for (let i = 0; i < object.metadataProperties.length; ++i) { message.metadataProperties[i] = String(object.metadataProperties[i]) }
    }
    return message
  }

  /**
     * Creates a plain object from a TreeRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TreeRequest
     * @static
     * @param {TreeRequest} message TreeRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
  TreeRequest.toObject = function toObject (message, options) {
    if (!options) { options = {} }
    let object = {}
    if (options.arrays || options.defaults) { object.metadataProperties = [] }
    if (options.defaults) { object.id = '' }
    if (message.id != null && message.hasOwnProperty('id')) { object.id = message.id }
    if (message.metadataProperties && message.metadataProperties.length) {
      object.metadataProperties = []
      for (let j = 0; j < message.metadataProperties.length; ++j) { object.metadataProperties[j] = message.metadataProperties[j] }
    }
    return object
  }

  /**
     * Converts this TreeRequest to JSON.
     * @function toJSON
     * @memberof TreeRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
  TreeRequest.prototype.toJSON = function toJSON () {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  return TreeRequest
})()

export { $root as default }
