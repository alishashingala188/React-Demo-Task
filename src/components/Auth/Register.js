import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { username, email, password };
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    const emailExists = existingUsers.some(user => user.email === email);
    if (emailExists) {
      setError('Email already exists');
      return;
    }

    // Add new user to the list
    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Redirect to login page
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className='h-full flex justify-center items-center'>
      <div className="max-w-sm mx-auto w-full p-8 bg-white rounded">
        <div className="space-y-4">
          {error && <div className="text-red-500">{error}</div>}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="username">User Name <span className="text-rose-500">*</span></label>
            <input id="username" className="form-input w-full" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address <span className="text-rose-500">*</span></label>
            <input id="email" className="form-input w-full" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">Password <span className="text-rose-500">*</span></label>
            <input id="password" className="form-input w-full" type="password" autoComplete="on" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="mr-1">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="text-sm ml-2">Email me about product news.</span>
            </label>
          </div>
          <button type='submit' className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap">Sign Up</button>
        </div>
        {/* Footer */}
        <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="text-sm">
            Have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;