//import { createServer } from 'node:http' //'node:fs' 'node:crypto'

// const server = createServer((request, response) => {
//     response.write('hello world')
    
//     return response.end()//
// })

// server.listen(3333)

// //POST 
// //DELETE localhost:3333/videos/1  

import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'
//import { DatabaseMemory } from './database-memory.js'
const server = fastify()
// GET, POST(criar), PUT(alteraçao), DELETE, PATCH(alteraçao especifica), HEAD, OPTIONS
//const database = new DatabaseMemory()
const database = new DatabasePostgres()

server.post('/videos', async (request, reply) =>{
    const { title, description, duration } = request.body


    await database.create({
        title,
        description,
        duration,

        // title: title,
        // description: description,
        // duration: duration,
    })

    return reply.status(201).send()
})
//POST http://localhost:3333/videos

server.get('/videos', async (request) =>{ //(request, reply)
    const search = request.query.search

   const videos = await database.list(search)
   
   
   return videos  //reply.send
})

server.put('/videos/:id', async (request,reply) =>{
    const videoId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})
//PUT http://localhost:3333/videos/ID
// Route PARAMETER
server.delete('/videos/:id',async (request,reply) =>{
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})
server.listen({
    port: process.env.PORT ?? 3333,
})