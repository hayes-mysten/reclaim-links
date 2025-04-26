import { ConnectButton } from "@mysten/dapp-kit";
import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { WalletStatus } from "./WalletStatus";

function App() {
  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>Reclaim links from created in slush wallet</Heading>
        </Box>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Container>
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ background: "var(--gray-a2)", minHeight: 500 }}
        >
          <Container>
            <Box
              p="4"
              mb="4"
              style={{
                background: "var(--red-a2)",
                border: "1px solid var(--red-a8)",
                borderRadius: "var(--radius-3)",
              }}
            >
              <Heading size="3" color="red" mb="2">
                ⚠️ Warning: Temporary Solution
              </Heading>
              <Text color="red">
                While this app should work to reclaim links, this is a temporary
                workaround and should probably not be used or trusted. Please
                wait for an official fix in the Slush wallet.
              </Text>
            </Box>
          </Container>
          <Container>
            <Box
              p="4"
              mb="4"
              style={{
                background: "var(--blue-a2)",
                border: "1px solid var(--blue-a8)",
                borderRadius: "var(--radius-3)",
              }}
            >
              <Text color="blue">
                If you would want to verify what this app is doing, or run it
                your self the source is available on{" "}
                <a href="https://github.com/hayes-mysten/reclaim-links">
                  github
                </a>
              </Text>
            </Box>
          </Container>
          <WalletStatus />
        </Container>
      </Container>
    </>
  );
}

export default App;
