import React, { useEffect, useState } from 'react';
import AddButton from "../components/AddButton";
import { getSchedules } from "../api/api";
import InfoCard from "./infoCard";
import PleaseLoginPage from "../pleaseLogin/page";
import Loading from '../components/Loading';
import { QueryResultRow } from '@vercel/postgres';

export default async function Page() {
    const [loading, setLoading] = useState(true);
    const Data = (await getSchedules()).rows
    const storedUser = localStorage.getItem("user");
    if (loading) {
        return <Loading />;
    }
    else if (storedUser == null) {
        return <PleaseLoginPage />;
    }
    else {
        return (
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
                    {Data.map((item, index) => (
                        <div key={index} className="relative p-4 border rounded shadow-md">
                            <InfoCard id={item.id} student={item.student} driver={item.driver} car={item.car} startdatetime={item.startdatetime} />
                        </div>
                    ))}
                </div>
                <AddButton />
            </div>
        );
    }
}
