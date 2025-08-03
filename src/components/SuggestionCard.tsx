import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SuggestionCardProps {
  text: string;
  icon: LucideIcon;
  onClick: () => void;
  delay?: number;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({ 
  text, 
  icon: Icon, 
  onClick, 
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-all duration-300 group"
    >
      <div className="flex flex-col h-full">
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1 mb-3">
          {text}
        </p>
        <div className="flex justify-end">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};