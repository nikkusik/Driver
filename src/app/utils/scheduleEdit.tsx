import type { NextApiRequest, NextApiResponse } from 'next';
import { Connection, Request, TYPES } from 'tedious';
import config from './dbConfig';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const connection = new Connection(config);

        connection.on('connect', (err) => {
            if (err) {
                console.error('Connection Error', err);
                res.status(500).json({ error: 'Database connection failed' });
            } else {
                const sql = `SELECT * FROM Schedule`;
                const request = new Request(sql, (err, rowCount, rows) => {
                    if (err) {
                        console.error('SQL Error', err);
                        res.status(500).json({ error: 'Failed to fetch data' });
                    } else {
                        const schedule: { id: any; student: any; teacher: any; car: any; startDateTime: any; }[] = [];
                        rows.forEach((row: { value: any; }[]) => {
                            const item = {
                                id: row[0].value,
                                student: row[1].value,
                                teacher: row[2].value,
                                car: row[3].value,
                                startDateTime: row[4].value,
                            };
                            schedule.push(item);
                        });
                        res.status(200).json(schedule);
                    }
                    connection.close();
                });

                connection.execSql(request);
            }
        });

        connection.connect();
    } else if (req.method === 'PUT') {
        const { id, student, driver, car, startDateTime } = req.body;

        const connection = new Connection(config);

        connection.on('connect', (err) => {
            if (err) {
                console.error('Connection Error', err);
                res.status(500).json({ error: 'Database connection failed' });
            } else {
                const sql = `UPDATE Schedule SET student = @Student, driver = @Driver, car = @Car, startDateTime = @StartDateTime WHERE id = @Id`;
                const request = new Request(sql, (err) => {
                    if (err) {
                        console.error('SQL Error', err);
                        res.status(500).json({ error: 'Failed to update data' });
                    } else {
                        res.status(200).json({ message: 'Data updated successfully' });
                    }
                    connection.close();
                });

                request.addParameter('Id', TYPES.Int, id);
                request.addParameter('Student', TYPES.NVarChar, student);
                request.addParameter('Driver', TYPES.NVarChar, driver);
                request.addParameter('Car', TYPES.NVarChar, car);
                request.addParameter('StartDateTime', TYPES.DateTime, startDateTime);

                connection.execSql(request);
            }
        });

        connection.connect();
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

export default handler;
