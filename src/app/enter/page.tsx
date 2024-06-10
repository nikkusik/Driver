import { Children } from "react";
import ClientPage from "./clientPage";


export default function Page({ children }: { children: React.ReactNode }) {
    return (
        <ClientPage>{children}</ClientPage>
    );
}