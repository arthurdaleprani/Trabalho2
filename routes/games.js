

/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function products(app, options) {
    const InvalidProductError = createError('InvalidProductError', 'Produto Inválido.', 400);

    const games = app.mongo.db.collection('games');
    const generos = app.mongo.db.collection('generos');

    app.get('/games', 
        {
            config: {
                logMe: true
            }
        }, 
        async (request, reply) => {
            return await games.find().toArray();
        }
    );

    app.post('/games', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    notaGame: { type: 'integer' },
                    generoGame: { type: 'string' },
                    descGame: { type: 'string' }
                },
                required: ['name', 'notaGame', 'generoGame', 'descGame']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let game = request.body;
        
        const generoExistente = await generos.findOne({ name: game.generoGame });
        if (!generoExistente) {
            return reply.status(400).send({ message: 'Gênero não encontrado' });
        }
    
        game.generoId = generoExistente._id;
    
        await games.insertOne(game);
    
        return reply.code(201).send();
    });

    app.get('/games/:id', async (request, reply) => {
        let id =  request.params.id;
        let games = await games.findOne({_id: new app.mongo.ObjectId(id)});
        
        return games;
    });
    
    app.delete('/games/:name', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let name =  request.params.name;
        
        await games.deleteOne({name: new app.mongo.ObjectId(name)});
        
        return reply.code(204).send();;
    });

    app.put('/games/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        let games = request.body;
        
        await games.updateOne({_id: new app.mongo.ObjectId(id)}, {
            $set: {
                name: games.name,
                descGame: games.descGame
            }
        });
        
        return reply.code(204).send();;
    });
}