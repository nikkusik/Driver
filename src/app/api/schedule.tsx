'use server';
import { createClient } from "@vercel/postgres";

export async function update(student: any, driver: any, car: any, startdatetime: any, id: any) {
    const client = createClient();
    await client.connect();

    try {
        await client.sql`UPDATE public.schedules SET student = ${student}, driver = ${driver}, car = ${car}, startdatetime = ${startdatetime} WHERE id = ${id};`;
    } finally {
        await client.end();
    }
};
// export async function add(student: any, driver: any, car: any, startdatetime: any, id: any) {
//     // query(student, driver, car, startdatetime, id);
// };
