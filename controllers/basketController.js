const { BasketPet } = require("../models/models");

class BasketController {
    async create(req, res) {
        const {userId, petId} = req.body
        const basketPet = await BasketPet.create({basketId: userId, petId})
        return res.json(basketPet)
    }
    async getAll(req, res) {
        const {userId} = req.query
        const basketPets = await BasketPet.findAll({where: {
            basketId: userId
            }})
        return res.json(basketPets)
    }
    async delete(req, res) {
        const {id} = req.query
        const basketPet = await BasketPet.destroy({where: {id}})
        return res.json(basketPet)
    }
}

module.exports = new BasketController()