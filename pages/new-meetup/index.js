import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import {Head} from "next/document";
import {Fragment} from "react";

export default function NewMeetupPage() {
    const router = useRouter()

    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        router.push('/');
    }

    return (<Fragment>
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    </Fragment>);
}