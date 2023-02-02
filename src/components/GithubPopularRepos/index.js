import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const loadingStages = {
  success: 'success',
  loading: 'loading',
  failure: 'failure',
}

class GithubPopularRepos extends Component {
  state = {status: '', itemList: [], selected: languageFiltersData[0]}

  componentDidMount() {
    this.setState({status: loadingStages.loading})
    this.getData()
  }

  getData = async () => {
    const {selected} = this.state

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${selected.id}`,
    )
    const data = await response.json()

    if (response.ok) {
      const itemList = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))

      this.setState({status: loadingStages.success, itemList})
    } else {
      this.setState({itemList: [], status: loadingStages.failure})
    }
  }

  onChangeItem = item =>
    this.setState({selected: item, status: loadingStages.loading}, this.getData)

  renderSuccess = () => {
    const {itemList} = this.state

    return (
      <ul className="reposContainer">
        {itemList.map(each => (
          <RepositoryItem item={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div className="failureContainer">
      <img
        className="failureimg"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1 className="failureheading">Something Went Wrong</h1>
    </div>
  )

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepoItems = () => {
    const {status} = this.state

    switch (status) {
      case 'success':
        return this.renderSuccess()
      case 'loading':
        return this.renderLoading()
      case 'failure':
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {selected} = this.state

    return (
      <div className="mainContainer">
        <h1 className="mainheading">Popular</h1>
        <ul className="languageContainer">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              selected={selected}
              item={each}
              onChangeItem={this.onChangeItem}
              key={each.id}
            />
          ))}
        </ul>
        {this.renderRepoItems()}
      </div>
    )
  }
}

export default GithubPopularRepos
