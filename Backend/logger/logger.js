/**
 * Step2.2 login
 * SMART 3
 * This function follows the frontend req through the backend.
 * This is the firt use of Companion, after weighing 
 * code concision : ~=,
 * learning curve and beginner's path: preferred, 
 * package and project bandwidth usage: lighter, maintnenance cost: lower 
 * and security risk lower
 * versus first analyzed response of winston.
 * 
 * written with help of OC's AI Companion
 */
export function fsLogger(logMsg, end) {
    const fs = require('fs');

    fs.appendFile(`../../../Backend/logs/${end}/logs${Day().Date}.txt`, logMsg + '\n', (err) => {
    if (err) {
        console.error('Error writing backend log :', err);
    } else {
        console.log('1 info msg is written.');
    }
    });
}