// Importing Required Packages
require('dotenv').config()
const Twit = require('twit')
const moment = require('moment-timezone')
// Local Imports
const { Webhook, MessageBuilder } = require('./classes')
const log = require('./utils/log')

// Webhooks to send the tweets to
const ownerHook = new Webhook(process.env.OWNER_WEBHOOK)
const gamingHook = new Webhook(process.env.GAMING_WEBHOOK)

// Initializing Twit Client
const T = new Twit({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token: process.env.TWITTER_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_TOKEN_SECRET,
	timeout_ms: 60 * 1000,	// optional HTTP request timeout to apply to all requests.
	strictSSL: true,				// optional - requires SSL certificates to be valid.
})

// Map to store the converted Twitter Screen Names (the @) into IDs
const twitterFollowIdFilter = new Map()

// Convert the twitter names into IDs and populate a map!
const populateTwitterUserIds = () => {
	return new Promise(function(resolve, reject) {
		let usersToFetch = process.env.TWITTER_FETCH_USER_TWEETS.split(',')
		let usersProcessed = 0

		for (const screenName of usersToFetch) {
			T.get('users/show', { screen_name: screenName }, function(err, user) {
				usersProcessed++

				if (err)
					return reject(err)

				twitterFollowIdFilter.set(user.id_str, screenName)

				if (usersProcessed === usersToFetch.length)
					resolve()
			})
		}
	})
}

// Filter out non-original tweets. We don't want replies, QTs, RTs, etc
const isReply = tweet => {
	return (
		tweet.retweeted_status ||
		tweet.quoted_status ||
		tweet.in_reply_to_status_id ||
		tweet.in_reply_to_status_id_str ||
		tweet.in_reply_to_user_id ||
		tweet.in_reply_to_user_id_str ||
		tweet.in_reply_to_screen_name
	)
}

// Stream the tweets!
const monitor = async() => {
	// Initializing Twitter Stream
	let stream = T.stream('statuses/filter', { follow: Array.from(twitterFollowIdFilter.keys()).join(','), tweet_mode: 'extended' })

	// Stream Connect Event
	stream.on('connect', request => {
		log.cyan('Attempting to Connect to Twitter API')
	})

	// Stream Connected Event
	stream.on('connected', res => {
		//log.cyan(`Monitor Connected to Twitter API. Monitoring GlamShatterskll's profile.`)
		log.cyan('Now streaming `statuses/filter` for the following accounts:\n' + Array.from(twitterFollowIdFilter.values()).join(', '))
	})

	// Stream Tweet Event
	stream.on('tweet', tweet => {
		// Is the Tweet a Reply/Quote/RT?
		if (!isReply(tweet) === true) {
			log.green(`New Tweet from ${tweet.user.screen_name}`)

			const embed = new MessageBuilder()
				// Sends an @everyone message along with the embed (currently not supported by Guilded)
				//.setContent(`<@everyone>`)
				// Sets the embed color to Twitter blue.
				.setColor('#1DA1F2')
				// Tweet Author (name, link, profile pic)
				.setAuthor(`${tweet.user.name} (@${tweet.user.screen_name})`, `https://twitter.com/${tweet.user.screen_name}`, `${tweet.user.profile_image_url_https}`)
				// Embed title with clickable link to tweet through .setURL
				.setTitle(`A New Tweet from ${tweet.user.name}!`)
				.setURL(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`)
				// Time the tweet was made in human-readable format.
				.setFooter(moment(tweet.created_at, 'ddd MMM DD HH:mm:ss Z YYYY').local().tz('America/New_York').format('MMMM Do YYYY, h:mm a'))

				// Check if tweet has extended text or not so it doesn't truncate
				if(tweet.extended_tweet)
					embed.setDescription(tweet.extended_tweet.full_text)
				else embed.setDescription(tweet.text)

				// Set the thumbnail to the Twitter profile pic when no image is present
				if(!tweet.entities.media) embed.setThumbnail(tweet.user.profile_image_url_https.replace(/_normal\./, '.'))

				// Only send image data when there is an image/video/gif present.
				if (tweet.entities.media) embed.setImage(tweet.entities.media[0].media_url)

			if(tweet.user.screen_name === process.env.OWNER_SCREEN_NAME) {
				ownerHook.send(embed)
			} else {
				gamingHook.send(embed)
			}
		} else {
			log.red(`Bad Tweet from ${tweet.user.screen_name}`)
		}
	})

	// Stream Warning Event
	stream.on('warning', warning => {
		log.yellow(`Monitor Received Warning from Twitter API Warning Message: ${warning}`)
	});

	// Stream Disconnect Event
		stream.on('disconnect', disconnectMessage => {
			log.red(`Monitor Disconnected from Twitter API Stream Error Message: ${disconnectMessage}`)
	})
}

populateTwitterUserIds().then(monitor)