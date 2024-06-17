'use server';

import { createClient, sql } from '@vercel/postgres';
import { cookies } from 'next/headers';

export async function getSchedules() {
    const client = createClient();
    await client.connect();
    try {
        const curUser = await getCookie();
        if (curUser.role === "driver") {
            let { rows } = await client.sql`SELECT * FROM schedules WHERE archived = FALSE`;
            return { rows }
        } else if (curUser.role === "student") {
            let { rows } = await client.sql`SELECT * FROM schedules WHERE busy=false AND archived = FALSE;`;
            return { rows }
        }
    } finally {
        await client.end();
    }
}


export async function getSchedulesBusy() {
    const client = createClient();
    await client.connect();
    try {
        const curUser = await getCookie();
        if (curUser.role === "driver") {
            let { rows } = await client.sql`SELECT * FROM schedules where driver = ${curUser.id} and busy = true  AND archived = FALSE`;
            return { rows }
        } else if (curUser.role === "student") {
            let { rows } = await client.sql`SELECT * FROM schedules where student = ${curUser.id} and busy = true  AND archived = FALSE`;
            return { rows }
        }
    } finally {
        await client.end();
    }
}

export async function getArchivedSchedules() {
    const client = createClient();
    await client.connect();
    try {
        const curUser = await getCookie();
        if (curUser.role === "driver") {
            let { rows } = await client.sql`SELECT * FROM schedules WHERE driver = ${curUser.id} AND archived = TRUE`;
            return { rows }
        } else if (curUser.role === "student") {
            let { rows } = await client.sql`SELECT * FROM schedules WHERE student = ${curUser.id} AND archived = TRUE`;
            return { rows }
        }
    } finally {
        await client.end();
    }
}

export async function archiveSchedule(id: any) {
    const client = createClient();
    await client.connect();
    try {
        const curUser = await getCookie();
        await client.sql`UPDATE schedules SET archived = TRUE WHERE id = ${id}`;
        const { rows } = await client.sql`SELECT student FROM schedules WHERE id = ${id}`;
        const studentId = rows[0]?.student;
        if (studentId) {
            await notifyStudent(studentId, id);
        }
    } finally {
        await client.end();
    }
}

export async function notifyStudent(studentId: any, scheduleId: any) {
    const client = createClient();
    await client.connect();
    try {
        const message = `Ваше запись: ${scheduleId}, была архивирована.`;
        await client.sql`INSERT INTO notifications (user_id, message) VALUES (${studentId}, ${message})`;
    } finally {
        await client.end();
    }
}

export async function getNotifications(userId: any) {
    const client = createClient();
    await client.connect();
    try {
        let { rows } = await client.sql`SELECT * FROM notifications WHERE user_id = ${userId} AND read = FALSE`;
        return { rows };
    } finally {
        await client.end();
    }
}

export async function getNames(studentIds: any, driverIds: any) {
    const client = createClient();
    await client.connect();
    try {
        const students = await client.sql`SELECT id, fullname FROM users WHERE id = ANY(${studentIds}) AND role='student'`;
        const drivers = await client.sql`SELECT id, fullname FROM users WHERE id = ANY(${driverIds}) AND role='driver'`;

        return {
            students: students.rows.reduce((acc: any, row: any) => {
                acc[row.id] = row.fullname;
                return acc;
            }, {}),
            drivers: drivers.rows.reduce((acc: any, row: any) => {
                acc[row.id] = row.fullname;
                return acc;
            }, {})
        };
    } finally {
        await client.end();
    }
}


export async function markNotificationsRead(userId: any) {
    const client = createClient();
    await client.connect();
    try {
        await client.sql`UPDATE notifications SET read = TRUE WHERE user_id = ${userId}`;
    } finally {
        await client.end();
    }
}

export async function getLastDate() {
    const client = createClient();
    await client.connect();
    try {
        const curUser = await getCookie();
        let { rows } = await client.sql`SELECT * FROM schedules where driver = ${curUser.id}`;
        return { rows }
    } finally {
        await client.end();
    }
}

