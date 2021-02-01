const express = require('express');
const { sequelize } = require('./models');

const controllers = require('./controllers');

const app = express()

app.use(express.json())

app.use('/api/', controllers)

app.listen({port: 3000}, async () => {
    console.log('App is running at the port 3000')

    // sync will apply all new models configuration to the database
    // distructive process
    // use only for development
    await sequelize.sync({force: true})
    console.log('database sync')
})