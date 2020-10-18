const { GraphQLServer } = require('graphql-yoga');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

let idCount = links.length;
const resolvers = {
    Query : {
        info : () => "This is the API of hackernews clone",
        feed : () => links
    },

    Link : {
        id : (parent) => parent.id,
        description : (parent) => parent.description,
        url : (parent) => parent.url
    },

    Mutation : {
        post : (parent, args) => {
            // create a link
            const link = {
                id : `link-${idCount++}`,
                description : args.description,
                url : args.url
            }
            links.push(link);
            return link;
        },

        update : (parent,args) => {
            for(let i = 0;i<links.length;i++){
                if(links[i].id === args.id){
                    links[i].description = args.description;
                    links[i].url = args.url;
                    return links[i];
                }
            }
            

            return {};
        }
    }

}

const server = new GraphQLServer({
    typeDefs : './src/schema.graphql',
    resolvers
})

server.start(() => console.log(`Server is running on port http://localhost:4000`));