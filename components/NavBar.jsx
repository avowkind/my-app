import React from 'react'
import Link from 'next/link'

import {
  Flex,
  Box,
  Text,
  Stack
} from '@chakra-ui/react'
import { AiOutlineCloseSquare, AiOutlineMenu } from 'react-icons/ai'

export const Logo = (props) =>
  <Box {...props}>
    <img alt='pfr logo' src='/pfricon-white.svg' />
  </Box>

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <AiOutlineCloseSquare /> : <AiOutlineMenu />}
    </Box>
  )
}

const MenuItem = ({ children, isLast, href = '/', ...rest }) => {
  return (
    <Link href={href}>
      <Text display='block' {...rest}>
        {children}
      </Text>
    </Link>
  )
}
const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      w='100%'
      mb={8}
      p={3}
      bg='green.800' // {["green.900", "green.900", "transparent", "transparent"]}
      color={['white', 'white', 'primary.700', 'primary.700']}
      {...props}
    >
      {children}
    </Flex>
  )
}
const MenuLinks = ({ isOpen }) => {

  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={8}
        align='center'
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem href='/'>Home</MenuItem>
        <MenuItem href='/about'>About</MenuItem>
       
      </Stack>

    </Box>
  )
}

export const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <NavBarContainer {...props}>
      <Logo w='30px' />
      <Text fontSize='lg' fontWeight='bold'>
        Plant &amp; Food Research Nelson FFF: Batch Code Tool
      </Text>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  )
}
export default NavBar
