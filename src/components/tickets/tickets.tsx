import React from "react";
import classes from './tickets.module.scss'
import TicketsFilters from "../TicketsFilters";
import TicketsList from "../TicketsList";
const Tickets = () => {
    return (
        <div className={classes.tickets}>
        <TicketsFilters/>
        <TicketsList/>
        </div>
    )
}
export default Tickets