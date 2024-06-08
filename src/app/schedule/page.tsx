import AddButton from "../components/AddButton";
import * as fromDb from "../api/getSchedules"
import InfoCard from "./infoCard";

export default async function Page() {
    const Data = (await fromDb.default).rows
    return (
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
                {Data.map((item, index) => (
                    <div key={index} className="relative p-4 border rounded shadow-md">
                        <InfoCard id={item.id} student={item.student}
                            driver={item.driver}
                            car={item.car}
                            startdatetime={item.startdatetime} />
                    </div>
                ))}
            </div>
            <AddButton />
        </div>
    );
}