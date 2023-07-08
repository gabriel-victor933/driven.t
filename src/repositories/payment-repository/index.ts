import { prisma } from "@/config"
import { PaymentBody } from "@/protocols"

async function postPayment(paymentInfo: PaymentBody, value: number){
    return prisma.payment.create({
        data: {
            ticketId: paymentInfo.ticketId,
            value: value,
            cardIssuer: paymentInfo.cardData.issuer,
            cardLastDigits: paymentInfo.cardData.number.toString().slice(-4),
        }
    })
}

const paymentRepository = {
    postPayment
}

export default paymentRepository