
import React, { useState } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Pricing from './components/auth/Pricing';
import AuthFooter from './components/auth/AuthFooter';
import Legal from './components/auth/Legal';
import { LEGAL_CONTENT } from './constants';

export type AuthView = 'login' | 'register' | 'pricing' | 'terms' | 'privacy' | 'acknowledgments' | 'agreement' | 'disclaimer';

interface AuthAppProps {
  onLoginSuccess: () => void;
}

const AuthApp: React.FC<AuthAppProps> = ({ onLoginSuccess }) => {
  const [authView, setAuthView] = useState<AuthView>('login');

  const renderContent = () => {
    switch (authView) {
      case 'login':
        return <Login setAuthView={setAuthView} onLoginSuccess={onLoginSuccess} />;
      case 'register':
        return <Register setAuthView={setAuthView} onLoginSuccess={onLoginSuccess} />;
      case 'pricing':
        return <Pricing setAuthView={setAuthView} />;
      case 'terms':
        return <Legal title="Terms of Service" content={LEGAL_CONTENT.terms} setAuthView={setAuthView} />;
      case 'privacy':
        return <Legal title="Privacy Policy" content={LEGAL_CONTENT.privacy} setAuthView={setAuthView} />;
       case 'acknowledgments':
        return <Legal title="Acknowledgments" content={LEGAL_CONTENT.acknowledgments} setAuthView={setAuthView} />;
      case 'agreement':
        return <Legal title="User Agreement" content={LEGAL_CONTENT.agreement} setAuthView={setAuthView} />;
      case 'disclaimer':
        return <Legal title="Disclaimer" content={LEGAL_CONTENT.disclaimer} setAuthView={setAuthView} />;
      default:
        return <Login setAuthView={setAuthView} onLoginSuccess={onLoginSuccess} />;
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gray-700 text-gray-100 flex flex-col overflow-hidden">
      <main className="flex-grow flex items-center justify-center relative">
        {renderContent()}
      </main>
      <AuthFooter setAuthView={setAuthView} />
    </div>
  );
};

export default AuthApp;
