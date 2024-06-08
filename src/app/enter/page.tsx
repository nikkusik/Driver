import Link from "next/link";

export default function Page() {

    return (
        <div className="flex place-content-center h-screen -mt-20">
            <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md m-auto">
                <h2 className="text-2xl font-bold text-center">Вход</h2>
                <form className="space-y-4">
                    <input type="email" placeholder="Почта" className="w-full px-3 py-2 border rounded text-black" />
                    <input type="password" placeholder="Пароль" className="w-full px-3 py-2 border rounded text-black" />
                    <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                        Войти
                    </button>
                    <Link href="/enter/registration" className="w-full px-4 py-2 text-white">
                        <p className="text-center">Зарегестрироваться</p>
                    </Link>
                </form>
            </div>
        </div>
    );
}