//import auth from "./auth"
/** @type{import('fastify').FastifyPluginAsync<>} */
/*export default async function newUser(app, options){
    const categories = app.mongo.db.collection('newUser')
app.post('/register', {
    schema:{
        body:{
            type:'object',
                properties:{
                    username: {type: 'string'},
                    password: {type: 'string'}
                
            },
            required:['username', 'products']
        }
    }, config:{
        requireAuthentication:true
    }


}, async(request, reply) => {
    let newUser = request.body
    await newUser.insertOne(newUser)
    return newUser;
}

)
}
*/

import { hash } from 'bcrypt';
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
        }
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
        const token = jwt.sign({ username: newUser.username }, 'secreto', { expiresIn: '1h' });
        reply.code(201).send({ token });
    });
}
