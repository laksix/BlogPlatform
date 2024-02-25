import React, { useState } from 'react';
import { RadioChangeEvent, ConfigProvider } from 'antd';
import { Radio } from 'antd';
import clasess from './ticketsfilters.module.scss'

  const TicketsFilters = () => {

const optionsWithDisabled = [
  { label: "САМЫЙ ДЕШЕВЫЙ", value: "free", disabled: false },
  { label: "САМЫЙ БЫСТРЫЙ", value: "fast", disabled: false },
  { label: "ОПТИМАЛЬНЫЙ", value: "optical", disabled: false },
];
  const [value4, setValue4] = useState("free");
  const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio4 checked", value);
    setValue4(value);
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
        onChange={onChange4}
        value={value4}
        optionType="button"
        buttonStyle="solid"
        size='large'
      />
</ConfigProvider>
    </>
  );
};

export default TicketsFilters;
