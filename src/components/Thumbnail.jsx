import React, {useState, Fragment} from 'react'

const check = <span className="material-icons">check_circle</span>

function Thumbnail ({element, children}) {

  const [toBeWatchedLater, setToBeWatchedLater] = useState(false)

  function PrintPicto(toBeWatchedLater){
    if (toBeWatchedLater) {
      return (<span className="material-icons">done</span>)
    }else{
      return (
        <Fragment>
          <p>À regarder plus tard</p>
          <span className="material-icons">schedule</span>
        </Fragment>
      )
    }
  }

  return (
      <div className="thumbnail">
        <div className="watchLater" onClick={()=>{setToBeWatchedLater(true)}}>
          {PrintPicto(toBeWatchedLater)}
        </div>
        <img className="videoThumbnail" src={element.thumbnail} alt="Miniature de la vidéo" />
        <div className="metaData">
          <div className="videoLogo">
            <img src={element.channelIcon} alt="Logo de la chaîne" />
          </div>
          <div className="infosVideos">
            <h3>{element.title}</h3>
            <p>{element.channel} <span className="checkCircle">{check}</span></p>
            <div className="vuesAndPublication">
              <p>{element.views}</p>
              <p>{element.published}</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Thumbnail
