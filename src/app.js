const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('dotenv/config');
const session = require('express-session');

const passport = require('passport');
const sessionConfig = require('./config/sessao');

const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const dao = require('./dao/usuarioDao')

const PORT = process.env.PORT || 3030;

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRES_CONECTIONS
});

const app = express();
app.use(session({
    store: new (require('connect-pg-simple')(session))({
        pool: pool,
        createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha'
},
    async (email, senha, done) => {
        try {
            const user = await dao.findUser(email);

            // usuário inexistente
            if (!user) { return done(null, false) }

            // comparando as senhas
            const isValid = bcrypt.compareSync(senha, user.senha);
            if (!isValid) return done(null, false)

            console.log("chegou aqui", user)
            return done(null, user)
        } catch (err) {
            done(err, false);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await dao.findUserById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});


app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(PORT, () => { console.log('Servidor rodando') });