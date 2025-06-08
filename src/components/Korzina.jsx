import React from "react";
import "../style/Korzina.css";

const Korzina = ({cart, toggleCart, removeFromCart}) => {
    const totalPrice = cart.reduce((total, product) => total +(+product.price), 0);

    return(
        <div className="korz-overlay">
            <div className="korz-container">
                <button className="zakr" onClick={toggleCart}>Закрыть</button>
                <h2>Ваша корзина</h2>
                {cart.lenght === 0 ? (
                    <p>Корзина пуста</p>
                ) : (    
                    <ul className="korzina-list">
                        {cart.map((product) => (
                            <div className="korzina-card" key={product.id}>
                                <img className="img-korz" src={product.image} alt={product.name} />
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <p>Цена: {product.price}тг.</p>
                                <button className="remove" onClick={() => removeFromCart(product.id)}>Удалить</button>
                            </div>
                        ))}
                    </ul>
                )}
                <h3>Общая стоимость: {totalPrice}</h3>
            </div>
        </div>
    )
}

export default Korzina;