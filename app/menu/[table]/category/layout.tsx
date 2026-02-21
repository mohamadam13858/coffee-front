import CartFooter from "@/components/footer/cartFooter";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-gray-950 text-gray-100 pb-20"> {/* pb-20 برای جلوگیری از همپوشانی محتوا با فوتر */}
        
        <main className="flex-grow">
          {children}
        </main>

        <CartFooter itemCount={3} /> 
        
      </body>
    </html>
  );
}