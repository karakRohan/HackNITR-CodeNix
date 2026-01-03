import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I’m EcoCollectBot. I can help you with waste pickup, rewards, recycling info, and dashboard guidance.",
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };

    const botReply = {
      sender: "bot",
      text: getBotReply(input),
    };

    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput("");
  };

  // ✅ ENTER KEY SEND
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ✅ REALISTIC BOT REPLIES
  const getBotReply = (text) => {
    const msg = text.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      return "Hello 😊 How can I assist you today?";
    }

    if (msg.includes("waste") || msg.includes("garbage")) {
      return "We collect household waste and ensure it is properly recycled ♻️. You can upload a waste image to earn credits.";
    }

    if (msg.includes("pickup")) {
      return "To request a pickup 🚛, go to your dashboard, upload a waste image, and submit a pickup request.";
    }

    if (msg.includes("reward") || msg.includes("credit") || msg.includes("points")) {
      return "You earn credits for every successful pickup 🎁. These credits can be redeemed for gift cards or recycled products.";
    }

    if (msg.includes("login") || msg.includes("signup") || msg.includes("account")) {
      return "You can log in or sign up using the Login page. If you face issues, try resetting your password.";
    }

    if (msg.includes("recycle") || msg.includes("recycling")) {
      return "Recycling helps reduce pollution 🌍. We ensure collected waste goes to verified recycling partners.";
    }

    if (msg.includes("thank")) {
      return "You’re welcome 😊 Feel free to ask me anything!";
    }

    return "🤔 I’m still learning. Try asking about waste pickup, rewards, recycling, or dashboard help.";
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition"
      >
        {isOpen ? <X /> : <MessageCircle />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-green-600 text-white p-3 rounded-t-xl text-center font-semibold">
            EcoCollectBot 🤖
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-green-100 ml-auto text-right"
                    : "bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-2 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}   // ✅ ENTER HANDLER
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-2 py-1 text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
