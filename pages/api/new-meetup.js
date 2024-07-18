import {MongoClient} from "mongodb";
// /api/new-meetup !POST!
export default async function handler(req, res) {
    if(req.method === 'POST'){
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://ddavid_4:uoUK6bp6lVOp53xd@cluster0.uxym1wx.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
        const db = client.db('meetups');

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data)

        client.close();

        res.status(201).json({
            message: 'Successfully created meetup'
        })
    }
}

