'use client';
import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [data, setUser] = useState<any>();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    if (!data) {
        return Loading();
    }

    const displayRole = data.user.role === 'student' ? 'Студент' : data.user.role === 'driver' ? 'Водитель' : data.user.role;

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = "/enter"
    };

    return (
        <div className="flex place-content-center h-screen -mt-20">
            <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md m-auto text-white">
                <div className=" shadow-md rounded-lg p-8 w-full max-w-md">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-semibold">{data.user.fullname}</h1>
                    </div>
                    <div className="mb-6">
                        <p className=""><strong className="text-gray-400">Ваша роль:</strong> {displayRole}</p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Контактная информация:</h2>
                        <p className=""><strong className="text-gray-400">Електронная почта:</strong> <a href={`mailto:${data.user.email}`} className="text-blue-500">{data.user.email}</a></p>
                        <p className=""><strong className="text-gray-400">Номер телефона:</strong> {data.user.phone}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    );
};