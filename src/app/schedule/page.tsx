import Image from "next/image";
import InfoCard from "../card/InfoCard";
import AddButton from "../components/AddButton";

export default async function Page() {
    const data = [
        {
            student: { name: 'Ярков Ярослав Вячеславович' },
            driver: { name: 'Водитель Водитель Водитель' },
            car: { model: 'Toyota Prius', licensePlate: '1НОМ23', image: '' },
            startDate: new Date().toISOString()
        },
        {
            student: { name: 'Ярков Ярослав Вячеславович' },
            driver: { name: 'Водитель Водитель Водитель' },
            car: { model: 'Toyota Prius', licensePlate: '1НОМ23', image: '' },
            startDate: new Date().toISOString()
        },
        {
            student: { name: 'Ярков Ярослав Вячеславович' },
            driver: { name: 'Водитель Водитель Водитель' },
            car: { model: 'Toyota Prius', licensePlate: '1НОМ23', image: '' },
            startDate: new Date().toISOString()
        },
        {
            student: { name: 'Ярков Ярослав Вячеславович' },
            driver: { name: 'Водитель Водитель Водитель' },
            car: { model: 'Toyota Prius', licensePlate: '1НОМ23', image: '' },
            startDate: new Date().toISOString()
        },
        {
            student: { name: 'Ярков Ярослав Вячеславович' },
            driver: { name: 'Водитель Водитель Водитель' },
            car: { model: 'Toyota Prius', licensePlate: 'XYZ 1234', image: '' },
            startDate: new Date().toISOString()
        }
    ];
    return (
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
                {data.map((item, index) => (
                    <div key={index} className="relative p-4 border rounded shadow-md">
                        <InfoCard
                            student={item.student}
                            driver={item.driver}
                            car={item.car}
                            startDate={item.startDate}
                        />
                        <div className="flex justify-between mt-4 space-x-2">
                            <button className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600 text-sm">
                                Изменить
                            </button>
                            <button className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 text-sm">
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <AddButton />
        </div>
    );
}