import { ChakraProvider } from "@chakra-ui/react";
import { store } from "alethian-app/state/store";
import "alethian-app/styles/globals.css";
import { theme } from "alethian-app/theme";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const matters = localFont({
  src: [
    {
      path: '../../public/fonts/Matter-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Matter-RegularItalic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Matter-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Matter-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-matters'
})
let persistor = persistStore(store);
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <main className={` ${matters.className}`}>
           <Component {...pageProps} />

          </main>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}
