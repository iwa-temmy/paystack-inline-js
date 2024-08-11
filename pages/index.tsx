import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  /**
   * Initiates a payment transaction using Paystack.
   *
   * This function sets up a payment handler with the provided details and opens an iframe for the payment process.
   * It also includes callback functions for payment success and window closure.
   *
   * @return {void}
   */
  const payWithPaystack = () => {
    const handler = typeof window !== "undefined" && window?.PaystackPop.setup({
      key: "pk_test_7651ae240fd99655d503b96ee8872926e841983c", // Replace with your public key
      email: "iwaloyeo@gmail.com",
      firstname: "Olawale",
      lastname: "Iwaloye",
      amount: 23400 * 100, // The amount in kobo (23400 kobo = 234 Naira)
      ref: generateREF(), // Replace with a unique reference generator function
      callback: function (response: any) {
        console.log(
          "Payment successful. Transaction reference:",
          response.reference
        );
        alert("Payment successful!");
      },
      onClose: function () {
        console.log("Payment window closed.");
      },
    });
    handler.openIframe();
  };

  const generateREF = () => {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
      d += performance.now(); // use high-precision timer if available
    }
    const ref = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return ref;
  };

  return (
    <>
      <Script
        src="https://js.paystack.co/v2/inline.js"
        strategy="afterInteractive" // This loads the script after the page is interactive
        onLoad={() => {
          console.log("Paystack script loaded successfully");
        }}
      />
      <main className={`${inter.className}`}>
        <button onClick={payWithPaystack}>Pay with Paystack</button>
      </main>
    </>
  );
}
