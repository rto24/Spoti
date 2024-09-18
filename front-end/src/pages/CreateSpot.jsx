import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import * as spotsService from '../services/spotsService'

import { Button } from '../components/template/catalyst/button'
import { Heading, Subheading } from '../components/template/catalyst/heading'


const CreateSpot =(props)=> {
    const navigate = useNavigate();
    const [message, setMessage] = useState(['']);
    const [formData, setFormData] = useState({
      renter_id: '',
      img: '',
      start_date: '',
      end_date: '',
      building_address: '',
      building_name: '',
    });

    const updateMessage = (msg) => {
      setMessage(msg);
    };
  
    const handleChange = (e) => {
      updateMessage('');
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => { 
      e.preventDefault(e)

      console.log('submit')
      try {
        const spot = await spotsService.createSpot(formData);
        console.log(spot);
      //   props.setUser(user);
        navigate('/my-spots');
      } catch (err) {
        updateMessage(err.message);
      }
    };



    return (
        <>
        
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            
            <h2 className=" text-center text-xl font-bold">
              Post your parking spot!
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="building_name" className="block text-sm font-medium leading-6 text-gray-900">
                    Your Building Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="building_name"
                      name="building_name"
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                    />
                  </div>
                </div>
  
                <div>
                  <label htmlFor="building_address" className="block text-sm font-medium leading-6 text-gray-900">
                    Building Street Address
                  </label>
                  <div className="mt-2">
                    <input
                      id="building_address"
                      name="building_address"
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}

                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="start_date" className="block text-sm font-medium leading-6 text-gray-900">
                    First day of availability
                  </label>
                  <div className="mt-2">
                    <input
                      id="start_date"
                      name="start_date"
                      type="date"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}

                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="end_date" className="block text-sm font-medium leading-6 text-gray-900">
                  Last day of availability
                  </label>
                  <div className="mt-2">
                    <input
                      id="end_date"
                      name="end_date"
                      type="date"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}

                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="img" className="block text-sm font-medium leading-6 text-gray-900">
                  Upload an image of your stall
                  </label>
                  <div className="mt-2">
                    <input
                      id="img"
                      name="img"
                      type="file"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}

                    />
                  </div>
                </div>
  
                
  
                <div>
                  <Button
                    type="submit"
                    color="sky"
                    className="w-full"
                  >
                    Post Your Spot
                  </Button>
                  {message} 
                  
                </div>
              </form>
            </div>
  
            <p className="mt-10 text-center text-sm text-white">
              Not a member?{' '}
              <a href="/signup" className="underline leading-6 text-white hover:text-gray-200">
                Create your account
              </a>
            </p>
          </div>
        </div>
        </>
    )
}

export default CreateSpot

