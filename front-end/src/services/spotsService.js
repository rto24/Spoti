import useFormatDate from '../hooks/useFormatDate'; // Adjust the path as necessary

export const getSpots = async () => {
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
  
//   export { getSpots };
  