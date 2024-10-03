import React, { useState } from 'react';
import './style.css';

// Interface pour les messages
interface Message {
    text: string;
    type: 'sent' | 'received';
}

// Fonction de distance de Levenshtein pour mesurer la similarité entre deux chaînes
const levenshteinDistance = (a: string, b: string) => {
    const matrix = Array.from(Array(a.length + 1), () => Array(b.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
            );
        }
    }

    return matrix[a.length][b.length];
};

// Fonction pour calculer la similarité en pourcentage
const similarity = (a: string, b: string) => {
    const distance = levenshteinDistance(a, b);
    const maxLen = Math.max(a.length, b.length);
    return ((maxLen - distance) / maxLen) * 100; // Similarité en pourcentage
};

// Composant principal
function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [currentBotMessage, setCurrentBotMessage] = useState(""); // Store bot message being typed

    // JSON object with chatbot responses
    const json = {
        "bonjour": "Bonjour et bienvenu dans Atelys AI, comment puis-je vous aider aujourd'hui ?",
        "j'aimerais faire une réclamation": "Je suis désolé d'entendre cela. Pouvez-vous me donner le numéro de votre commande, s'il vous plaît ?",
        "cmd123456": "Merci pour les informations. Votre commande a été passée le 2 septembre et devait arriver le 10 septembre à 12 Rue de la Paix, Casablanca. Cependant, il semble qu'elle soit en retard.",
        "quand vais-je recevoir ma commande": "Votre commande devrait arriver dans les 48 heures. Nous vous tiendrons informé si des retards supplémentaires surviennent.",
        // "puis-je annuler ma commande": "Vous pouvez annuler votre commande si elle n'a pas encore été expédiée. Souhaitez-vous procéder à l'annulation ?",
        // "oui, je veux annuler": "D'accord, nous allons annuler votre commande CMD123456 et procéder à un remboursement sous 5 jours ouvrables.",
        // "non, je préfère attendre": "Parfait, nous allons tout faire pour que votre commande vous parvienne dans les 48 heures.",
        // "pouvez-vous confirmer mon adresse de livraison": "Bien sûr. Votre adresse de livraison est : 12 Rue de la Paix, 75001 Paris, France.",
        // "comment contacter le service client": "Vous pouvez contacter notre service client à l'adresse email : contact@boutique-en-ligne.com ou par téléphone au +33 1 23 45 67 89.",
        // "je n'ai pas reçu de notification de suivi": "Nous nous excusons pour cela. Le transporteur aurait dû vous envoyer un email avec le lien de suivi. Nous allons vous renvoyer le lien immédiatement.",
        // "quel est le statut actuel de ma commande": "Votre commande est en cours de livraison. Elle a quitté notre entrepôt le 8 septembre et est actuellement en transit.",
        // "y a-t-il un numéro de suivi": "Oui, voici le numéro de suivi de votre commande : FR123456789. Vous pouvez le suivre sur le site du transporteur.",
        "merci pour votre aide": "Je vous en prie, Monsieur. Si vous avez d'autres questions, n'hésitez pas à nous contacter.",
        "au revoir": "Au revoir et encore désolé pour l'inconvénient. Passez une excellente journée !"
    };

    const handleSend = async () => {
        if (input.trim() === "") return;

        // Add the user's message to the chat
        const userMessage: Message = { text: input, type: "sent" };
        setMessages((prev) => [...prev, userMessage]);

        // Clear the input field
        setInput("");

        // Simulate chatbot typing
        setIsTyping(true);

        // Simulate a 2-second delay for typing animation
        setTimeout(() => {
            const responseText = findResponse(input);
            if (responseText) {
                typeMessage(responseText);
            }
        }, 2000); // Short typing delay
    };

    const typeMessage = (message: string) => {
        let index = 0;
        setCurrentBotMessage(""); // Reset bot message

        const typingInterval = setInterval(() => {
            if (index < message.length) {
                setCurrentBotMessage((prev) => prev + message[index]);
                index++;
            } else {
                clearInterval(typingInterval);
                // Add full message to messages array
                setMessages((prev) => [...prev, { text: message, type: "received" }]);
                setIsTyping(false);
                setCurrentBotMessage(""); // Clear current bot message after it's fully typed
            }
        }, 50); // Adjust typing speed by changing the interval (50ms per character)
    };

    // Find response in the JSON object with 80% similarity matching
    const findResponse = (userInput: string): string | null => {
        const lowerCasedInput = userInput.toLowerCase();
        let bestMatch = { text: null as string | null, similarity: 0 };

        // Check similarity with all keys in the JSON
        Object.keys(json).forEach((key) => {
            const sim = similarity(lowerCasedInput, key);
            if (sim > bestMatch.similarity && sim >= 80) {
                bestMatch = { text: json[key], similarity: sim };
            }
        });

        return bestMatch.text || "Désolé, je ne comprends pas cette demande. Pouvez-vous reformuler ?";
    };

    return (
        <div className="flex flex-col border rounded-lg border-gray-200 h-[80vh] mt-5">
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`text-white p-4 rounded-2xl m-2 max-w-xs ${msg.type === "sent" ? "bg-blue-500 ml-auto" : "bg-gray-500 mr-auto"}`}
                    >
                        {msg.text}
                    </div>
                ))}
                {isTyping && (
                    <div className="flex items-center text-white p-4 rounded-2xl m-2 max-w-xs bg-gray-500 mr-auto">
                        <div>{currentBotMessage || "Typing..."}</div>
                    </div>
                )}
            </div>
            <div className="flex p-3 bg-white border-t border-gray-200">
                <input
                    type="text"
                    className="flex-1 border rounded p-2 m-2"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(event) => event.key === 'Enter' ? handleSend() : null}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                    onClick={handleSend}
                >
                    Envoyer
                </button>
            </div>
        </div>
    );
}

export default Chat;
