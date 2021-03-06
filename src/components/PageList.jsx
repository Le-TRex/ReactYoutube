import React from 'react'

function PageList(props) {
  return (
    <div className="aside">
      <ul>
        {
          props.menu.map((elm, index)=>(
            <li key={index} className="row-aside">
              <a href={elm.link}>
                <span className="material-icons">{elm.icon}</span>
                {elm.label}
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default PageList