import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as spotsService from '../services/spotsService';
import './SpotListing.module.css';

import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from '../components/template/catalyst/description-list';
import { Subheading, Heading } from '../components/template/catalyst/heading';

import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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

const getDaysInMonth = (month, year) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const SpotListing = () => {
  const { id } = useParams();
  const [listingData, setListingData] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  console.log('from params:', id);

  useEffect(() => {
    const fetchedListing = spotsService.getSpotListing(id);
    // setListingData(fetchedListing);
    setListingData(mockData);
  }, [id]);

  const [days, setDays] = useState([]);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthDays = getDaysInMonth(month, year);
    setDays(
      monthDays.map((day) => ({
        date: day.toISOString().split('T')[0], // Format as YYYY-MM-DD
        isCurrentMonth: true,
        isToday: isToday(day),
      }))
    );
  }, [currentDate]);

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day.date);
  };

  const handleBooking = () => {
    if (selectedDate) {
      setModalOpen(true); // Open the modal dialog
      // Simulate a booking service or API call
      // e.g. spotsService.bookSpot(id, selectedDate);
    } else {
      alert('Please select a date to book.');
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate('/my-spots'); // Redirect to My Spots
  };

  return (
    <>
      <div>
        <h1 className='text-base font-semibold leading-6 text-gray-900'>
          {listingData?.description.title}
        </h1>
        {/* Top Image */}
        <div className='relative'>
          <img
            src={listingData?.spot_building_photos[0]} // Use the first building photo as the top image
            alt='Spot'
            className='w-full h-80 object-cover rounded-2xl shadow-lg'
            style={{ aspectRatio: '1 / 1' }} // Ensure image is square
          />
        </div>
        <div className='lg:grid lg:grid-cols-12 lg:gap-x-16'>
          <div className='mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9'>
            <div className='flex items-center text-gray-900'>
              {/* Previous Month Button */}
              <button
                type='button'
                onClick={handlePreviousMonth}
                className='-m-1.5 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
              >
                <span className='sr-only'>Previous month</span>
                <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
              </button>

              {/* Month Header */}
              <div className='flex-auto text-sm font-semibold'>
                {' '}
                {currentDate.toLocaleString('default', { month: 'long' })}{' '}
                {currentDate.getFullYear()}
              </div>

              {/* Next Month Button */}
              <button
                type='button'
                onClick={handleNextMonth}
                className='-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
              >
                <span className='sr-only'>Next month</span>
                <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>

            {/* Days Header */}
            <div className='mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500'>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>

            {/* Days of the Month Grid Logic */}
            <div className='isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200'>
              {days.map((day, dayIdx) => (
                <button
                  key={day.date}
                  type='button'
                  onClick={() => handleDateSelect(day)}
                  className={classNames(
                    'py-1.5 hover:bg-gray-100 focus:z-10',
                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                    selectedDate === day.date &&
                      'bg-indigo-600 text-1 border-2 border-indigo-800',
                    day.isToday && !selectedDate && 'text-indigo-600',
                    !day.isCurrentMonth && 'text-gray-400',
                    dayIdx === 0 && 'rounded-tl-lg',
                    dayIdx === 6 && 'rounded-tr-lg',
                    dayIdx === days.length - 7 && 'rounded-bl-lg',
                    dayIdx === days.length - 1 && 'rounded-br-lg'
                  )}
                >
                  <time
                    dateTime={day.date}
                    className='mx-auto flex h-7 w-7 items-center justify-center rounded-full'
                  >
                    {day.date.split('-').pop().replace(/^0/, '')}
                  </time>
                </button>
              ))}
            </div>

            {/* Booking Button */}
            <button
              type='button'
              onClick={handleBooking}
              className='mt-8 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Book Spot
            </button>
          </div>
          <div className='lg:grid lg:grid-cols-12 lg:gap-x-16'>
            {/* Description List */}
            <div className='lg:col-span-7'>
              <DescriptionList className='mt-4'>
                <DescriptionTerm>Host</DescriptionTerm>
                <DescriptionDetails>{listingData?.username}</DescriptionDetails>
                <DescriptionTerm>Address</DescriptionTerm>
                <DescriptionDetails>{listingData?.address}</DescriptionDetails>
                <DescriptionTerm>Description</DescriptionTerm>
                <DescriptionDetails>
                  {listingData?.description.summary}
                </DescriptionDetails>
                <DescriptionTerm>Price</DescriptionTerm>
                <DescriptionDetails>${listingData?.price}</DescriptionDetails>
              </DescriptionList>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className='relative z-10'
      >
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
        />

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <DialogPanel
              transition
              className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'
            >
              <div>
                <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
                  <CheckIcon
                    aria-hidden='true'
                    className='h-6 w-6 text-green-600'
                  />
                </div>
                <div className='mt-3 text-center sm:mt-5'>
                  <DialogTitle
                    as='h3'
                    className='text-base font-semibold leading-6 text-gray-900'
                  >
                    Booking Successful!
                  </DialogTitle>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Your booking for {selectedDate} has been confirmed.
                    </p>
                  </div>
                </div>
              </div>
              <div className='mt-5 sm:mt-6'>
                <button
                  type='button'
                  onClick={handleModalClose}
                  className='inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Back to My Spots
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SpotListing;
