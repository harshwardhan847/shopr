"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useCartStore from "@/store/cart";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckIcon, Copy } from "lucide-react";
import { copyTextToClipboard } from "@/lib/utils";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const sessionId = searchParams.get("session_id");
  const clearCart = useCartStore((state) => state.clearCart);
  useEffect(() => {
    if (orderNumber) {
      clearCart();
    }
  }, [orderNumber, clearCart]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
        <div className="flex justify-center mb-8">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-6 text-center">
          Thank You for Your Order!
        </h1>
        <div className="border-t border-b border-gray-200 py-6 mb-6">
          <p className="text-lg text-gray-700 mb-4 text-center">
            Your order has been confirmed and will be shipped shortly.
          </p>
          <div className="space-y-2">
            {orderNumber && (
              <p className="text-gray-600 flex items-center space-x-5">
                <span>Order Number:</span>
                <span className="font-sans text-sm text-green-600">
                  {orderNumber}
                </span>
              </p>
            )}
            {sessionId && (
              <p className="text-gray-600 flex items-center space-x-5">
                <span>Transaction ID:</span>
                <span
                  className="font-sans text-sm text-green-600 truncate "
                  onClick={() => copyTextToClipboard(sessionId)}
                >
                  <Copy className="w-4 h-4 inline mr-1" />
                  {sessionId}
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600 text-center">
            A confirmation email has been sent to your email address.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/orders">Your order Details</Link>
            </Button>
            <Button asChild variant={"outline"}>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
