import useFormatDate from '../hooks/useFormatDate'; // Adjust the path as necessary

const getSpots = async () => {
  console.log('fetch made');
  try {
    const res = await fetch('http://localhost:8080/renter/spots', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const spots = await res.json();
    console.log(spots);

    //   return await res.json();
    return spots;
  } catch (err) {
    console.log(`error in spotsServce.getSpots: ${err.message}`);
  }
};

const createSpot = async (formData) => {
  console.log('create spot form;', formData);
  try {
    const res = await fetch('http://localhost:8080/renter/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error('Username already exists!');
    }
    console.log(json);
    localStorage.setItem('jwtToken', json.jwtToken);
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

const getSpotListing = async (spotId) => {
  try {
    const res = await fetch(`http://localhost:8080/book/spots/${spotId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    // console.log(res.json());
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(`Error in getSpotListing: ${err.message}`);
  }
};

const bookSpot = async (bookerId, spotId, selectedDate) => {
  try {
    console.log('from bookSpot:', bookerId, spotId, selectedDate);
    const res = await fetch(`http://localhost:8080/book/spots/${spotId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ booker_id: bookerId, start_date: selectedDate }),
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
  } catch (err) {
    console.log(`Error in getSpotListing: ${err.message}`);
  }
};

export { getSpots, createSpot, getSpotListing, bookSpot };
