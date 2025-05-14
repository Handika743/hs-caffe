import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req) {
  const { orderItems } = await req.json();
  const session = await auth();
  const user_id = session.user.id;

  const order = await prisma.order.findFirst({
    where: { user_id: user_id },
  });

  const data = { orderItems };
  console.log(order);

  //   const createOrderMenu = await prisma.OrderItem.create(data);
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
