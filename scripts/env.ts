import dotenv from 'dotenv'
dotenv.config()

const SECRET_YOUTUBE_API_KEY = process.env.SECRET_YOUTUBE_API_KEY

if (!SECRET_YOUTUBE_API_KEY) {
	throw new Error('SECRET_YOUTUBE_API_KEY is not set')
}

const YOUTUBE_CHANNEL_ID = 'UCRYxf9qolDaBGkZ9k_j4Ovg'
const YOUTUBE_SHORT_URL = 'https://youtu.be'

export { SECRET_YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID, YOUTUBE_SHORT_URL }
