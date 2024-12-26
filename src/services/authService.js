export const register = (username, email, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(user => user.email === email)) {
    throw new Error('Email already exists');
  }
  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));
};

export const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
};