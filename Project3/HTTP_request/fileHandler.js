
import fs from 'fs';

export function writeDataToFile(fileName, data) {
    const promise = new Promise((resolve, reject) => {
        fs.writeFile(fileName, JSON.stringify(data), 'utf-8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
    return promise;
}