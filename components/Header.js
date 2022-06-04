import { useQuery } from '@apollo/client'
import React from 'react'
import { AUTH_ME_QUERY } from '../apollo/querys/auth'
import Router from 'next/router'


const Header = () => {

    const { data, loading, error } = useQuery(AUTH_ME_QUERY)
    if (loading) return 'Cargando....'
    if ( !data || data === undefined ){
        Router.replace('/login')
        // return 
        
    }
    const { name, lastname, email } = data.Auth.user;
    const signOut = () => {
        localStorage.removeItem('token');
        Router.replace('/login')
    }
    return (
        <div className='flex justify-between'>
            <p className='mr-2 font-black text-xl mb-6'> Hola: {name} {lastname} </p>
            <button onClick={signOut} className='bg-blue-700 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md' type='button'> Cerrar Sesion </button>
        </div>
    )
}

export default Header