import type { Order, OrderItem, SupplierStatus } from "./types";

type MockOrder = Order & { items: OrderItem[] };

function makeOrder(
  orderNumber: number,
  customerName: string,
  customerPhone: string,
  zone: "inside_dhaka" | "outside_dhaka",
  paymentMethod: "cod" | "online",
  supplierStatus: SupplierStatus,
  items: { name: string; price: number; supplierPrice: number; qty: number }[],
  daysAgo: number
): MockOrder {
  const deliveryCharge = zone === "inside_dhaka" ? 80 : 150;
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const orderItems: OrderItem[] = items.map((i, idx) => ({
    id: `o${orderNumber}-i${idx}`,
    order_id: `order-${orderNumber}`,
    product_id: null,
    product_name: i.name,
    unit_price: i.price,
    quantity: i.qty,
    supplier_price: i.supplierPrice,
    line_total: i.price * i.qty,
  }));

  return {
    id: `order-${orderNumber}`,
    order_number: orderNumber,
    customer_name: customerName,
    customer_phone: customerPhone,
    customer_address: "ঢাকা",
    delivery_zone: zone,
    delivery_charge: deliveryCharge,
    subtotal,
    total: subtotal + deliveryCharge,
    payment_method: paymentMethod,
    payment_status: paymentMethod === "online" ? "paid" : "pending",
    order_status:
      supplierStatus === "delivered" ? "completed" : supplierStatus === "cancelled" ? "cancelled" : "processing",
    supplier_status: supplierStatus,
    created_at: new Date(Date.now() - daysAgo * 86400000).toISOString(),
    items: orderItems,
  };
}

export const MOCK_ORDERS: MockOrder[] = [
  makeOrder(1041, "রফিকুল ইসলাম", "01711223344", "inside_dhaka", "cod", "delivered", [
    { name: "Content Creator Mirrorless Kit", price: 19999, supplierPrice: 15200, qty: 1 },
  ], 6),
  makeOrder(1042, "সুমাইয়া আক্তার", "01822334455", "outside_dhaka", "cod", "delivered", [
    { name: "Smart Fitness Band X2", price: 1899, supplierPrice: 1120, qty: 2 },
    { name: "RGB Wireless Gaming Controller", price: 2450, supplierPrice: 1680, qty: 1 },
  ], 5),
  makeOrder(1043, "তানভীর হাসান", "01933445566", "inside_dhaka", "online", "delivered", [
    { name: "Laptop Mobile Desk Setup", price: 50000, supplierPrice: 41500, qty: 1 },
  ], 3),
  makeOrder(1044, "নাজমুল হক", "01644556677", "inside_dhaka", "cod", "approved", [
    { name: "Electric Vegetable Chopper", price: 1450, supplierPrice: 890, qty: 3 },
  ], 2),
  makeOrder(1045, "ফারজানা ইয়াসমিন", "01555667788", "outside_dhaka", "cod", "approved", [
    { name: "Smart Baby Monitor Camera", price: 3600, supplierPrice: 2650, qty: 1 },
  ], 1),
  makeOrder(1046, "ইমরান খান", "01766778899", "inside_dhaka", "cod", "cancelled", [
    { name: "Cordless Hair Trimmer Pro", price: 1650, supplierPrice: 1020, qty: 1 },
  ], 4),
  makeOrder(1047, "মাহমুদা বেগম", "01877889900", "inside_dhaka", "cod", "not_sent", [
    { name: "3-in-1 Juicer Grinder", price: 3200, supplierPrice: 2100, qty: 1 },
  ], 0),
];
