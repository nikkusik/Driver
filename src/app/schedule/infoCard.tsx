'use client';
import Link from 'next/link';
import { getCookie, getDriver, getStudent, remove } from '../api/api';
import { QueryResultRow } from '@vercel/postgres';
import { useEffect, useState } from 'react';

const InfoCard = ({ id, student, driver, car, startdatetime }: any) => {
    if (student === "") {
        student
    }
    const date = startdatetime.split('T')[0];
    const time = startdatetime.split('T')[1];
    const [studentName, setStudent] = useState("");
    const [driverName, setDriver] = useState("");
    const [role, setRole] = useState("");

    const handle = () => {
        remove(id);
        window.location.href = "/schedule";
    };


    useEffect(() => {
        async function fetchData() {
            let dataStudent: any
            if (student === "") {
                setStudent("Свободно")
            }
            else {
                dataStudent = await getStudent(student);
                setStudent(dataStudent.rows[0].fullname);
            }
            const dataDriver = await getDriver(driver);
            const dataRole = await getCookie();
            setDriver(dataDriver.rows[0].fullname);
            setRole(dataRole.role);
        }

        fetchData();
    }, [driver, student]);

    if (role === "driver")
        return (
            <div>
                <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl m-4">
                    <div className="md:flex">
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-900">Ученик: {studentName}</h2>
                            <p className="mt-2 text-gray-600">Учитель: {driverName}</p>
                            <p className="mt-2 text-gray-600">Машина: {car}</p>
                            <p className="mt-2 text-gray-600">Дата и время начала: {date} {time}</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mt-4 space-x-2">
                    {/* <Link className='px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600 text-sm'
                            href={{
                                pathname: '/schedule/edit/', query: { id, student, driver, car, startdatetime },
                            }}>
                            <p>Изменить</p>
                        </Link> */}
                    <button onClick={handle} className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 text-sm">
                        Удалить
                    </button>
                </div>
            </div>
        );
    else {
        return (
            <div>
                <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl m-4">
                    <div className="md:flex">
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-900">Ученик: {studentName}</h2>
                            <p className="mt-2 text-gray-600">Учитель: {driverName}</p>
                            <p className="mt-2 text-gray-600">Машина: {car}</p>
                            <p className="mt-2 text-gray-600">Дата и время начала: {date} {time}</p>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default InfoCard;
