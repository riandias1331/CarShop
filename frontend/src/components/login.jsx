import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { HiMail, HiLockClosed, HiUser } from 'react-icons/hi';
import './auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao fazer login');
            }

            setSuccessMessage('Login realizado com sucesso! Redirecionando...');

            localStorage.setItem('token', data.token || '');
            localStorage.setItem('username', data.user?.username || 'Usuário');

            setTimeout(() => {
                navigate('/main', {
                    replace: true,
                    state: { fromLogin: true }
                });
            }, 1000);

        } catch (err) {
            setError(err.message || 'Erro ao processar login');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (provider) => {
        // Implementar lógica de login social aqui
        window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/${provider}`;
    };

    return (
        <div className="auth-page">
            <div className="auth-wrapper">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1 className="auth-title">Bem-vindo de volta</h1>
                        <p className="auth-subtitle">Faça login para continuar</p>
                    </div>

                    {error && (
                        <div className="auth-alert error">
                            <span>{error}</span>
                        </div>
                    )}
                    
                    {successMessage && (
                        <div className="auth-alert success">
                            <span>{successMessage}</span>
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <div className="input-icon">
                                <HiUser />
                            </div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome de usuário"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="auth-input"
                            />
                        </div>

                        <div className="input-group">
                            <div className="input-icon">
                                <HiMail />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="auth-input"
                            />
                        </div>

                        <div className="input-group">
                            <div className="input-icon">
                                <HiLockClosed />
                            </div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Senha"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength="6"
                                className="auth-input"
                            />
                        </div>

                        <div className="forgot-password">
                            <Link to="/forgot-password">Esqueceu a senha?</Link>
                        </div>

                        <button
                            type="submit"
                            className="auth-button primary"
                            disabled={loading}
                        >
                            {loading ? 'Processando...' : 'Entrar'}
                        </button>
                    </form>

                    <div className="social-login">
                        <div className="social-divider">
                            <span>ou continue com</span>
                        </div>

                        <div className="social-buttons">
                            <button
                                onClick={() => handleSocialLogin('google')}
                                className="social-button google"
                            >
                                <FcGoogle />
                                <span>Google</span>
                            </button>
                            <button
                                onClick={() => handleSocialLogin('github')}
                                className="social-button github"
                            >
                                <FaGithub />
                                <span>GitHub</span>
                            </button>
                        </div>
                    </div>

                    <div className="auth-footer">
                        <p>
                            Não tem uma conta?{' '}
                            <Link to="/register" className="auth-link">
                                Cadastre-se
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;