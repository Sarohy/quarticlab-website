import React from 'react'
import { Footer, Header } from '../CommonComponents';

function Layout({ children }) {
    return (
        <div className="content" >
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout;
