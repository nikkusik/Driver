'use client';
import AddButton from "../components/AddButton";
import { getCookie, getArchivedSchedules, getNames } from "../api/api";
import PleaseLoginPage from "../pleaseLogin/page";
import InfoCard from "../schedule/infoCard";
import { useState, useEffect } from 'react';
import { QueryResultRow } from "@vercel/postgres";

export default function Page({ params }: any) {
    const [data, setData] = useState<QueryResultRow[]>();
    const [names, setNames] = useState<any>({});
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            const user = await getCookie();
            setUser(user);
            let Data: any
            if (user?.role === 'driver' || user?.role === 'student') {
                Data = await getArchivedSchedules();
                setData(Data?.rows);
            }
            const studentIds = Data?.rows.map((item: any) => item.student).filter((id: any) => id);
            const driverIds = Data?.rows.map((item: any) => item.driver);
            const namesData = await getNames(studentIds, driverIds);
            setNames(namesData);
        }

        fetchData();
    }, []);

    if (!user) {
        return <PleaseLoginPage />;
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-300">Архив</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
                {data?.map((item) => (
                    <InfoCard key={item.id} id={item.id} student={names.students[item.student]} driver={names.drivers[item.driver]} car={item.car} startdatetime={item.startdatetime} />
                ))}
            </div>
        </div>

    );
}
