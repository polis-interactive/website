
import type {ReactElement} from "react";

import Navbar from './modules/navbar'
import Footer from './modules/footer'

export default function Layout(element: ReactElement) {
    return (
        <>
            <Navbar />
            <main>{element}</main>
            <Footer />
        </>
    )
}
