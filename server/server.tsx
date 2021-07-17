// TODOD cannot require exported util fetchData, hence replaced here with axios
const axios = require('axios');

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

// TODO cannot require an exported const
const BASE_URL = 'https://api.spacexdata.com/v4';

const app = express();

const DataType = new GraphQLObjectType({
  name: 'Data',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    flickr_images: { type: new GraphQLList(GraphQLString) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getDataFor: {
      type: new GraphQLList(DataType),
      description: 'A list of rockets or dragons',
      args: {
        type: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const { data } = await axios.get(`${BASE_URL}/${args.type}`);
        return data;
      },
    },
    getItem: {
      type: new GraphQLList(DataType),
      description: 'Single item rocket or dragon',
      args: {
        id: { type: GraphQLString },
        type: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const { data } = await axios.get(`${BASE_URL}/${args.type}`);
        return data.filter((item) => item.id === args.id);
      },
    },
  },
});

const schema = new GraphQLSchema({ query: RootQuery });

app.use('/graphql', graphqlHTTP({ graphiql: true, schema }));

app.listen(5000, () => console.log('Server is running at port 5000'));
