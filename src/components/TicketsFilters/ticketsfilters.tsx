import { RadioChangeEvent, ConfigProvider } from 'antd';
import { Radio } from 'antd';
import clasess from './ticketsfilters.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

import { FilterSlice } from '../store/reducers/FilterSlice';
import { useState } from 'react';

const TicketsFilters = () => {
  const optionsWithDisabled = [
    { label: 'САМЫЙ ДЕШЕВЫЙ', value: 'free' },
    { label: 'САМЫЙ БЫСТРЫЙ', value: 'fast' },
    { label: 'ОПТИМАЛЬНЫЙ', value: 'optical', disable: true },
  ];

  const currentFilter = useAppSelector((state) => state.filterReducer.filter);
  const { switchFilter } = FilterSlice.actions;
  const dispatch = useAppDispatch();

  const onChangePrice = ({ target: { value } }: RadioChangeEvent) => {
    dispatch(switchFilter(value));
  };
  const [size,setSize] = useState(0)
  const [fontSize,setFontSize] = useState(0)
  const resizeWindow = () => {
    if (document.body.clientWidth > 718){
      setSize(33)
      setFontSize(11)
    }
    if (document.body.clientWidth < 718){
      setSize(13)
      setFontSize(9)
    }
  }
  const loadWindow = () => {
    if (document.body.clientWidth > 718){
      setSize(33)
      setFontSize(11)
    }
    if (document.body.clientWidth < 718){
      setSize(13)
      setFontSize(9)
    }
  }
  window.addEventListener('resize',resizeWindow)
  window.addEventListener('load',loadWindow)
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Radio: {
              fontSizeLG: fontSize,
              buttonPaddingInline: size,

            },
          },
          token: {
            fontFamily: 'Open Sans',
          },
        }}
      >
        <Radio.Group
          style={{whiteSpace:'nowrap'}}
          className={clasess['ticketsFilter-text']}
          options={optionsWithDisabled}
          onChange={onChangePrice}
          value={currentFilter}
          optionType="button"
          buttonStyle="solid"
          size="large"
        />
      </ConfigProvider>
    </>
  );
};

export default TicketsFilters;
