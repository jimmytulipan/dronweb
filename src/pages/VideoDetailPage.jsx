import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CommentSection from '../components/CommentSection';
import MapDisplay from '../components/MapDisplay';
import { FaHeart, FaRegHeart, FaShareAlt, FaDownload, FaFlag } from 'react-icons/fa';

// Sample dáta - nájdi video podľa ID (v reálnej app by to bol API call)
const sampleVideos = [
    { id: '1', title: 'Epický FPV prelet lesom', youtubeId: 'dQw4w9WgXcQ', description: 'Úžasný let cez hlboký les v srdci Slovenského raja. Zachytené na profesionálny FPV dron so stabilizovanou kamerou.', category: 'FPV', likes: 152, location: { lat: 48.9513, lng: 20.3711, name: 'Slovenský raj' } },
    { id: '2', title: 'Adrenalínová MTB trasa', youtubeId: 'o_l4Ab5FR2g', description: 'Náročná horská trasa s prekrásnymi výhľadmi v Nízkych Tatrách. Ideálna pre skúsených jazdcov hľadajúcich výzvu.', category: 'Bike', likes: 230, location: { lat: 48.9437, lng: 19.5108, name: 'Nízke Tatry' } },
    { id: '3', title: 'Cinematic FPV pohľad na jazero', youtubeId: '3JZ_D3ELwOQ', description: 'Pokojný let dronom nad krásnym jazerom za úsvitu. Zachytené s perfektnou expozíciou a plynulými pohybmi.', category: 'FPV', likes: 98, location: { lat: 49.0798, lng: 19.6013, name: 'Liptovská Mara' } },
    // ... ďalšie videá
];

const VideoDetailPage = () => {
  const { id } = useParams(); // Získa ID z URL
  const [video, setVideo] = useState(null);
  const [isLiked, setIsLiked] = useState(false); // Lokálny stav pre lajk
  const [likeCount, setLikeCount] = useState(0); // Lokálny stav pre počet lajkov

  useEffect(() => {
    // Simulácia načítania dát - nahraď API volaním
    const foundVideo = sampleVideos.find(v => v.id === id);
    if (foundVideo) {
        setVideo(foundVideo);
        setLikeCount(foundVideo.likes);
        // Tu by si mohol načítať aj stav lajku pre prihláseného usera
    }
    // Scroll na vrch stránky pri načítaní
    window.scrollTo(0, 0);
  }, [id]);

  const handleLike = () => {
    // Tu by bolo volanie na backend pre update lajku
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    // Pridaj microinterakciu - napr. animované srdce
  };

  if (!video) {
    return <div className="min-h-screen flex items-center justify-center bg-primary-dark">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-pure-white">Načítavanie...</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-6 py-10 flex-grow">
        <div className="lg:flex lg:space-x-8">
          {/* Ľavý stĺpec: Video a Detaily */}
          <div className="lg:w-2/3 mb-8 lg:mb-0">
            {/* YouTube Embed */}
            <div className="aspect-w-16 aspect-h-9 mb-6 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Názov a Akcie */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-pure-white mb-2 sm:mb-0">{video.title}</h1>
              <div className="flex items-center space-x-4">
                <button onClick={handleLike} className="flex items-center space-x-1 text-light-gray hover:text-pure-white transition duration-300">
                  {isLiked ? <FaHeart className="text-primary-red text-xl" /> : <FaRegHeart className="text-xl" />}
                  <span>{likeCount}</span>
                </button>
                <button className="flex items-center space-x-1 text-light-gray hover:text-pure-white transition duration-300">
                  <FaShareAlt />
                  <span>Zdieľať</span>
                </button>
                <button className="flex items-center space-x-1 text-light-gray hover:text-pure-white transition duration-300">
                  <FaDownload />
                  <span>Stiahnuť GPS</span>
                </button>
              </div>
            </div>

            {/* Popis */}
            <p className="text-light-gray mb-6">{video.description}</p>
            
            {/* Info o videu */}
            <div className="bg-gray-800/30 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold mb-2">Informácie o videu</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-light-gray"><span className="text-pure-white">Kategória:</span> {video.category === 'FPV' ? 'FPV Dron' : 'Cyklotrasa'}</p>
                  <p className="text-light-gray"><span className="text-pure-white">Pridané:</span> 15.3.2025</p>
                </div>
                <div>
                  <p className="text-light-gray"><span className="text-pure-white">Počet zobrazení:</span> {Math.floor(Math.random() * 10000) + 1000}</p>
                  <p className="text-light-gray"><span className="text-pure-white">Autor:</span> DronMajster</p>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <button className="text-sm text-light-gray hover:text-primary-red flex items-center space-x-1">
                  <FaFlag className="text-sm" />
                  <span>Nahlásiť problém</span>
                </button>
              </div>
            </div>

             {/* Komentáre */}
            <CommentSection videoId={video.id} />
          </div>

          {/* Pravý stĺpec: Mapa */}
          <div className="lg:w-1/3">
             <h2 className="text-xl font-bold mb-4">Lokalita</h2>
             <MapDisplay location={video.location} />
             
             <div className="mt-6 bg-gray-800/30 p-4 rounded-lg">
               <h3 className="text-lg font-semibold mb-3">Odporúčané vybavenie</h3>
               <ul className="space-y-2 text-light-gray">
                 {video.category === 'FPV' ? (
                   <>
                     <li>• Dron s FPV systémom</li>
                     <li>• Ochranné okuliare</li>
                     <li>• Extra batérie</li>
                     <li>• Kamera s vysokým rozlíšením</li>
                   </>
                 ) : (
                   <>
                     <li>• Horský bicykel s dobrým odpružením</li>
                     <li>• Prilba a chrániče</li>
                     <li>• Vode-odolné oblečenie</li>
                     <li>• GPS navigácia</li>
                   </>
                 )}
               </ul>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VideoDetailPage; 