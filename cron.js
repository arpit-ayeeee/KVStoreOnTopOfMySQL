
import { sequelize } from './index.js';
import { QueryTypes } from "sequelize";

export default async function implementTimeToLeave() {

    try {
        const dateNow = new Date();

        const deleteData = await sequelize.query(
            `
                DELETE
                FROM STORE
                WHERE expiresAt < :dateNow
                LIMIT 1000
            `,
            {
                replacements: {dateNow},
                type: QueryTypes.DELETE
            }
        )
    } catch (err) {
        console.log(err);
    }
}