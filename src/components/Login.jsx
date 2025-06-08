import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import '../style/Login.css'

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let userCredential;
            if (isLogin) {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            } else {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
            }
            setUser(userCredential.user);
            navigate("/tovars");
        } catch (error) {
            console.error('Ошибка аутентификации:', error);
            
        }
    };

    return (
        <div className="login-container">
            <h2>{isLogin ? 'Войти' : 'Регистрация'}</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
                <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? 'Перейти к регистрации' : 'Уже есть аккаунт? Войти'}
                </button>
            </form>
        </div>
    );
}

export default Login;