import { read, write } from '../utils/model.js'


let orderController = {
    GET:(req, res) => {
        let orders = read('orders')
        let foods = read('foods')
        let users = read('users')
        
        let { userId } = req.query
        
        orders.map(order => {
            order.user = users.find(user => user.userId == order.userId)
            order.food = foods.find(food => food.foodId == order.foodId)
            
            delete order.foodId
        })
        
        if (userId) {
            orders =  orders.filter(order => order.userId == userId)
        }
        
        res.json(orders)
    },
    
    POST: async (req, res) => {
        try {
            let orders = read('orders')
            let { userId, foodId, count } = await req.body
            
            
            let order = orders.find(order => order.foodId == foodId && order.userId == userId)
            
            if (order) {
                order.count = +order.count + +count
            } else {
                order = { orderId: orders.at(-1)?.orderId + 1 || 1, userId, foodId, count }
                orders.push(order)
            }
            
            write('orders', orders)
            
            res.json({status: 201, message: 'new order added', data: order})
        } catch (error) {
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({status: 400, message: error.message}))
        }
    }
}

export default orderController