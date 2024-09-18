import useFormatDate from '../hooks/useFormatDate'; // Adjust the path as necessary

const getSpots = async () => {
    console.log('fetch made')
    try {
      const res = await fetch('http://localhost:8080/renter/spots', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }

      const spots = await res.json()
      console.log(spots)

    //   return await res.json();
    return spots
    } catch (err) {
      console.log(`error in spotsServce.getSpots: ${err.message}`);
    }
  };


const getMySpots = async (userId) => {
  console.log('fetch made', userId)
  try {
    const res = await fetch(`http://localhost:8080/renter/spots/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const mySpots = await res.json()
    console.log('mySpots from fetch', mySpots)

  //   return await res.json();
    return mySpots
  } catch (err) {
    console.log(`error in spotsServce.getSpots: ${err.message}`);
  }
};

const createSpot = async (formData) => {
  console.log('create spot form;',formData)
  try {
    const res = await fetch('http://localhost:8080/renter/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include',
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
  
  export { 
    getSpots,
    createSpot, 
    getMySpots,
  };
  