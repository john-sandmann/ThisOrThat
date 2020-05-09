import * as mysql from 'mysql';
import config from '../config';

import functions from "./functions";

export const Connection = mysql.createConnection(config.mysql);

Connection.connect(err => {
    if(err) console.log(err);
})

export const escapeString = (string) => {
    let escapedString = mysql.escape(string);
    return escapedString;
}

export default {
    functions,
}