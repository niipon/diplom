import React from "react";
import '../style/Home.css'

const Home = () => {
    return (
        <div className="home">
            <h1>Добро пожаловать в магазин 
                <a href="/tovars" className="home-link">
                <span> спорт товаров</span>
                </a>
            </h1>
            <p>Здесь вы найдете лучшие товары для спорта</p>
        </div>
    )
}

export default Home;