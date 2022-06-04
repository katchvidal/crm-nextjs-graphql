import Link from 'next/link'
import React from 'react'

export const Sidebar = () => {

    // console.log( router.pathname );
    return (
        <>
            <aside className='bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
                <div>
                    <p className='text-white text-3xl font-black'> CRM Clientes </p>
                </div>
                <nav className='mt-5 list-none'>
                    <li className={ router.pathname === '/' ? 'text-white  block text-xl font-black bg-blue-800 p-2' : 'text-white mb-2 block text-xl font-black' } >
                        <Link href="/"> Home </Link>
                    </li>
                    <li className={ router.pathname === '/clientes' ? 'text-white  block text-xl font-black bg-blue-800 p-2' : 'text-white mb-2 block text-xl font-black' }>
                        <Link href="/clientes"> Clientes </Link>
                    </li>
                    <li className={ router.pathname === '/pedidos' ? 'text-white  block text-xl font-black bg-blue-800 p-2' : 'text-white mb-2 block text-xl font-black' } >
                        <Link href="/pedidos"> Pedidos  </Link>
                    </li>
                </nav>
            </aside>

        </>
    )
}
