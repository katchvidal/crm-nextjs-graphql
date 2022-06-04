import React, { useState } from 'react'
import Layout from '../components/layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { SIGN_UP_MUTATION } from '../apollo/mutations/signup'
import { useRouter } from 'next/router'

const newaccount = () => {
    const router = useRouter()
    const [mensaje, setMensaje] = useState( null )
    //  Mutation Crear Nuevos Usuarios
    const [SignUp] = useMutation(SIGN_UP_MUTATION)
    // Vlidaciones del Formulario
    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            password: '',
            password_repeat: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is Required'),
            lastname: Yup.string()
                .required('Lastname is Required'),
            email: Yup.string()
                .required('Email is Required')
                .email('We need this field like an email@correo.com'),
            password: Yup.string()
                .required('Password is Required')
                .min(6, 'Password minum six Character'),
            password_repeat: Yup.string()
                .required('Password is Required')
                .min(6, 'Password minum six Character'),
        }),
        onSubmit: async (valores) => {
            const { name, lastname, email, password } = valores;
            try {
                const { data } = await SignUp({
                    variables: {
                        user: {
                            name,
                            lastname,
                            email,
                            password
                        }
                    }
                })
                const {status, message } = data.SignUp
               if( status === false ){
                   setMensaje( message )
                   setTimeout(() => {
                       setMensaje( null )
                   }, 1900);
               }
               router.push( '/login')
            } catch (error) {
                
                setMensaje( error.message )
                setTimeout(() => {
                    setMensaje( null )
                }, 1800);
            }
        }
    })

    const mostrarMensaje = () => {
        return (
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto font-black text-2xl'>
                <p> { mensaje } </p>
            </div>
        )
    }

    return (
        <Layout>

{ mensaje && mostrarMensaje() }

            <h1 className='text-center text-4xl text-white font-black'> New Account Page </h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-sm '>
                    <form
                        onSubmit={formik.handleSubmit}
                        className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-8'>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold text-sm mb-2 mt-2'> Name </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-right focus:outline-none focus:shadow-outline'
                                type="text"
                                id='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder='Name Account'></input>
                        </div>
                        {formik.touched.name && formik.errors.name ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p className='font-bold'> Error:</p> <p> {formik.errors.name} </p> </div>)
                            : null
                        }

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold text-sm mb-2 mt-2'> LastName </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-right focus:outline-none focus:shadow-outline'
                                type="text"
                                id="lastname"
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder='LastName Account'></input>
                        </div>
                        {formik.touched.lastname && formik.errors.lastname ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p className='font-bold'> Error:</p> <p> {formik.errors.lastname} </p> </div>)
                            : null
                        }

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold text-sm mb-2 mt-2'> Email </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-right focus:outline-none focus:shadow-outline'
                                type="email"
                                id='email'
                                value={formik.values.email}
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
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder='Password Account'></input>
                        </div>
                        {formik.touched.password && formik.errors.password ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p className='font-bold'> Error:</p> <p> {formik.errors.password} </p> </div>)
                            : null
                        }


                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold text-sm mb-2 mt-2'> Password Repeat </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-right focus:outline-none focus:shadow-outline'
                                type="password"
                                id='password_repeat'
                                value={formik.values.password_repeat}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder='Password Account'></input>
                        </div>
                        {formik.touched.password_repeat && formik.errors.password_repeat ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p className='font-bold'> Error:</p> <p> {formik.errors.password_repeat} </p> </div>)
                            : null
                        }



                        <input
                            type="submit"
                            className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-700'
                            value="Crear Nueva Cuenta"
                        >
                        </input>
                    </form>
                </div>
            </div>
        </Layout>
    )
}



export default newaccount

