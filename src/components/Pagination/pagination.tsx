import { Pagination } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {AritcleSlice} from '../store/reducers/AritcleSlice';

const Pages = () => {
    const totalPages = useAppSelector(state => state.Aritcles.totalPages)
    const dispatch = useAppDispatch()
    const currentPage = useAppSelector(state => state.Aritcles.currentPage)
    return (
        <Pagination current={currentPage > 0 ? currentPage : 1} onChange={(page) => dispatch(AritcleSlice.actions.articleSetCurrentPage(page))} showSizeChanger={false} pageSize={5} defaultCurrent={1} total={totalPages}/>
    )
}

export default Pages