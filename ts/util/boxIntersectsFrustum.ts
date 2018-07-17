import IFrustum from "../api/IFrustum"
import IBox3 from '../api/IBox3'
import IVector3 from '../api/IVector3'
import distanceToPointPlane from './distancePointPlane'

const p: IVector3 = { x: 0, y: 0, z: 0 }

/**
 * Adapted from Three.js
 * https://github.com/mrdoob/three.js/blob/ea5de6733511ea3a66231d7c6790e64a9f4e20da/src/math/Frustum.js#L141-L171
 * 
 * The MIT License
 *
 * Copyright © 2010-2018 three.js authors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
export default function boxIntersectsFrustum (box: IBox3, frustum: IFrustum): boolean {
  const planes = frustum.planes
  for ( var i = 0 ; i < 6; i++ ) {
    const plane = planes[i]

    // corner at max distance
    p.x = plane.normal.x > 0 ? box.max.x : box.min.x
    p.y = plane.normal.y > 0 ? box.max.y : box.min.y
    p.z = plane.normal.z > 0 ? box.max.z : box.min.z

    if ( distanceToPointPlane(p, plane) < 0 ) {
      return false
    }
  }
  return true
}
