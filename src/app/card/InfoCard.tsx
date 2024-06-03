import React from 'react';

const InfoCard = ({ student, driver, car, startDate }) => {
    const isUpcoming = new Date(startDate) > new Date();

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl m-4">
            <div className="md:flex">
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-900">Ученик: {student.name}</h2>
                    <p className="mt-2 text-gray-600">Учитель: {driver.name}</p>
                    <p className="mt-2 text-gray-600">Машина: {car.model} ({car.licensePlate})</p>
                    <p className="mt-2 text-gray-600">Дата и время начала: {new Date(startDate).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}

export default InfoCard;