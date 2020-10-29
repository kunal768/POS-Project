const logger = require('./utils/logger')
const { ApolloServer } = require('apollo-server')
const { typeDefs } = require('./controllers/schema')
const resolvers = require('./controllers/resolver')
const mongoose = require('mongoose')

const db_url = '<add db url>'

const server = new ApolloServer({
    typeDefs,
    resolvers,
    debug: true,
    playground: true,
  });

mongoose.connect(db_url,{useNewUrlParser : true}, (err, _) => {
    if(err){
        logger.error(`Error connecting to database : ${err}`)
    } else {
        logger.info(`database connections successful!`)
    }
})

const PORT = process.env.PORT || "5000";
server.listen(PORT)




























