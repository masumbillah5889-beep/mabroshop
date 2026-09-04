import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CheckoutClient from "@/components/checkout/CheckoutClient";
import { getAddons } from "@/lib/data";

export default async function CheckoutPage() {
  const addons = await getAddons();
  return (
    <>
      <Header />
      <CheckoutClient otpRequired={addons.fake_order_protection.enabled} />
      <Footer />
    </>
  );
}
