import React, { FC } from "react"
import { Resolver } from "webpack"
import { Link, useLocation, useParams } from "react-router-dom"

export interface User {
        login: string,
        id: number, 
        node_id: string,
        avatar_url: string,
        gravatar_id: string,
        url: string,
        html_url: string,
        followers_url: string,
        gists_url: string,
        starred_url:  string,
        subscriptions_url: string,
        organizations_url: string,
        repos_url: string,
        events_url: string,
        received_events_url: string, 
        type: string,
        site_admin: boolean
}
interface UserInfo {
        login: string,
        id: number,
        node_id: string,
        avatar_url: string,
        gravatar_id: string,
        url: string,
        html_url: string,
        followers_url: string,
        following_url: string,
        gists_url: string,
        starred_url: string,
        subscriptions_url: string,
        organizations_url: string,
        repos_url: string,
        events_url: string,
        received_events_url: string,
        type: string,
        site_admin: boolean,
        name: string,
        company: string,
        blog: string,
        location: string,
        email: string | null,
        hireable: string | null,
        bio: string | null,
        twitter_username: string | null,
        public_repos: number,
        public_gists: number,
        followers: number,
        following: number,
        created_at: string,
        updated_at: string
      
}
// interface Props  {
//     param: string
// }


export const UsersList = () => {
    const [users, setUsers] = React.useState<Array<User>>([])
    const [searchUser, setSearchUser] = React.useState(Object)
    React.useEffect(() => {
        fetch("https://api.github.com/users")
            .then(response => response.json())
            .then(response => {
                setUsers(response)
                
            })
    }, [])
    const normalize_count_form = (number:number, words_arr: Array<string>) => {
        number = Math.abs(number);
        if (Number.isInteger(number)) {
          let options = [2, 0, 1, 1, 1, 2];
          return words_arr[(number % 100 > 4 && number % 100 < 20) ? 2 : options[(number % 10 < 5) ? number % 10 : 5]];
        }
        return words_arr[1];
      }
      
      
    return (
        
        <div className="container">
            <section className="articles grid">
                
                


                {users.map((user) => {
                    return (
                <article className="card" key={user.id}>
                        <img src={user.avatar_url} className="card-image" alt="user icon"/>
                        <div className="card-info">
                        <p className="card-info__text"> <Link to={`/user/${user.id}`} className="card-info__link"> {user.login},</Link>
                        {`${user.id} ${normalize_count_form(user.id, ["репозиторий", "репозитория", "репозиториев"])}`}
                        </p>
                        <h2 className="card-info__description">
                            {user.node_id}
                        </h2>
                        </div> 
                </article>
                    )
                }) }

                
                        
                   
                
            </section>
        </div>
    
    )
}