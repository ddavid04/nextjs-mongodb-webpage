import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <title>React Meetups</title>
                <meta name={'description'} content={'React Meetups'}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}

