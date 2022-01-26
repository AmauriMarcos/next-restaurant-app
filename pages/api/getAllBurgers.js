import prisma from '../../lib/prisma';

export default async function handleMenu(req, res) {
    const burgers = await prisma.burger.findMany()
    res.json(burgers);
}