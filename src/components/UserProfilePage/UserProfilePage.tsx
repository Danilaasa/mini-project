import React from "react";
import { Location } from "react-router-dom";
import { useParams } from "react-router-dom";

interface UsersInfo {
    avatar_url: string
    bio: string
    blog: string | null
    company: string | null
    created_at: string
    email: string | null
    events_url: string
    followers: number
    followers_url: string
    following: number
    following_url: string
    gists_url: string
    gravatar_id: string
    hireable: string | null
    html_url: string
    id: number
    location: string |null
    login: string
    name: string
    node_id: string
    organizations_url: string
    public_gists: number
    public_repos: number
    received_events_url: string
    repos_url: string
    site_admin: false
    starred_url: string
    subscriptions_url: string
    twitter_username: string | null
    type: string
    updated_at: string
    url: string
}
interface UserRepo {
    allow_forking: boolean
    archive_url: string
    archived: boolean
    assignees_url: string
    blobs_url: string
    branches_url: string
    clone_url: string
    collaborators_url: string
    comments_url: string
    commits_url: string
    compare_url: string
    contents_url: string
    contributors_url: string
    created_at: string
    default_branch: string
    deployments_url: string
    description: string
    disabled: boolean
    downloads_url: string
    events_url: string
    fork: boolean
    forks: number
    forks_count: number
    forks_url: string
    full_name: string
    git_commits_url: string
    git_refs_url: string
    git_tags_url: string
    git_url: string
    has_discussions: boolean
    has_downloads: boolean
    has_issues: boolean
    has_pages: boolean
    has_projects: boolean
    has_wiki: boolean
    homepage: string
    hooks_url: string
    html_url: string
    id: number
    is_template: boolean
    issue_comment_url: string
    issue_events_url: string
    issues_url: string
    keys_url: string
    labels_url: string
    language: string
    languages_url: string
    merges_url: string
    milestones_url: string
    mirror_url: string | null
    name: string
    node_id: string
    notifications_url: string
    open_issues: number
    open_issues_count:number
    private: boolean
    pulls_url: string
    pushed_at: string
    releases_url: string
    size: number
    ssh_url: string
    stargazers_count: number
    stargazers_url: string
    statuses_url: string
    subscribers_url: string
    subscription_url: string
    svn_url: string
    tags_url: string
    teams_url: string
    trees_url: string
    updated_at: string
    url: string
    visibility: string
    watchers: number
    watchers_count: number
    web_commit_signoff_required: boolean
}

export const UserProfilePage = () => {
    
    const params = useParams()
    const [userInfo, setUserInfo] = React.useState<UsersInfo>(Object)
    const [repos, setRepos] = React.useState<Array<UserRepo>>([])
    React.useEffect(() => {
        fetch(`https://api.github.com/user/${params.id}`)
        .then(response => response.json())
        .then(response => {
            setUserInfo(response)
            return fetch(`https://api.github.com/users/${response.login}/repos`)
        })
        .then(response => response.json())
        .then(response => setRepos(response))
        
    }, [])
  

    return (
    
    
        <article className="usercard">
            <div className="container">
            <div className="usercard-info">
            <img className="usercard-info__image" src={userInfo.avatar_url} alt="userimage"/>
            <div className="usercard-info__text">
            <p className="usercard-info__name">{`${userInfo.name!==null ? userInfo.name : ""}`} <a className="usercard-info__link" href="#">{userInfo.login}</a></p>
            <p className="usercard-info__data">
                <span className="spaninfo">
                {(userInfo.followers !== undefined || userInfo.followers !== null) ? userInfo.followers : 0}
                </span> подписчиков ·<span className="spaninfo">
                {(userInfo.following !== undefined || userInfo.following !== null) ? userInfo.following : 0}
                    </span> подписок · <a href={`${userInfo.blog}` ? `${userInfo.blog}` : `${userInfo.html_url}`} className="spaninfo">{userInfo.blog ? userInfo.blog : userInfo.html_url}</a></p>
                </div>
            </div>
            
            
            <div className="usercard-repo">
                <div className="usercard-repo__static">
                    <h1 className="usercard-repo__title">{!repos.length ? "Репозиториев нет" : "Репозитории"}</h1>
                    <a className="usercard-repo__link" href={`https://github.com/${userInfo.login}?tab=repositories`}>Все репозитории</a>
                </div>
                <div className="usercard-repo__listrepo">
                    {repos.map((repo) => {
                        return (
                    <article className="usercard-repo__item" key={repo.id}>
                        <div className="usercard-repo__item-container">
                            <a className="usercard-repo__item-link" href={repo.html_url}>{repo.name}</a>
                            <p className="usercard-repo__item-text">{repo.description || repo.full_name}</p>
                        </div>
                    </article>
                        )
                    })}
                    
                    
                </div>
            </div>
        </div>
    </article>)
}