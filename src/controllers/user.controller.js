import { read, write } from '../utils/model.js'

let userController = {
    GET: (req, res) => res.json(read('users')),

    POST: async (req, res) => {
        let users = read('users');
        try {
            let { username, contact } = await req.body;
            
            if (!(username.trim() && username.length > 2)) {
                throw new Error('invalid username')
            }

            if (!(/^998[389][0123456789][0-9]{7}$/).test(contact)) {
                throw new Error('invalid contact')
            }

            const newUser = {userId: users.at(-1)?.userId + 1 || 1, username, contact}

            users.push(newUser)
            write('users', users)
            res.json({status: 201, message: 'new user added', data: newUser})
        } catch (error) {
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({status: 400, message: error.message}))
        }
        
    }
}

export default userController