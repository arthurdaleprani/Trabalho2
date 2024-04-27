

/** @type{import('fastify').FastifyPluginAsync<>} */

import createError from '@fastify/error';
import { config } from 'dotenv';

export default async function categories(app, options){
    const generos = app.mongo.db.collection('generos')
    const products = app.mongo.db.collection('products')
    const InvalidCategoriesError = createError('InvalidCategoriesError', 'Categoria Inválida.', 400);

    //funcionando
    app.get('/generos',
        {
            config:{
                requireAuthentication: true
            }
        },
        async(request, reply) => {
            request.log.info(genero)
            return await generos.find().toArray();
        }
    );

    //funcionando
    app.get('/generos/:id',{
        config:{
            requireAuthentication: true
        }
    }, async(request, reply) => {
        let id = request.params.id;
        let genero = await generos.findOne({_id: id});

        return genero;
    });

    //funcionando
    app.post('/generos',{
        schema: {
            body:{
                type: 'object',
                properties:{
                      _id:{type: 'string'},
                      name: {type:'string'},
                      img_Url: {type: 'string'}
                },
                required: ['_id','name', 'img_Url']
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

    await generos.updateOne({id},{
        $set:{
            name: genero.name,
            img_Url: genero.img_Url
        }
    });

    return reply.code(201).send();
});

// 
app.delete('/generos/:id',{
    config: {
        requireAuthentication: true
    }
}, async (request, reply) => {
    let id = request.params.id;

    await generos.deleteOne({_id: id});

    return reply.code(204).send();
});


}