'use client';

import React, { useEffect, useState } from 'react';
import { getDriver, getSchedules, updateBusy } from '../api/api';
import { QueryResultRow } from '@vercel/postgres';
import OneElement from './oneElement';

export default function Page() {
    const [schedule, setSchedule] = useState<QueryResultRow[]>();

    useEffect(() => {
        async function fetchData() {
            const data = await getSchedules();
            setSchedule(data?.rows);
        }

        fetchData();
    }, []);

    if (schedule?.length === 0) {
        return (
            <div className="fixed inset-0 bg-opacity-75 flex items-center justify-center">
                <div className=" p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-bold mb-4 text-center">Нет доступных занятий</h3>
                    <p className="mb-4 text-center">На данный момент нет доступных занятий.</p>
                </div>
            </div>
        );
    }
    else {
        return (
            <ul className="flex items-center flex-col ">
                {schedule?.map((item) => (
                    <OneElement key={item.id} id={item.id} startdatetime={item.startdatetime} driver={item.driver} car={item.car} />
                ))}
            </ul>
        );
    }
}
