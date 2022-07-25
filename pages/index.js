import {useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import clientPromise from '../lib/mongodb'
import {SpeciesSelect} from '../components/speciesList'
import { Box} from '@chakra-ui/react'

export default function Home({ isConnected, species }) {
  const [batchcodes, setBatchcodes] = useState([])
  const [selectedSpecies, setSelectedSpecies] = useState(0)

  return (
    <Box m={4}>
    <SpeciesSelect species={species} defaultIndex={selectedSpecies} onChange={setSelectedSpecies}/>
    {species[selectedSpecies].name}
    </Box>
  )
}

export async function getServerSideProps (context) {
  try {
    // await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    const dbname = process.env.MONGODB_DB
    
    const client = await clientPromise
    const db = client.db(dbname)
    const collection = db.collection('species')
    let speciesResult = await collection.find().toArray()

    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true, species: speciesResult }
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false }
    }
  }
}
