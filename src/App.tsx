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
                background: "var(--red-a2)",
                border: "1px solid var(--red-a8)",
                borderRadius: "var(--radius-3)",
              }}
            >
              <Heading size="3" color="red" mb="2">
                ⚠️ The app is currently blocked by the Slush wallet and can't be
                used.
              </Heading>
              <Text color="red">
                You may be able to use it by running the app yourself locally.
                The source is available on{" "}
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
