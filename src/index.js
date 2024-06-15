// Depedencies
import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'

let prisma;

function initialiseDependencies(env) {
  // Initalise the database
  if (!prisma) {
    const adapter = new PrismaD1(env.DB)
    prisma = new PrismaClient({ adapter, log: ['query', 'error'] })
  }
}

export default {
	async fetch(request, env) {
    // Initialise Database
    initialiseDependencies(env)

    const select = {
      friendlyId: true,
      clubId: true,
      user: {
        select: {
          contacts: {
            where: {
              name: {
                equals: 'Some Contact'
              }
            },
            select: {
              id: true,
              name: true
            }
          },
          medicals: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }

    try {
      const members = await prisma.member.findMany({
        where: {
          clubId: 'abc123'
        },
        select
      })

      return Response.json({ error: false, memberCount: members.length, members });
    } catch (e) {
      console.log('Ooops, something went wrong!')
      console.log(e)
      return Response.json({ error: true });
    }
	}
};
