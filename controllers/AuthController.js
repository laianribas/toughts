import User from '../models/User.js'
import bcrypt from 'bcryptjs'

export default class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res) {
        const { email, password } = req.body
        const user = await User.findOne({
            where: {
                email: email
            },
            raw: true
        })
        const checkPassword = user ?
            bcrypt.compareSync(password, user.password) :
            ''
        if (!user || !checkPassword) {
            req.flash('message', 'Email e/ou senha inválido(s)')
            res.render('auth/login')
            return
        }
        req.session.userid = user.id
        req.flash('message', `Seja bem-vindo, ${user.name}`)
        req.session.save(() => {
            res.redirect('/')
        })
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body //password match
        if (password != confirmpassword) {
            req.flash('message', 'As senhas não conferem, insira novamente!')
            res.render('auth/register')
            return
        } //check if the user is already registered
        const checkUser = await User.findOne({
            where: {
                email: email
            }
        })
        if (checkUser) {
            req.flash('message', 'Email já cadastrado')
            res.render('auth/register')
            return
        }
        //create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const user = {
            name,
            email,
            password: hashedPassword
        }
        try {
            const createdUser = await User.create(user)
            req.session.userid = createdUser.id
            req.flash('message', 'Cadastro realizado com sucesso!')
            req.session.save(() => {
                res.redirect('/')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}