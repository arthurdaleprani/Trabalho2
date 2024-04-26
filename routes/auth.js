/** @type{import('fastify').FastifyPluginAsync<>} */

import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function Authenticate(app, options) {
    let users = app.mongo.db.collection('users');

    app.post('/auth', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    pass: { type: 'string' }
                },
                required: ['username', 'password']
            }
        }
    },async (request, reply) => {
        
        // usuário do body da request
        let { username, password } = request.body;

        // Encontrar o usuário no banco de dados
        let userInDB = await users.findOne({ username });
        
        if (!userInDB || !(await compare(password, userInDB.password))) {
            reply.code(401).send({ message: "Usuário ou senha inválidos" });
            return;
        }
        

        // Gerar token JWT
        let token = app.jwt.sign( { user: username });
        reply.code(200).send({ token });
    });
}
