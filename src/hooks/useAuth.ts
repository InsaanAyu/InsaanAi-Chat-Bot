import { useState, useEffect } from 'react';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUsername = localStorage.getItem('chatbot-username');
    if (storedUsername) {
      setUser({ username: storedUsername, isAuthenticated: true });
    }
    setIsLoading(false);
  }, []);

  const signIn = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('chatbot-users') || '{}');
    
    // Demo user for backward compatibility
    if (!users['user']) {
      users['user'] = 'pass123';
      localStorage.setItem('chatbot-users', JSON.stringify(users));
    }

    if (users[username] && users[username] === password) {
      localStorage.setItem('chatbot-username', username);
      setUser({ username, isAuthenticated: true });
      return true;
    }
    return false;
  };

  const signUp = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('chatbot-users') || '{}');
    
    if (users[username]) {
      return false; // User already exists
    }
    
    users[username] = password;
    localStorage.setItem('chatbot-users', JSON.stringify(users));
    localStorage.setItem('chatbot-username', username);
    setUser({ username, isAuthenticated: true });
    return true;
  };

  const signOut = () => {
    localStorage.removeItem('chatbot-username');
    setUser(null);
  };

  return { user, isLoading, signIn, signUp, signOut };
};