import React from 'react'
import Thumbnail from './Thumbnail'
import Videosinfo from '../videos'

let videosArray = Videosinfo.videosList
console.log(videosArray)

function Grid () {
  return (
    <div className="grid">
    {videosArray.map((elm, idx) => (
      <Thumbnail element={elm} key={idx}/>
    ))}
    </div>
  )
}

export default Grid
