import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function createTransaction(req, res){
    try{
        const session = res.locals.session;
        await db.collection('transactions').insertOne({...req.body, value: Number(req.body.value), userId: session.userId, date: dayjs().format()});
        res.sendStatus(201);
    } catch(error){
        res.status(500).send(error.message);
    }
}

export async function getTransaction(req, res){
    try{
        const session = res.locals.session;
        const transactions = await db.collection('transactions').find({userId: session.userId}).toArray();  
        res.send(transactions);
    } catch(error){
        res.status(500).send(error.message);
    }
}

export async function deleteTransaction(req, res){
    const { id } = req.params;

    try{
        const result = await db.collection('transactions').deleteOne( { _id: new ObjectId(id)} );
        if (result.deletedCount === 0) return res.status(404).send("Item não existe!");
        res.status(200).send("Item deletado!");

    } catch(error){
        res.status(500).send(error.message);
    }
}

export async function editTransactionsById(req, res){
    const { id } = req.params;

    try{
        const transaction = await db.collection('transactions').findOne({_id: new ObjectId(id)});
        if(!transaction) return res.sendStatus(404);

        const session = res.locals.session;
        console.log(transaction.userId.equals(session.userId))
        if(!transaction.userId.equals(session.userId)) return res.sendStatus(401);

        await db.collection('transactions').updateOne(
            {_id: new ObjectId(id)},
            { $set: {...req.body, value: Number(req.body.value), userId: session.userId, date: dayjs().format()}}
        )
        res.send("Atualizado com sucesso!");
    } catch (error){
        res.status(500).send(error.message);
    }
}
