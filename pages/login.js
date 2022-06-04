import React, { useState } from 'react'
import Layout from '../components/layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useQuery, useLazyQuery } from '@apollo/client'
import { SIGN_IN_QUERY } from '../apollo/querys/login'
import { useRouter } from 'next/router'

const login = () => {
    const router = useRouter()
    const [mensaje, setMensaje] = useState(null)
    const [SignIn] = useLazyQuery(SIGN_IN_QUERY);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Email is Required')
                .email('We need this field like an email@correo.com'),
            password: Yup.string()
                .required('Password is Required')
        }),
        onSubmit: async (valores) => {
            console.log(valores)
            const { email, password } = valores;
            try {
                const { data } = await SignIn({ variables: { email, password } })
                const { status, message, token } = data.SignIn;
                if (status === false) {
                    setMensaje(message)
                    setTimeout(() => {
                        setMensaje(null)
                    }, 1900);
                    return
                }

                setMensaje( message )
                localStorage.setItem('token', token )
                setTimeout(() => {
                    
                    router.push('/')
                    setMensaje( null )
                }, 1800);
            } catch (error) {
                console.log(error)
            }
        }
    })

    const mostrarMensaje = () => {
        return (
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto font-black text-2xl'>
                <p> {mensaje} </p>
            </div>
        )
    }

    return (

        <Layout>

            {mensaje && mostrarMensaje()}
            <h1 className='text-center text-4xl text-white font-black'> Login Page </h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-sm '>
                    <form onSubmit={formik.handleSubmit} className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-8'>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold text-sm mb-2 mt-2'> Email </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-right focus:outline-none focus:shadow-outline'
                                type="email"
                                id='email'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder='Email Account'></input>
                        </div>
                        {formik.touched.email && formik.errors.email ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p className='font-bold'> Error:</p> <p> {formik.errors.email} </p> </div>)
                            : null
                        }
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold text-sm mb-2 mt-2'> Password </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-right focus:outline-none focus:shadow-outline'
                                type="password"
                                id='password'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder='Password Account'></input>
                        </div>
                        {formik.touched.password && formik.errors.password ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p className='font-bold'> Error:</p> <p> {formik.errors.password} </p> </div>)
                            : null
                        }
                        <input
                            type="submit"
                            className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-700'
                            value="Iniciar Session"
                        >
                        </input>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default login