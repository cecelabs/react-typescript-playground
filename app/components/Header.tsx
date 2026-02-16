import React from "react";
import Link from 'next/link'


const Header = () => (
        <header className="bg-gray-800 text-white p-4 text-center text-2xl font-bold">
            <h1>Dashboard Header</h1>
            <nav>
                <Link href="/carousel">Blog</Link>
            </nav>

        </header>
    )
;

export default Header