import React from 'react'
import "./SideBar.css"

const SideBar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="http://wp.alithemes.com/html/nest/demo/assets/imgs/page/about-1.png"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
    </div>
  )
}

export default SideBar