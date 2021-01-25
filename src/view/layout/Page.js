import React from 'react'
import "./Page.scss"

const Page = ({children}) => {
    return (
        <div className="page">
            <h1 className="title">Kart Racing Simulator</h1>
            {children}
        </div>
    )
}

export default Page
