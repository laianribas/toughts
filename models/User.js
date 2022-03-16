import { DataTypes } from 'sequelize'
import connection from '../db/connection.js'

const User = connection.define('User', {
    name: {
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        required: true
    }
})

export default User