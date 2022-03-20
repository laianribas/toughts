import Tought from '../models/Tought.js'
import User from '../models/User.js'
import { Op } from 'sequelize'

export default class ToughtsController {
    static async showToughts(req, res) {
        let search = ''
        if (req.query.search) {
            search = req.query.search
        }

        let order = 'DESC'

        if (req.query.order === 'old') {
            order = 'ASC'
        } else {
            order = 'DESC'
        }
        const toughts = (
            await Tought.findAll({
                include: User,
                where: {
                    title: {
                        [Op.like]: `%${search}%`
                    }
                },
                order: [
                    ['createdAt', order]
                ]
            })
        ).map((result) =>
            result.get({
                plain: true
            })
        )
        let toughtsCount = toughts.length
        if (toughtsCount === 0) {
            toughtsCount = false
        }
        res.render('toughts/home', { toughts, search, toughtsCount })
    }

    static async dashboard(req, res) {
        const userId = req.session.userid
        const user = await User.findOne({
            where: {
                id: userId
            },
            include: Tought,
            plain: true
        })

        if (!user) {
            res.redirect('/login')
        }
        const toughts = user.Toughts.map((result) => result.dataValues)

        if (toughts.length === 0) {
            req.flash('message', 'Você não possui pensamentos registrados!')
        }

        res.render('toughts/dashboard', { toughts })
    }

    static createTought(req, res) {
        res.render('toughts/create')
    }

    static async createToughtPost(req, res) {
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try {
            await Tought.create(tought)

            req.flash('message', 'Pensamento criado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async updateTought(req, res) {
        const { id } = req.params
        const tought = await Tought.findOne({
                where: {
                    id: id
                },
                raw: true
            })
            // console.log(tought)
        res.render('toughts/edit', { tought })
    }

    static async updateToughtSave(req, res) {
        const { id } = req.body

        const tought = {
            title: req.body.title
        }

        try {
            await Tought.update(tought, {
                where: {
                    id: id
                }
            })
            req.flash('message', 'Pensamento atualizado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async removeTought(req, res) {
        const { id } = req.body
        const { userid } = req.session

        try {
            await Tought.destroy({
                where: {
                    id: id,
                    UserId: userid
                }
            })
            req.flash('message', 'Pensamento Removido com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }
}