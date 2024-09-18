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

const getSpotListing = async (ownerId) => {
  try {
    const res = await fetch(`https://localhost:8080/spot/${ownerId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.log(`Error in getSpotListing: ${err.message}`);
  }
};

const bookSpot = async (ownerId, selectedDate) => {
  try {
    console.log('from bookSpot:', selectedDate, ownerId);
    const res = await fetch(`https://localhost:8080/spot/${ownerId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 1, start_date: selectedDate }),
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
  } catch (err) {
    console.log(`Error in getSpotListing: ${err.message}`);
  }
};

export { getSpots, getSpotListing, bookSpot };
