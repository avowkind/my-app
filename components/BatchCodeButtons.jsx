/**
 * Collect a batch code
 * with autocomplete if list of batches provided.
 */
import React, { useState, useEffect } from 'react'
import { HStack, Button, Text } from '@chakra-ui/react'
import { AiOutlineCopy } from 'react-icons/ai'
import { useToast } from '@chakra-ui/react'
import { increment } from 'bb26'

// batch code components
const SPECIES = 0
const DATE = 1
const PARENT_LETTER = 2
const INDEX = 3
const TANK = 4


// sort batch codes.
const batchsort = (a, b) => (a._id > b._id ? 1 : -1)
const stringsort = (a, b) => (a > b ? 1 : -1)

/** find the next available batch code index
 * @param {array} batchcodes
 * @param {string} batch
 * @returns {string} newBatchCode
 */
export function batchCodeNextIndex (batchcodes, batch) {
  if (!batch) return
  const parts = batch.split('-')
  const filter = parts.slice(0, parts.length - 1).join('-')
  const filteredBatchcodes = batchcodes
    ?.filter(code => code._id.startsWith(filter))
    .sort(batchsort)
  const latestCode = filteredBatchcodes?.[filteredBatchcodes.length - 1]
  const latestCodeIndex = latestCode?._id.split('-')[latestCode._id.split('-').length - 1]
  return filter + '-' + (parseInt(latestCodeIndex) + 1)
}


/** find the next available parent letter for species
 * @param {array} batchcodes
 * @param {string} batch
 * @returns {string} newBatchCode
 */
export function batchCodeNextParent (batchcodes, batch) {
  if (!batch) return
  const parts = batch.split('-')
  const species = parts[SPECIES] // just the species. 
  const filteredBatchcodes = batchcodes
    ?.filter(code => code._id.startsWith(species))
    .sort(batchsort)

  const parents = filteredBatchcodes?.map(code => ('0000' + code._id.split('-')[2]).slice(-4)).sort(stringsort)
  const lastestParent = parents?.[parents.length - 1].replace(/^0+/, '')
  const nextParent = increment(lastestParent) // usingn bb26 library
  return parts.slice(0, PARENT_LETTER).join('-') + '-' + nextParent + '-1' 
}

/** New batch code put up today's date and time
 * @param {array} batchcodes
 * @param {string} batch
 * @returns {string} newBatchCode
 */
export function batchCodeNewBatch ( batch) {
  if (!batch) return
  const parts = batch.split('-')
  const species = parts[SPECIES] // just the species.
  const parent = parts[PARENT_LETTER]
  const d = new Date()
  const date = "" + d.getFullYear() +  ('00' + (d.getMonth() + 1)).slice(-2) + ('00' + (d.getDate() + 1)).slice(-2)
  return species + '-' + date + '-' + parent + '-1'
}


export function BatchCodeButtons ({
  batchcodes,
  batch,
  onChange = () => {}
}) {
  const [nextIndex, setNextIndex] = useState('')
  const [nextParent, setNextParent] = useState('')
  const [newBatch, setNewBatch] = useState('')
  const [newBatchAndParent, setNewBatchAndParent] = useState('')
  const toast = useToast()

  useEffect(() => {
    if (!batch) return
    
    // find the next unused index for this batch code
    setNextIndex(batchCodeNextIndex(batchcodes, batch._id))
    setNextParent(batchCodeNextParent(batchcodes, batch._id))
    setNewBatch(batchCodeNewBatch(batch._id))
  }, [batchcodes, batch])

  useEffect(() => {
    setNewBatchAndParent(batchCodeNewBatch(nextParent))
  }, [nextParent])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(nextIndex)
    toast({
      title: nextIndex,
      description: 'Copied to clipboard.',
      status: 'success',
      duration: 2000,
      isClosable: true
    })
  }

  const saveNextBatchIndex = () => {
    copyToClipboard()
    onChange(nextIndex)
  }

  const saveNextBatchParent = () => {
    copyToClipboard()
    onChange(nextParent)
  }

  const saveNewBatchSameParent = () => {
    copyToClipboard()
    onChange(nextParent)
  }

  const saveNewBatchNewParent = () => {
  copyToClipboard()
  onChange(newBatchAndParent)
}

  return (
    <HStack mt="1em">
      <Button onClick={saveNextBatchIndex}>Next Index: {nextIndex}</Button>
      <Button onClick={saveNextBatchParent}>Next Parent: {nextParent}</Button>
      <Button onClick={saveNewBatchSameParent}>New Batch: {newBatch}</Button>
      <Button onClick={saveNewBatchNewParent}>New Parent: {newBatchAndParent}</Button>

    </HStack>
  )
}
export default BatchCodeButtons
