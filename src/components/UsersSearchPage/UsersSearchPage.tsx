import React, { FC } from "react";
import { useParams, Link, useLocation, useSearchParams, useHref, useNavigate } from "react-router-dom";
import { User } from "../UsersList/UsersList";
// interface Props {
//     param: string
// }
export const UsersSearchPage = ()=> {
    
    const [usersSearch, setUsersSearch] =  React.useState([])
    const searchText = useLocation().search.split("=")[1]
    

    React.useEffect(() => {
        fetch(`https://api.github.com/users`)
            .then(response => response.json())
            .then(response => setUsersSearch(response))
            
    }, [searchText])

    const normalize_count_form = (number:number, words_arr: Array<string>) => {
        number = Math.abs(number);
        if (Number.isInteger(number)) {
          let options = [2, 0, 1, 1, 1, 2];
          return words_arr[(number % 100 > 4 && number % 100 < 20) ? 2 : options[(number % 10 < 5) ? number % 10 : 5]];
        }
        return words_arr[1];
      }
      let bool = false


      const func = () => {
        let uri = encodeURIComponent(searchText)
        return <h1 className="ifNotSearch">По запросу {decodeURIComponent(uri)} ничего не найдено</h1>
      }

    return (
        <div className="container">
            <section className="articles grid"> 

            
            

                {usersSearch.map((user:User) => {
                    if (user.login === searchText) {
                        bool = true
                        return(
                            <article className="card" key={user.id}>
                                <img src={user.avatar_url} className="card-image" alt="user icon"/>
                                <div className="card-info">
                                <p className="card-info__text"> <Link to={`/user/${user.id}`} className="card-info__link">{user.login} ,</Link>
                                {`${user.id} ${normalize_count_form(user.id, ["репозиторий", "репозитория", "репозиториев"])}`}
                                </p>
                                <h2 className="card-info__description">
                                    {user.node_id}
                                </h2>
                                </div> 
                            </article> 
                        )
                    }
                        
                    
                       
                    
                })  }
                {!bool && func() }
                
            </section>
        </div>
    )
}