const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient }  = require('@prisma/client');

const prisma = new PrismaClient();


const resolvers = {
    Query : {
        info : () => "This is the API of hackernews clone",
        feed : async (parent, args, context) => {
            return context.prisma.link.findMany()
        }
    },

    Link : {
        id : (parent) => parent.id,
        description : (parent) => parent.description,
        url : (parent) => parent.url
    },

    Mutation : {
        post : async (parent, args, context, info) => {
            // create a link
            const newlink = await context.prisma.link.create({
                data: {
                    url : args.url,
                    description : args.description
                }
            }) 
            
            return newlink;
        },

       
    }

}

const server = new GraphQLServer({
    typeDefs : './src/schema.graphql',
    resolvers,
    context : {
        prisma
    }
})

server.start(() => console.log(`Server is running on port http://localhost:4000`));