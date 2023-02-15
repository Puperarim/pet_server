const uuid = require('uuid');
const path = require('path');
const {Pet, PetDescription, PetProperties} = require('../models/models');
const ApiError = require('../errors/ApiError');

class PetController {
    async create(req, res, next) {
        try {
            let {name, price, categoryId, pet_description, pet_properties} = req.body;
            const {img} = req.files;
            const fileName = uuid.v4() + ".jpg";
            img.mv(path.join(__dirname, '..', 'static', fileName));
            const pet = await Pet.create({name, price, categoryId, img: fileName});

            if (pet_description) {
                pet_description = JSON.parse(pet_description);
                PetDescription.create({body: pet_description.body, petId: pet.id})
            }
            if (pet_properties) {
                pet_properties = JSON.parse(pet_properties);
                pet_properties.forEach(item => {
                    PetProperties.create({body: item.body, petId: pet.id})
                })
            }
            return res.json(pet);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async getAll(req, res) {
        let {categoryId} = req.query
        let pets
        if(!categoryId) {
            pets = await Pet.findAll()
        } else if (categoryId == 1) {
            pets = await Pet.findAll()
        } else {
           pets = await Pet.findAll({where: {categoryId}});
        }
        return res.json(pets);
    }
    async getOne(req, res) {
        const {id} = req.params;
        const pet = await Pet.findOne({
            where: {id},
            include: [{model: PetProperties, as: 'pet_properties' }, {model: PetDescription, as: 'pet_description' }]
    });
        return res.json(pet);
    }
}

module.exports = new PetController();