/**
 import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";
//import verifyToken from "@/utils/verifyToken";
//import withAdminProtection from "@/utils/withAdminProtection";

async function calculateWeeklyAndMonthlyRevenue(req: NextApiRequest, res: NextApiResponse) {
  
  //const token = verifyToken(req);

  try {

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

const { startDate, endDate } = req.query;

const startDateTime = new Date(startDate as string);
const endDateTime = new Date(endDate as string);



const totalRevenue = await prisma.despesas.aggregate({
  _sum: {
    preco: true,
  },
  where: {
    data: {
      gte: startDateTime,
      lte: endDateTime,
    },
  },
});

const detailedData = await prisma.despesas.findMany({
  where: {
    data: {
      gte: startDateTime,
      lte: endDateTime,
    },
  },
});

res.status(200).json({ totalRevenue, detailedData });
} catch (error) {
console.error('Erro ao calcular o faturamento:', error);
res.status(500).json({ error: 'Erro interno do servidor' });
}
}

//export default withAdminProtection(calculateWeeklyAndMonthlyRevenue);
export default (calculateWeeklyAndMonthlyRevenue);

 */

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";

async function getAllData(req: NextApiRequest, res: NextApiResponse) {
  
  try {

    // Puxando todos os dados da tabela 'despesas' sem qualquer filtro.
    const allData = await prisma.despesas.findMany();

    // Retorna os dados recuperados.
    res.status(200).json({ allData });
  } catch (error) {
    console.error('Erro ao recuperar os dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export default getAllData;
