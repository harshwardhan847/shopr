"use server";

import { imageUrl } from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
import { CartItem } from "@/store/cart";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};
export type GroupedCartItem = {
  product: CartItem["product"];
  quantity: number;
};

async function createCheckoutSession(
  item: GroupedCartItem[],
  metadata: Metadata
) {
  try {
    //check if any grouped item don't have a price
    const itemsWithoutPrice = item.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("One or more items do not have a price.");
    }

    //Search for existing customer by email
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });
    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_BASE_URL;

    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;
    const cancelUrl = `${baseUrl}/cart`;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      allow_promotion_codes: true,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: item.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: `Product Id: ${item.product._id}`,
            metadata: {
              productId: item.product._id,
            },
            images: item.product.image
              ? [imageUrl(item.product.image).url()]
              : undefined,
          },
          unit_amount: Math.round(item.product.price! * 100),
        },
        quantity: item.quantity,
      })),
    });
    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}

export default createCheckoutSession;
