import '@/styles/globals.css'
import { MyContextProvider } from '../contexts/MyContext';




export default function App({ Component, pageProps }) {

  return (

    <MyContextProvider>
      <Component {...pageProps} />
    </MyContextProvider>

  )
}
