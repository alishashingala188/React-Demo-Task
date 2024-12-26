import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const user = existingUsers.find(user => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/product');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='h-full flex justify-center items-center'>
      <div className="max-w-sm mx-auto w-full p-8 bg-white rounded">
        <div className="space-y-4">
          {error && <div className="text-red-500">{error}</div>}
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
            <Link className="text-sm underline hover:no-underline">Forgot Password?</Link>
          </div>
          <button type='submit' className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Sign In</button>
        </div>
        <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="text-sm">
            Don’t you have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" to="/register">Sign Up</Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;