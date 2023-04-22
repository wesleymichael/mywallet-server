import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function createTransaction(req, res){
    try{
        const session = res.locals.session;
        await db.collection('transactions').insertOne({...req.body, userId: session.userId, date: dayjs().format()});
        res.sendStatus(201);
    } catch(error){
        res.status(500).send(error.message);
    }
}
