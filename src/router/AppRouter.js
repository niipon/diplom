import React, { useState } from "react";
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from "../components/Home";
import Contacts from "../components/Contacts";
import Korzina from "../components/Korzina";
import Tovars from "../components/Tovars";
import Login from "../components/Login";
import { auth } from "../FirebaseConfig";
import ProtectedRoute from "./ProtectedRoute";
import '../style/Nav.css'

const AppRouter = () => {
    const [cart, setCart] = React.useState([]);
    const [isCartOpen, setIsCartOpen] = React.useState(false);
    const [user, setUser] = useState(null);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    }

    const addToCart = (product) => {
        setCart((prevCart)=> [...prevCart, product]);
    }

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((product) => product.id !== productId))
    }
    return (
        <Router>
            <nav className="navbar">
                <Link to='/'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 19v-6.733a4 4 0 0 0-1.245-2.9L13.378 3.31a2 2 0 0 0-2.755 0L4.245 9.367A4 4 0 0 0 3 12.267V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2"/></svg>Главная</Link>
                <Link to='/tovars'><svg xmlns="http://www.w3.org/2000/svg" width="2048" height="2048" viewBox="0 0 2048 2048"><path fill="currentColor" d="m960 120l832 416v1040l-832 415l-832-415V536zm625 456L960 264L719 384l621 314zM960 888l238-118l-622-314l-241 120zM256 680v816l640 320v-816zm768 1136l640-320V680l-640 320z"/></svg>Товары</Link>
                <Link to='/contacts'><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="#FF7043" d="M38 44H12V4h26c2.2 0 4 1.8 4 4v32c0 2.2-1.8 4-4 4"/><path fill="#BF360C" d="M10 4h2v40h-2c-2.2 0-4-1.8-4-4V8c0-2.2 1.8-4 4-4"/><g fill="#AB300B"><circle cx="26" cy="20" r="4"/><path d="M33 30s-1.9-4-7-4s-7 4-7 4v2h14z"/></g></svg>Контакты</Link>
                {!user ? (<Link to='/login'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 12h9m0 0l-3.333-4M22 12l-3.333 4M14 7V5.174a2 2 0 0 0-2.166-1.993l-8 .666A2 2 0 0 0 2 5.84v12.32a2 2 0 0 0 1.834 1.993l8 .667A2 2 0 0 0 14 18.826V17"/></svg>Войти</Link>) : (
                    <button className="enter" onClick={() => auth.signOut().then(() => setUser(null))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1.75 9.25h10.5l2-2.25l-2-2.25H1.75zm5.5.5v4.5m0-12.5v2.5"/></svg>Выйти</button>
                )}
                <button className="korzina" onClick={toggleCart}>Корзина ({cart.length})</button>
            </nav>
            {isCartOpen && <Korzina toggleCart={toggleCart} cart={cart} removeFromCart={removeFromCart}/>}
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/tovars" element={<ProtectedRoute user={user} element={<Tovars addToCart={addToCart}/>}/>}/>
                <Route path="/contacts" element={<Contacts/>} />
                <Route path="/login" element={<Login setUser={setUser}/>} />
            </Routes>
        </Router>
    )
}

export default AppRouter;