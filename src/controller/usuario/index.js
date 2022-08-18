const dao = require('../../dao/usuarioDao.js');
const bcrypt = require('bcryptjs');

module.exports = {
    async index(req, res) {
        const users = await dao.getAllUsers();
        if (!users) return res.status(400).json({ message: 'não foi encontrado usurarios' });
        return res.status(200).json({ message: 'sucesso', data: users });
    },

    async _update(req, res) {
        const user = await dao.findUserById(req.params.id);
        console.log(user);
        console.log(req.params);

        if (!user) return res.status(400).json({ message: 'não foi encontrado usurarios' });

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.senha, salt);
        console.log(hash);

        await dao.criptografarSenha(user.id, hash);

        return res.status(200).json({ message: 'sucesso', data: user });
    },

    async store(req, res) {
        const { nome, email, dataNascimento, senha } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(senha, salt);

        console.log({ nome, email, dataNascimento, hash });
        await dao.salvarUser(nome, email, dataNascimento, hash);
        return res.status(200).json({ message: 'sucesso, usuario cadastrado' });

    },

    async nomeUser(req, res) {
        const user = await dao.getUserName(req.params.id);
        if (!user) return res.status(400).json({ message: 'não foi encontrado usurario' });
        return res.status(200).json(user);
    },

    // async login(req, res) {
        

        // const user = await dao.loginUser(email, hash);

        // if (!users) return res.status(400).json({ message: 'Senha ou email inválidos!' });
        // return res.status(200).json({ message: 'sucesso', data: user });
    // }
};