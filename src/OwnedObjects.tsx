import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { listCreatedLinks } from "@mysten/zksend";
import { useQuery } from "@tanstack/react-query";

export function OwnedObjects() {
  const account = useCurrentAccount();
  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction();
  const client = useSuiClient();
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["getLinks", account?.address],
    enabled: !!account,
    queryFn: () =>
      listCreatedLinks({
        address: account?.address as string,
      }),
  });

  if (!account) {
    return;
  }

  if (error) {
    return <Flex>Error: {error.message}</Flex>;
  }

  if (isPending || !data) {
    return <Flex>Loading...</Flex>;
  }

  return (
    <Flex direction="column" my="2">
      {data.links.length === 0 ? (
        <Text>No links created by the connected wallet</Text>
      ) : (
        <Heading size="4">Links created by the connected wallet</Heading>
      )}
      {data.links
        .filter(({ link }) => !!link.assets)
        .map(({ link, ...rest }) => (
          <Flex key={rest.digest}>
            <Container>
              <Button
                disabled={link.claimed}
                onClick={async () => {
                  const { digest } = await signAndExecuteTransaction({
                    transaction: link.createClaimTransaction(
                      account?.address as string,
                      {
                        reclaim: true,
                      },
                    ),
                  });

                  await client.waitForTransaction({
                    digest,
                  });

                  refetch();
                }}
              >
                {link.claimed ? "Link already claimed" : "Claim Link"}
              </Button>
              <pre>
                {JSON.stringify(
                  rest,
                  (key, value) =>
                    typeof value === "bigint" ? value.toString() : value,
                  2,
                )}
              </pre>
            </Container>
          </Flex>
        ))}
    </Flex>
  );
}
