import './index.css'

const RepositoryItem = props => {
  const {item} = props

  return (
    <li className="repoItem">
      <img className="repoimg" alt={item.name} src={item.avatarUrl} />
      <h1 className="repoheading">{item.name}</h1>
      <p className="repopara">
        <img
          className="repoicon"
          alt="stars"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
        />
        {item.starsCount} stars
      </p>
      <p className="repopara">
        <img
          className="repoicon"
          alt="forks"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
        />
        {item.forksCount} forks
      </p>
      <p className="repopara">
        <img
          className="repoicon"
          alt="open issues"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
        />
        {item.issuesCount} open issues
      </p>
    </li>
  )
}

export default RepositoryItem
