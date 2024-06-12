import { cookies } from "next/headers";
import { login } from "../api/api";
import ClientPage from "./clientPage";

export default async function Page() {
    return (
        <ClientPage></ClientPage>
    );
}