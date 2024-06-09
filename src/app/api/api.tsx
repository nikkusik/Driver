'use server';

import { createClient, sql } from '@vercel/postgres';

async function Client() {
    const client = createClient();
    await client.connect();
    return client
}

export async function get() {
    try {
        let { rows, fields } =
            await (await Client()).sql`SELECT * FROM schedules;`;
        return { rows, fields }
    } finally {
        (await Client()).end()
    }
}

export async function edit(student: any, driver: any, car: any, startdatetime: any, id: any) {
    try {
        await (await Client()).sql`UPDATE public.schedules SET student = ${student}, driver = ${driver}, car = ${car}, startdatetime = ${startdatetime} WHERE id = ${id};`;
    } finally {
        (await Client()).end()
    }
};

export async function add(student: any, driver: any, car: any, startdatetime: any) {
    try {
        await (await Client()).sql`insert into public.schedules(student, driver, car, startdatetime) values(${student}, ${driver}, ${car}, ${startdatetime})`;
    } finally {
        (await Client()).end()
    }
};