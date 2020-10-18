const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main(){
    
    let filteredLink = await prisma.link.findFirst({
        where : { id : 1}
    })
    console.log(filteredLink);
    prisma.link.update()
}

main().catch((e) => {throw e;}).finally(async () => await prisma.$disconnect());