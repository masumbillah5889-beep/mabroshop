import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";
import CartClient from "@/components/cart/CartClient";

export default function CartPage() {
  return (
    <>
      <Header />
      <CartClient />
      <Footer />
      <MobileTabBar />
    </>
  );
}
