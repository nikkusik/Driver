'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState, Suspense } from 'react';
import { edit } from '@/app/api/api';
import Loading from '@/app/components/Loading';
import { useSearchParams, useRouter } from 'next/navigation';

function Search() {
    const searchParams = useSearchParams();

    const id = searchParams.get('id') || '';
    const initStudent = searchParams.get('student') || '';
    const initDriver = searchParams.get('driver') || '';
    const initCar = searchParams.get('car') || '';
    const initStartdatetime = searchParams.get('startdatetime') || '';

    return <>{Main({ id, initStudent, initDriver, initCar, initStartdatetime })}</>
}

export default function Page() {
    return (
        <Suspense fallback={Loading()}>
            <Search />
        </Suspense>
    )
}
function Main({ id, initStudent, initDriver, initCar, initStartdatetime, initBusy }: any) {
    const initDate = initStartdatetime?.split('T')[0] || '';
    const initTime = initStartdatetime?.split('T')[1] || '';

    const [student, setStudent] = useState(initStudent);
    const [driver, setDriver] = useState(initDriver);
    const [car, setCar] = useState(initCar);
    const [busy, setBusy] = useState(initBusy);
    const [startdatetime, setStartdatetime] = useState(initDate + "T" + initTime);

    useEffect(() => {
        setStudent(initStudent);
        setDriver(initDriver);
        setCar(initCar);
        setBusy(initBusy);
        setStartdatetime(initDate + "T" + initTime);
    }, [initStudent, initDriver, initCar, initDate, initTime, initBusy]);

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        if (name === 'student') setStudent(value);
        if (name === 'driver') setDriver(value);
        if (name === 'car') setCar(value);
        if (name === 'busy') setBusy(value);
        if (name === 'startdatetime') setStartdatetime(value);
    }

    async function onSubmitHandler(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        await edit(student, driver, car, startdatetime, id, busy);
        window.location.href = "/schedule"
    }

    return (
        <div className="flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Добавить запись</h2>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Имя ученика</label>
                        <input
                            name='student'
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                            value={student}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Ваше имя</label>
                        <input
                            name='driver'
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                            value={driver}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Модель машины</label>
                        <input
                            name='car'
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                            value={car}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Дата и время начала</label>
                        <input
                            name='startdatetime'
                            type="datetime-local"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                            value={startdatetime}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <button type="submit" className='w-full bg-blue-500 text-white px-3 py-2 rounded-lg'>
                        Сохранить
                    </button>
                </form>
            </div>
        </div>
    );
}
