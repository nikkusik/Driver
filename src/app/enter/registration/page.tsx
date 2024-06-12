'use client';
import { useState } from "react";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { addUser } from "@/app/api/api";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { cookies } from "next/headers";

interface Errors {
    fullName?: string;
    phone?: string;
    email?: string;
    password?: string;
    role?: string;
}

export default function Page() {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [errors, setErrors] = useState<Errors>({});

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhone = (phone: string) => {
        const regex = /^(\+7|8|7)?9\d{9}$/;
        return regex.test(phone);
    };

    const validateFullName = (fullName: string) => {
        const regex = /^[А-Яа-яЁё\s]+$/;
        return regex.test(fullName);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Errors = {};

        if (!validateFullName(fullName)) {
            newErrors.fullName = "ФИО должно содержать только русские буквы";
        }

        if (!validatePhone(phone)) {
            newErrors.phone = "Неверный формат номера телефона";
        }

        if (!validateEmail(email)) {
            newErrors.email = "Неверный формат почты";
        }

        if (!password) {
            newErrors.password = "Пароль не может быть пустым";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } 
        else {
            setErrors({});
            const data = await addUser(fullName, phone, email, password, "student");
            window.location.href = "/enter";
        }
    };

    return (
        <div className="flex place-content-center h-screen -mt-20">
            <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md m-auto">
                <h2 className="text-2xl font-bold text-center">Регистрация</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="ФИО"
                            className={`w-full px-3 py-2 border rounded text-black ${errors.fullName ? 'border-red-500' : ''}`}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            data-tooltip-id="fullNameTooltip"
                            data-tooltip-content={errors.fullName || ''}
                        />
                        <Tooltip id="fullNameTooltip" place="right" />
                    </div>
                    <div className="relative">
                        <input
                            type="tel"
                            placeholder="Номер телефона"
                            className={`w-full px-3 py-2 border rounded text-black ${errors.phone ? 'border-red-500' : ''}`}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            data-tooltip-id="phoneTooltip"
                            data-tooltip-content={errors.phone || ''}
                        />
                        <Tooltip id="phoneTooltip" place="right" />
                    </div>
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
                        Зарегистрироваться
                    </button>
                    <Link href="/enter" className="w-full px-4 py-2 text-white">
                        <p className="text-center">Уже зарегистрированы?</p>
                    </Link>
                </form>
            </div>
        </div>
    );
}
