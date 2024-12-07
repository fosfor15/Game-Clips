import { join } from 'path';
import { writeFile } from 'fs';

import dotenv from 'dotenv';

console.log('Hello from make-environment-file.mjs');

dotenv.config({ path: '/.env' });


console.log('process.env.PRODUCTION_MODE :>>', process.env.PRODUCTION_MODE);
const production = process.env.PRODUCTION_MODE === 'true';
console.log('production :>>', production);

const envFileContent = `export const environment = {
    production: ${production},
    firebaseSetting: {
        apiKey: '${process.env.API_KEY}',
        authDomain: '${process.env.AUTH_DOMAIN}',
        projectId: '${process.env.PROJECT_ID}',
        storageBucket: '${process.env.STORAGE_BUCKET}',
        messagingSenderId: '${process.env.MESSAGING_SENDER_ID}',
        appId: '${process.env.APP_ID}'
    }
};`;

const __dirname = import.meta.dirname;
const fileName = `environment${production ? '.prod' : ''}.ts`
console.log('fileName :>>', fileName);
const filePath = join(__dirname, '.', fileName);

writeFile(filePath, envFileContent, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        const successColor = "\x1b[32m%s\x1b[0m";
        const checkSign = "\u{2705}";
        console.log(successColor, `${checkSign} Successfully generated ${fileName} file`);
    }
});
