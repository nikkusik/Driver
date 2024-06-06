import { ConnectionConfig } from 'mysql';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Connection, ConnectionConfiguration, Request, TYPES } from 'tedious';
import config from './dbConfig';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { student, driver, car, startDateTime } = req.body;

    const connection = new Connection(config);

    connection.on('connect', (err) => {
      if (err) {
        console.error('Connection Error', err);
        res.status(500).json({ error: 'Database connection failed' });
      } else {
        const sql = `INSERT INTO Schedule (student, driver, car, startDateTime) VALUES (@student, @driver, @car, @startDateTime)`;
        const request = new Request(sql, (err) => {
          if (err) {
            console.error('SQL Error', err);
            res.status(500).json({ error: 'Failed to insert data' });
          } else {
            res.status(200).json({ message: 'Data inserted successfully' });
          }
          connection.close();
        });

        request.addParameter('student', TYPES.NVarChar, student);
        request.addParameter('driver', TYPES.NVarChar, driver);
        request.addParameter('car', TYPES.NVarChar, car);
        request.addParameter('startDateTime', TYPES.DateTime, new Date(startDateTime));

        connection.execSql(request);
      }
    });

    connection.connect();
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
