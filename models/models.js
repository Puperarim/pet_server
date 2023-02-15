const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketPet = sequelize.define('basket_pet', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Category = sequelize.define("category", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
});

const PetProperties = sequelize.define("pet_properties", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    body: { type: DataTypes.STRING, allowNull: false },
});

const PetDescription = sequelize.define("pet_description", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    body: { type: DataTypes.STRING, allowNull: false },
});

const Pet = sequelize.define("pet", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
});

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketPet);
BasketPet.belongsTo(Basket);

Pet.hasOne(BasketPet);
BasketPet.belongsTo(Pet);

Pet.hasMany(PetProperties);
PetProperties.belongsTo(Pet);

Pet.hasOne(PetDescription);
PetDescription.belongsTo(Pet);

Category.hasMany(Pet);
Pet.belongsTo(Category);

module.exports = {
    Category,
    User,
    Pet,
    PetDescription,
    PetProperties,
    BasketPet,
    Basket,
}