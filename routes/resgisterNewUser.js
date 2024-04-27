import { hash } from 'bcrypt';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

export default async function newUser(app, options) {

    const users = app.mongo.db.collection('users');

    app.post('/register', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    _id: {type: 'string'},
                    username: { type: 'string' },
                    password: { type: 'string' }
                },
                required: ["_id",'username', 'password']
            }
        },
        config: {
            requireAuthentication: false
        },
    }, async (request, reply) => {
        const { _id, username, password } = request.body;

        const existingUser = await users.findOne({ username });

        if (existingUser) {
            reply.code(409).send({ message: 'Usuário já existe' });
            return;
        }

        const hashedPassword = await hash(password, 10);

        const newUser = {
            _id,
            username,
            password: hashedPassword
        };
        
        await users.insertOne(newUser);
        reply.code(201).send();
    });

    app.delete('/register/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        
        await users.deleteOne({_id: id});
        
        return reply.code(204).send();
    });
}
