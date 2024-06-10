'use server';

import { createClient, sql } from '@vercel/postgres';
import jwt from "jsonwebtoken"

async function Client() {
    const client = createClient();
    await client.connect();
    return client
}

export async function getSchedules() {
    try {
        let { rows, fields } =
            await (await Client()).sql`SELECT * FROM schedules;`;
        return { rows, fields }
    } finally {
        (await Client()).end()
    }
}

export async function getStudents() {
    try {
        let { rows, fields } =
            await (await Client()).sql`SELECT fullname FROM users where role="student";`;
        return { rows, fields }
    } finally {
        (await Client()).end()
    }
}

export async function getDrivers() {
    try {
        let { rows, fields } =
            await (await Client()).sql`SELECT fullname FROM users where role="student";`;
        return { rows, fields }
    } finally {
        (await Client()).end()
    }
}

export async function getStudent(id: any) {
    try {
        let { rows, fields } =
            await (await Client()).sql`SELECT fullname FROM users where id=${id};`;
        return { rows, fields }
    } finally {
        (await Client()).end()
    }
}

export async function getDriver(id: any) {
    try {
        let { rows, fields } =
            await (await Client()).sql`SELECT fullname FROM users where id=${id};`;
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

export async function addSchedule(student: any, driver: any, car: any, startdatetime: any) {
    try {
        await (await Client()).sql`insert into public.schedules(student, driver, car, startdatetime) values(${student}, ${driver}, ${car}, ${startdatetime})`;
    } finally {
        (await Client()).end()
    }
};

export async function addUser(fullName: any, phone: any, email: any, password: any, role: any) {
    try {
        await (await Client()).sql`insert into public.users(fullName, email, password, role, phone) values(${fullName}, ${email}, ${password},${role}, ${phone})`;
    } finally {
        (await Client()).end()
    }
};

export async function remove(id: any) {
    try {
        await (await Client()).sql`delete FROM schedules where id = ${id}`;
    } finally {
        (await Client()).end()
    }
};

const JWT_SECRET = 'test123asdasdasd';

export async function login(email: any, password: any) {
    const client = await Client();
    try {
        const result = (await Client()).sql`SELECT * FROM public.users WHERE email = ${email} AND password = ${password}`;
        if ((await result).rowCount === 0) {
            return "hahahaa"
        }
        const user = (await result).rows[0];
        const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        return { token, user };
    } finally {
        client.end();
    }
}