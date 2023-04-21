import bcrypt from "bcrypt";
import { db } from "../database/database.connection.js";

export async function singUp(req, res){
    const {name, email, password} = req.body;
    
    try{
        const user = await db.collection('users').findOne({email});
        if(user) return res.status(409).send("Email já cadastrado!");

        const hash = bcrypt.hashSync(password, 10);

        await db.collection('users').insertOne({name, email, password: hash});
        res.sendStatus(201);

    } catch(error){
        res.status(500).send(error.message);
    }
}