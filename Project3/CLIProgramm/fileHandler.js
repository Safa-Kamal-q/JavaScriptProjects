
import fs from 'fs';

export function readDataFromFile(fileName) {
    const promise = new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        })
    })
    return promise;
}

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


