import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as spotsService from '../services/spotsService';
import './SpotListing.module.css';

import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from '../components/template/catalyst/description-list';
import { Subheading, Heading } from '../components/template/catalyst/heading';

const mockData = {
  address: '123 Street, Los Angeles, CA 90013',
  price: 30,
  description: {
    title: 'Cozy Tree House Parking',
    summary: 'Warm, shaded, wide',
  },
  spot_car_photos: [],
  spot_building_photos: [
    'https://www.structurepoint.com/system/uploads/fae/image/asset/5710/Gallery6_resized.jpg',
  ],
  owner_id: 1,
  username: 'mockUser123',
  status: true,
  start_date: '',
  end_date: '',
};

const SpotListing = () => {
  const { id } = useParams();
  const [listingData, setListingData] = useState(null);

  useEffect(() => {
    const fetchedListing = spotsService.getSpotListing(id);
    // setListingData(fetchedListing);
    setListingData(mockData);
  }, [id]);

  return (
    <>
      {listingData ? (
        <>
          <Heading>{listingData.description.title}</Heading>
          <div className='flex'>
            <DescriptionList className='mt-4'>
              <DescriptionTerm>Host</DescriptionTerm>
              <DescriptionDetails>{listingData.username}</DescriptionDetails>
              <DescriptionTerm>Address</DescriptionTerm>
              <DescriptionDetails>{listingData.address}</DescriptionDetails>
              <DescriptionTerm>Description</DescriptionTerm>
              <DescriptionDetails>
                {listingData.description.summary}
              </DescriptionDetails>
              <DescriptionTerm>Price</DescriptionTerm>
              <DescriptionDetails>${listingData.price}</DescriptionDetails>
            </DescriptionList>
            <div>hello</div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default SpotListing;
