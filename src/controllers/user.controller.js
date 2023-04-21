import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import { db } from "../database/database.connection.js";

export async function signUp(req, res){
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

export async function signIn(req, res){
    const {email, password} = req.body;

    try{
        const user = await db.collection('users').findOne({email});
        if(!user) return res.status(404).send("Email não cadastrado!");

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).send("Senha incorreta!");
        }

        const token = uuid();
        await db.collection('sessions').insertOne( {token, userId: user._id} );
        res.send(token);
    } catch(error){
        res.status(500).send(error.message)
    }
}
