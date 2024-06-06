import { ConnectionConfiguration } from "tedious";

const config: ConnectionConfiguration = {
    server: 'nikkus.ddns.net',
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',
            password: 'Yjdsq123',
        },
    },
    options: {
        database: 'driver',
        encrypt: true,
    },
};
export default config;