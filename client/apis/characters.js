import request from 'superagent'

export function getMarvelCharacters() {
  return (
    request
      .get('/api/v1/characters')
      // .get(
      //   `${marvelBaseUrl}?limit=10&apikey=${publicKey}` // client side API call
      // )
      .then((response) => response.body)
      .catch((err) => {
        console.log(err.message)
      })
  )
}
