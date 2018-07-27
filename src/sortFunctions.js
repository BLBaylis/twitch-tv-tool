export const sortTwitchData = (data) => {
	return {
		streamName : data.stream.channel.display_name,
		streamTitle : data.stream.channel.status,
		game : data.stream.channel.game,
		screenshotLink : data.stream.preview.medium,
		streamURL: data.stream.channel.url,
		viewerCount : data.stream.viewers,
		online : true
	}
}

export default (data) => {
	const sortedData = data.stream !== null && data.stream !== undefined ? {
		streamName : data.stream.channel.display_name,
		streamTitle : data.stream.channel.status,
		game : data.stream.channel.game,
		screenshotLink : data.stream.preview.medium,
		streamURL: data.stream.channel.url,
		viewerCount : data.stream.viewers,
		online : true
	} : {
		streamName : data.display_name,
		logo : data.logo,
		streamURL: data.url,
		online : false
	};
	return sortedData;
}