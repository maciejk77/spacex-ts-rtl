// TODO cannot require an export util fetchData, hence replaced here with axios
const axios = require('axios');
const cors = require('cors');

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

// TODO cannot require an export
const BASE_URL = 'https://api.spacexdata.com/v4';

const app = express();
app.use(cors());

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
    allRockets: {
      type: new GraphQLList(DataType),
      description: 'A list of rockets or dragons',
      args: {
        rocketType: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const { data } = await axios.get(`${BASE_URL}/${args.rocketType}`);
        return data;
      },
    },
    rocket: {
      type: new GraphQLList(DataType),
      description: 'Single item rocket or dragon',
      args: {
        id: { type: GraphQLString },
        rocketType: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const { data } = await axios.get(`${BASE_URL}/${args.rocketType}`);
        return data.filter((item) => item.id === args.id);
      },
    },
  },
});

const schema = new GraphQLSchema({ query: RootQuery });

app.use('/graphql', graphqlHTTP({ graphiql: true, schema }));

app.listen(5000, () => console.log('Server is running at port 5000'));
