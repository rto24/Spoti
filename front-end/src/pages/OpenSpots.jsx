import React, { useState, useEffect, useContext } from "react";
import { getUserData } from "../services/authService"
import { Badge } from "../components/template/catalyst/badge";
import { Button } from "../components/template/catalyst/button";
import { Divider } from "../components/template/catalyst/divider";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "../components/template/catalyst/dropdown";
import { Heading, Subheading } from "../components/template/catalyst/heading";
import { Input, InputGroup } from "../components/template/catalyst/input";
import { Link } from "../components/template/catalyst/link";
import { Select } from "../components/template/catalyst/select";
import { Strong, Text, TextLink } from '../components/template/catalyst/text'
import { ChangeBuilding } from '../components/custom/changeBuilding'

import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";

import { SettingsContext } from '../contexts/settingsContext'
import useFormatDate from '../hooks/useFormatDate'; // Adjust the path as necessary

import { useNavigate } from 'react-router-dom';

import * as spotsService from '../services/spotsService'

export const metadata = {
  title: "Events",
};

// const testSpots = [
//   {
//     spot_id: 1,
//     name: "Stall 103",
//     description: "Leaving town for a few days!",
//     owner_id: "Dave",
//     address: "1010 Under the Bridge",
//     imgUrl: "exampleImg",
//     start_date: "9/17",
//     end_date: "9/20",
//     time: "8am",
//     price: "$10",
//     status: "true",
//     buildingname: "Avalon Apartments"
//   },
//   {
//     spot_id: 2,
//     name: "Stall 110",
//     description: "My car is in the shop",
//     owner_id: "Jim",
//     address: "1010 Under the Bridge",
//     imgUrl: "exampleImg",
//     start_date: "9/12",
//     end_date: "9/15",
//     time: "8am",
//     price: "$10",
//     status: "false",
//     buildingname: "Avalon Apartments"
//   },
//   {
//     spot_id: 3,
//     name: "Stall 302",
//     description: "Going on a work trip",
//     owner_id: "Sally",
//     address: "1010 Under the Bridge",
//     imgUrl: "exampleImg",
//     start_date: "9/20",
//     end_date: "10/10",
//     time: "8am",
//     price: "$10",
//     status: "false",
//     building_name: "Equinox Apartments"
//   },
// ];

export default function OpenSpots() {
  //   let events = await getEvents()
  const [spots, setSpots] = useState([]);
  const context = useContext(SettingsContext);
  const { building, updateBuilding, userData } = context || {}; // Fallback to an empty object to avoid destructuring errors if context is null
  
  const navigate = useNavigate();

  // Check if context is available and log it
  useEffect(() => {
    if (context) {
      console.log('context', context);
    }
  }, [context]); // Dependency array includes context to trigger effect when it changes
  
  // Load the initial events into state
  useEffect(() => {
    // setSpots(spotsService.getSpots);
    const fetchSpots = async () => {
        try {
            const spotsData = await spotsService.getSpots()
            
            spotsData.map((spot) => {
                // spot.description = "Out of town for a week"
                spot.name = `${Math.floor(Math.random() * 100) + 1}`
            })

            setSpots(spotsData)
        } catch (error) {
            console.error('Error fetching spots:', error)
        }
    }
    fetchSpots()
  }, []);

  console.log(userData);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    return `${month}/${day}`;
  };

  const handleSpotListing = (spot) => {
    navigate(`/spot/${spot.spot_id}`)
  }

  
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Subheading>Open Spots at {building.building_name}</Subheading>
            <div className="flex items-center justify-between">
                <div className="flex gap-6 py-6 items-center ">
                  <div className="w-44 shrink-0">
                    <Link aria-hidden="true">
                      <img
                        className="aspect-[3/2] rounded-lg shadow"
                        src="https://images.unsplash.com/photo-1534655610770-dd69616f05ff?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="image of building"
                      />
                    </Link>
                  </div>
                  <div className="space-y-4 items-center">
                    <div className="space-y-1.5">
                    <div className="text-xl/6 font-semibold">
                        {building.building_name} - {building.building_address}
                      </div>
                    </div>

                    <div>
                      <div>
                        <ChangeBuilding updateBuilding={updateBuilding}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
        
      </div>

      <ul className="mt-6">
        {spots
            .filter((spot) => spot.building_name === building.building_name) // Filter spots to match the building name
            .map((spot, index) => (
            <li key={index}>
                <Divider soft/>
                <div className="flex items-center justify-between">
                <div key={spot.spot_id} className="flex gap-6 py-6 items-center">
                    <div className="w-52 shrink-0">
                    <Badge
                        className="text-base/5 sm:text-base/5 mb-2"
                        color={spot.status === true ? "lime" : "zinc"}
                    >
                        {spot.status === true ? "Available" : "Unavailable"}
                    </Badge>
                    <Link href={spot.url} aria-hidden="true">
                        <img
                        className="aspect-[3/2] rounded-lg shadow"
                        src={spot.img ? spot.img : "https://plus.unsplash.com/premium_photo-1724766409757-340b71bc798f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt=""
                        />
                    </Link>
                    </div>
                    <div className="space-y-4 items-center">
                    <div className="space-y-1.5">
                        <div className="text-base/6 font-semibold text-zinc-500">
                            <Link>Stall {spot.name}</Link>
                        </div>
                        <div className="text-xl/6 font-semibold">
                        Available <strong>{formatDate(spot.start_date)}</strong> to {formatDate(spot.end_date)}
                        </div>
                        <div className="text-xs/6 text-zinc-500">
                        {spot.building_name} - {spot.address}
                        </div>
                    </div>
                    <div>
                        <div className="text-lg/6 text-zinc-600">{spot.description}</div>
                        <div className="text-xs/6 text-zinc-500">
                        Reservation starts at 8:00am local time
                        </div>
                    </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button color="sky" onClick={() => handleSpotListing(spot)}>Book</Button>
                    {/* <Button outline>See Details</Button> */}
                </div>
                </div>
            </li>
            ))
            .concat( // Add a default message if no spots match the filter
            spots.filter((spot) => spot.building_name === building.building_name).length === 0 ? (
                <li key="no-spots" className="text-center py-4 text-gray-500">
                No available spots for {building.building_name}.
                </li>
            ) : []
            )}
        </ul>

    </>
  );
}
