'use client';
import AddButton from "../components/AddButton";
import { getCookie, getSchedules, getSchedulesBusy, getSchedulesNotBusy, getStudent } from "../api/api";
import PleaseLoginPage from "../pleaseLogin/page";
import InfoCard from "./infoCard";
import { useState, useEffect } from 'react';
import { QueryResultRow } from "@vercel/postgres";

export default function Page({ params }: any) {
    const [isBusyView, setIsBusyView] = useState(true); // State to toggle between busy and non-busy schedules
    const [data, setData] = useState<QueryResultRow[]>();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            const user = await getCookie();
            setUser(user);

            if (user?.role === 'driver') {
                const Data = isBusyView ? await getSchedulesBusy() : await getSchedulesNotBusy();
                setData(Data?.rows);
            }
        }

        fetchData();
    }, [isBusyView]);

    if (user?.role === 'driver') {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="flex justify-center mb-4">
                    <button onClick={() => setIsBusyView(!isBusyView)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                        {isBusyView ? "Показать не занятые" : "Показать занятые"}
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
                    {data?.map((item) => (
                        <InfoCard key={item.id} id={item.id} student={item.student} driver={item.driver} car={item.car} startdatetime={item.startdatetime} />
                    ))}
                </div>
            </div>
        );
    }
    else if (user?.role === 'student') {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
                    {data?.map((item) => (
                        <InfoCard key={item.id} id={item.id} student={item.student} driver={item.driver} car={item.car} startdatetime={item.startdatetime} />
                    ))}
                </div>
            </div>
        );
    }
    else {
        return <PleaseLoginPage />;
    }
}
