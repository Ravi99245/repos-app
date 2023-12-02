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

const apiStatusText = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    activeLanguage: languageFiltersData[0].id,
    apiStatus: apiStatusText.initial,
    reposList: [],
  }

  componentDidMount() {
    this.getRepos()
    this.setState({apiStatus: apiStatusText.loading})
  }

  getRepos = async () => {
    const {activeLanguage} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData.popular_repos)
      const data = fetchedData.popular_repos
      const updatedData = data.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      console.log(updatedData)
      this.setState({
        reposList: updatedData,
        apiStatus: apiStatusText.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusText.failure})
    }
  }

  updateActiveLanguage = id => {
    this.setState(
      {activeLanguage: id, apiStatus: apiStatusText.loading},
      this.getRepos,
    )
  }

  renderLoadingDetails = () => (
    <>
      {this.renderHeaderDetails()}
      <div data-testid="loader" className="loaderContainer">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    </>
  )

  renderSuccessDetails = () => {
    const {reposList} = this.state

    return (
      <>
        {this.renderHeaderDetails()}
        <div className="list-container">
          <ul className="items-container">
            {reposList.map(eachRepo => (
              <RepositoryItem key={eachRepo.id} item={eachRepo} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailureDetails = () => (
    <>
      {this.renderHeaderDetails}
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
          className="failure-image"
          alt="failure view"
        />
        <h1 className="failedText">Something Went Wrong</h1>
      </div>
    </>
  )

  renderHeaderDetails = () => {
    const {activeLanguage} = this.state
    return (
      <div className="repos-container">
        <h1 className="heading">Popular</h1>
        <ul className="languages">
          {languageFiltersData.map(languageItem => (
            <LanguageFilterItem
              key={languageItem.id}
              item={languageItem}
              isActive={activeLanguage === languageItem.id}
              updateActiveLanguage={this.updateActiveLanguage}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {activeLanguage, apiStatus} = this.state
    console.log(activeLanguage, apiStatus)

    switch (apiStatus) {
      case apiStatusText.loading:
        return this.renderLoadingDetails()
      case apiStatusText.success:
        return this.renderSuccessDetails()
      case apiStatusText.failure:
        return this.renderFailureDetails()
      default:
        return null
    }
  }
}

export default GithubPopularRepos
