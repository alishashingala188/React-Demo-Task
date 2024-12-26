import React from 'react'
import Header from './Header'

const Layout = ({ children }) => {
    return (
        <div className="flex h-[100dvh] overflow-auto">
            <div className="w-full overflow-auto min-h-screen bg-[#F5F6FF] flex flex-auto flex-col no-scrollbar">
                <Header />
                {children}
            </div>
        </div>
    )
}

export default Layout
