'use client';
import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { delCookie, getCookie, iUser } from '../api/api';

export default function Page() {
    const [data, setData] = useState<iUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const cookieData = await getCookie();
            setData(cookieData);
            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (!data) {
        return <div>Ошибка загрузки</div>;
    }

    const displayRole = data.role === 'student' ? 'Студент' : data.role === 'driver' ? 'Водитель' : data.role;

    const handleLogout = () => {
        delCookie()
        window.location.reload()
        window.location.href = "/enter";
    };

    return (
        <div className="flex place-content-center h-screen -mt-20">
            <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md m-auto text-white">
                <div className="shadow-md rounded-lg p-8 w-full max-w-md">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-semibold">{data.fullname}</h1>
                    </div>
                    <div className="mb-6">
                        <p><strong className="text-gray-400">Ваша роль:</strong> {displayRole}</p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Контактная информация:</h2>
                        <p><strong className="text-gray-400">Електронная почта:</strong> <a href={`mailto:${data.email}`} className="text-blue-500">{data.email}</a></p>
                        <p><strong className="text-gray-400">Номер телефона:</strong> {data.phone}</p>
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
}
