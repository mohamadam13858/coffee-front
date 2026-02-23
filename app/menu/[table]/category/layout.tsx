import { CartProvider } from "@/contexts/CartContex";
import CartFooter from "@/components/footer/cartFooter";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="fa" dir="rtl">
      <div className="min-h-screen  text-gray-100 pb-20">
        <CartProvider>
          <main className="flex-grow">
            {children}
          </main>
          <CartFooter />
        </CartProvider>

      </div>
    </div>
  );
}