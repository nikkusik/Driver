import Image from "next/image";
import InfoCard from "../card/InfoCard";

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
        // Добавьте больше объектов с данными здесь
    ];
    return (
        <main>
            <div className="min-h-screen flex items-center justify-center -mt-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                    {data.map((item, index) => (
                        <InfoCard
                            key={index}
                            student={item.student}
                            driver={item.driver}
                            car={item.car}
                            startDate={item.startDate}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}