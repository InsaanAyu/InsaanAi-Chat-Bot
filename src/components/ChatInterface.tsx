import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Code, Palette, Store as Explore } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { SuggestionCard } from './SuggestionCard';
import { Message, ChatHistory } from '../types';
import { generateResponse } from '../services/api';

const suggestions = [
  {
    text: "Design a home office setup for my remote work under $500.",
    icon: Palette
  },
  {
    text: "How can I level up my web development expertise in 2025?",
    icon: Lightbulb
  },
  {
    text: "Suggest some useful tools for debugging JavaScript code.",
    icon: Explore
  },
  {
    text: "Create a React component for a simple todo list app.",
    icon: Code
  }
];

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Add to chat history for API
    const newChatHistory = [
      ...chatHistory,
      { role: 'user', parts: [{ text: content }] }
    ];
    setChatHistory(newChatHistory);

    try {
      const response = await generateResponse(newChatHistory);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Add assistant response to chat history
      setChatHistory(prev => [
        ...prev,
        { role: 'model', parts: [{ text: response }] }
      ]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again.",
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setChatHistory([]);
  };

  const handleSuggestionClick = (text: string) => {
    handleSendMessage(text);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Welcome Section */}
      {messages.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Hello, there
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 font-medium">
              How can I help you?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
            {suggestions.map((suggestion, index) => (
              <SuggestionCard
                key={index}
                text={suggestion.text}
                icon={suggestion.icon}
                onClick={() => handleSuggestionClick(suggestion.text)}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.length > 0 && (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <ChatMessage
                message={{
                  id: 'loading',
                  content: '',
                  role: 'assistant',
                  timestamp: new Date()
                }}
                isLoading={true}
              />
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        onClearChat={handleClearChat}
        disabled={isLoading}
      />
    </div>
  );
};