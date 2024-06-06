import type { NextApiRequest, NextApiResponse } from 'next';
import { Connection, Request, TYPES } from 'tedious';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from './dbConfig';


const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        const connection = new Connection(config);

        connection.on('connect', (err) => {
            if (err) {
                console.error('Connection Error', err);
                res.status(500).json({ error: 'Database connection failed' });
            } else {
                const sql = `SELECT password FROM Users WHERE email = @Email`;
                const request = new Request(sql, (err, rowCount, rows) => {
                    if (err) {
                        console.error('SQL Error', err);
                        res.status(500).json({ error: 'Failed to fetch data' });
                    } else if (rowCount === 0) {
                        res.status(401).json({ error: 'Invalid email or password' });
                    } else {
                        const dbPassword = rows[0][0].value;
                        bcrypt.compare(password, dbPassword, (err: any, isMatch: any) => {
                            if (err) {
                                console.error('Bcrypt Error', err);
                                res.status(500).json({ error: 'Failed to compare passwords' });
                            } else if (isMatch) {
                                const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });
                                res.status(200).json({ message: 'Login successful', token });
                            } else {
                                res.status(401).json({ error: 'Invalid email or password' });
                            }
                        });
                    }
                    connection.close();
                });

                request.addParameter('Email', TYPES.NVarChar, email);
                connection.execSql(request);
            }
        });

        connection.connect();
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

export default handler;
