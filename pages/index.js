import Layout  from '../components/layout'
import { useQuery } from '@apollo/client'
import { AUTH_ME_QUERY } from '../apollo/querys/auth'

export default function Home() {
  const { data, loading, error } = useQuery(AUTH_ME_QUERY)
  if (loading) return 'Cargando....'
  if ( !data || data === undefined ){
      Router.replace('/login')
  }
  return (
    <Layout>
      <h2 className='text-2xl text-gray-800 font-light'> Master Page </h2>
    </Layout>
  )

}
