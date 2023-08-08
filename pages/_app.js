import '@/styles/globals.css'
import { MyContextProvider } from '../contexts/MyContext';
import { SessionProvider } from "next-auth/react";



export default function App({ Component, pageProps }) {

  return (
  <SessionProvider>
    <MyContextProvider>
      <Component {...pageProps} />
    </MyContextProvider>
  </SessionProvider>
  )
}
