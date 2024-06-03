'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Page() {
    const [student, setStudent] = useState({ name: '' });
    const [driver, setDriver] = useState({ name: '' });
    const [car, setCar] = useState({ model: '', licensePlate: '' });
    const [startDate, setStartDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь можно добавить логику для обработки формы
        console.log({ student, driver, car, startDate });
    };

    return (
        <div className=" flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900  mb-4">Добавить запись</h2>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="studentName">Имя ученика</label>
                        <input
                            type="text"
                            id="studentName"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                            value={student.name}
                            onChange={(e) => setStudent({ name: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="driverName">Ваше имя</label>
                        <input
                            type="text"
                            id="driverName"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                            value={driver.name}
                            onChange={(e) => setDriver({ name: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="carModel">Модель машины</label>
                        <input
                            type="text"
                            id="carModel"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                            value={car.model}
                            onChange={(e) => setCar({ ...car, model: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="licensePlate">Номер машины</label>
                        <input
                            type="text"
                            id="licensePlate"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                            value={car.licensePlate}
                            onChange={(e) => setCar({ ...car, licensePlate: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="startDate">Дата и время начала</label>
                        <input
                            type="datetime-local"
                            id="startDate"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <Link href="../schedule" className="">
                        <p className='w-full bg-blue-500 text-white px-3 py-2 rounded-lg'>
                            Добавить
                        </p>
                    </Link>
                </form>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-900">Ученик: {student.name}</h2>
                    <p className="mt-2 text-gray-600">Учитель: {driver.name}</p>
                    <p className="mt-2 text-gray-600">Машина: {car.model} ({car.licensePlate})</p>
                    <p className="mt-2 text-gray-600">Дата и время начала: {startDate && new Date(startDate).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

