import React, { ChangeEvent, MouseEventHandler } from "react"
import { Location, useLocation, useParams, Link } from "react-router-dom"
import { User } from "../UsersList/UsersList"
export const Header = () => {
    const [login, setLogin] = React.useState<string>("")
    const { pathname } = useLocation()
    const id = pathname.slice(6).split("/")[0]
    const param = useLocation()
    const [value, setValue] = React.useState<string>("")
    // const [idSearch, setIdSearch] = React.useState<number | null>(null)
    React.useEffect(() => {
        if (id === "") {
            return 
        }
        fetch(`https://api.github.com/user/${id}`)
        .then(response => {
            if (response.status === 404) {
                throw new Error("Ошибка")
            }
            return response.json()
        })
        .then(response => setLogin(response.login))
        .catch((e) => {
            console.log(e)
        })
    }, [id])

    // const onHandleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    //     setValue(e.target.value.trim())
    // }
   
    
    return (
    <header> 
        <div className="container">
            <nav className="navigation">
                <h1 className="navigation-text"><Link onClick={() => setValue("")} to="/" className="LinkNav">Пользователи гитхаба</Link> <span className="navigation-text-span">
               {id !== "" && pathname.slice(0, 5) === "/user" ? `// ${login}` : pathname === "/search" ? "// Поиск" : null}
                </span></h1>
                <form className="navigation-search"  >
                    <input value={value} onChange={(e) => setValue(e.target.value)} className="navigation-search-search-input" placeholder="Поиск пользователя" type="text"/>
                    <button  className="navigation-search-search-button"><Link className="navigation-search-search-button" to={`/search?query=${value}`}>Найти</Link></button>
                </form>
            </nav>  
        </div> 
     </header> 
    )
}