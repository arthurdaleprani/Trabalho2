

/** @type{import('fastify').FastifyPluginAsync<>} */

import createError from '@fastify/error';

export default async function categories(app, options){
    const genero = app.mongo.db.collection('generos')
    const products = app.mongo.db.collection('products')
    const InvalidCategoriesError = createError('InvalidCategoriesError', 'Categoria Inválida.', 400);
    const generoGame = app.mongo.db.collection('generos');

    //funcionando
    app.get('/generos',
        {
            config:{
                logMe: true
            }
        },
        async(request, reply) => {
            request.log.info(genero)
            return await genero.find().toArray();
        }
    );

    //funcionando
    app.post('/generos',{
        schema: {
            body:{
                type: 'object',
                properties:{
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
        let categorie = request.body;

        await genero.insertOne(categorie)

        return reply.code(201).send
});

// concertar
app.put('/generos/:id', async (request, reply) => {
    try {
        const nameGen = request.params.nameGen;
        const { name, products } = request.body; 
        
        const schema = {
            params: {
                type: 'object',
                properties: {
                    nameGen: { type: 'integer' },
                },
                required: ['nameGen']
            }
        };

        const genero = await generoGame.findOne({ nameGen: nameGen }); 
        if (!genero) {
            throw new Error('Genero não encontrado');
        }

        await generoGame.updateOne(
            { nameGen: nameGen }, 
            { $set: { name, products } } 
        );

        return { message: 'Genero atualizado com sucesso' }; 
        
    } catch (error) {
        console.error(error);
        reply.status(400).send({ error: error.message });
    }
});

// concertar
app.delete('/generos/:name', async (request, reply) => {
    try {
        const name = request.params.name;
       
        const schema = {
            params: {
                type: 'object',
                properties: {
                   name: { type: 'string' }
                },
                required: ['name']
            }
        };

        const genero = await generoGame.findOne({ name: name }); 
        if (!genero) {
            throw new Error('Genero não encontrado');
        }

        await generoGame.deleteOne(
            { name: name } 
        );

        return { message: 'Genero Deletado' }; 
        
    } catch (error) {
        console.error(error);
        reply.status(400).send({ error: error.message });
    }
});

// CONCERTAR
app.get('/generos/:id/games', async (request, reply) => {
    try {
        let id = request.params.id;

        let schema = {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'integer' }
                },
                required: ['id']
            }
        };

        let genero = await generoGame.findOne({ _id: id }); 
        if (!genero) {
            throw new Error('Gênero não encontrado'); 
        }
        let generoName = genero.name;

        let gamesGenero = await games.find({ generoGame: generoName }).toArray(); 
        if (!gamesGenero) {
            throw new Error('Nenhum jogo encontrado para este gênero'); 
        }
        return gamesGenero;
        
    } catch (error) {
        console.error(error);
        reply.status(400).send({ error: error.message });
    }
});

}