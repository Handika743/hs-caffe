import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

function bigintReplacer(key, value) {
  return typeof value === "bigint" ? Number(value) : value;
}

export async function POST(req) {
  const { total_harga, no_meja, orderItems } = await req.json();
  const session = await auth();
  const user_id = session.user.id;

  const data = {
    user_id,
    total_harga,
    no_meja,
  };

  // Membuat Order baru
  const createOrder = await prisma.Order.create({ data });

  if (!createOrder) {
    return new Response(JSON.stringify({ status: 500, isCreated: false }), {
      status: 500,
    });
  } else {
    try {
      // Menambahkan OrderItems
      const createOrderItems = await prisma.OrderItem.createMany({
        data: orderItems.map((item) => ({
          order_id: createOrder.id,
          menu_id: item.menu_id,
          nama_menu: item.nama_menu,
          jumlah: item.jumlah,
          harga: item.harga,
          note: item.note,
        })),
      });

      // Jika createOrderItems gagal, delete Order yang baru dibuat
      if (!createOrderItems) {
        await prisma.Order.delete({
          where: { id: createOrder.id },
        });
        return new Response(JSON.stringify({ status: 500, isCreated: false }), {
          status: 500,
        });
      } else {
        // Menghapus keranjang_menu setelah sukses membuat order items
        await prisma.keranjang_menu.deleteMany({
          where: {
            id: {
              in: orderItems.map((item) => item.item_id),
            },
          },
        });

        return new Response(JSON.stringify({ status: 200, isCreated: true }), {
          status: 200,
        });
      }
    } catch (error) {
      console.error("Error during order processing:", error);
      await prisma.Order.delete({
        where: { id: createOrder.id },
      });
      return new Response(JSON.stringify({ status: 500, isCreated: false }), {
        status: 500,
      });
    }
  }
}

export async function GET(req) {
  const session = await auth();
  const user_id = session.user.id;

  if (!user_id) {
    return new Response("User ID not found", { status: 400 });
  }

  const order = await prisma.Order.findMany({
    where: { user_id },
    include: {
      order_items: true,
    },
    orderBy: { created_at: "desc" },
  });
  console.log(order);
  if (!order) {
    return new Response("order not found", { status: 404 });
  }

  return new Response(JSON.stringify(order, bigintReplacer));
}

export async function DELETE(req) {
  const { id } = await req.json();

  const cancelOrder = await prisma.Order.delete({
    where: { id },
    include: {
      order_items: true,
    },
  });
  if (cancelOrder) {
    return new Response(JSON.stringify({ status: 200, isCreated: true }), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ status: 500, isCreated: false }), {
      status: 500,
    });
  }
}
