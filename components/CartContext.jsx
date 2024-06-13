import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const { data: session } = useSession();
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts, ls]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, [ls]);

  function addProduct(produdtId) {
    if (!session?.user) {
      setAlertMessage("A vásárláshoz be kell jelentkezni!");
    } else {
      setCartProducts((prev) => [...prev, produdtId]);
    }
  }

  function removeProduct(produdtId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(produdtId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  }

  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
      {alertMessage && (
        <div
          className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          onClick={() => setAlertMessage(!alertMessage)}
        >
          <Alert className="p-16 cursor-pointer">
            <AlertTitle className="title text-center">Information</AlertTitle>
            <AlertDescription className="text-center mb-4 text-lg font-serif">
              {alertMessage}
            </AlertDescription>
            <AlertDescription className="text-center">
              <p className="text-red-800 italic text-sm">
                *To log in, click on the log in menu tab
              </p>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </CartContext.Provider>
  );
}
