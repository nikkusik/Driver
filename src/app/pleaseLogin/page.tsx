'use client';
import Link from 'next/link';

export default function PleaseLoginPage() {
    return (
        <div className="flex place-content-center h-screen -mt-20">
            <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md m-auto">
                <div className="max-w-md w-full shadow-md rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Нет доступа</h2>
                    <p className="text-gray-400 mb-4">Пожалуйста войдите, что бы увидеть эту страницу.</p>
                    <Link href="/enter" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                        Войти
                    </Link>
                </div>
            </div>
        </div>
    );
}
