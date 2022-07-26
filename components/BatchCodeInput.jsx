/**
 * Collect a batch code 
 * with autocomplete if list of batches provided. 
 */
import React, { useState, useEffect } from 'react'
import { Button, Input, InputGroup,InputRightElement,  Text } from '@chakra-ui/react'
import { AiOutlineCopy } from 'react-icons/ai'
import { useToast } from '@chakra-ui/react'

export function BatchCodeInput({value, onChange=()=>{}}) {
  const toast = useToast()

  const handleChange = event => onChange(event.target.value)
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value)
    toast({
      title: value,
      description: "Copied to clipboard.",
      status: 'success',
      duration: 2000,
      isClosable: true
    })

  }

  return (
    <>
      <Text my='8px'>Batch Code:</Text>
      <InputGroup w = '14rem' >
      <Input
        value={value}
        onChange={handleChange}
        placeholder='SSS-YYYYMMDD-P-N'
        size='md'
      />
      <InputRightElement onClick={copyToClipboard}><AiOutlineCopy /></InputRightElement>
    </InputGroup>
      
    </>
  )
}
export default BatchCodeInput
