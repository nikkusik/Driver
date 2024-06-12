'use client';

import React, { useEffect, useState } from 'react';
import { getDriver, getSchedules, updateBusy } from '../api/api';
import { QueryResultRow } from '@vercel/postgres';

export default function OneElement({ id, startdatetime, driver, car }: any) {
    const [driverName, setDriver] = useState("");

    function handleSignup(id: any): void {
        updateBusy(id, true)
        window.location.href = "/join"
    }
    useEffect(() => {
        async function fetchData() {
            const dataDriver = await getDriver(driver);
            setDriver(dataDriver.rows[0].fullname);
        }

        fetchData();
    }, [driver]);

    return (
        <li key={id} className="text-gray-900 flex justify-between items-center w-1/4">
            <div className='m-2 p-2 bg-white w-full rounded'>
                <p className="font-medium">{startdatetime.split('T')[0]} {startdatetime.split("T")[1]}</p>
                <p className="text-sm text-gray-600">{driverName}</p>
                <p className="text-sm text-gray-600">{car}</p>
            </div>
            <button onClick={() => handleSignup(id)} className="p-2 bg-green-500 text-white rounded">
                Запись
            </button>
        </li>
    );
}
