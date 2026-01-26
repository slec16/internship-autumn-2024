import styles from "./App.module.scss"
import { Routes, Route, Navigate } from "react-router-dom"
import Advertisement from "@/pages/advertisement"
import Advertisements from "@/pages/advertisements"
import Orders from "@/pages/orders"
import Header from "@/widgets/header"

const App = () => {

    return(
        <div className="container">
            <Header />
            <Routes>
                <Route path="/" element={ <Navigate to="/advertisements" replace /> } />
                <Route path="/advertisements" element={ <Advertisements /> } />
                <Route path="/advertisements/:id" element={ <Advertisement /> } />
                <Route path="/orders" element={ <Orders /> } />
            </Routes>
        </div>
    )
}

export default App