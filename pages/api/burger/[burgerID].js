import prisma from '../../../lib/prisma';

export default async function handleMenu(req, res) {
    const id = req.query.burgerID
   
    const result = await prisma.burger.findUnique({
        where: {
          id: +id
        },
      })
     
    res.json(result)
}