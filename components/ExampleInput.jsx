import { Box, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'

export function ExampleInput ({value, onChange=()=>{}}) {
  const handleChange = event => onChange(event.target.value)

  return (
    <>
      <Text mb='8px'>Value: {value}</Text>
      <Input
        value={value}
        onChange={handleChange}
        placeholder='Here is a sample placeholder'
        size='sm'
      />
    </>
  )
}

export default ExampleInput