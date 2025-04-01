import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-6 py-10 flex-grow">
        <h1 className="text-4xl font-bold mb-6 text-center">O nás</h1>
        
        <div className="max-w-3xl mx-auto bg-gray-800/30 p-8 rounded-lg shadow-lg">
          <p className="mb-4 text-light-gray">
            FPVZone je komunita nadšencov pre FPV drony a cyklotrasy na Slovensku. Naším cieľom je spojiť ľudí, ktorí milujú zachytávať unikátne pohľady na svet okolo nás.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Naša vízia</h2>
          <p className="mb-4 text-light-gray">
            Chceme vytvoriť najväčšiu databázu FPV a cyklistických videí z celého Slovenska, a umožniť tak ľuďom objavovať krásne miesta z netradičnej perspektívy. Veríme, že zdieľanie týchto zážitkov môže inšpirovať ďalších, aby vyrazili do prírody a objavovali skryté zákutia našej krajiny.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Tím</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-bold text-xl mb-2">Peter Novák</h3>
              <p className="text-sm text-light-gray">Zakladateľ & FPV pilot</p>
              <p className="mt-2 text-light-gray">Vášnivý FPV pilot s 5-ročnými skúsenosťami. Špecializuje sa na natáčanie v lesnom prostredí.</p>
            </div>
            
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-bold text-xl mb-2">Zuzana Kováčová</h3>
              <p className="text-sm text-light-gray">Cyklistická nadšenkyňa & Video editorka</p>
              <p className="mt-2 text-light-gray">Profesionálna horská cyklistka s vášňou pre videotvorbu a editáciu.</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Naše hodnoty</h2>
          <ul className="list-disc pl-6 text-light-gray space-y-2">
            <li>Rešpekt k prírode a životnému prostrediu</li>
            <li>Bezpečnosť na prvom mieste</li>
            <li>Zdieľanie znalostí a skúseností</li>
            <li>Podpora miestnych komunít</li>
            <li>Inovácia a neustále zlepšovanie</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Staňte sa súčasťou našej komunity</h2>
          <p className="text-light-gray">
            Ak máte záujem o spoluprácu, máte zaujímavé lokality na natáčanie, alebo by ste chceli prispieť svojimi videami, neváhajte nás kontaktovať. Spoločne môžeme vytvoriť niečo výnimočné!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage; 