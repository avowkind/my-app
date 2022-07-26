/**
 * Collect a batch code 
 * with autocomplete if list of batches provided. 
 */
import { Box, Heading, Input, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react'

export function BatchCodeName({ batchCode, onClick=()=>{} }) {
  const handleClick = (e) => {
    console.log('clicked', e)
    onClick(batchCode)
  }
  return (
    <Box >
      <Text className='batchcode' onClick={() => handleClick(batchCode._id)}>{batchCode?._id}</Text>
    </Box>
  )
}
export function BatchCodeList( { batchcodes, onChange } ) {

  return (
    <>
      {
        batchcodes?.map(code => <BatchCodeName key={code._id} batchCode={code} />)
      }
    </>
  )
}

export function BatchCodeFilterList ({ batchcodes, filter, onClick=()=>{} }) {
  const [filteredBatchcodes, setFilteredBatchcodes] = useState(batchcodes)
  
  useEffect(() => {
    console.log('filter', filter)
    setFilteredBatchcodes(batchcodes?.filter(code => code._id.includes(filter)))
  }, [filter, batchcodes])

  return (
    <Box border='1px' borderColor='gray.200' p="5px" ml="1em" w="13rem" maxH="10rem"
      display={filteredBatchcodes?.length > 1 ? 'block' : 'none'}
      overflow = 'scroll'
      >
      { filteredBatchcodes?.map(code => (
        <BatchCodeName key={code._id} batchCode={code} onClick={onClick}/>
      ))}
    </Box>
  )
}

export function BatchCodeDetail ({ batchcode }) {
  if (!batchcode) return ''
  return (
  <Accordion>
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex='1' textAlign='left'>
            Batch code{batchcode?._id} {batchcode?.batch} {batchcode?.tank_to}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
          <Heading as="h3">{batchcode?._id}</Heading>
          <Text>Date: {batchcode?.date}</Text>
          <Text>Entered By: {batchcode?.entered_by}</Text>
          <Text>Batch: {batchcode?.batch}</Text>
          <Text>Date Brood Start:{batchcode?.date_brood_start}</Text>
          <Text>Date Brood Complete: {batchcode?.date_brood_complete}</Text>
          <Text>Date Brood Removed: {batchcode?.date_brood_removed}</Text>
          <Text>Date Offspring Spawned Start: {batchcode?.date_offspring_spawned_start}</Text>	
          <Text>Date Offspring Spawned End: {batchcode?.date_offspring_spawned_end}</Text>
          <Text>Origin Parents Wild Breed: {batchcode?.origin_parents_wild_breed}</Text>
          <Text>Source Population Or Wild: {batchcode?.source_population_or_wild}</Text>
          <Text>Parent Indicator: {batchcode?.parent_indicator}</Text>
          <Text>Class: {batchcode?.class}</Text>
          <Text>Batch New: {batchcode?.batch_new}</Text>
          <Text>Batch Previous 1: {batchcode?.batch_previous_1}</Text>
          <Text>Batch Previous 2: {batchcode?.batch_previous_2}</Text>
          <Text>Change Reason 1: {batchcode?.change_reason_1}</Text>
          <Text>Change Reason 2: {batchcode?.change_reason_2}</Text>
          <Text>Tank From 1: {batchcode?.tank_from_1}</Text>
          <Text>Tank From 2: {batchcode?.tank_from_2}</Text>
          <Text>Tank To:  {batchcode?.tank_to}</Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default BatchCodeList

// filteredBatchcodes && filteredBatchcodes.length < 2 && 