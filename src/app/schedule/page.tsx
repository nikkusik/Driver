import AddButton from "../components/AddButton";
import { getSchedules, getStudents, } from "../api/api"
import InfoCard from "./infoCard";
import { useState } from "react";
import Link from "next/link";
import PleaseLoginPage from "../pleaseLogin/page";

export default async function Page() {
    // async function getData() {
    //     return localStorage.getItem("user");
    // }

    // const [fullName, setFullName] = useState("");
    // const [phone, setPhone] = useState("");
    // const [email, setEmail] = useState("");
    // const [role, setRole] = useState("");

    const Data = (await getSchedules()).rows;
    // const user = { fullName, phone, email, role };


    if ('driver' === 'driver') {
        return (
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
                    {Data.map((item, index) => (
                        <div key={index} className="relative p-4 border rounded shadow-md">
                            <InfoCard id={item.id} student={item.student} driver={item.driver} car={item.car} startdatetime={item.startdatetime} />
                        </div>
                    ))}
                </div>
                <AddButton />
            </div>
        );
    }
    else {
        return <PleaseLoginPage />;
    }
}