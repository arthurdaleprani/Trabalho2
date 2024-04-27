

/** @type{import('fastify').FastifyPluginAsync<>} */

import createError from '@fastify/error';
import { config } from 'dotenv';

export default async function categories(app, options){
    const generos = app.mongo.db.collection('generos')
    const products = app.mongo.db.collection('products')
    const InvalidCategoriesError = createError('InvalidCategoriesError', 'Categoria Inválida.', 400);
    const generoGame = app.mongo.db.collection('generos');

    //funcionando
    app.get('/generos',
        {
            config:{
                requireAuthentication: true
            }
        },
        async(request, reply) => {
            request.log.info(genero)
            return await genero.find().toArray();
        }
    );

    //funcionando
    app.get('/generos/:id',{
        config:{
            requireAuthentication: true
        }
    }, async(request, reply) => {
        let id = request.params.id;
        let genero = await generos.findOne({_id: new app.mongo.ObjectId(id)});

        return genero;
    });

    //funcionando
    app.post('/generos',{
        schema: {
            body:{
                type: 'object',
                properties:{
                      id:{type: 'integer'},
                      name: {type:'string'},
                      img_Url: {type: 'string'}
                },
                required: ['name', 'img_Url']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async(request, reply) => {
        let genero = request.body;

        await generos.insertOne(genero)

        return reply.code(201).send
});



// FUNCIONANDO
app.put('/generos/:id',{
    config:{
        requireAuthentication: true
    }
}, async (request, reply) => {
    let id = request.params.id;
    let genero = request.body;

    await generos.updateOne({_id: new app.mongo.ObjectId(id)},{
        $set:{
            name: genero.name,
            img_Url: genero.img_Url
        }
    });

    return reply.code(201).send();
});

// funcionando
app.delete('/generos/:id',{
    config: {
        requireAuthentication: true
    }
}, async (request, reply) => {
    let id = request.params.id;

    await generos.deleteOne({id: new app.mongo.ObjectId(id)});

    return reply.code(204).send();
});


}