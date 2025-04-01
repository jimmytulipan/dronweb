import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

// Sample dáta - tieto by prišli z backendu/API (rovnaké ako v HomePage)
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
];

// V produkcii by sme použili useContext alebo Redux na zdieľanie dát
// Pre demo účely ukladáme používateľské videá do localStorage
const getUserVideos = () => {
  try {
    const videos = localStorage.getItem('userVideos');
    return videos ? JSON.parse(videos) : [];
  } catch (e) {
    console.error('Chyba pri načítaní používateľských videí', e);
    return [];
  }
};

const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [commentUser, setCommentUser] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  // Načítame video na základe ID
  useEffect(() => {
    const allVideos = [...sampleVideos, ...getUserVideos()];
    const foundVideo = allVideos.find(v => v.id === id);
    if (foundVideo) {
      setVideo(foundVideo);
    }
  }, [id]);

  // Inicializácia mapy po načítaní videa
  useEffect(() => {
    if (video && !isMapLoaded) {
      const loadMapScript = () => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        
        window.initMap = () => {
          const mapElement = document.getElementById('map');
          if (mapElement) {
            const map = new window.google.maps.Map(mapElement, {
              center: video.location,
              zoom: 12,
              styles: [
                { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                // ...ďalšie štýly pre tmavú mapu
              ]
            });
            
            new window.google.maps.Marker({
              position: video.location,
              map: map,
              title: video.title,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#FF0000",
                fillOpacity: 0.8,
                strokeWeight: 1,
                strokeColor: "#FFFFFF"
              }
            });
            
            setIsMapLoaded(true);
          }
        };
      };
      
      // Pre demo účely nepridávame skutočný Google Maps API kľúč
      // loadMapScript();
      
      // Alternatíva bez Google Maps API (len pre demo)
      setIsMapLoaded(true);
    }
  }, [video, isMapLoaded]);

  const handleAddComment = () => {
    if (!newComment.trim() || !commentUser.trim()) return;
    
    const comment = {
      id: `c${Date.now()}`,
      user: commentUser,
      text: newComment,
      timestamp: 'Práve teraz'
    };
    
    const updatedVideo = {
      ...video,
      comments: [comment, ...video.comments]
    };
    
    setVideo(updatedVideo);
    setNewComment('');
    
    // Aktualizujeme video aj v localStorage
    try {
      const allVideos = [...sampleVideos, ...getUserVideos()];
      const updatedVideos = allVideos.map(v => 
        v.id === updatedVideo.id ? updatedVideo : v
      );
      
      // Aktualizujeme len používateľské videá v localStorage
      const userVideos = updatedVideos.filter(v => v.id.startsWith('user-'));
      if (updatedVideo.id.startsWith('user-')) {
        localStorage.setItem('userVideos', JSON.stringify(userVideos));
      }
    } catch (e) {
      console.error('Chyba pri aktualizácii videa v localStorage', e);
    }
  };

  const handleLike = () => {
    if (isLiked) return;
    
    const updatedVideo = {
      ...video,
      likes: video.likes + 1
    };
    
    setVideo(updatedVideo);
    setIsLiked(true);
    
    // Aktualizujeme video aj v localStorage
    try {
      const allVideos = [...sampleVideos, ...getUserVideos()];
      const updatedVideos = allVideos.map(v => 
        v.id === updatedVideo.id ? updatedVideo : v
      );
      
      // Aktualizujeme len používateľské videá v localStorage
      const userVideos = updatedVideos.filter(v => v.id.startsWith('user-'));
      if (updatedVideo.id.startsWith('user-')) {
        localStorage.setItem('userVideos', JSON.stringify(userVideos));
      }
    } catch (e) {
      console.error('Chyba pri aktualizácii videa v localStorage', e);
    }
  };

  if (!video) {
    return (
      <div className="min-h-screen flex flex-col bg-primary-dark">
        <Header />
        <div className="container mx-auto flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl text-white mb-6">Video nenájdené</h1>
            <Link to="/" className="text-primary-red hover:text-white transition-colors">
              Späť na domovskú stránku
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary-dark">
      <Header />
      
      <main className="container mx-auto px-6 py-8 flex-grow">
        <div className="mb-8">
          <Link to="/" className="text-light-gray hover:text-white flex items-center transition-colors mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Späť na zoznam videí
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{video.title}</h1>
          
          <div className="flex flex-wrap gap-2 items-center mb-6">
            <span className="text-xs px-2 py-1 bg-primary-red text-white rounded-full">
              {video.category === 'FPV' ? 'FPV Drony' : 'Cyklotrasy'}
            </span>
            
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm transition-colors ${isLiked ? 'text-primary-red' : 'text-light-gray hover:text-primary-red'}`}
              disabled={isLiked}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              {video.likes} likes
            </button>
          </div>
        </div>
        
        {/* Video embed */}
        <div className="aspect-video w-full mb-8 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mapa lokality */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Lokalita</h2>
            
            <div 
              id="map" 
              className="w-full h-80 rounded-lg overflow-hidden shadow-lg bg-gray-800 mb-8"
              style={{ 
                backgroundImage: `url(https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-s+f00(${video.location.lng},${video.location.lat})/${video.location.lng},${video.location.lat},9,0/800x400@2x?access_token=YOUR_TOKEN)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {!isMapLoaded && (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="futuristic-loader"></div>
                </div>
              )}
            </div>
            
            {/* Komentáre */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Komentáre</h2>
              
              {/* Pridanie komentára */}
              <div className="bg-dark-gray bg-opacity-70 p-4 rounded-lg mb-6">
                <div className="flex gap-4 mb-4">
                  <div className="w-full">
                    <input 
                      type="text"
                      value={commentUser}
                      onChange={(e) => setCommentUser(e.target.value)}
                      placeholder="Tvoje meno"
                      className="w-full bg-gray-800 text-white p-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-primary-red"
                    />
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Pridaj komentár..."
                      className="w-full bg-gray-800 text-white p-3 rounded-md min-h-24 focus:outline-none focus:ring-2 focus:ring-primary-red"
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleAddComment} className="ripple-effect">Pridať komentár</Button>
                </div>
              </div>
              
              {/* Zoznam komentárov */}
              <div className="space-y-4">
                {video.comments && video.comments.length > 0 ? (
                  video.comments.map(comment => (
                    <div key={comment.id} className="bg-dark-gray bg-opacity-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <div className="font-bold text-primary-red">{comment.user}</div>
                        <div className="text-xs text-light-gray">{comment.timestamp}</div>
                      </div>
                      <p className="text-white">{comment.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-light-gray text-center p-4">
                    Zatiaľ žiadne komentáre. Buď prvý, kto pridá komentár!
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar s odporúčanými videami */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Odporúčané videá</h2>
            <div className="space-y-4">
              {sampleVideos
                .filter(v => v.id !== video.id)
                .slice(0, 3)
                .map(recommendedVideo => (
                  <Link 
                    key={recommendedVideo.id} 
                    to={`/video/${recommendedVideo.id}`}
                    className="flex gap-3 bg-dark-gray bg-opacity-50 p-2 rounded-lg hover:bg-opacity-70 transition-all"
                  >
                    <img 
                      src={recommendedVideo.thumbnail} 
                      alt={recommendedVideo.title} 
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-sm line-clamp-2">{recommendedVideo.title}</h3>
                      <div className="text-xs text-light-gray mt-1">
                        {recommendedVideo.likes} zhliadnutí
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VideoDetail; 