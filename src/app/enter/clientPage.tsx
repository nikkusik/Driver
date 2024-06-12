'use client';
import Link from "next/link";
import { useState } from "react";
import { iUser, login } from "../api/api";
import { Tooltip } from "react-tooltip";
import { cookies } from "next/dist/client/components/headers";
// import { cookies } from "next-client-cookies";

interface Errors {
    fullName?: string;
    phone?: string;
    email?: string;
    password?: string;
}

export default function ClientPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Errors>({});

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Errors = {};

        if (!validateEmail(email)) {
            newErrors.email = "Неверный формат почты";
        }

        if (!password) {
            newErrors.password = "Пароль не может быть пустым";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            const data = await login(email, password);
            if (data.error == "Пользователь не найден") {
                setErrors({ email: 'Неверные данные' });
                console.log(data.user)
                console.log(data.error)
            }
            else {
                window.location.href = "/profile";
            }
        }
    };

    return (
        <div className="flex place-content-center h-screen -mt-20">
            <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md m-auto">
                <h2 className="text-2xl font-bold text-center">Вход</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Почта"
                            className={`w-full px-3 py-2 border rounded text-black ${errors.email ? 'border-red-500' : ''}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            data-tooltip-id="emailTooltip"
                            data-tooltip-content={errors.email || ''}
                        />
                        <Tooltip id="emailTooltip" place="right" />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Пароль"
                            className={`w-full px-3 py-2 border rounded text-black ${errors.password ? 'border-red-500' : ''}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            data-tooltip-id="passwordTooltip"
                            data-tooltip-content={errors.password || ''}
                        />
                        <Tooltip id="passwordTooltip" place="right" />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                        Войти
                    </button>
                    <Link href="/enter/registration" className="w-full px-4 text-white">
                        <p className="text-center">Зарегистрироваться</p>
                    </Link>
                </form>
            </div>
        </div>
    );
}

