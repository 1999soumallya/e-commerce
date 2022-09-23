const bcrypt = require('bcryptjs')

const Users = [
    {
        name: 'admin',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('123456', 10),
        IsAdmin: true
    },
    {
        name: 'admin1',
        email: 'admin1@admin1.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Soumallya',
        email: '1999soumallya@gmail.com',
        password: bcrypt.hashSync('123456', 10)
    },

]

module.exports = Users