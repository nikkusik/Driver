import React from 'react';

export default function Loading() {
    return (
        <div className="flex place-content-center h-screen -mt-20">
            <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md m-auto text-white">
                <div className="text-center">
                    <div className="spinner mx-auto mb-4"></div>
                    <p className="text-lg font-semibold text-gray-300">Загружается...</p>
                </div>
            </div>
        </div>);
}
