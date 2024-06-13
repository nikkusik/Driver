'use client';
import AddButton from "../components/AddButton";
import { getCookie, getArchivedSchedules } from "../api/api";
import PleaseLoginPage from "../pleaseLogin/page";
import InfoCard from "../schedule/infoCard";
import { useState, useEffect } from 'react';
import { QueryResultRow } from "@vercel/postgres";

export default function Page({ params }: any) {
    const [data, setData] = useState<QueryResultRow[]>();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            const user = await getCookie();
            setUser(user);

            if (user?.role === 'driver' || user?.role === 'student') {
                const Data = await getArchivedSchedules();
                setData(Data?.rows);
            }
        }

        fetchData();
    }, []);

    if (!user) {
        return <PleaseLoginPage />;
    }

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
