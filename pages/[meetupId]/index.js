import MeetupDetail from "@/components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from "mongodb";
import {redirect} from "next/navigation";

export default function MeetupDetails(props) {
    // console.log(props);
    return (
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    );
}

export async function getStaticPaths() {

    const client = await MongoClient.connect(process.env.MONGODB_URI);

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({},{_id: 1}).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({
            params: {meetupId: meetup._id.toString()},
        }))
    }
}

export async function getStaticProps(context) {
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI);

        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const meetupId = context.params.meetupId;

        const selectedMeetup = await meetupsCollection.findOne({
            _id: new ObjectId(meetupId),
        });

        client.close();
        return {
            props: {
                meetupData: {
                    id: selectedMeetup._id.toString(),
                    title: selectedMeetup.title,
                    address: selectedMeetup.address,
                    image: selectedMeetup.image,
                    description: selectedMeetup.description
                }
            }
        }
    }
    catch (error) {
        redirect('/')
    }
}