const headersToRemove = {
  "onRequest": [
    "user-agent",
    "via",
    "x-amz-cf-id",
    "x-amzn-trace-id",
    "x-forwarded-for",
    "x-forwarded-port",
    "x-forwarded-proto"
  ],
  "onResponse": [
    'content-type',
    'content-length'
  ]
}
const parseRequest = (headers) => removeKeyFromHeaders(headers, headersToRemove.onRequest)
const parseResponse  = (headers) => removeKeyFromHeaders(headers, headersToRemove.onResponse)

const removeKeyFromHeaders = (headers, keys) => {
  const newHeader = Object.keys(headers).reduce((obj, key) => {
    if (!keys.includes(key.toLowerCase())) {
      obj[key] = headers[key]
    }
    return obj
  }, {})
  return newHeader
}

module.exports = { parseRequest, parseResponse }