const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../src/utils')

async function post(parent, args, context, info){
    const userId = getUserId(context)
    // create a link
    const newlink = await context.prisma.link.create({
        data: {
            url : args.url,
            description : args.description,
            postedBy: { connect: { id: userId } },
        }
    }) 
    
    return newlink;
}

async function signup(parent, args, context){
    const password = await bcrypt.hash(args.password, 10)
  
    // 2
    const user = await context.prisma.user.create({ data: { ...args, password } })
  
    // 3
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    // 4
    return {
      token,
      user,
    }
}

async function login(parent, args, context){
    const user = await context.prisma.user.findOne({ where: { email: args.email } })
    if (!user) {
      throw new Error('No such user found')
    }
  
    // 2
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    // 3
    return {
      token,
      user,
    }
}

module.exports = {
    signup,
    login,
    post,
  }