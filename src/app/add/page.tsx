'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { addSchedule, getCookie, getLastDate, getSchedulesBusy, getStudents } from '../api/api';
import { cookies } from 'next/headers';
import { QueryResultRow } from '@vercel/postgres';
import { Tooltip } from 'react-tooltip';
interface Errors {
    date?: string
}
export default function Page() {
    const initDate = new Date().toISOString().slice(0, 10);
    const initTime = new Date().toTimeString().slice(0, 5);

    const [student, setStudent] = useState("");
    const [lastDate, setLastDates] = useState<QueryResultRow>([]);
    const [driver, setDriver] = useState("");
    const [car, setCar] = useState("");
    const [busy, setBusy] = useState(false);
    const [archived, setArchived] = useState(false);
    const [startdatetimes, setStartdatetimes] = useState<string[]>([]);
    const [currentDateTime, setCurrentDateTime] = useState(initDate + "T" + initTime)

    const [errors, setErrors] = useState<Errors>({});

    useEffect(() => {
        async function fetchData() {
            const cookieData = await getCookie();
            setDriver(cookieData.id);
            const dateData = await getLastDate();
            setLastDates(dateData.rows)
            // const studentData = await getStudents();
            // setStudents(studentData.rows);
        }

        fetchData();
    }, []);

    function onChangeHandler(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void {
        const { name, value } = event.target;
        if (name === 'student') setStudent(value);
        if (name === 'driver') setDriver(value);
        if (name === 'car') setCar(value);
        if (name === 'currentDateTime') setCurrentDateTime(value);
    }

    const newErrors: Errors = {};
    function addDateTime() {
        let check: boolean = false
        for (let i = 0; i < lastDate.length; i++) {
            const compare = new Date(currentDateTime).getHours() - new Date(lastDate[i].startdatetime).getHours();
            const days = new Date(currentDateTime).getDay() - new Date(lastDate[i].startdatetime).getDay();
            const months = new Date(currentDateTime).getMonth() - new Date(lastDate[i].startdatetime).getMonth();
            const years = new Date(currentDateTime).getFullYear() - new Date(lastDate[i].startdatetime).getFullYear();
            if (compare < 2 && days === 0 && months === 0 && years === 0) {
                check = true;
            }
        }

        if (new Date(currentDateTime) > new Date(initDate + "T" + initTime) && check === false) {
            setStartdatetimes([...startdatetimes, currentDateTime]);
            setErrors({})
        }
        else {
            newErrors.date = "Неверная дата";
            setErrors(newErrors)
        }
        setCurrentDateTime(initDate + "T" + initTime);
    }

    async function onSubmitHandler(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        setBusy(false);
        for (const startdatetime of startdatetimes) {
            await addSchedule(student, driver, car, startdatetime, busy, archived);
        }
        window.location.href = "/schedule";
    }

    // function removeDateTime(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    //     throw new Error('Function not implemented.');
    // }

    return (
        <div className="flex place-content-center h-screen -mt-20">
            <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md m-auto text-white">
                <div className="max-w-md w-full shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Добавить запись</h2>
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-4">
                            <label className="block text-gray-400 mb-2">Модель машины</label>
                            <input
                                name="car"
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                                value={car}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-400 mb-2">Дата и время начала</label>
                            <div className="flex items-center">
                                <input
                                    name="currentDateTime"
                                    type="datetime-local"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                                    value={currentDateTime}
                                    onChange={onChangeHandler}
                                    data-tooltip-id="dateTooltip"
                                    data-tooltip-content={errors.date || ''}
                                />
                                <Tooltip id="dateTooltip" place="left" />
                                <button
                                    type="button"
                                    className="ml-4 px-3 py-2 bg-green-500 text-white rounded-lg"
                                    onClick={addDateTime}
                                >
                                    Добавить
                                </button>
                            </div>
                            <ul className="mt-2 text-gray-400">
                                {startdatetimes.map((datetime, index) => (
                                    <li key={index}>{datetime.replace('T', ' ')}
                                        {/* <button onClick={removeDateTime} className='ml-5 text-red-600'>Убрать</button> */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg">
                            Добавить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
