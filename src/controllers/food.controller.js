import { read, write } from '../utils/model.js'

let foodController = {
    GET:(req, res) => res.json(read('foods'))
}

export default foodController