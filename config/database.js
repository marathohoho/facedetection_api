/***********DATABASE***********/
/**VVVVVVVVVVVVVVVVVVVVVVVVVV**/

const Sequelize = require('sequelize');

//Connect to the database using Sequelize:
const connection = new Sequelize('smart-brain2', 'root', '1306', {
    host: 'postgresql-infinite-36127',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      } 
});

//connect and check connection to the database
connection.authenticate()
    .then(function(){
        console.log("Connected with the database! ");
    })
    .catch(function (err){
        console.log("Something went wrong! Could not establish connection with the database");
    })

const users = connection.define('users', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey : true,
        unique: true,
    },
    name: {
        type: Sequelize.STRING(200),
        allowNull: true
    },
    email: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true
    },
    entries: {
        type: Sequelize.BIGINT(20),
        allowNull: true
    },
    joined: Sequelize.DATE

});

const userLogin = connection.define('login', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true, 
        unique: true
    },
    hash:{
        type: Sequelize.STRING(200),
        allowNull: false
    },
    email : {
        type: Sequelize.STRING(200),
        allowNull: false
    }
});

module.exports = {
    connection,
    userLogin,
    users
};

/**^^^^^^^^^^^^^^^^^^^^^^^^^^**/
/***********DATABASE***********/
