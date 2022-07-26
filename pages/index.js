import {useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import clientPromise from '../lib/mongodb'
import {SpeciesSelect} from '../components/speciesList'
import { VStack, StackDivider, Text} from '@chakra-ui/react'
import BatchCodeInput from '../components/batchCodeInput'
import {BatchCodeFilterList, BatchCodeDetail} from '../components/batchCodeList'
import { BatchCodeButtons } from '../components/BatchCodeButtons'

export default function Home({ isConnected, species, batchcodes }) {
  const [batchcodeFilter, setBatchcodeFilter] = useState(species[0]._id + "-")
  const [selectedSpeciesTab, setSelectedSpeciesTab] = useState(0)
  const [currentSpecies, setCurrentSpecies] = useState(species[0])
  const [currentBatchcode, setCurrentBatchcode] = useState(null)

  const handleSpeciesChange = (index) => {
    setSelectedSpeciesTab(index)
    console.log(index, species[index])
    setCurrentSpecies(species[index])
    setBatchcodeFilter(species[index]._id + "-")
  }

  const handleBatchcodeInputChange = (filter) => {
    setBatchcodeFilter(filter)
  }
  const handleBatchSelect = (batchcode) => {
    console.log(batchcode)
    setCurrentBatchcode(batchcode)
    setBatchcodeFilter(batchcode._id)
  }

  return (
    <VStack m={4} align="left"
    >
    <SpeciesSelect species={species} defaultIndex={selectedSpeciesTab} onChange={handleSpeciesChange}/>
    <BatchCodeInput value={batchcodeFilter} onChange={handleBatchcodeInputChange}/>

    <BatchCodeFilterList batchcodes={batchcodes} filter={batchcodeFilter} onClick={handleBatchSelect} />
    <BatchCodeDetail batchcode={currentBatchcode} />
    <BatchCodeButtons batchcodes={batchcodes} batch={currentBatchcode} />

    </VStack>
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
    const speciesResult = await db.collection('species').find().toArray()
    const batchcodesResult = await db.collection('batchcodes').find().toArray()
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true, species: speciesResult, batchcodes: batchcodesResult }
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false }
    }
  }
}
