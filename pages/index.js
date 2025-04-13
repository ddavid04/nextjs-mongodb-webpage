import {MongoClient} from "mongodb";
import MeetupList from '../components/meetups/MeetupList';
import {Fragment} from "react";
import {Head} from "next/document";


function HomePage(props) {
    return (<Fragment>
        <MeetupList meetups={props.meetups}/>
    </Fragment>);
}

export async function getStaticProps() {
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const meetups = await meetupsCollection.find().toArray();
        client.close();

        return {
            props: {
                meetups: meetups.map((meetup) => ({
                    title: meetup.title,
                    address: meetup.address,
                    image: meetup.image,
                    id: meetup._id.toString(),
                })),
            },
            revalidate: 1,
        };
    } catch (error) {
        console.error('MongoDB connection error:', error.message);

        return {
            props: {
                meetups: [],
                error: 'Failed to fetch data. Try again later.',
            },
            revalidate: 10, // try again after 10 seconds
        };
    }
}


export default HomePage;