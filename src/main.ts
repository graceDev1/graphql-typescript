import express, { Application} from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';

const app: Application = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

const port = process.env.PORT || 4000;


app.listen(port, ()=> console.log(`Server run on port ${port}...`))