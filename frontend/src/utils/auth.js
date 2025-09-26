// Store JWT token
export const setToken = (token) => {
  localStorage.setItem('userToken', token);
};

// Get JWT token
export const getToken = () => {
  return localStorage.getItem('userToken');
};

// Remove token
export const removeToken = () => {
  localStorage.removeItem('userToken');
};

// Store user info
export const setUser = (user) => {
  localStorage.setItem('userInfo', JSON.stringify(user));
};

// Get user info
export const getUser = () => {
  const user = localStorage.getItem('userInfo');
  return user ? JSON.parse(user) : null;
};

// Remove user info
export const removeUser = () => {
  localStorage.removeItem('userInfo');
};
