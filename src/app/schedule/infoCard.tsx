'use client';
import Link from 'next/link';
import { remove } from '../api/api';

const InfoCard = ({ id, student, driver, car, startdatetime }: any) => {
    const date = startdatetime.split('T')[0];
    const time = startdatetime.split('T')[1];
    function handle(): void {
        remove(id)
        window.location.href = "/schedule"
    }

    return (
        <div>
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl m-4">
                <div className="md:flex">
                    <div className="p-4">
                        <h2 className="text-xl font-semibold text-gray-900">Ученик: {student}</h2>
                        <p className="mt-2 text-gray-600">Учитель: {driver}</p>
                        <p className="mt-2 text-gray-600">Машина: {car}</p>
                        <p className="mt-2 text-gray-600">Дата и время начала: {date} {time}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-4 space-x-2">
                <Link className='px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600 text-sm'
                    href={{
                        pathname: '/schedule/edit/', query: { id, student, driver, car, startdatetime },
                    }}>
                    <p>Изменить</p>
                </Link>
                <button onClick={handle} className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 text-sm">
                    Удалить
                </button>
            </div>
        </div>


    );
}

export default InfoCard;