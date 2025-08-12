import { initClient } from "@ts-rest/core";
import sessionContract from "./contracts/session";

const client = initClient(sessionContract, {
    baseUrl: "http://localhost:3000",
    baseHeaders: {},
});

async function fetchSession() {
    const res = await client.getSession();

    if (res.status === 200) {
        console.log(res.body);
    } else if (res.status === 400) {
        // res.body.error;
    }
}

(async () => {
    await fetchSession();
})().catch(console.error);
