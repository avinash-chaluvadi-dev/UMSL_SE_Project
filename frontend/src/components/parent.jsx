import React, { useState } from 'react';
import LoginForm from './LoginForm';
import Navbar from './Navbar';

function Parent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (email, password) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div>
      <Navbar email={email} password={password} />
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

export default Parent;