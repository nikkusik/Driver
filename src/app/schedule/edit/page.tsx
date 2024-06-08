'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { update } from '@/app/api/schedule';

export default function Page() {

    const searchParams = useSearchParams();

    const id = searchParams.get('id');
    const initStudent = searchParams.get('student') || '';
    const initDriver = searchParams.get('driver') || '';
    const initCar = searchParams.get('car') || '';
    const initStartdatetime = searchParams.get('startdatetime') || '';
    const initDate = initStartdatetime?.split('T')[0] || '';
    const initTime = initStartdatetime?.split('T')[1] || '';

    const [student, setStudent] = useState(initStudent);
    const [driver, setDriver] = useState(initDriver);
    const [car, setCar] = useState(initCar);
    const [startdatetime, setStartdatetime] = useState(initDate + "T" + initTime);

    useEffect(() => {
        setStudent(initStudent);
        setDriver(initDriver);
        setCar(initCar);
        setStartdatetime(initDate + "T" + initTime);
    }, [initStudent, initDriver, initCar, initDate, initTime]);

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        if (name === 'student') setStudent(value);
        if (name === 'driver') setDriver(value);
        if (name === 'car') setCar(value);
        if (name === 'startdatetime') setStartdatetime(value);
    }

    const router = useRouter();

    async function onSubmitHandler(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        update(student, driver, car, startdatetime, id)
        router.push("/schedule");
    }

    return (
        <div className=" flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900  mb-4">Добавить запись</h2>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Имя ученика</label>
                        <input
                            name='student'
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                            value={student?.toString()}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="driverName">Ваше имя</label>
                        <input
                            name='driver'
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                            value={driver?.toString()}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="carModel">Модель машины</label>
                        <input
                            name='car'
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                            value={car?.toString()}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="startDate">Дата и время начала</label>
                        <input
                            name='startdatetime'
                            type="datetime-local"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                            value={startdatetime}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <button type="submit" className='w-full bg-blue-500 text-white px-3 py-2 rounded-lg' >
                        Сохранить
                    </button>
                </form>
            </div>
        </div >
    );
};
