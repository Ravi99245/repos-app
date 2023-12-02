import './index.css'

const RepositoryItem = props => {
  const {item} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = item
  return (
    <div className="repository-item">
      <img src={avatarUrl} className="avatar" alt="avatar" />
      <h1 className="name">{name}</h1>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
          className="stars"
          alt="stars"
        />
        <p className="stars-description">{`${starsCount} stars`}</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          className="stars"
          alt="forks"
        />
        <p className="stars-description">{`${forksCount} forks`}</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          className="stars"
          alt="open issues"
        />
        <p className="stars-description">{`${issuesCount} open issues`}</p>
      </div>
    </div>
  )
}

export default RepositoryItem
