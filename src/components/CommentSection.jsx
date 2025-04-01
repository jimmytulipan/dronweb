import React, { useState } from 'react';
import Button from './Button';

// Sample komentáre - tieto by prišli z backendu
const sampleComments = [
    { id: 'c1', user: 'DronMajster', text: 'Úžasné video! Aký dron si na to používal? Tie zábery sú neskutočne plynulé.', timestamp: 'pred 2 hodinami' },
    { id: 'c2', user: 'HorskáCyklistka', text: 'Výborná lokalita! Bola som tam minulý mesiac a trasa je naozaj skvelá, hoci náročná.', timestamp: 'pred 1 hodinou' },
    { id: 'c3', user: 'FPVNadšenec', text: 'Páči sa mi prechod medzi zábermi pri 1:24. Mohol by si urobiť tutorial ako si to editoval?', timestamp: 'pred 45 minútami' },
];

const CommentSection = ({ videoId }) => {
    const [comments, setComments] = useState(sampleComments);
    const [newComment, setNewComment] = useState('');
    const [userName, setUserName] = useState(''); // Pre anonymné komentáre

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim() || !userName.trim()) return; // Jednoduchá validácia

        // Simulácia odoslania - pridanie do lokálneho stavu
        const commentToAdd = {
            id: `c${Date.now()}`, // Unikátne ID
            user: userName,
            text: newComment,
            timestamp: 'práve teraz'
        };
        setComments([commentToAdd, ...comments]); // Pridaj na začiatok
        setNewComment('');
        // setUserName(''); // Možno nechať meno vyplnené

        // TU BY NASLEDOVALO VOLANIE NA BACKEND pre uloženie komentára
        console.log('Odosielam komentár:', commentToAdd);
    };

    return (
        <div className="mt-8 pt-8 border-t border-gray-700">
            <h3 className="text-xl font-bold mb-4">{comments.length} komentárov</h3>

            {/* Formulár pre nový komentár */}
            <form onSubmit={handleCommentSubmit} className="mb-6">
                <div className="mb-3">
                     <input
                        type="text"
                        placeholder="Vaše meno"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        className="w-full bg-gray-700/50 text-pure-white placeholder-light-gray p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        placeholder="Napíšte komentár..."
                        rows="3"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                        className="w-full bg-gray-700/50 text-pure-white placeholder-light-gray p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                    ></textarea>
                </div>
                <Button type="submit" className="py-2 px-5">Odoslať komentár</Button>
            </form>

            {/* Zoznam komentárov */}
            <div className="space-y-4">
                {comments.map(comment => (
                    <div key={comment.id} className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-pure-white">{comment.user}</span>
                            <span className="text-xs text-light-gray">{comment.timestamp}</span>
                        </div>
                        <p className="text-light-gray">{comment.text}</p>
                        <div className="mt-2 pt-2 border-t border-gray-700 flex justify-between items-center text-xs">
                            <div className="flex space-x-4">
                                <button className="text-light-gray hover:text-primary-red">Páči sa mi to</button>
                                <button className="text-light-gray hover:text-primary-red">Odpovedať</button>
                            </div>
                            <button className="text-light-gray hover:text-primary-red">Nahlásiť</button>
                        </div>
                    </div>
                ))}
                <div className="text-center mt-8">
                    <button className="text-primary-red hover:underline font-medium">
                        Zobraziť všetky komentáre →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentSection; 