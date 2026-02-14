import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { HiMail, HiLockClosed, HiUser, HiCheckCircle } from 'react-icons/hi';
import './auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'password') {
            calculatePasswordStrength(value);
        }
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/)) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        setPasswordStrength(strength);
    };

    const getStrengthText = () => {
        const texts = ['Muito fraca', 'Fraca', 'Média', 'Boa', 'Forte', 'Muito forte'];
        return texts[passwordStrength];
    };

    const getStrengthColor = () => {
        const colors = ['#f44336', '#ff9800', '#ffc107', '#8bc34a', '#4caf50', '#2e7d32'];
        return colors[passwordStrength];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem');
            setLoading(false);
            return;
        }

        if (passwordStrength < 3) {
            setError('Por favor, escolha uma senha mais forte');
            setLoading(false);
            return;
        }

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao criar conta');
            }

            setSuccessMessage('Conta criada com sucesso! Redirecionando para login...');
            
            setTimeout(() => {
                navigate('/login', { 
                    replace: true
                });
            }, 2000);

        } catch (err) {
            setError(err.message || 'Erro ao criar conta');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialRegister = (provider) => {
        window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/${provider}`;
    };

    return (
        <div className="auth-page">
            <div className="auth-wrapper">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1 className="auth-title">Criar conta</h1>
                        <p className="auth-subtitle">Preencha os dados para começar</p>
                    </div>

                    {error && (
                        <div className="auth-alert error">
                            <span>{error}</span>
                        </div>
                    )}
                    
                    {successMessage && (
                        <div className="auth-alert success">
                            <HiCheckCircle />
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
                                placeholder="Nome completo"
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

                        {formData.password && (
                            <div className="password-strength">
                                <div className="strength-bar">
                                    <div 
                                        className="strength-fill"
                                        style={{ 
                                            width: `${(passwordStrength / 5) * 100}%`,
                                            backgroundColor: getStrengthColor()
                                        }}
                                    ></div>
                                </div>
                                <span style={{ color: getStrengthColor() }}>
                                    {getStrengthText()}
                                </span>
                            </div>
                        )}

                        <div className="input-group">
                            <div className="input-icon">
                                <HiCheckCircle />
                            </div>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirmar senha"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                minLength="6"
                                className="auth-input"
                            />
                        </div>

                        <div className="terms-checkbox">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">
                                Eu aceito os <Link to="/terms">Termos de Serviço</Link> e{' '}
                                <Link to="/privacy">Política de Privacidade</Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="auth-button primary"
                            disabled={loading}
                        >
                            {loading ? 'Processando...' : 'Criar conta'}
                        </button>
                    </form>

                    <div className="social-login">
                        <div className="social-divider">
                            <span>ou cadastre-se com</span>
                        </div>

                        <div className="social-buttons">
                            <button
                                onClick={() => handleSocialRegister('google')}
                                className="social-button google"
                            >
                                <FcGoogle />
                                <span>Google</span>
                            </button>
                            <button
                                onClick={() => handleSocialRegister('github')}
                                className="social-button github"
                            >
                                <FaGithub />
                                <span>GitHub</span>
                            </button>
                        </div>
                    </div>

                    <div className="auth-footer">
                        <p>
                            Já tem uma conta?{' '}
                            <Link to="/login" className="auth-link">
                                Faça login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;