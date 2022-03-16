import { Sequelize } from 'sequelize'

const connection = new Sequelize('toughts', 'root', '5121056', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    connection.authenticate()
    console.log('connection established')
} catch (error) {
    console.log(error)
}

export default connection