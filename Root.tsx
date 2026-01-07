
import React, { useState, useCallback } from 'react';
import App from './App';
import AuthApp from './AuthApp';

const Root: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  return isAuthenticated ? <App /> : <AuthApp onLoginSuccess={handleLoginSuccess} />;
};

export default Root;
