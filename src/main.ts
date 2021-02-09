import express, { Application, Request, Response} from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';

const app: Application = express()

app.get('/', (req: Request,res: Response)=>{
    res.send('<h1>Hi, please go to /graphql</h1>');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const port = process.env.PORT || 4000;


app.listen(port, ()=> console.log(`Server run on port ${port}...`))