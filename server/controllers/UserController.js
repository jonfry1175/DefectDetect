const { User, Bug, Role } = require('../models');
const { encryptPassword, decryptPassword } = require('../helpers/bcrypt');
const { tokenGenerator } = require('../helpers/jsonwebtoken');
class UserController {
    static async getAll(req, res) {
        try {
            const users = await User.findAll({
                include: [Role, Bug]
            });
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    static async register(req, res) {
        try {
            const { name, email, password, role_id } = req.body;

            // Validasi panjang password sebelum hashing
            if (password.length < 3 || password.length > 20) {
                return res.status(400).json({ message: 'Password must be between 3 and 20 characters' });
            }

            // unique name and email

            const existsName = await User.findOne({ where: { name } });
            const existsEmail = await User.findOne({ where: { email } });

            if (existsName) {
                return res.status(400).json({ message: 'Name already exists' });
            }
            if (existsEmail) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // hash setelah password di validasi
            const hashedPassword = await encryptPassword(password, 10);


            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
                role_id
            });

            res.status(201).json(newUser);

            console.log(hashedPassword);
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const errors = error.errors.map((err) => err.message);
                return res.status(400).json({ errors });

            }

            res.status(500).json(error.message);




        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const emailFound = await User.findOne({ where: { email } });
            if (!emailFound) {
                return res.status(401).json({ message: ' Invalid email' });
            }
            const match = await decryptPassword(password, emailFound.password);
            if (!match) {
                return res.status(401).json({ message: 'Invalid password' });
            }
            const token = tokenGenerator({ id: emailFound.id, email: emailFound.email, role_id: emailFound.role_id });

            res.status(200).json(token);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = UserController