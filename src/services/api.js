import md5 from "md5"

const PUBLIC_API_KEY = "8eb139e46a3386b967d02f1654b18ace"
const PRIVATE_API_KEY = "d05260313d38c57eaa8ad00994ead9ea9e127087"
const TIME_STAMP = Number(new Date());
const HASH = md5(TIME_STAMP + PRIVATE_API_KEY + PUBLIC_API_KEY)
const API_AUTHENTICATION = `ts=${TIME_STAMP}&apikey=${PUBLIC_API_KEY}&hash=${HASH}`
const BASE_URL_COMICS = `http://gateway.marvel.com/v1/public/comics?${API_AUTHENTICATION}`

export { BASE_URL_COMICS, API_AUTHENTICATION};