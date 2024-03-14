import Articles from "../Articles/articles"
import Navigation from "../Navigation/navigation"
import {Routes,Route} from 'react-router-dom'
import { useAppSelector} from "../hooks/redux"
import ArticleCurrentItem from "../articleCurrentItem/articleCurrentItem"

const Section = () => {
    const currentSlug = useAppSelector(state => state.Aritcles.currentSlug);
    return (
        <>
        <Navigation/>
        <Routes>
            <Route path={`/articles/${currentSlug}/*`} element = {<ArticleCurrentItem/>}/>
            <Route path="/articles" element = {<Articles/>}/>
            <Route path="/" element = {<Articles/>}/>
            <Route path = '*' element = {<div>Page is not found</div>}/>
        </Routes>
        </>
    )
}
export default Section