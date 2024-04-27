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
                    username: { type: 'string' },
                    password: { type: 'string' }
                },
                required: ['username', 'password']
            }
        },
        config: {
            requireAuthentication: false
        },
    }, async (request, reply) => {
        const { username, password } = request.body;

        const existingUser = await users.findOne({ username });

        if (existingUser) {
            reply.code(409).send({ message: 'Usuário já existe' });
            return;
        }

        const hashedPassword = await hash(password, 10);

        const newUser = {
            username,
            password: hashedPassword
        };
        
        const result = await users.insertOne(newUser);
        reply.code(201).send();
    });
}
