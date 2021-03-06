import express from 'express'
import { engine } from 'express-handlebars'
import session from 'express-session'
import FileStore from 'session-file-store'
import flash from 'express-flash'
import connection from './db/connection.js'
import path from 'path'
import os from 'os'

import Tought from './models/Tought.js'
import User from './models/User.js'

import toughtsRoutes from './routes/toughtsRoutes.js'
import ToughtsController from './controllers/ToughtsController.js'
import authRoutes from './routes/authRoutes.js'

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let sessionFileStore = FileStore(session)
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new sessionFileStore({
            logFn: function() {},
            path: path.join(os.tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 36000000,
            expires: new Date(Date.now() + 36000000),
            httpOnly: true
        }
    })
)

app.use(flash())

app.use(express.static('public'))

app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session
    }

    next()
})

app.use('/toughts', toughtsRoutes)

app.use('/', authRoutes)

app.get('/', ToughtsController.showToughts)

connection
    .sync()
    .then(
        app.listen(3000, () => {
            console.log('listening on http://localhost:3000')
        })
    )
    .catch((error) => console.error(error))