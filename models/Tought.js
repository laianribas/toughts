import { DataTypes } from 'sequelize'
import connection from '../db/connection.js'

import User from './User.js'

const Tought = connection.define('Tought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    }
})

Tought.belongsTo(User)
User.hasMany(Tought)

export default Tought