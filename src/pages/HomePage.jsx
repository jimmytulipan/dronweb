import React, { useEffect, useRef, useState } from 'react';
import Button from '../components/Button';
import VideoCard from '../components/VideoCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/droneBackground.css'; // Importujeme CSS štýly pre záložné riešenie
import '../assets/animations.css'; // Importujeme nové animácie
// Import ikoniek (ak nie je nainštalované: npm install react-icons)
import { FaVideo, FaHelicopter, FaBicycle, FaThLarge } from 'react-icons/fa'; 

// Sample dáta - tieto by prišli z backendu/API
const sampleVideos = [
  { id: '1', title: 'Epický FPV prelet lesom', youtubeId: 'dQw4w9WgXcQ', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', category: 'FPV', likes: 152, location: { lat: 48.9747, lng: 19.5981 }, comments: [
    { id: 'c1', user: 'DroneMaster', text: 'Úžasný prelet, aký dron si použil?', timestamp: '2 dni' },
    { id: 'c2', user: 'FPVninja', text: 'Ten západ slnka na 1:24 je neskutočný!', timestamp: '1 deň' },
  ] },
  { id: '2', title: 'Adrenalínová MTB trasa', youtubeId: 'o_l4Ab5FR2g', thumbnail: 'https://img.youtube.com/vi/o_l4Ab5FR2g/hqdefault.jpg', category: 'Bike', likes: 230, location: { lat: 49.1548, lng: 20.1309 }, comments: [
    { id: 'c3', user: 'BikerSK', text: 'Kde presne je táto trasa? Vyzerá super!', timestamp: '5 dní' },
    { id: 'c4', user: 'MountainRider', text: 'Pekný drop na 2:35, musím to vyskúšať', timestamp: '3 dni' },
  ] },
  { id: '3', title: 'Cinematic FPV pohľad na jazero', youtubeId: '3JZ_D3ELwOQ', thumbnail: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg', category: 'FPV', likes: 98, location: { lat: 48.6113, lng: 17.8235 }, comments: [
    { id: 'c5', user: 'DroneSpotter', text: 'Krásny záber na jazero!', timestamp: '1 týždeň' },
  ] },
  // ... ďalšie videá
];

