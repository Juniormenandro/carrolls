

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import { BookingType } from "@/app/page";



const prisma = new PrismaClient();

const checkout = async (req: NextApiRequest, res: NextApiResponse) => {
  const { booking }: { booking: BookingType } = req.body;
  

    const {
      selectedProductId,
      selectedProductNane,
      selectedProdutPrice,
      nome,
      telefone,
      placa,
      selectedTime,
      selectedProductDefaultPrice,
      rawPrice,
  
    } = booking;
    const price = parseFloat(selectedProdutPrice.replace('€', '').trim()) * 100;

  try {

console.log(booking,"dados")
    const client = await prisma.clientes.upsert({
        where: { placa },
        update: { nome, telefone },
        create: { nome, telefone, placa},
      });

    const newService = await prisma.servicos.create({
      data: {
        cliente: { connect: { id: client.id } },
        aguardandoPagamento: true,
        
        concluido: false,
        data: new Date(),
        selectedPayment: booking.selectedPayment,
        selectedProductId: booking.selectedProductId,
        selectedProductNane: booking.selectedProductNane,
        selectedProdutPrice: booking.selectedProdutPrice,

        
        selectedTime: booking.selectedTime,
        selectedProductDefaultPrice: booking.selectedProductDefaultPrice,
        rawPrice: booking.rawPrice,
      },
    });
    return res.status(201).json({
      message: 'Reserva criada com sucesso!',
      service: newService
    });
  } catch (error) {
    console.error("Erro ao criar a reserva:", error);
    return res.status(500).json({
      error: 'Erro ao criar a reserva.'
    });
  }
};

export default checkout;
