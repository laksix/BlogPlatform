import React from 'react';
import clasess from './ticketsitem.module.scss';
import { ITicket } from '../models/Tickets';
import {add}  from "date-fns";
import format from 'date-fns/format';
interface ticketProps {
  ticket: ITicket;
}

const TicketsItem = ({ ticket }: ticketProps) => {
  const resultTo: Date = add(new Date(ticket.segments[0].date), {
    minutes: ticket.segments[0].duration
  })
  const flyComingTo = format(resultTo,`H:mm`)
  const flyToDate = format(new Date(ticket.segments[0].date),`H:mm`)
  
  const resultFrom: Date = add(new Date(ticket.segments[1].date), {
    minutes: ticket.segments[1].duration
  })
  const flyComingFrom = format(resultFrom,`H:mm`)
  const flyFromDate = format(new Date(ticket.segments[1].date),`H:mm`)
  
  return (
    <>
      <li className={clasess.ticketsitem}>
        <img src={`https://pics.avs.io/99/36/${ticket.carrier}.png`} alt="Logo" className={clasess['ticketsitem-logo']} />
        <div className={clasess['ticketsitem-price']}>{ticket.price} ₽</div>
        <div className={clasess['ticketsitem-info']}>
          <div className={clasess['ticketsitem-to']}>
            <div className={clasess['ticketsitem-to-first']}>
              <div className={clasess['ticketsitem-to-city']}>{`${ticket.segments[0].origin} -${ticket.segments[0].destination} `}</div>
              <div className={clasess['ticketsitem-to-time']}>{flyToDate} - {flyComingTo} </div>
            </div>
            <div className={clasess['ticketsitem-to-second']}>
              <div className={clasess['ticketsitem-to-city']}>{`${ticket.segments[1].origin} -${ticket.segments[1].destination} `}</div>
              <div className={clasess['ticketsitem-to-time']}>{flyFromDate} - {flyComingFrom}</div>
            </div>
          </div>
          <div className={clasess['ticketsitem-time']}>
            <div className={clasess['ticketsitem-to-first']}>
              <div className={clasess['ticketsitem-to-city']}>В ПУТИ</div>
              <div className={clasess['ticketsitem-to-time']}>{format(new Date(2024,8,1,0,ticket.segments[0].duration,0),`Hч mmм`)}</div>
            </div>
            <div className={clasess['ticketsitem-to-second']}>
              <div className={clasess['ticketsitem-to-city']}>В ПУТИ</div>
              <div className={clasess['ticketsitem-to-time']}>{format(new Date(2024,8,1,0,ticket.segments[1].duration,0),`Hч mmм`)}</div>
            </div>
          </div>
          <div className={clasess['ticketsitem-replace']}>
            <div className={clasess['ticketsitem-to-first']}>
              <div className={clasess['ticketsitem-to-city']}>{ticket.segments[0].stops.length} TRANSFERS</div>
              <div className={clasess['ticketsitem-to-time']}>{!ticket.segments[0].stops.length ? `-` : ticket.segments[0].stops.join().split(' , ') }</div>
            </div>
            <div className={clasess['ticketsitem-to-second']}>
              <div className={clasess['ticketsitem-to-city']}>{ticket.segments[1].stops.length} TRANSFERS</div>
              <div className={clasess['ticketsitem-to-time']}>{!ticket.segments[1].stops.length ? `-` : ticket.segments[1].stops.join().split(' , ') }</div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};
export default TicketsItem;
