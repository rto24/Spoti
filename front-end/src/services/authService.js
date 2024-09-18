const getUserData = async () => {
  try {
    const response = await fetch('http://localhost:8080/auth/userInfo', {
      credentials: 'include',
    });
    if (!response.ok) { 
      throw new Error (`Failed to get user data`); 
    }
    return response.json()
  } catch (err) {
      console.log(err)
  }
}



const getUser = () => {
  const token = localStorage.getItem('jwtToken');
  console.log('token',token)
  if (!token) return null;
  const user = JSON.parse(atob(token.split('.')[1]));
  return user;
};

const signup = async (formData) => {
  console.log('signup form;',formData)
  try {
    const res = await fetch(`http://localhost:8080/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error('Username already exists!');
    }
    console.log(json)
    localStorage.setItem('jwtToken', json.jwtToken);
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

const signin = async (user) => {
  console.log('signin form:', user)
  try {
    const res = await fetch(`http://localhost:8080/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
      credentials: 'include'
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    console.log('json',json)
    if (json.jwtToken) {
      localStorage.setItem('jwtToken', json.jwtToken);
      const user = JSON.parse(atob(json.jwtToken.split('.')[1]));
      return user;
    }
  } catch (err) {
    throw err;
  }
};

const signout = () => {
  localStorage.removeItem('jwtToken');
};

export {
  signup, 
  signin, 
  getUser, 
  signout,
  getUserData
};

