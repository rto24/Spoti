import React, { useState, useEffect, useContext } from "react";

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

import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";


import { SettingsContext } from '../contexts/settingsContext'

export const metadata = {
  title: "Events",
};

const testSpots = [
  {
    spot_id: 1,
    name: "Stall 103",
    description: "Leaving town for a few days!",
    owner_id: "Dave",
    address: "1010 Under the Bridge",
    imgUrl: "exampleImg",
    start_date: "9/17",
    end_date: "9/20",
    time: "8am",
    price: "$10",
    status: "true",
    buildingname: "Avalon Apartments"
  },
  {
    spot_id: 2,
    name: "Stall 110",
    description: "My car is in the shop",
    owner_id: "Jim",
    address: "1010 Under the Bridge",
    imgUrl: "exampleImg",
    start_date: "9/12",
    end_date: "9/15",
    time: "8am",
    price: "$10",
    status: "false",
    buildingname: "Avalon Apartments"
  },
  {
    spot_id: 3,
    name: "Stall 302",
    description: "Going on a work trip",
    owner_id: "Sally",
    address: "1010 Under the Bridge",
    imgUrl: "exampleImg",
    start_date: "9/20",
    end_date: "10/10",
    time: "8am",
    price: "$10",
    status: "false",
    buildingname: "Equinox Apartments"
  },
];

export default function OpenSpots() {
  //   let events = await getEvents()
  const [spots, setSpots] = useState([]);

  const context = useContext(SettingsContext);
  
  // Check if context is available and log it
  useEffect(() => {
    if (context) {
      console.log('context', context);
    }
  }, [context]); // Dependency array includes context to trigger effect when it changes


  
const { building } = context || {}; // Fallback to an empty object to avoid destructuring errors if context is null



  // Load the initial events into state
  useEffect(() => {
    setSpots(testSpots);
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Subheading>Open Spots at <TextLink href="">Avalon Apartments</TextLink></Subheading>
          {/* <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search events&hellip;" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="date">Sort by date</option>
                <option value="status">Sort by status</option>
              </Select>
            </div>
          </div> */}

      <div className="flex items-center justify-between">
                <div className="flex gap-6 py-6 items-center ">
                  <div className="w-44 shrink-0">
                    <Link aria-hidden="true">
                      <img
                        className="aspect-[3/2] rounded-lg shadow"
                        // src={}
                        alt="image of building"
                      />
                    </Link>
                  </div>
                  <div className="space-y-4 items-center">
                    <div className="space-y-1.5">
                    <div className="text-xl/6 font-semibold">
                        {building.building_name} - {building.building_address}
                      </div>
                      {/* <div className="text-xl/6 font-semibold">
                        1010 Jefferson Street
                      </div> */}
                    </div>

                    <div>
                   
                      <div >
                        <TextLink href="#">Change Buildings</TextLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
        
      </div>

      <ul className="mt-6">
        {spots.map((spot, index) => (
          <>
            <li key={index}>
              <Divider soft={index > 0} />
              <div className="flex items-center justify-between">
                <div key={spot.id} className="flex gap-6 py-6 items-center ">
                  <div className="w-52 shrink-0">
                    <Badge
                      className="text-base/5 sm:text-base/5 mb-2"
                      color={spot.status === "false" ? "lime" : "zinc"}
                    >
                      {spot.status === "true" ? "Unavailable" : "Available"}
                    </Badge>
                    <Link href={spot.url} aria-hidden="true">
                      <img
                        className="aspect-[3/2] rounded-lg shadow"
                        src={spot.imgUrl}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="space-y-4 items-center">
                    <div className="space-y-1.5">
                      <div className="text-base/6 font-semibold text-zinc-500">
                        <Link href={spot.url}>{spot.name}</Link>
                      </div>
                      <div className="text-xl/6 font-semibold">
                        Available <strong>{spot.start_date}</strong> to{" "}
                        {spot.end_date}
                      </div>
                      <div className="text-xs/6  text-zinc-500">
                        {spot.buildingname} - {spot.address}
                      </div>
                      
                      
                    </div>

                    <div>
                      <div className="text-lg/6 text-zinc-600">
                        {spot.description}
                      </div>
                      <div className="text-xs/6 text-zinc-500">
                        Reservation starts at {spot.time}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button color="green">Book</Button>
                  {/* <Button outline>See Details</Button> */}
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
    </>
  );
}
