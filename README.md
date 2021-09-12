# twitter-to-discord
Monitors a user's twitter stream and sends it as an embed to a Discord server through a channel webhook.

# Installation
Clone this repository and run the following command to install the necessary packages.
```
npm install or yarn install
```
# Usage
Create a .env file in the root folder with the following info. I know some info may seem redundant, but it is to ensure nothing is hard-coded. Make sure to change it to your information:
```
TWITTER_CONSUMER_KEY=YOUR-TWITTER-CONSUMER-KEY
TWITTER_CONSUMER_SECRET=YOUR-TWITTER-CONSUMER-SECRET
TWITTER_TOKEN_KEY=YOUR-TWITTER-TOKEN-KEY
TWITTER_TOKEN_SECRET=YOUR-TWITTER-TOKEN-SECRET

TWITTER_FETCH_USER_TWEETS=comma,separated,list,of,@screennames (without the @),to,follow

OWNER_SCREEN_NAME=GUILDED-SERVER-OWNER-TWITTER-@SCREENNAME

OWNER_WEBHOOK_URL=NOTIFICATION-CHANNEL-WEBHOOK-URL
GAMING_WEBHOOK=GAMING-NEWS-CHANNEL-WEBHOOK-URL
```

Optional: Open index.js and tweak the look of the embeds by adjusting this codeblock (a full list of commands can be found in /classes/messageBuilder.js):
```js
	const embed = new MessageBuilder()
		// Sets the embed color to Twitter blue.
		.setColor('#1DA1F2')
		// Tweet Author (name, link, profile pic)
		.setAuthor(`${tweet.user.name} (@${tweet.user.screen_name})`, `https://twitter.com/${tweet.user.screen_name}`, `${tweet.user.profile_image_url_https}`)
		// Embed title with clickable link to tweet through .setURL
		.setTitle(`A New Tweet from ${tweet.user.name}!`)
		.setURL(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`)
		// Time the tweet was made in human-readable format.
		.setFooter(moment(tweet.created_at, 'ddd MMM DD HH:mm:ss Z YYYY').local().format('MMMM Do YYYY, h:mm a'))

		// Check if tweet has extended text or not so it doesn't truncate
		if(tweet.extended_tweet)
			embed.setDescription(tweet.extended_tweet.full_text)
		else embed.setDescription(tweet.text)

		// Set the thumbnail to the Twitter profile pic when no image is present
		if(!tweet.entities.media) embed.setThumbnail(tweet.user.profile_image_url_https)

		// Only send image data when there is an image/video/gif present.
		if (tweet.entities.media) embed.setImage(tweet.entities.media[0].media_url)
```
