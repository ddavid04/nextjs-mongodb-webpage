import {MongoClient} from "mongodb";
import MeetupList from '../components/meetups/MeetupList';
import {Fragment} from "react";
import {Head} from "next/document";


function HomePage(props) {
    return (<Fragment>
        <MeetupList meetups={props.meetups}/>
    </Fragment>);
}

// export async function getServerSideProps(context) {
//     // fetch data from api
//     const req = context.req;
//     const res = context.res;
//
//     return{
//         props:{
//             meetups: DUMMY_MEETUPS,
//         }
//     }
// }

export async function getStaticProps() {
    // fetch data from an API
    const client = await MongoClient.connect(
        'mongodb+srv://ddavid_4:uoUK6bp6lVOp53xd@cluster0.uxym1wx.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
    );
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
}

export default HomePage;