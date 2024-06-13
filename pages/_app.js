import { CartContextProvider } from "@components/CartContext";
import Footer from "@components/Footer";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <CartContextProvider>
        <Provider>
          <header className="shadow-md">
            <Nav />
          </header>
          <div className="main">
            <Component {...pageProps} />
          </div>
        </Provider>
        <Footer />
      </CartContextProvider>
    </SessionProvider>
  );
}
