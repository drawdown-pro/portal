require('dotenv').config()
const url = require('url')

// Set up some globals.
const { NODE_ENV, PORT } = process.env
const dev = NODE_ENV !== 'production'
const port = dev ? 3000 : PORT || 8080


const fastify = require('fastify')()
const helmet = require('fastify-helmet')

fastify.register(helmet)

// fastify based api
fastify.get('/ping', async (request, reply) => {
  console.log('/ping')
  return { message: 'pong' }
})


// Set up next.js; all other routes go here
const next = require('next')
const app = next({ dev })
const handle = app.getRequestHandler()

fastify.get('*', (request, reply) => {
  let parsedUrl = url.parse(request.req.url, true)
  handle(request.req, reply.res, parsedUrl)
})

app.prepare().then(() => {
  fastify.listen(port, function (err) {
    if (err) throw err
    fastify.log.info(`fastify server listening on ${fastify.server.address().port}`)
  })
}).catch(err => { throw err })


