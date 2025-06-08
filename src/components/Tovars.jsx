import React, { useState, useEffect } from "react";
import { db } from "../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../style/Tovars.css"; 


const Tovars = ({addToCart}) => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'tovars'));
                const productsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                setProducts(productsData);
            } catch (error) {
                console.error("Ошибка на серверк", error);
            }
        }
        fetchProducts();
            

    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery));
    return (
        <div className="tovars-list">
            <h1>Список товаров</h1>
            <input type="text" placeholder="Поиск товаров..." value={searchQuery} onChange={handleSearchChange} className="tovars-input"/>
            <ul className="tovars-list__items">
                {products.length === 0 && <p className="zagruzka-tovars">Загрузка...</p>}
                {filteredProducts.map((product) => (
                    <div className="tovars-card" key={product.id}>
                        <div className="tovars">
                        <img src={product.image} alt="produc.img" />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Цена: {product.price}тг.</p>
                        <button className="product-btn" onClick={() => addToCart(product)}>Добавить в корзину</button>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default Tovars;