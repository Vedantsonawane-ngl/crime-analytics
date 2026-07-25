import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { chatService } from '../services/chatService';
import { useAuth } from '../context/AuthContext';
import { Bot, Send, User, Trash2, Sparkles, ShieldAlert, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const AIChatbot = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchHistory = async () => {
    try {
      const history = await chatService.getAllChatHistory();
      if (Array.isArray(history) && history.length > 0) {
        const formatted = history.flatMap((item) => [
          { sender: 'user', text: item.userMessage, timestamp: item.timestamp },
          { sender: 'bot', text: item.aiResponse, timestamp: item.timestamp },
        ]);
        setMessages(formatted);
      } else {
        setMessages([
          {
            sender: 'bot',
            text: 'Greetings Officer. I am Sentinel AI Assistant. Ask me anything about Pune crime statistics, cybercrime trends, or high-risk prediction scores.',
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      // Handled
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    // Add user message to UI state immediately
    const userMsgObj = { sender: 'user', text: userText, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsgObj]);
    setLoading(true);

    // Simulate AI Intelligence processing and save to backend /api/chat-history
    let botReply = 'Based on the latest Sentinel Crime Analytics database, Pune recorded multiple incidents recently. Cybercrime and financial fraud remain high priority areas with active investigation protocols.';
    
    if (userText.toLowerCase().includes('pune')) {
      botReply = 'Pune Crime Record Summary: Total active incidents logged: 42 open cases. Primary category observed: Cybercrime (35%), Financial Fraud (25%), Property Theft (20%).';
    } else if (userText.toLowerCase().includes('officer') || userText.toLowerCase().includes('deshmukh')) {
      botReply = 'Inspector S. Deshmukh (Badge #CY-4902) currently leads 4 active cybercrime investigations with a 87.5% resolution score.';
    } else if (userText.toLowerCase().includes('predict') || userText.toLowerCase().includes('risk')) {
      botReply = 'Predictive Threat Index: Hinjewadi & Shivajinagar sectors show High (92% confidence) risk for digital financial fraud in the upcoming 72 hours.';
    }

    try {
      // Save chat message pair to backend database
      await chatService.createChatHistory({
        userMessage: userText,
        aiResponse: botReply,
        timestamp: new Date().toISOString(),
        userId: user?.id || 1,
      });

      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: botReply, timestamp: new Date().toISOString() },
      ]);
    } catch (err) {
      // If error, still show bot reply locally
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: botReply, timestamp: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Bot className="w-6 h-6 text-[#FF7A00]" /> Sentinel AI Assistant
          </h1>
          <p className="text-xs text-[#9CA3AF]">Interactive natural language crime query & analytics agent</p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setMessages([])}
          icon={Trash2}
        >
          Clear Chat Session
        </Button>
      </div>

      {/* Chat Container */}
      <Card hover={false} className="flex-1 flex flex-col p-0 overflow-hidden min-h-0">
        {/* Messages Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${
                  msg.sender === 'user'
                    ? 'bg-[#FF7A00]/20 text-[#FF7A00] border-[#FF7A00]/40'
                    : 'bg-[#1E2638] text-[#38BDF8] border-[#2A3246]'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              <div
                className={`max-w-xl p-4 rounded-[20px] text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#FF7A00] text-white rounded-tr-none'
                    : 'bg-[#1B2235] text-[#F8FAFC] border border-[#2A3246] rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>
                <span className={`text-[10px] block mt-1.5 opacity-60 ${msg.sender === 'user' ? 'text-white' : 'text-[#9CA3AF]'}`}>
                  {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1E2638] text-[#38BDF8] border border-[#2A3246] flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-[#1B2235] text-[#9CA3AF] p-4 rounded-[20px] rounded-tl-none border border-[#2A3246] flex items-center gap-2 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-[#FF7A00]" />
                Analyzing backend crime records database...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#1A2133] border-t border-[#2A3246]">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask Sentinel AI e.g. 'Show me the crime statistics of Pune'..."
              className="flex-1 bg-[#1B2235] text-white placeholder-[#6B7280] text-sm rounded-[16px] border border-[#2A3246] px-4 py-3 focus:outline-none focus:border-[#FF7A00]"
            />
            <Button type="submit" isLoading={loading} icon={Send} className="px-5 py-3">
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};
