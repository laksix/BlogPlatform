import Articles from "../Articles/articles"
import Navigation from "../Navigation/navigation"
import {Routes,Route} from 'react-router-dom'
import { useAppSelector} from "../hooks/redux"
import ArticleCurrentItem from "../articleCurrentItem/articleCurrentItem"
import CreateNewUser from "../createNewUser/createNewUser"
import SignUser from "../signUser/signUser"
import PrivateRoute from "../PrivateRoute/PrivateRoute"
import PrivateRouteProfile from "../PrivateRoute/PrivateRouteProfile"
import Profile from "../profile/profile"
import CreateNewArticle from "../createNewArticle/createNewArticle"
import PrivateRouteDelete from "../PrivateRoute/PrivateRouteDelete"
import EditArticle from "../editArticle/editArticle"
const Section = () => {
    const currentSlug = useAppSelector(state => state.Aritcles.currentSlug);
    return (
        <>
        <Navigation/>
        <Routes>
        <Route element = {<PrivateRouteProfile/>}>
            <Route path={`/article/${currentSlug}/edit/*`} element = {<EditArticle/>}/>
            <Route path = "/profile" element = {<Profile/>}/>
            <Route path = "/new-article" element={<CreateNewArticle/>}/>
            </Route>
            <Route element = {<PrivateRoute/>}>
            <Route path="/sign-up" element = {<CreateNewUser/>}/>
            <Route path="/sign-in" element = {<SignUser/>}/>
            </Route>
            <Route element = {<PrivateRouteDelete/>}>
            <Route path={`/articles/${currentSlug}/*`} element = {<ArticleCurrentItem/>}/>
            </Route>
            <Route path="/articles" element = {<Articles/>}/>
            <Route path="/" element = {<Articles/>}/>
            <Route path = '*' element = {<div>Page is not found</div>}/>
        </Routes>
        </>
    )
}
export default Section