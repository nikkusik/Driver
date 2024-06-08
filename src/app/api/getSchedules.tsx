import { createClient, sql } from '@vercel/postgres';

async function query() {
    const client = createClient();
    await client.connect();

    try {
        let { rows, fields } =
            await client.sql`SELECT * FROM schedules;`;
        return { rows, fields }
    } finally {
        await client.end();
    }
}
export default query()