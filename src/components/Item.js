/**
 * @Author: Ali
 * @Date:   2019-12-06T19:35:08+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-12-07T10:13:55+01:00
 */
import React from 'react'

const Item = ({text,handleClick,id}) => (
  <div className="single" onClick={()=>handleClick(id)}> {text}</div>
)

export default Item
