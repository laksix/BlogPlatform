import React from "react";
import clasess from './ticketslist.module.scss'
import TicketsItem from "../ticketsitem";
import { Button,ConfigProvider } from 'antd';
const TicketsList = () => {
    return (
        <>
        <ul className={clasess.listitem}>
            <TicketsItem/>
        </ul>
        <ConfigProvider
  theme={{
    components:{
        Button: {
           fontSizeLG:11,
        }
    },
    token: {
      fontFamily: 'Open Sans',
    },
  }}
>
<Button size = 'large' type="primary">ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!</Button>
</ConfigProvider>
        </>
    )
}
export default TicketsList