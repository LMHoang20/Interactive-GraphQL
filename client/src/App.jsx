import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [query, setQuery] = useState(
    `query GetLocations {
  locations {
    id
    name
    description
    photo
  }
}`)
  const [result, setResult] = useState('')
  const [client, setClient] = useState(null)

  useEffect(() => {
    setClient(new ApolloClient({
      uri: 'https://flyby-router-demo.herokuapp.com/',
      cache: new InMemoryCache()
    }));
  }, [])

  async function handleQuery() {
    try {
      const response = await client.query({
        query: gql(query),
      })
      console.log(response)
      setResult(JSON.stringify(response, null, 2))
    } catch (error) {
      setResult(JSON.stringify(error.message, null, 2))
    }
  }

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          marginTop: '5vh',
          display: 'flex',
          flexDirection: 'column',

        }}>
          <h1>Query:</h1>
          <textarea style={{
            width: '50vw',
            height: '20vh',
            resize: 'none',
            marginBottom: '2vh',
          }} value={query} onChange={(event) => setQuery(event.target.value)} />
          <button onClick={handleQuery}>Submit</button>
        </div>
        <div>
          <h1>Result:</h1>
          <textarea style={{
            width: '50vw',
            height: '20vh',
            resize: 'none',
          }} value={result} readOnly />
        </div>
      </div>
    </>
  )
}

export default App