export async function getSchedulesNotBusy() {
    const client = createClient();
    await client.connect();
    try {
        const curUser = await getCookie();
        let { rows } = await client.sql`SELECT * FROM schedules where driver = ${curUser.id} and busy = false`;
        return { rows }
    } finally {
        await client.end();
    }
}

export async function getStudents() {
    const client = createClient();
    await client.connect();
    try {
        let { rows } = await client.sql`SELECT id, fullname FROM users where role='student';`;
        return { rows }
    } finally {
        await client.end();
    }
}

export async function getDrivers() {
    const client = createClient();
    await client.connect();
    try {
        let { rows, fields } =
            await client.sql`SELECT fullname FROM users where role='driver';`;
        return { rows, fields }
    } finally {
        await client.end();
    }
}

export async function getStudent(id: any) {
    const client = createClient();
    await client.connect();
    try {
        let { rows } =
            await client.sql`SELECT fullname FROM users where id=${id};`;
        return { rows }
    } finally {
        await client.end();
    }
}

export async function getDriver(id: any) {
    const client = createClient();
    await client.connect();
    try {
        let { rows } =
            await client.sql`SELECT fullname FROM users where id=${id};`;
        return { rows }
    } finally {
        await client.end();
    }
}

export async function edit(student: any, driver: any, car: any, startdatetime: any, id: any, busy: boolean) {
    const client = createClient();
    await client.connect();
    try {
        await client.sql`UPDATE public.schedules SET student = ${student}, driver = ${driver}, car = ${car}, startdatetime = ${startdatetime}, busy = ${busy} WHERE id = ${id};`;
    } finally {
        await client.end();
    }
};

export async function updateBusy(id: any, busy: boolean) {
    const client = createClient();
    const curUser = await getCookie();
    await client.connect();
    try {
        await client.sql`UPDATE public.schedules SET busy = ${busy}, student = ${curUser.id} WHERE id = ${id};`;
    } finally {
        await client.end();
    }
};

export async function addSchedule(student: any, driver: any, car: any, startdatetime: any, busy: boolean, archived: boolean) {
    const client = createClient();
    await client.connect();
    try {
        await client.sql`insert into public.schedules(student, driver, car, startdatetime, busy, archived) values(${student}, ${driver}, ${car}, ${startdatetime}, ${busy}, ${archived})`;
    } finally {
        await client.end();
    }
};

export async function addUser(fullName: any, phone: any, email: any, password: any, role: any) {
    const client = createClient();
    await client.connect();
    try {
        await client.sql`insert into public.users(fullName, email, password, role, phone) values(${fullName}, ${email}, ${password},${role}, ${phone})`;
    } finally {
        await client.end();
    }
};

export async function remove(id: any) {
    const client = createClient();
    await client.connect();
    try {
        await client.sql`delete FROM schedules where id = ${id}`;
    } finally {
        await client.end();
    }
};

export interface iUser {
    id: any
    fullname: any
    email: any
    phone: any
    role: any
}

export interface iSchedule {
    id: any
    student: any
    driver: any
    car: any
    startdatetime: any
}

export async function login(email: string, password: string) {
    const client = createClient();
    await client.connect();
    try {
        const result = await client.query('SELECT * FROM public.users WHERE email = $1 AND password = $2', [email, password])

        if (result.rowCount === 0) {
            return { error: "Пользователь не найден" };
        }

        const user: iUser = result.rows[0] as iUser
        cookies().set("email", user.email)
        cookies().set("fullname", user.fullname)
        cookies().set("phone", user.phone)
        cookies().set("role", user.role)
        cookies().set("id", user.id)
        return { user };
    } finally {
        client.end();
    }
}

export async function getCookie(): Promise<iUser> {
    const email = cookies().get("email")?.value || null
    const fullname = cookies().get("fullname")?.value || null
    const phone = cookies().get("phone")?.value || null
    const role = cookies().get("role")?.value || null
    const id = cookies().get("id")?.value || null

    return { email, phone, fullname, role, id }
}

export async function delCookie() {
    cookies().delete("email")
    cookies().delete("fullname")
    cookies().delete("phone")
    cookies().delete("role")
    cookies().delete("id")
}