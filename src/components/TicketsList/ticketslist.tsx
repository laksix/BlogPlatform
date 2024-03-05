import clasess from './ticketslist.module.scss';
import TicketsItem from '../ticketsitem';
import { Button, ConfigProvider } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import Loader from '../loader/loader';
import { useEffect, useMemo, useState } from 'react';
import { fetchTickets } from '../store/reducers/ActionCreators';
import { ITicket } from '../models/Tickets';

interface ticketProps {
  ticketItemsFiltred: ITicket[];
}

const TicketsList = ({ ticketItemsFiltred }: ticketProps) => {
  const dispatch = useAppDispatch();
  const errorStatus = useAppSelector((state) => state.Tickets.error);
  const count = useAppSelector((state) => state.Tickets.count);
  const ID = useAppSelector((state) => state.Tickets.ID);
  useEffect(() => {
    dispatch(fetchTickets(ID));
  }, [errorStatus, count]);
  const loadingStatus = useAppSelector((state) => state.Tickets.isLoading);
  const allTickets = ticketItemsFiltred;
  const currentPrice = useAppSelector((state) => state.filterReducer.filter);
  const [begin, setBegin] = useState(0);
  const finalTicketsSort = useMemo<ITicket[]>(() => {
    if (currentPrice === 'free') {
      return [...allTickets].sort((a, b) => a.price - b.price).splice(begin, begin + 5);
    }
    if (currentPrice === 'fast') {
      let res1 = 0;
      let res2 = 0;
      return [...allTickets]
        .sort((a, b) => {
          a.segments.forEach((e) => (res1 += e.duration));
          b.segments.forEach((e) => (res2 += e.duration));
          return res1 - res2;
        })
        .splice(begin, begin + 5);
    }
    return [...allTickets].splice(begin, begin + 5);
  }, [allTickets, begin, currentPrice]);

  return (
    <>
      <ul className={clasess.listitem}>
        {loadingStatus ? (
          <Loader />
        ) : (
          <>
            {!finalTicketsSort.length ? <div>Билетов нет, че угараешь?</div> : (finalTicketsSort.map((e, index) => {
              return <TicketsItem ticket={e} key={index} />;
            }))}
          </>
        )}
      </ul>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              fontSizeLG: 11,
            },
          },
          token: {
            fontFamily: 'Open Sans',
          },
        }}
      >
        <Button onClick={() => setBegin(begin + 5)} size="large" type="primary">
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </Button>
      </ConfigProvider>
    </>
  );
};

export default TicketsList;
