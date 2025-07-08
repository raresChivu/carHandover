import React, { useState, useRef, useEffect, KeyboardEvent } from "react";

// Define a type for a single chat message
interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

// Main App component
const App: React.FC = () => {
  // State to store chat messages, explicitly typed as an array of ChatMessage
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // State for the user's input, explicitly typed as string
  const [input, setInput] = useState<string>("");
  // State to indicate loading status, explicitly typed as boolean
  const [loading, setLoading] = useState<boolean>(false);
  // Ref for auto-scrolling to the latest message, explicitly typed for HTMLDivElement
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the messages container whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to send a message to the AI agent
  const sendMessage = async () => {
    if (input.trim() === "") return; // Don't send empty messages

    const userMessage: ChatMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Add user message to chat history
    setInput(""); // Clear the input field
    setLoading(true); // Set loading to true

    try {
      // Prepare chat history for the API call
      let chatHistory: { role: string; parts: { text: string }[] }[] = [];
      // Add previous messages, ensuring the structure matches the API's expectation
      messages.forEach((msg) => {
        chatHistory.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        });
      });
      // Add the current user message to the history for the API call
      chatHistory.push({ role: "user", parts: [{ text: input }] });

      // Define the prompt for the AI, guiding its persona and purpose
      const prompt: string = `You are an AI assistant designed to help users with the usage of a car handover app and answer administrative questions.
      Your responses should be concise, helpful, and friendly.
      Here are the main topics and features you can answer about:
      - Registering a new user (admin or normal)
      - Logging in and out, including "Remember Me" logic
      - Password and email restrictions/validation
      - Viewing and using the navigation bars (admin/user)
      - Account options and modal usage
      - How to sign out and what it does
      - Viewing the list of all cars
      - How the car list is displayed and styled
      - Switching between admin and user navbars
      - Authentication and localStorage usage
      - How to use the helping agent
      - Generic UI styling and usability
      - Any other general app usage question

      Here are some example questions you can answer:
      - How to reset password: "To reset your password, go to the 'Settings' menu, then select 'Account Security', and click on 'Reset Password'."
      - How to register as an admin: "On the registration form, check the 'Admin' box before submitting."
      - How to view all cars: "Click the 'Cars' button on the left navigation bar to see the list of all cars."
      - How does 'Remember Me' work: "If you check 'Remember Me' at login, your session will be remembered until you sign out."
      - How to sign out: "Click 'Sign Out' in the account options on the right to clear your session."

      Based on the user's question, provide a relevant and helpful answer. If you don't know the answer, politely state that you cannot help with that specific query and suggest contacting support.

      User: ${input}`;

      // Construct the payload for the Gemini API
      const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      };
      const apiKey: string = ""; // Leave this empty; Canvas will provide the API key
      const apiUrl: string = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      // Make the API call
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      // Process the API response
      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const aiResponseText: string =
          result.candidates[0].content.parts[0].text;
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "ai", text: aiResponseText },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "ai",
            text: "Sorry, I could not get a response from the AI. Please try again.",
          },
        ]);
      }
    } catch (error: any) {
      // Catch error as 'any' or specific Error type
      console.error("Error calling Gemini API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: "An error occurred while fetching the response. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  // Handle Enter key press in the input field
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col h-[80vh] md:h-[70vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-t-xl text-white text-center text-2xl font-bold">
          App Assistant AI
        </div>

        {/* Message Display Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              <p>
                Welcome! Ask me anything about using this app or administrative
                topics.
              </p>
              <p>
                Try asking "How to reset password?" or "Where is billing info?"
              </p>
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg shadow-md ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[70%] p-3 rounded-lg shadow-md bg-gray-200 text-gray-800 rounded-bl-none">
                <div className="flex items-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></span>
                  Typing...
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} /> {/* Element to scroll to */}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 flex items-center bg-gray-50 rounded-b-xl">
          <input
            type="text"
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 text-black"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            className="ml-3 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 ease-in-out transform hover:scale-105 disabled:bg-blue-300"
            disabled={loading || input.trim() === ""}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
