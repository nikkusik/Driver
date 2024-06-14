'use client';
import AddButton from "../components/AddButton";
import { getCookie, getSchedulesBusy, getSchedulesNotBusy, getNames } from "../api/api";
import PleaseLoginPage from "../pleaseLogin/page";
import InfoCard from "./infoCard";
import { useState, useEffect } from 'react';
import { QueryResultRow } from "@vercel/postgres";
import Loading from "../components/Loading";

export default function Page({ params }: any) {
    const [isBusyView, setIsBusyView] = useState(true);
    const [data, setData] = useState<QueryResultRow[]>();
    const [names, setNames] = useState<any>({});
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const user = await getCookie();
            setUser(user);
            if(!user){
                return
            }

            let scheduleData;
            if (user?.role === 'driver') {
                scheduleData = isBusyView ? await getSchedulesBusy() : await getSchedulesNotBusy();
            } else if (user?.role === "student") {
                scheduleData = await getSchedulesBusy();
            }

            const studentIds = scheduleData?.rows.map((item: any) => item.student).filter((id: any) => id);
            const driverIds = scheduleData?.rows.map((item: any) => item.driver);

            const namesData = await getNames(studentIds, driverIds);

            setData(scheduleData?.rows);
            setNames(namesData);
            setLoading(false)
        }

        fetchData();
    }, [isBusyView]);

    if (loading) {
        return <Loading />;
    }

    else if (!user) {
        return <PleaseLoginPage />;
    }

    else if (data?.length === 0 && data) {
        return (
            <div className="flex flex-col items-center h-screen -mt-20">
                {user.role === 'driver' && (
                    <div className="flex justify-center mb-4 mt-20">
                        <button onClick={() => setIsBusyView(!isBusyView)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                            {isBusyView ? "Показать не занятые" : "Показать занятые"}
                        </button>
                    </div>
                )}
                <div className="h-full flex items-center justify-center">
                    <div className="text-center -mt-20">
                        <h3 className="text-lg font-bold mb-4">Нет доступных занятий</h3>
                        <p className="mb-4">На данный момент нет доступных занятий.</p>
                    </div>
                </div>
            </div>

        );
    }
    else if (data?.length !== 0) {
        return (
            <div className="flex flex-col items-center justify-center">
                {user.role === 'driver' && (
                    <div className="flex justify-center mb-4">
                        <button onClick={() => setIsBusyView(!isBusyView)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                            {isBusyView ? "Показать не занятые" : "Показать занятые"}
                        </button>
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
                    {data?.map((item) => (
                        <InfoCard
                            key={item.id}
                            id={item.id}
                            student={names.students[item.student] || "Свободно"}
                            driver={names.drivers[item.driver]}
                            car={item.car}
                            startdatetime={item.startdatetime}
                            role={user.role}
                        />
                    ))}
                </div>
            </div>
        );
    }

}
