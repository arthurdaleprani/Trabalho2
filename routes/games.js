

/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
import { config } from 'dotenv';
export default async function products(app, options) {
    const InvalidProductError = createError('InvalidProductError', 'Produto Inválido.', 400);

    const games = app.mongo.db.collection('games');
    const generos = app.mongo.db.collection('generos');

    //funcionando
    app.get('/games', 
        {
            config: {
                requireAuthentication: true
            }
        }, 
        async (request, reply) => {
            return await games.find().toArray();
        }
    );

    //funcionando
    app.get('/games/:id',{
        config:{
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        let game = await games.findOne({_id: id});
        
        return game;
    });

    //funcionando
    app.post('/games', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    notaGame: { type: 'integer' },
                    generoGame: { type: 'string' },
                    descGame: { type: 'string' }
                },
                required: ['_id','name', 'notaGame', 'generoGame', 'descGame']
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
        
        await games.deleteOne({_id: id});
        
        return reply.code(204).send();
    });
    // funcionando
    app.put('/games/:id', {
       config:{
            requireAuthentication: true
       }
    }, async (request, reply) => {
        let id = request.params.id;
        let game = request.body;

        await games.updateOne({_id: id},{
            $set: {
                name: game.name,
                descGame: game.descGame
            }
        });
        return reply.code(204).send();
    });
}