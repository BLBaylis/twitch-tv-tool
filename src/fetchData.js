export default async (streamType, streamerName) => {
	let response = await fetch("https://wind-bow.glitch.me/twitch-api" + streamType + streamerName);
	if (response.status !== 200) {
		console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
     }
    return await response.json();
}