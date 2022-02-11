
import type {ReactElement} from "react";

import Header from 'components/common/header'
import Footer from 'components/common/footer'

export default function Layout(element: ReactElement) {
    return (
        <>
            <Header />
            <main>{element}</main>
        </>
    )
}
