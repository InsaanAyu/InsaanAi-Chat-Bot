import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading = false }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-6`}
    >
      <div className={`flex-shrink-0 ${isUser ? 'order-2' : 'order-1'}`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
            : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
        } ${isLoading ? 'animate-pulse' : ''}`}>
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''} text-blue-600 dark:text-blue-400`} />
          )}
        </div>
      </div>

      <div className={`flex-1 ${isUser ? 'order-1' : 'order-2'}`}>
        <div className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ${
          isUser ? 'ml-auto' : 'mr-auto'
        }`}>
          <div className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100'
          } shadow-sm`}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {isLoading ? 'Thinking...' : message.content}
            </p>
          </div>
          <p className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
            isUser ? 'text-right' : 'text-left'
          }`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </motion.div>
  );
};