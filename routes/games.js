

/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function products(app, options) {
    const InvalidProductError = createError('InvalidProductError', 'Produto Inválido.', 400);

    const games = app.mongo.db.collection('games');
    const generos = app.mongo.db.collection('generos');

    //funcionando
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

    //não esta funcionando
    app.get('/games/:id', async (request, reply) => {
        let id =  request.params.id;
        let game = await games.findOne({_id: new app.mongo.ObjectId(id)});
        
        return game;
    });

    //funcionando
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
    
        await games.insertOne(game);
    
        return reply.code(201).send();
    });

    //funcionando
    app.delete('/games/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        
        await games.deleteOne({_id: new app.mongo.ObjectId(id)});
        
        return reply.code(204).send();;
    });
    // TESTAR
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