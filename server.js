const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const graphqlHttp = require("express-graphql").graphqlHTTP;
const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const app = express();
const PORT = 3001;
const MongoURI = "mongodb://localhost:27017/local";

app.use(cors());

mongoose.connect(MongoURI);
mongoose.connection.once("open", ()=> console.log("Database connected"));
mongoose.connection.on("error", (error)=> console.log("database connection error " + error));

app.use("/graphql", graphqlHttp({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));

app.listen(PORT, ()=> console.log("server running on " + PORT));