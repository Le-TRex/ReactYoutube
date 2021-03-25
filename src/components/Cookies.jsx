import React, { Fragment, useState } from 'react'

function Cookies({children}){
  //création du state
  //useState = état par défaut
  //[accepted] accepte true ou false et à l'intitialisation il prend false grace à useState(false)
  //le 1er élément du tableau est un getter, le 2ème élément est un setter
  const [accepted, setAccepted] = useState(false)

  console.log(accepted)

  return (
    //deux façons de gérer l'affichage du component en fonction du state
    // <div className={"cookies " + (accepted ? "hidden" : "")}>
    <div className="cookies " style={{ display: (accepted ? "none" : "flex") }}>
      {children}
      <button onClick={()=>{setAccepted(true)}}>Accepter</button>
      <button>JAMAIS</button>
    </div>
  )
}

export default Cookies