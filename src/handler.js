const axios = require('axios')
const headersParse = require('./headers-parse')

const proxy = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const { queryStringParameters, pathParameters, httpMethod, body, headers } = event

  const url = parseParametersToUrl(pathParameters, queryStringParameters || {})
  
  try {
    const response = await request(url, httpMethod, body, headersParse.parseRequest(headers))
    return buildResponse(response.status, response.data, headersParse.parseResponse(response.headers))
  } catch (e) {
    const error = errorHandler(e)
    return buildResponse(error.statusCode, error.data)
  }
}

const request = async (url, httpMethod, body, headers) => {
  console.log(`Request - ${httpMethod} ---> ${url}`)
  const response = await axios({
    method: httpMethod,
    data: body,
    url: url,
    headers: {
      ...headers,
      ["Host"]: getHostName(url)
    }
  }).then(r => ({
    data: r.data,
    status: r.status,
    headers: r.headers
  }))
  console.log('Response <---', response)
  return response
}

const errorHandler = (e) => {
  console.log(`Error:`, e)
  const statusCode = e.status || e.response ? e.response.status : 500

  return {
    statusCode,
    data: e.response ? e.response.data : e.code
  }
}

const buildResponse = (statusCode, body, headers = {}) => ({
  statusCode,
  body: JSON.stringify(body),
  headers: headers
})

const parseParametersToUrl = (pathParameters, queryStringParameters) => {
  const { path } = pathParameters
  let baseUrl = path.replace('proxy/', '')
  const hasHttpDefined = baseUrl.includes('http/') || baseUrl.includes('https/')
  if (hasHttpDefined) {
    baseUrl = baseUrl.replace('/', '://')
  }
  return Object.keys(queryStringParameters).reduce((url, query) => `${url}&${query}=${queryStringParameters[query]}`, baseUrl + '?')
}

const getHostName = (url) => {
  const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)
  return matches && matches[1]
}


module.exports = { proxy }