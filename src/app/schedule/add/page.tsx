'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function Page() {
    const [formData, setFormData] = useState({
        student: '',
        driver: '',
        car: '',
        startDateTime: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/utils/submit', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className=" flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900  mb-4">Добавить запись</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Имя ученика</label>
                        <input
                            name='student'
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                            value={formData.student}
                            onChange={handleChange} required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="driverName">Ваше имя</label>
                        <input
                            name='driver'
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                            value={formData.driver}
                            onChange={handleChange} required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="carModel">Модель машины</label>
                        <input
                            name='car'
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                            value={formData.car}
                            onChange={handleChange} required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="startDate">Дата и время начала</label>
                        <input
                            name="startDateTime"
                            type="datetime-local"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                            value={formData.startDateTime}
                            onChange={handleChange} required
                        />
                    </div>
                    <button type="submit" className='w-full bg-blue-500 text-white px-3 py-2 rounded-lg'>
                        Добавить
                    </button>
                </form>
            </div>
        </div>
    );
};