const HomePage = () => {
  // Referencia pre parallax efekt
  const parallaxRef = useRef(null);
  // Referencia pre blob animáciu
  const blobsRef = useRef([]);
  // State pre pridávanie nových videí
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoCategory, setNewVideoCategory] = useState('FPV');
  const [userVideos, setUserVideos] = useState([]);
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false); // Pridal som feedback pre užívateľa
  const [deleteSuccess, setDeleteSuccess] = useState(false); // Feedback pri zmazaní
  const pixelContainerRef = useRef(null); // Ref pre kontajner pixelov
  const [activeFilter, setActiveFilter] = useState('all'); // Nový state pre aktívny filter
  const filterContainerRef = useRef(null); // Ref pre kontajner filtrov
  const indicatorRef = useRef(null); // Ref pre indikátor
  const videoSectionRef = useRef(null); // Ref pre celú sekciu videí
  const sectionHeaderRef = useRef(null); // Ref pre nadpis a filtre
  const videoGridRef = useRef(null); // Ref pre mriežku videí
  const addButtonRef = useRef(null); // Nový ref pre tlačidlo pridať video
  const leftLineRef = useRef(null); // Ref pre ľavú čiaru
  const rightLineRef = useRef(null); // Ref pre pravú čiaru

  // Funkcia pre ripple efekt na tlačidlách
  const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = 'ripple';
    
    // Odstráni predchádzajúce ripple
    const ripples = button.getElementsByClassName('ripple');
    if (ripples.length) {
      ripples[0].remove();
    }
    
    button.appendChild(ripple);
    
    // Odstráni ripple po animácii
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  // Funkcia na extrakciu YouTube ID z URL
  const extractYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Funkcia na pridanie nového videa
  const handleAddVideo = () => {
    const youtubeId = extractYoutubeId(newVideoUrl);
    
    if (!youtubeId) {
      alert('Prosím, zadaj platný YouTube URL.');
      return;
    }

    if (!newVideoTitle.trim()) {
      alert('Prosím, zadaj názov videa.');
      return;
    }

    const newVideo = {
      id: `user-${Date.now()}`,
      title: newVideoTitle,
      youtubeId,
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      category: newVideoCategory,
      likes: 0,
      location: { lat: 49.0, lng: 19.0 }, // Predvolená lokácia na Slovensku
      comments: []
    };

    // Aktualizujeme stav
    const updatedVideos = [newVideo, ...userVideos];
    setUserVideos(updatedVideos);
    
    // Uložíme do localStorage pre perzistenciu
    try {
      localStorage.setItem('userVideos', JSON.stringify(updatedVideos));
      
      // Zobrazíme správu o úspechu
      setAddSuccess(true);
      setTimeout(() => {
        setAddSuccess(false);
      }, 3000);
      
      // Po pridaní videa nastavíme filter na "all", aby bolo viditeľné
      setActiveFilter('all');
    } catch (e) {
      console.error('Chyba pri ukladaní videí do localStorage', e);
    }
    
    setNewVideoUrl('');
    setNewVideoTitle('');
    setIsAddingVideo(false);
  };

  // Funkcia na odstránenie videa
  const handleDeleteVideo = (videoId) => {
    if (window.confirm('Naozaj chcete odstrániť toto video?')) {
      const updatedVideos = userVideos.filter(video => video.id !== videoId);
      setUserVideos(updatedVideos);
      
      // Aktualizácia localStorage
      try {
        localStorage.setItem('userVideos', JSON.stringify(updatedVideos));
        
        // Zobrazíme správu o úspešnom zmazaní
        setDeleteSuccess(true);
        setTimeout(() => {
          setDeleteSuccess(false);
        }, 3000);
      } catch (e) {
        console.error('Chyba pri aktualizácii localStorage', e);
      }
    }
  };

  // Načítanie používateľských videí z localStorage pri inicializácii
  useEffect(() => {
    try {
      const savedVideos = JSON.parse(localStorage.getItem('userVideos') || '[]');
      if (savedVideos && savedVideos.length > 0) {
        setUserVideos(savedVideos);
      }
    } catch (e) {
      console.error('Chyba pri načítaní používateľských videí', e);
    }
  }, []);

  // Parallax efekt a generovanie pixelov
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!parallaxRef.current) return;
      
      const x = (window.innerWidth / 2 - e.pageX) / 50;
      const y = (window.innerHeight / 2 - e.pageY) / 50;
      
      parallaxRef.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
    };

    // Inicializácia pre morphing blobs
    const createBlobs = () => {
      const heroSection = document.querySelector('.hero-section-with-real-image');
      if (!heroSection) return;

      for (let i = 0; i < 3; i++) {
        const blob = document.createElement('div');
        blob.className = 'blob-morph';
        blob.style.left = `${Math.random() * 80}%`;
        blob.style.top = `${Math.random() * 80}%`;
        blob.style.animationDelay = `${i * 5}s`;
        blob.style.width = `${150 + Math.random() * 100}px`;
        blob.style.height = `${150 + Math.random() * 100}px`;
        heroSection.appendChild(blob);
        blobsRef.current.push(blob);
      }
    };

    // Generovanie pixelov pre dissolve efekt - UPRAVENÉ PRE MENEJ A POMALŠIE
    const createPixelParticles = () => {
      if (!pixelContainerRef.current) return;
      const container = pixelContainerRef.current;
      container.innerHTML = ''; // Vyčistíme predchádzajúce pixely
      
      // Ešte menej pixelov
      const numPixels = Math.floor(window.innerWidth / 80); // Výrazne menej pixelov
      
      // Farby zostávajú prevažne červené
      const colors = [
        'rgba(255, 0, 0, 0.9)',    // Jasná Červená
        'rgba(200, 0, 0, 0.8)',    // Tmavšia Červená
        'rgba(255, 50, 50, 0.8)',   // Svetlejšia Červená
        'rgba(255, 80, 80, 0.7)',   // Ešte svetlejšia Červená
        'rgba(255, 255, 255, 0.6)', // Biela (málo)
        'rgba(220, 220, 220, 0.5)'  // Svetlo Sivá (málo)
      ];
      const glows = [
        'rgba(255, 0, 0, 0.7)',
        'rgba(200, 0, 0, 0.6)',
        'rgba(255, 50, 50, 0.6)',
        'rgba(255, 80, 80, 0.5)',
        'rgba(255, 255, 255, 0.4)',
        'rgba(220, 220, 220, 0.3)'
      ];

      for (let i = 0; i < numPixels; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel-particle';
        
        let colorIndex = Math.floor(Math.random() * colors.length);
        if (Math.random() > 0.2) { 
           colorIndex = Math.floor(Math.random() * 4); 
        }

        const opacity = 0.6 + Math.random() * 0.4;
        
        pixel.style.setProperty('--pixel-color', colors[colorIndex]);
        pixel.style.setProperty('--pixel-glow', glows[colorIndex]);
        pixel.style.setProperty('--pixel-opacity', opacity);
        pixel.style.left = `${Math.random() * 100}%`;
        pixel.style.top = `${80 + Math.random() * 20}%`; 
        
        // Výrazne dlhšie oneskorenie a trvanie pre veľmi pomalý efekt
        pixel.style.animationDelay = `${Math.random() * 10}s`; 
        pixel.style.animationDuration = `${12 + Math.random() * 8}s`; 
        container.appendChild(pixel);
      }
    };

    // Pridá event listenery
    window.addEventListener('mousemove', handleMouseMove);
    createBlobs();
    createPixelParticles(); // Vygenerujeme pixely

    // Pridáme listener na zmenu veľkosti okna pre pregenerovanie pixelov
    window.addEventListener('resize', createPixelParticles);

    // Cleanup pri unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', createPixelParticles);
      blobsRef.current.forEach(blob => {
        if (blob.parentNode) {
          blob.parentNode.removeChild(blob);
        }
      });
    };
  }, []);

  // Funkcia pre aktualizáciu aktívneho filtra a pozície indikátora
  const handleFilterClick = (filter, event) => {
    setActiveFilter(filter);
    
    const button = event.currentTarget;
    const textSpan = button.querySelector('.filter-text');
    const indicator = indicatorRef.current;
    const containerRect = filterContainerRef.current.getBoundingClientRect();

    if (!textSpan || !indicator || !containerRect) return;

    const spanRect = textSpan.getBoundingClientRect();
    const spanCenter = spanRect.left - containerRect.left + spanRect.width / 2;
    const indicatorWidth = spanRect.width;
    
    // Vypočítame základnú `left` pozíciu a pridáme manuálnu korekciu doľava
    const baseLeft = spanCenter - indicatorWidth / 2;
    const manualOffset = -4; // Posunutie o 4px doľava
    const left = baseLeft + manualOffset;

    indicator.style.left = `${left}px`;
    indicator.style.width = `${indicatorWidth}px`;
    indicator.style.opacity = '1';

    console.log("Filtrujem na:", filter);
  };
  
  // useEffect pre počiatočné nastavenie indikátora pod "Všetky"
  useEffect(() => {
    const firstButton = filterContainerRef.current?.querySelector('.filter-button[data-filter="all"]');
    const textSpan = firstButton?.querySelector('.filter-text');
    
    if (textSpan && indicatorRef.current && filterContainerRef.current) {
      const containerRect = filterContainerRef.current.getBoundingClientRect();
      const spanRect = textSpan.getBoundingClientRect();
      const indicator = indicatorRef.current;

      const spanCenter = spanRect.left - containerRect.left + spanRect.width / 2;
      const indicatorWidth = spanRect.width;
      
      // Vypočítame základnú `left` pozíciu a pridáme manuálnu korekciu doľava
      const baseLeft = spanCenter - indicatorWidth / 2;
      const manualOffset = -4; // Posunutie o 4px doľava
      const left = baseLeft + manualOffset;

      indicator.style.left = `${left}px`;
      indicator.style.width = `${indicatorWidth}px`;
      indicator.style.opacity = '1';
    }
  }, []); // Spustí sa len raz po mountnutí

  // useEffect pre Parallax v sekcii videí
  useEffect(() => {
    const handleScroll = () => {
      if (!videoSectionRef.current || !sectionHeaderRef.current || !videoGridRef.current) return;

      const sectionTop = videoSectionRef.current.offsetTop;
      const scrollTop = window.scrollY;
      const sectionHeight = videoSectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Vypočítame, ako ďaleko sme v rámci viditeľnej časti sekcie
      const scrollAmountInSection = scrollTop + windowHeight - sectionTop;
      const parallaxProgress = Math.max(0, Math.min(1, scrollAmountInSection / (windowHeight + sectionHeight)));

      // Aplikujeme rôzne posuny
      const titleOffset = parallaxProgress * -30; // Nadpis pôjde hore pomalšie
      const gridOffset = parallaxProgress * 20; // Grid pôjde hore rýchlejšie

      sectionHeaderRef.current.style.transform = `translateY(${titleOffset}px)`;
      videoGridRef.current.style.transform = `translateY(${gridOffset}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Hook pre nastavenie pozícií čiar podľa skutočnej pozície tlačidla
  useEffect(() => {
    const updateLinePositions = () => {
      const button = document.querySelector('.button-holographic');
      const svg = document.getElementById('blueprint-svg');
      
      if (button && svg && leftLineRef.current && rightLineRef.current) {
        const buttonRect = button.getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();
        
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;
        
        const svgX = (buttonCenterX - svgRect.left) * (1600 / svgRect.width);
        const svgY = (buttonCenterY - svgRect.top) * (900 / svgRect.height);
        
        console.log(`Tlačidlo stred: x=${svgX}, y=${svgY}`);
        
        // Nastavíme cesty pre čiary
        leftLineRef.current.setAttribute('d', `M ${svgX} ${svgY} L 500 ${svgY} L 500 800`);
        rightLineRef.current.setAttribute('d', `M ${svgX} ${svgY} L 1100 ${svgY} L 1100 800`);
      }
    };

    // Počkáme, kým sa DOM plne načíta a renderuje
    setTimeout(updateLinePositions, 500);
    
    window.addEventListener('resize', updateLinePositions);
    
    return () => {
      window.removeEventListener('resize', updateLinePositions);
    };
  }, []); // Spustí sa len raz po mountnutí

  // Fix pre 100vh bug na iOS
  useEffect(() => {
    const setVhVariable = () => {
      // Nastavíme custom --vh premennú podľa aktuálnej výšky viewportu
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Pri načítaní a zmene veľkosti okna
    setVhVariable();
    window.addEventListener('resize', setVhVariable);
    
    return () => {
      window.removeEventListener('resize', setVhVariable);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col hero-animate">
      <Header />

      {/* Hero Sekcia s obrázkom na pozadí */}
      <section className="hero-section-with-real-image">
        {/* Pozadie z externého CSS ktoré používa obrázok z public/assets/drone-background.png */}
        <div className="hero-real-background parallax-bg" ref={parallaxRef}></div>
        
        {/* Overlay je už definovaný v CSS pomocou ::before */}
        
        <div className="container mx-auto relative z-10">
          {/* Používame nové CSS triedy pre textový blok s animáciami */}
          <div className="hero-text-container hero-text-animate hero-border-animate">
            <h1 className="hero-title hero-title-simple text-white">
              LETECKÁ<br />ELITA<br />FPV
            </h1>
            <p className="hero-description typing-effect">
              Zažite adrenalín z FPV lietania s najmodernejšou technológiou. Objavte svet z úplne novej perspektívy.
            </p>
            <Button className="button-holographic ripple-effect" onClick={createRipple}>VYSKÚŠAJ TERAZ</Button>
          </div>
        </div>
        
        {/* Prechodový element s pixel dissolve efektom */}
        <div className="section-transition">
          {/* Kontajner pre dynamicky generované pixely */}
          <div className="pixel-particles-container" ref={pixelContainerRef}>
            {/* Pixely budú generované pomocou useEffect */}
          </div>
        </div>
      </section>

      {/* Sekcia s videami - pridaný ref */}
      <section 
        ref={videoSectionRef} 
        className="video-section container mx-auto px-6 py-20 md:py-24 flex-grow bg-primary-dark relative overflow-hidden"
      >
        {/* Pozadie, Hex vzor a SVG kontajner pre blueprint čiary */}
        <div className="absolute inset-0 z-0 moving-gradient-background opacity-10"></div>
        <div className="absolute inset-0 z-[-1] hex-background"></div>
        <svg 
          className="absolute inset-0 w-full h-full z-[5] pointer-events-none" 
          preserveAspectRatio="xMidYMid slice" 
          viewBox="0 0 1600 900" 
          id="blueprint-svg"
        >
          {/* Hlavné čiary - Crysis nanosuit štýl */}
          <path 
            ref={leftLineRef}
            d="M 800 420 L 500 420 L 500 800" 
            className="blueprint-streamer streamer-left" 
            stroke="rgba(255,0,0,0.95)"
            strokeWidth="4"
          />
          
          <path 
            ref={rightLineRef}
            d="M 800 420 L 1100 420 L 1100 800" 
            className="blueprint-streamer streamer-right" 
            stroke="rgba(255,0,0,0.95)"
            strokeWidth="4"
          />
          
          {/* Energia indikátor - ľavý */}
          <rect 
            x="480" 
            y="520" 
            width="40" 
            height="12" 
            fill="none" 
            stroke="rgba(255,0,0,0.8)" 
            strokeWidth="1" 
            className="nano-energy-bar"
          />
          
          <rect 
            x="482" 
            y="522" 
            width="36" 
            height="8" 
            fill="rgba(255,0,0,0.4)" 
            className="nano-energy-fill"
          />
          
          {/* Energia indikátor - pravý */}
          <rect 
            x="1080" 
            y="520" 
            width="40" 
            height="12" 
            fill="none" 
            stroke="rgba(255,0,0,0.8)" 
            strokeWidth="1" 
            className="nano-energy-bar"
          />
          
          <rect 
            x="1082" 
            y="522" 
            width="36" 
            height="8" 
            fill="rgba(255,0,0,0.4)" 
            className="nano-energy-fill"
          />
          
          {/* Pomocné linky - v Crysis nanoobleku */}
          <line
            x1="500" 
            y1="480" 
            x2="470" 
            y2="480" 
            stroke="rgba(255,0,0,0.8)" 
            strokeWidth="1.5"
            className="nano-line"
          />
          
          <line
            x1="1100" 
            y1="480" 
            x2="1130" 
            y2="480" 
            stroke="rgba(255,0,0,0.8)" 
            strokeWidth="1.5"
            className="nano-line"
          />

          {/* Hex mriežka kód - Crysis štýl */}
          <text 
            x="505" 
            y="480" 
            className="nano-text" 
            fill="rgba(255,255,255,0.9)"
            style={{ 
              fontSize: '8px', 
              fontFamily: 'monospace',
              filter: 'drop-shadow(0 0 3px rgba(255,0,0,0.8))'
            }}
          >
            &lt;MAXIMUM POWER&gt;
          </text>

          <text 
            x="940" 
            y="480" 
            className="nano-text nano-text-right" 
            fill="rgba(255,255,255,0.9)"
            style={{ 
              fontSize: '8px', 
              fontFamily: 'monospace',
              filter: 'drop-shadow(0 0 3px rgba(255,0,0,0.8))'
            }}
          >
            &lt;SYSTEM ONLINE&gt;
          </text>

          {/* Malé hexagóny podobné nanosuit textúre */}
          <polygon 
            points="520,560 527,565 527,575 520,580 513,575 513,565" 
            fill="none" 
            stroke="rgba(255,0,0,0.7)" 
            strokeWidth="1"
            className="nano-hex"
          />
          
          <polygon 
            points="1080,560 1087,565 1087,575 1080,580 1073,575 1073,565" 
            fill="none" 
            stroke="rgba(255,0,0,0.7)" 
            strokeWidth="1"
            className="nano-hex"
          />

          {/* Ukazovateľ smeru - ako smerník alebo šípka */}
          <polygon 
            points="500,700 510,690 510,710" 
            fill="rgba(255,0,0,0.7)" 
            className="direction-indicator"
          />
          
          <polygon 
            points="1100,700 1090,690 1090,710" 
            fill="rgba(255,0,0,0.7)" 
            className="direction-indicator"
          />

          {/* Malé počítadlo ako v HUDe hry */}
          <text 
            x="470" 
            y="650" 
            className="nano-counter" 
            fill="rgba(255,255,255,0.9)"
            style={{ 
              fontSize: '10px', 
              fontFamily: 'monospace',
              filter: 'drop-shadow(0 0 2px rgba(255,0,0,0.8))'
            }}
          >
            04.21
          </text>
          
          <text 
            x="1110" 
            y="650" 
            className="nano-counter" 
            fill="rgba(255,255,255,0.9)"
            style={{ 
              fontSize: '10px', 
              fontFamily: 'monospace',
              filter: 'drop-shadow(0 0 2px rgba(255,0,0,0.8))'
            }}
          >
            08.45
          </text>
        </svg>

        {/* Hlavný obsah sekcie (nad čiarami) */}
        <div className="relative z-10">
          {/* Kontajner pre nadpis a filtre (pre parallax) */}
          <div ref={sectionHeaderRef} style={{ transition: 'transform 0.1s linear' }}>
            {/* Kontajner pre H2 - už bez vnoreného SVG pre zátvorky */}
            <div className="flex justify-center mb-16">
              <div className="relative inline-block heading-wrapper"> 
                <h2 className="text-5xl md:text-6xl font-bold text-center text-white section-title-animate tracking-wider title-shadow px-8">
                  Najlepšie videá
                </h2>
                {/* Odstránené SVG pre zátvorky */}
              </div>
            </div>
            
            {/* Kontajner pre filtre */}
            <div 
              className="filter-container flex flex-wrap justify-center gap-4 sm:gap-8 mb-12 md:mb-16 relative px-2 sm:px-0" 
              ref={filterContainerRef}
            >
              <button 
                  className={`filter-button py-3 px-4 sm:py-3 sm:px-6 ${activeFilter === 'all' ? 'active' : ''}`}
                  onClick={(e) => handleFilterClick('all', e)}
                  data-filter="all"
              >
                  <FaThLarge className="inline mr-2 mb-1" /> <span className="filter-text">Všetky</span>
              </button>
              <button 
                  className={`filter-button py-3 px-4 sm:py-3 sm:px-6 ${activeFilter === 'fpv' ? 'active' : ''}`}
                  onClick={(e) => handleFilterClick('fpv', e)}
                  data-filter="fpv"
              >
                  <FaHelicopter className="inline mr-2 mb-1" /> <span className="filter-text">FPV Drony</span>
              </button>
              <button 
                  className={`filter-button py-3 px-4 sm:py-3 sm:px-6 ${activeFilter === 'bike' ? 'active' : ''}`}
                  onClick={(e) => handleFilterClick('bike', e)}
                  data-filter="bike"
              >
                  <FaBicycle className="inline mr-2 mb-1" /> <span className="filter-text">Cyklotrasy</span>
              </button>
              <div 
                  className="filter-indicator absolute bottom-[-15px] h-[3px] bg-primary-red rounded-full transition-all duration-500 ease-in-out"
                  ref={indicatorRef}
                  style={{ opacity: 0 }} 
              >
              </div>
              <div className="filter-background-hover"></div> 
            </div>
          </div>
          
          {/* Kontajner pre grid videí (pre parallax) */}
          <div ref={videoGridRef} style={{ transition: 'transform 0.1s linear' }}>
            {/* Tlačidlo na pridanie videa */}
            <div className="flex justify-center mb-8">
              <Button 
                ref={addButtonRef}
                className="button-holographic ripple-effect" 
                onClick={() => setIsAddingVideo(!isAddingVideo)}
              >
                {isAddingVideo ? 'ZRUŠIŤ' : 'PRIDAŤ SVOJE VIDEO'}
              </Button>
            </div>
            
            {/* Správa o úspešnom pridaní videa */}
            {addSuccess && (
              <div className="bg-green-600 text-white rounded-md p-3 mb-4 max-w-2xl mx-auto text-center animate-fadeIn">
                Video bolo úspešne pridané! Môžete ho nájsť vo vašej kolekcii.
              </div>
            )}
            
            {/* Správa o úspešnom zmazaní videa */}
            {deleteSuccess && (
              <div className="bg-blue-600 text-white rounded-md p-3 mb-4 max-w-2xl mx-auto text-center animate-fadeIn">
                Video bolo úspešne odstránené z vašej kolekcie.
              </div>
            )}
            
            {/* Formulár na pridanie videa */} 
            {isAddingVideo && (
              <div className="bg-dark-gray bg-opacity-80 backdrop-filter backdrop-blur-sm p-4 sm:p-6 rounded-lg mb-8 md:mb-10 shadow-lg max-w-2xl mx-auto">
                <h3 className="text-xl font-bold mb-4 text-white">Pridaj svoje video</h3>
                 <div className="space-y-4">
                    <div>
                      <label htmlFor="videoTitle" className="block text-light-gray mb-1">Názov videa</label>
                      <input
                        id="videoTitle"
                        type="text"
                        value={newVideoTitle}
                        onChange={(e) => setNewVideoTitle(e.target.value)}
                        className="w-full bg-gray-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                        placeholder="Zadaj názov videa"
                      />
                    </div>
                    <div>
                      <label htmlFor="videoUrl" className="block text-light-gray mb-1">YouTube URL</label>
                      <input
                        id="videoUrl"
                        type="text"
                        value={newVideoUrl}
                        onChange={(e) => setNewVideoUrl(e.target.value)}
                        className="w-full bg-gray-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                    </div>
                    <div>
                      <label htmlFor="videoCategory" className="block text-light-gray mb-1">Kategória</label>
                      <select
                        id="videoCategory"
                        value={newVideoCategory}
                        onChange={(e) => setNewVideoCategory(e.target.value)}
                        className="w-full bg-gray-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                      >
                        <option value="FPV">FPV Drony</option>
                        <option value="Bike">Cyklotrasy</option>
                      </select>
                    </div>
                 </div>
                 <div className="flex justify-end mt-4">
                   <Button onClick={handleAddVideo} className="ripple-effect py-2 sm:py-3">PRIDAŤ VIDEO</Button>
                 </div>
              </div>
            )}
            {/* Grid s videami */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4 md:px-0">
              {userVideos
                .filter(video => activeFilter === 'all' || video.category === activeFilter)
                .map((video, index) => (
                 <div key={video.id} className="card-3d-effect" style={{ animationDelay: `${index * 0.2}s` }}>
                   <VideoCard 
                     video={video} 
                     className="card-3d-content" 
                     onDelete={handleDeleteVideo}
                     isUserVideo={true}
                   />
                 </div>
              ))}
              {sampleVideos
                .filter(video => activeFilter === 'all' || video.category === activeFilter)
                .map((video, index) => (
                 <div key={video.id} className="card-3d-effect" style={{ animationDelay: `${index * 0.2}s` }}>
                    <VideoCard 
                      video={video} 
                      className="card-3d-content"
                      isUserVideo={false}
                    />
                 </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage; 