export default async (streamType, streamerName) => {
	let response = await (await fetch("https://wind-bow.glitch.me/twitch-api" + streamType + streamerName)).json();
	if (response.status !== 200 && typeof response.status === "number") {
		console.log("Looks like there was a problem. Status Code: " + response.status + "while trying to fetch" + streamerName + "data");
        return false;
    }
    return response;
}