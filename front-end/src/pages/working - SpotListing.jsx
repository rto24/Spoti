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

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';

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
      // Simulate a booking service or API call
      alert(`Spot booked for ${selectedDate}`);
      // You can call a booking service here, passing selectedDate
      // e.g. spotsService.bookSpot(id, selectedDate);
    } else {
      alert('Please select a date to book the spot.');
    }
  };

  // return (
  //   <>
  //     <h1> hello</h1>
  //   </>
  // );

  return (
    <>
      <div>
        <h2 className='text-base font-semibold leading-6 text-gray-900'>
          {listingData.description.title}
        </h2>
        <div className='lg:grid lg:grid-cols-12 lg:gap-x-16'>
          <div className='mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9'>
            <div className='flex items-center text-gray-900'>
              {/* previous month button */}
              <button
                type='button'
                onClick={handlePreviousMonth}
                className='-m-1.5 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
              >
                <span className='sr-only'>Previous month</span>
                <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
              </button>

              {/* month header */}
              <div className='flex-auto text-sm font-semibold'>
                {' '}
                {currentDate.toLocaleString('default', { month: 'long' })}{' '}
                {currentDate.getFullYear()}
              </div>

              {/* next month button */}
              <button
                type='button'
                onClick={handleNextMonth}
                className='-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
              >
                <span className='sr-only'>Next month</span>
                <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>

            {/* days header */}
            <div className='mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500'>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>

            {/* days of the month grid logic */}
            <div className='isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200'>
              {days.map((day, dayIdx) => (
                <button
                  key={day.date}
                  type='button'
                  onClick={() => handleDateSelect(day)}
                  className={classNames(
                    'py-1.5 hover:bg-gray-100 focus:z-10',
                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                    (day.isSelected || day.isToday) && 'font-semibold',
                    day.isSelected && 'text-white',
                    !day.isSelected &&
                      day.isCurrentMonth &&
                      !day.isToday &&
                      'text-gray-900',
                    !day.isSelected &&
                      !day.isCurrentMonth &&
                      !day.isToday &&
                      'text-gray-400',
                    day.isToday && !day.isSelected && 'text-indigo-600',
                    dayIdx === 0 && 'rounded-tl-lg',
                    dayIdx === 6 && 'rounded-tr-lg',
                    dayIdx === days.length - 7 && 'rounded-bl-lg',
                    dayIdx === days.length - 1 && 'rounded-br-lg'
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                      day.isSelected && day.isToday && 'bg-indigo-600',
                      day.isSelected && !day.isToday && 'bg-gray-900'
                    )}
                  >
                    {day.date.split('-').pop().replace(/^0/, '')}
                  </time>
                </button>
              ))}
            </div>

            {/* booking button */}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Heading>{listingData.description.title}</Heading>
      <div className='lg:grid lg:grid-cols-12 lg:gap-x-16'>
        {/* Description List */}
        <div className='lg:col-span-7'>
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
        </div>

        {/* Calendar Component */}
        <div className='flex items-center text-gray-900'>
          {/* Previous Month Button */}
          <button
            type='button'
            onClick={handlePreviousMonth}
            className='-m-1.5 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
          >
            <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
          </button>

          {/* Current Month Display */}
          <div className='flex-auto text-sm font-semibold text-center'>
            {currentDate.toLocaleString('default', { month: 'long' })}{' '}
            {currentDate.getFullYear()}
          </div>

          {/* Next Month Button */}
          <button
            type='button'
            onClick={handleNextMonth}
            className='-m-1.5 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
          >
            <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
          </button>
        </div>

        {/* Days of the Week */}
        <div className='mt-6 grid grid-cols-7 text-xs font-semibold text-center text-gray-500'>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
          <div>S</div>
        </div>

        {/* Calendar Days */}
        <div className='mt-2 grid grid-cols-7 gap-px bg-gray-200 text-sm shadow ring-1 ring-gray-200 rounded-lg'>
          {days.map((day, dayIdx) => (
            <button
              key={day.date}
              type='button'
              className={classNames(
                'relative py-1.5',
                day.isCurrentMonth
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-50 text-gray-400',
                day.isToday ? 'bg-indigo-100 text-indigo-600' : '',
                day.isSelected ? 'bg-indigo-600 text-white' : '',
                dayIdx === 0 ? 'rounded-tl-lg' : '',
                dayIdx === 6 ? 'rounded-tr-lg' : '',
                dayIdx === days.length - 7 ? 'rounded-bl-lg' : '',
                dayIdx === days.length - 1 ? 'rounded-br-lg' : ''
              )}
            >
              <time
                dateTime={day.date}
                className={classNames(
                  'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                  day.isSelected ? 'bg-indigo-600 text-white' : '',
                  day.isToday && 'ring-2 ring-indigo-500'
                )}
              >
                {new Date(day.date).getDate()}
              </time>
            </button>
          ))}
        </div>
        <button
          type='button'
          className='mt-8 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Add event
        </button>
      </div>
    </>
  );
};

export default SpotListing;
