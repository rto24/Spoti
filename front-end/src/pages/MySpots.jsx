import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom'
import * as spotsService from '../services/spotsService'
import { SettingsContext } from '../contexts/settingsContext'

import { Button } from '../components/template/catalyst/button'
import { Divider } from '../components/template/catalyst/divider'
import { Badge } from '../components/template/catalyst/badge'
import { Heading, Subheading } from '../components/template/catalyst/heading'



const MySpots =(props)=> {
    const [mySpots, setMySpots ] = useState()
    const [loading, setLoading ] = useState(true)

    const context = useContext(SettingsContext);
    const { building, updateBuilding, userData } = context || {}; // Fallback to an empty object to avoid destructuring errors if context is null
    
    console.log('userData', userData)
    
    useEffect(() => {
        // setSpots(spotsService.getSpots);
        const fetchSpots = async () => {
            if (userData) {
                try {
                    const mySpots = await spotsService.getMySpots(userData.id)    
                    setMySpots(mySpots)
                } catch (error) {
                    console.error('Error fetching spots:', error)
                } finally {
                    setLoading(false)
                }
            }
        }
        fetchSpots()
      }, [userData]);
      
    
    if (loading) {
        return <p>Loading spots...</p>
    }

    if (!mySpots) {
        return <p>No spots available at this time</p>
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        return `${day}/${month}`;
    };


    return (
      <>
        <Heading>My Bookings</Heading>
        <ul>
        {mySpots
            .map((spot, index) => (
            <li key={index}>
                <div className="flex items-center justify-between">
                <div key={spot.spot_id} className="flex gap-6 py-6 items-center">
                    <div className="w-52 shrink-0">
                    <Badge
                        className="text-base/5 sm:text-base/5 mb-2"
                        color={spot.status === false ? "lime" : "zinc"}
                    >
                        {spot.status === true ? "Unavailable" : "Available"}
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
                        {spot.building_name} - {spot.building_address}
                        </div>
                    </div>
                    <div>
                        {/* <div className="text-lg/6 text-zinc-600">{spot.description}</div> */}
                        <div className="text-xs/6 text-zinc-500">
                        Reservation starts at 8:00am local time
                        </div>
                    </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button color="sky">Book</Button>
                    {/* <Button outline>See Details</Button> */}
                </div>
                </div>
            </li>
            ))
            }
        </ul>
        <Divider soft className="my-6" />

        <Heading>My Owned Spots</Heading>
        <ul>
        {mySpots
            .map((spot, index) => (
            <li key={index}>
                <div className="flex items-center justify-between">
                <div key={spot.spot_id} className="flex gap-6 py-6 items-center">
                    <div className="w-52 shrink-0">
                    <Badge
                        className="text-base/5 sm:text-base/5 mb-2"
                        color={spot.status === false ? "lime" : "zinc"}
                    >
                        {spot.status === true ? "Unavailable" : "Available"}
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
                        {spot.building_name} - {spot.building_address}
                        </div>
                    </div>
                    <div>
                        {/* <div className="text-lg/6 text-zinc-600">{spot.description}</div> */}
                        <div className="text-xs/6 text-zinc-500">
                        Reservation starts at 8:00am local time
                        </div>
                    </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button color="sky">Book</Button>
                    {/* <Button outline>See Details</Button> */}
                </div>
                </div>
            </li>
            ))
            }
        </ul>
      </>
    );
}

export default MySpots

