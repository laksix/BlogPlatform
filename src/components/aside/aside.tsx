
import clasess from './aside.module.scss'
import { Checkbox} from 'antd';
import { ConfigProvider } from 'antd';
import { AsideFilterSlice } from '../store/reducers/AsideFilter';
import { useAppDispatch, useAppSelector} from '../hooks/redux';

const Aside = () => {
    const {setCurrentFilters} = AsideFilterSlice.actions
    const {setFiltersAll} = AsideFilterSlice.actions
    const dispatch = useAppDispatch()
    const CheckboxGroup = Checkbox.Group;
    const plainOptions = useAppSelector(state => state.AsideFilter.plainOptions);
   
    const checkedList = useAppSelector(state => state.AsideFilter.currentFilters)
    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
  
    const onChange = (list) => {
      dispatch(setCurrentFilters(list))
    };
  
    const onCheckAllChange = (e) => {
      dispatch(setFiltersAll(e.target.checked))
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