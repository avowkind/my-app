/**
 * List the available speciesanisations
 */
import { Box, Stack, Button, Text,  SimpleGrid } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export function SpeciesSelect ({ species, defaultIndex, onChange }) {
  // if (!species.length) return ''
  return (
    <Tabs variant = 'enclosed' colorScheme='teal' defaultIndex={defaultIndex} onChange={index => onChange(index)}>
      <TabList>
          {species?.map(species => <Tab key={species._id} >{species.name}</Tab>)}
      </TabList>
  </Tabs>
  )
}

export default SpeciesSelect

