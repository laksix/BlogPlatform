import clasess from './navigation.module.scss'
import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <div className={clasess.title}>
            <div className={clasess['title-name']}><Link className={clasess['title-name']} to = '/articles'>Realworld Blog</Link></div>
            <div className={clasess.auth}>
                <div className={clasess.authOff}>Sign In</div>
                <div className={clasess.authOn}>Sign Up</div>
            </div>
        </div>
    )
}

export default Navigation