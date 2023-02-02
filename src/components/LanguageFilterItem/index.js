import './index.css'

const LanguageFilterItem = props => {
  const {selected, item, onChangeItem} = props

  const changeLanguage = () => {
    onChangeItem(item)
  }
  return (
    <li className="languageitem">
      <button
        type="button"
        className={
          selected.id === item.id ? 'selectedlanguagebutton' : 'languagebutton'
        }
        onClick={changeLanguage}
      >
        {item.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
