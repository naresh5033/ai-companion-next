import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
// this stripe route will do 2 things, if the user is not subscribed, it will redirect the user to the checkout page, but if the user is subscribed it will redirects em to the billing/manage page, where they can cancel the subscription
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId
      }
    })
// 1. billing portal
    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({ // redirect to billing portal
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl, // once the billing is done redirects to the settings url
      })

      return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    }

    // 2. checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card", "paypal"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Companion Pro",
              description: "Create Custom AI Companions"
            },
            unit_amount: 499, //is 4.99$
            recurring: {
              interval: "month"
            }
          },
          quantity: 1,
        },
      ],
      // when the user subscribed the stripe will trigger the webhook, and we won't ve any idea who subscribed, so that's y this meta data is important 
      metadata: {
        userId,
      },
    })

    return new NextResponse(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    console.log("[STRIPE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
