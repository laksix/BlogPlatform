import React from "react";
import classes from './mainsection.module.scss'
import logo from './logo.png'
import Aside from "../aside";
import Tickets from "../tickets";
const MainSection = () => {
    return (
       <div className={classes.main}>
        <img src={logo} className={classes.logo} alt="Логотип" />
         <div className={classes['main-menu']}>
            <Aside/>
            <Tickets/>
         </div>
       </div>
    )
}
export default MainSection