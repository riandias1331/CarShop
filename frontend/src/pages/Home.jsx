import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Home.css';

export default function Home() {
  const [animatedText, setAnimatedText] = useState('');
  const fullText = 'Carros de Luxo Exclusivos';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setAnimatedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleGoogleLogin = () => {
    alert("Login com Google clicado!");
    // Futuro: redirecionar para rota do backend
    // window.location.href = "http://localhost:4001/auth/google";
  };

  const handleGitHubLogin = () => {
    // Redireciona para o backend que inicia o OAuth do GitHub
    window.location.href = "http://localhost:4001/auth/github"; // ajuste a porta se necessário
  };

  return (
    <div className="home-page">
      {/* Header simples */}
      <header className="home-header">
        <div className="home-logo">
          <span className="logo-icon">🏎️</span>
          <h2>CarElite</h2>
        </div>
        <nav className="home-nav">
          <Link to="/">Início</Link>
          <Link to="/cars">Carros</Link>
          <Link to="/about">Sobre</Link>
          <Link to="/contact">Contato</Link>
        </nav>
      </header>

      <main>
        <div className="home-container">
          <div className="home-content">
            <h1>
              <span className="animated-text">{animatedText}</span>
              <span className="cursor">|</span>
            </h1>
            <p>
              Faça login para acessar recursos exclusivos e uma experiência 
              personalizada no mundo dos carros de luxo.
            </p>

            <div className="home-actions">
              <Link to="/login" className="home-button primary">
                <span className="btn-icon">🔑</span>
                Fazer Login
              </Link>
              <Link to="/register" className="home-button secondary">
                <span className="btn-icon">✨</span>
                Criar Conta
              </Link>
            </div>

            {/* 🔐 LOGIN SOCIAL */}
            <div className="social-login">
              <div className="social-divider">
                <span>ou acesse com</span>
              </div>
              
              <div className="social-buttons">
                <button onClick={handleGoogleLogin} className="home-button google">
                  <span className="social-icon">G</span>
                  <span>Google</span>
                </button>

                <button onClick={handleGitHubLogin} className="home-button github">
                  <span className="social-icon">GH</span>
                  <span>GitHub</span>
                </button>
              </div>
            </div>

            <div className="home-footer-links">
              <Link to="/recovery" className="forgot-link">
                Esqueceu sua senha?
              </Link>
              <span className="separator">•</span>
              <Link to="/privacy" className="privacy-link">
                Política de Privacidade
              </Link>
            </div>

            {/* Cards de estatísticas rápidas */}
            <div className="home-stats">
              <div className="stat-item">
                <span className="stat-number">150+</span>
                <span className="stat-label">Carros</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">Anos</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">850+</span>
                <span className="stat-label">Clientes</span>
              </div>
            </div>
          </div>

          {/* Imagem decorativa */}
          <div className="home-image">
            <div className="image-card">
              <img 
                src="https://via.placeholder.com/500x400?text=Carro+de+Luxo" 
                alt="Carro de luxo"
              />
              <div className="image-overlay">
                <span>🏁</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2024 CarElite - Carros de Luxo. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}