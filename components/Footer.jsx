
import { 
  Flex,
  Text
} from "@chakra-ui/react"
import Link from 'next/link'

const FooterContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="footer"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mt={8}
      p={3}
      bg="green.800" // {["green.900", "green.900", "transparent", "transparent"]}
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
      {children}
    </Flex>
  )
}

export const Footer = () =>
  <FooterContainer>
      <Text>
        Coded by&nbsp;
        <Link href='https://groat.nz/'>Andrew @ groat.nz</Link>
        .
      </Text>

  </FooterContainer>

export default Footer
