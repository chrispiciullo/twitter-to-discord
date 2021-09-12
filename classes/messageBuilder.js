module.exports = class MessageBuilder {
	constructor() {
		this.payload = {
			embeds: [{}]
		}
	}

	getJSON() {
		return this.payload
	}

	setUsername(username) {
		this.payload.username = username

		return this
	}

	setUserAvatar(userIMG) {
		this.payload.avatar_url = userIMG

		return this
	}

	setContent(content) {
		this.payload.content = content

		return this
	}

	setColor(color) {
		if (color.startsWith('#')) color = color.replace('#', '')

		let converted = parseInt(color, 16)
		this.payload.embeds[0].color = converted

		return this
	}

	setAuthor(authorName, authorURL, authorIMG) {
		this.payload.embeds[0].author = {}
		this.payload.embeds[0].author.name = authorName
		this.payload.embeds[0].author.url = authorURL
		this.payload.embeds[0].author.icon_url = authorIMG

		return this
	}

	setTitle(title) {
		this.payload.embeds[0].title = title

		return this
	}

	setURL(url) {
		this.payload.embeds[0].url = url

		return this
	}

	setDescription(description) {
		this.payload.embeds[0].description = description

		return this
	}

	addField(fieldName, fieldValue, inline) {
		this.payload.embeds[0].fields = []
		this.payload.embeds[0].fields.push({
			name: fieldName,
			value: fieldValue,
			inline: inline
		})

		return this
	}

	removeField(fieldName) {
		this.payload.embeds[0].fields = this.payload.embeds[0].fields.filter(field => field.title != fieldName)

		return this
	}

	setThumbnail(thumbnail) {
		this.payload.embeds[0].thumbnail = {}
		this.payload.embeds[0].thumbnail.url = thumbnail

		return this
	}

	setImage(image) {
		this.payload.embeds[0].image = {}
		this.payload.embeds[0].image.url = image

		return this
	}

	setFooter(footerText, footerImage) {
		this.payload.embeds[0].footer = {}
		this.payload.embeds[0].footer.text = footerText
		this.payload.embeds[0].footer.icon_url = footerImage

		return this
	}

	setTimestamp(date) {
		if (date) {
			this.payload.embeds[0].timestamp = date
		} else {
			this.payload.embeds[0].timestamp = new Date()
		}

		return this
	}
}
