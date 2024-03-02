
import { RadioChangeEvent, ConfigProvider } from 'antd';
import { Radio } from 'antd';
import clasess from './ticketsfilters.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux';


import {FilterSlice} from '../store/reducers/FilterSlice';


  const TicketsFilters = () => {

const optionsWithDisabled = [
  { label: "САМЫЙ ДЕШЕВЫЙ", value: "free"},
  { label: "САМЫЙ БЫСТРЫЙ", value: "fast"},
  { label: "ОПТИМАЛЬНЫЙ", value: "optical"},
];

const currentFilter = useAppSelector(state => state.filterReducer.filter)
const {switchFilter} = FilterSlice.actions
const dispatch = useAppDispatch()

  const onChangePrice = ({ target: { value } }: RadioChangeEvent) => {
    dispatch(switchFilter(value))
  };
  

    
    return (
    <>
    <ConfigProvider
  theme={{
    components:{
        Radio: {
           fontSizeLG:11,
           buttonPaddingInline:33,
        },
    },
    token: {
      fontFamily: 'Open Sans',
    },
  }}
>
<Radio.Group
      className={clasess['ticketsFilter-text']}
        options={optionsWithDisabled}
        onChange={onChangePrice}
        value={currentFilter}
        optionType="button"
        buttonStyle="solid"
        size='large'
      />
</ConfigProvider>
    </>
  );
};

export default TicketsFilters;
