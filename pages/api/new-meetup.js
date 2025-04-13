import {MongoClient} from "mongodb";
// /api/new-meetup !POST!
export default async function handler(req, res) {
    if(req.method === 'POST'){
        const data = req.body;
        try {
            const client = await MongoClient.connect(process.env.MONGODB_URI);
            const db = client.db('meetups');

            const meetupsCollection = db.collection('meetups');

            const result = await meetupsCollection.insertOne(data)

            client.close();

            res.status(201).json({
                message: 'Successfully created meetup'
            })
        } catch (err) {
            res.status(500).json({
                message: 'Something went wrong'
            })
        }
    }
}

