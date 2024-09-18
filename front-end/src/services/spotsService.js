const getSpots = async () => {
  try {
    const res = await fetch('https://localhost:8080/spot', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    return await res.json();
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

const bookSpot = async (ownerId) => {
  try {
    const res = await fetch(`https://localhost:8080/spot/${ownerId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 1 }),
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
  } catch (err) {
    console.log(`Error in getSpotListing: ${err.message}`);
  }
};

export { getSpots, getSpotListing, bookSpot };
