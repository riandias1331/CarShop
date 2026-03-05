import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css'; // Estilos para a landing page

export default function CarLandingPage() {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const navigate = useNavigate();

  // Dados dos carros (simples)
  const cars = [
    {
      id: 1,
      name: "Ferrari Roma",
      price: "R$ 2.500.000",
      image: "https://via.placeholder.com/400x250?text=Ferrari+Roma",
      specs: "V8 • 620cv • 0-100km/h 3.4s",
      description: "Esportivo italiano com design clássico e performance moderna."
    },
    {
      id: 2,
      name: "Porsche 911",
      price: "R$ 890.000",
      image: "https://via.placeholder.com/400x250?text=Porsche+911",
      specs: "6 cil • 450cv • Tração traseira",
      description: "Ícone dos esportivos, o 911 oferece experiência de direção incomparável."
    },
    {
      id: 3,
      name: "Lamborghini Urus",
      price: "R$ 3.200.000",
      image: "https://via.placeholder.com/400x250?text=Lamborghini+Urus",
      specs: "V8 • 650cv • SUV • 0-100km/h 3.6s",
      description: "O primeiro SUV superesportivo da Lamborghini."
    },
    {
      id: 4,
      name: "BMW M4",
      price: "R$ 750.000",
      image: "https://via.placeholder.com/400x250?text=BMW+M4",
      specs: "6 cil • 510cv • 0-100km/h 3.8s",
      description: "Performance alemã com tecnologia de ponta."
    },
    {
      id: 5,
      name: "Mercedes AMG GT",
      price: "R$ 1.200.000",
      image: "https://via.placeholder.com/400x250?text=Mercedes+AMG+GT",
      specs: "V8 • 585cv • Coupé",
      description: "Design agressivo e performance superior."
    },
    {
      id: 6,
      name: "Audi R8",
      price: "R$ 1.500.000",
      image: "https://via.placeholder.com/400x250?text=Audi+R8",
      specs: "V10 • 610cv • Tração integral",
      description: "Superesportivo com motor central e som inconfundível."
    }
  ];

  // Função para ir ao login
  const goToLogin = () => {
    navigate('/login');
  };

  // Função para ir ao cadastro
  const goToRegister = () => {
    navigate('/register');
  };

  // Função para mostrar detalhes do carro
  const showCarDetails = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  // Função para fechar modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedCar(null);
  };

  // Função para newsletter
  const handleNewsletter = (e) => {
    e.preventDefault();
    alert(`Obrigado! Enviaremos novidades para ${email}`);
    setEmail('');
  };

  // Função para ir para seção de carros
  const goToCars = () => {
  window.location.hash = 'cars';
  };

  return (
    <div className="landing-container">
      
      {/* HEADER SIMPLES */}
      <header className="landing-header">
        <div className="logo">
          <span className="logo-icon">🏎️</span>
          <h2>CarElite</h2>
        </div>
        
        <nav className="nav-menu">
          <a href="#home">Home</a>
          <a href="#cars">Carros</a>
          <a href="#about">Sobre</a>
          <a href="#contact">Contato</a>
        </nav>
        
        <div className="header-buttons">
          {/* <button onClick={goToLogin} className="btn-login"></button> */}
          <button onClick={goToRegister} className="btn-register">Sair</button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Carros de Luxo <span className="highlight">Exclusivos</span></h1>
          <p>Os melhores veículos importados com procedência e garantia. Atendimento personalizado para clientes exigentes.</p>
          
          <div className="hero-buttons">
            <button onClick={goToCars} className="btn-primary">Ver Catálogo</button>
            <button className="btn-secondary">Falar com Consultor</button>
          </div>
          
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">150+</span>
              <span className="stat-label">Carros em estoque</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">12</span>
              <span className="stat-label">Anos de mercado</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">850+</span>
              <span className="stat-label">Clientes satisfeitos</span>
            </div>
          </div>
        </div>
        
        <div className="hero-image">
          <img src="https://via.placeholder.com/600x400?text=Carro+de+Luxo" alt="Carro de luxo" />
        </div>
      </section>

      {/* SEÇÃO DE CARROS */}
      <section id="cars" className="cars-section">
        <h2>Nossos <span className="highlight">Destaques</span></h2>
        <p className="section-subtitle">Veículos selecionados para você</p>
        
        <div className="cars-grid">
          {cars.slice(0, 3).map(car => ( // Mostra só 3 na landing
            <div key={car.id} className="car-card">
              <div className="car-image">
                <img src={car.image} alt={car.name} />
                <span className="car-badge">Destaque</span>
              </div>
              <div className="car-info">
                <h3>{car.name}</h3>
                <p className="car-specs">{car.specs}</p>
                <p className="car-price">{car.price}</p>
                <button 
                  onClick={() => showCarDetails(car)}
                  className="btn-details"
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="view-all">
          <button  className="btn-view-all">
          {/* <button onClick={goToRegister} className="btn-view-all"> */}
            Ver Todos os Carros →
          </button>
        </div>
      </section>

      {/* SOBRE NÓS SIMPLES */}
      <section id="about" className="about-section">
        <div className="about-content">
          <h2>Sobre a <span className="highlight">CarElite</span></h2>
          <p>
            Somos referência em carros de luxo importados no Brasil. 
            Com mais de 12 anos de experiência, oferecemos veículos com 
            procedência garantida, revisados e prontos para entregar a 
            melhor experiência ao dirigir.
          </p>
          <div className="features">
            <div className="feature">
              <span className="feature-icon">🔍</span>
              <h4>Procedência</h4>
              <p>Todos os veículos com histórico completo</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🛠️</span>
              <h4>Garantia</h4>
              <p>12 meses de garantia em todos os carros</p>
            </div>
            <div className="feature">
              <span className="feature-icon">💰</span>
              <h4>Financiamento</h4>
              <p>Parcele em até 60x com as melhores taxas</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section">
        <h3>Quer receber novidades?</h3>
        <p>Cadastre-se e receba ofertas exclusivas</p>
        <form onSubmit={handleNewsletter} className="newsletter-form">
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-icon">🏎️</span>
            <span>CarElite</span>
          </div>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#cars">Carros</a>
            <a href="#about">Sobre</a>
            <a href="#contact">Contato</a>
          </div>
          <div className="footer-social">
            <span>📱 @carelite_oficial</span>
          </div>
        </div>
        <div className="footer-bottom">
          © 2024 CarElite - Carros de Luxo. Todos os direitos reservados.
        </div>
      </footer>

      {/* MODAL DE DETALHES */}
      {showModal && selectedCar && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="modal-body">
              <img src={selectedCar.image} alt={selectedCar.name} />
              <h2>{selectedCar.name}</h2>
              <p className="modal-price">{selectedCar.price}</p>
              <p className="modal-specs">{selectedCar.specs}</p>
              <p className="modal-description">{selectedCar.description}</p>
              
              <div className="modal-buttons">
                <button onClick={goToRegister} className="btn-primary">
                  Agendar Test Drive
                </button>
                <button className="btn-secondary">
                  Solicitar Proposta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}