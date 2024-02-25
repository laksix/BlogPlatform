import React, {useState} from 'react'
import clasess from './aside.module.scss'
import { Checkbox} from 'antd';
import { CheckboxProps, GetProp, ConfigProvider } from 'antd';

const Aside = () => {
    type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number];
    const CheckboxGroup = Checkbox.Group;
    const plainOptions = ['Без пересадок', '1 пересадка', '2 пересадки','3 пересадки'];
    const defaultCheckedList = ['Без пересадок', '1 пересадка', '2 пересадки'];
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);

    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
  
    const onChange = (list: CheckboxValueType[]) => {
      setCheckedList(list);
    };
  
    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
      setCheckedList(e.target.checked ? plainOptions : []);
    };
    return (
    <div className={clasess['aside-menu']}>
        <div className={clasess['aside-menu-title']}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
        <ConfigProvider
        theme={{
      token: {
        fontFamily: 'Open Sans',
        fontSize: 13,
        colorText: '#4A4A4A',
        paddingXS: 10,
        controlInteractiveSize:20,
      },
    }}
  >
    
    <Checkbox style={{marginLeft:20,marginBottom:15,fontFamily:'Open Sans',fontSize:13}} indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Все
      </Checkbox>
      <CheckboxGroup style={{marginLeft:20,display:'flex',gap:15,fontSize:13}} options={plainOptions} value={checkedList} onChange={onChange} />
      </ConfigProvider>
    </div>
    )
}
export default Aside