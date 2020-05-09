import { Connection } from './index';

export const getRandomThisOrThat = () => {
    return new Promise((resolve, reject) => {
        Connection.query("SELECT * FROM thisorthat ORDER BY RAND() LIMIT 1", (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
}

export const updateValue = (votes_opt_1, votes_opt_2, id) => {
    return new Promise((resolve, reject) => {
        Connection.query(`UPDATE thisorthat SET votes_opt_1 = ${votes_opt_1}, votes_opt_2 = ${votes_opt_2} WHERE id = ${id}`, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
}

export default {
    getRandomThisOrThat,
    updateValue
}