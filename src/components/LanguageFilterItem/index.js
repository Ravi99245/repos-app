import './index.css'

const LanguageFilterItem = props => {
  const {item, isActive, updateActiveLanguage} = props
  const {id, language} = item
  console.log(isActive)
  const className = isActive ? 'styled-button' : ''

  const changeActiveLanguage = () => {
    updateActiveLanguage(id)
  }

  return (
    <li className="language-item">
      <button
        className={`button ${className}`}
        type="button"
        onClick={changeActiveLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
