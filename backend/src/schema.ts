import {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList,
    GraphQLSchema,
    GraphQLBoolean
} from 'graphql';

import axios from 'axios';


let LauncheType = new GraphQLObjectType({
    name: 'launch',
    fields:()=>({
        flight_number : {type: GraphQLInt},
        mission_name : {type: GraphQLString},
        launch_year : {type: GraphQLString},
        launch_date_local : {type: GraphQLString},
        launch_success: {type: GraphQLBoolean},
        rocket: { type : RockType}
    })
});


let RockType = new GraphQLObjectType({
    name: 'rocket',
    fields: ()=> ({
        rocket_id: {type: GraphQLString},
        rocket_name: {type: GraphQLString},
        rocket_type: {type: GraphQLString}
    })
});


let RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        launches:{
            type: new GraphQLList(LauncheType),
            resolve(parent, args){
                return axios.get('https://api.spacexdata.com/v3/launches')
                            .then(res => res.data);
            }
        },
        launch:{
            type: LauncheType,
            args: {flight_number: {type: GraphQLInt}},
            resolve(parent, args){
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                                .then(res => res.data);
            }
        }
    }
})


export default new GraphQLSchema({
    query: RootQuery
});
