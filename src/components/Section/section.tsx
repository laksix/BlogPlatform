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
const Section = () => {
    const currentSlug = useAppSelector(state => state.Aritcles.currentSlug);
    return (
        <>
        <Navigation/>
        <Routes>
        <Route element = {<PrivateRouteProfile/>}>
            <Route path = "/profile" element = {<Profile/>}/>
            </Route>
            <Route element = {<PrivateRoute/>}>
            <Route path="/sign-up" element = {<CreateNewUser/>}/>
            <Route path="/sign-in" element = {<SignUser/>}/>
            </Route>
            <Route path={`/articles/${currentSlug}/*`} element = {<ArticleCurrentItem/>}/>
            <Route path="/articles" element = {<Articles/>}/>
            <Route path="/" element = {<Articles/>}/>
            <Route path = '*' element = {<div>Page is not found</div>}/>
        </Routes>
        </>
    )
}
export default Section