

import clasess from '../createNewUser/createNewUser.module.scss'

const TagsList = ({value, onDelete, onChange}) => {
    return (
        <div className={clasess.buttonsTags} id = 'currentTag'>
        <input type="text" value = {value} onChange = {onChange} maxLength={20} className={clasess.newTag}/>
        <div className={clasess.buttons}>
        <div className={clasess.deleteButton} onClick = {onDelete}>Delete</div>
        </div>
      </div>
    )
}

export default TagsList