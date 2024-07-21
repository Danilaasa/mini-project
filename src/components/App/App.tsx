import React from "react"
import { Header } from "../Header/Header"
import { UsersList } from "../UsersList/UsersList"
import { Routes, useLocation, useParams } from "react-router-dom"
import { Route } from "react-router-dom"
import { UserProfilePage } from "../UserProfilePage/UserProfilePage"
import { Location } from "react-router-dom"
import { UsersSearchPage } from "../UsersSearchPage/UsersSearchPage"
// import { UsersSearchPage } from "../UsersSearchPage/UsersSearchPage"

export const App = () => {
    // const param = useLocation().search.split("=")[1]
    // console.log(param)
    
    return (
        <React.Fragment>
            <Header  />
            <main>
                
            <Routes>

                <Route path="/"  element={<UsersList />}  />
                <Route path="/user/:id" element={<UserProfilePage />} />
                <Route path="/search" element={<UsersSearchPage />} />

            </Routes>

            </main>
        </React.Fragment>
    )
}