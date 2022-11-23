import http from 'http'
import foodController from './controllers/food.controller.js'
import orderController from './controllers/order.controller.js'
import userController from './controllers/user.controller.js'
import Express from './lib/express.js'


function httpServer(req, res) {
    const app = new Express(req, res)
    
    app.get('/users', userController.GET)
    app.get('/foods', foodController.GET)
    app.get('/orders', orderController.GET)
    app.post('/orders', orderController.POST)
    app.post('/users', userController.POST)
}

const server = http.createServer( httpServer )

server.listen(5000, () => console.log('server ready at *5000'))