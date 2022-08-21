const express = require('express')
const router = express.Router()
const request = require('superagent')
const crypto = require('crypto')

const dotenv = require('dotenv')
dotenv.config()

module.exports = router

const marvelBaseUrl = 'http://gateway.marvel.com/v1/public/characters'

router.use((req, res, next) => {
  console.log(`In router: ${req.method}:${req.originalUrl}`)
  next()
})

// GET api/v1/characters
router.get('/', (req, res) => {
  const timestamp = Date.now()
  const timestampString = timestamp.toString()
  const publicKey = process.env.MARVEL_PUBLIC_KEY
  const privateKey = process.env.MARVEL_PRIVATE_KEY
  const hash = crypto
    .createHash('md5')
    .update(timestampString + privateKey + publicKey)
    .digest('hex')

  request
    .get(
      `${marvelBaseUrl}?limit=100&ts=${timestampString}&apikey=${publicKey}&hash=${hash}`
    )
    .then((response) => res.send(response.body))
    .catch((err) => {
      console.log(err.message)
      res.status(500).send('Server Error')
    })
})
