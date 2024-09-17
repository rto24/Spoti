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

export { getSpots };
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
export { getSpotListing };
