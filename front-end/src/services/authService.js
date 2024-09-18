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

export { getUserData };