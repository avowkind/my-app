/**
 * Collect a batch code 
 * with autocomplete if list of batches provided. 
 */
import React, { useState, useEffect } from 'react'
import { Box, Button,  Text } from '@chakra-ui/react'
import { AiOutlineCopy } from 'react-icons/ai'
import { useToast } from '@chakra-ui/react'

export function BatchCodeNextIndexButton({batchcodes, batch, onChange=()=>{}}) {
  const [nextIndex, setNextIndex] = useState(0)
  const toast = useToast()
  
  useEffect(() => {
    // find the next unused index for this batch code 
    if (!batch) return
    const parts = batch._id.split('-')
    const filter = parts.slice(0, parts.length - 1).join('-')
    const filteredBatchcodes = batchcodes?.filter(code => code._id.startsWith(filter)).sort((a, b) => a._id > b._id ? 1 : -1)
    const latestCode = filteredBatchcodes?.[filteredBatchcodes.length - 1]
    const latestCodeIndex = latestCode?._id.split('-')[latestCode._id.split('-').length - 1]
    const newBatchCode = filter + '-' + (parseInt(latestCodeIndex) + 1)
    setNextIndex(newBatchCode)
  }, [batchcodes, batch])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(nextIndex)
    toast({
      title: nextIndex,
      description: "Copied to clipboard.",
      status: 'success',
      duration: 2000,
      isClosable: true
    })
  }

  const generateNextBatchIndex = () => {
    setNextIndex(nextIndex + 1)
    copyToClipboard()
    onChange(nextIndex)
  }

  return (
    <Box>
      <Button onClick={generateNextBatchIndex}>Use Next Index: {nextIndex}</Button>
     </Box>
  )
}
export default BatchCodeNextIndexButton
