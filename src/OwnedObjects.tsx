import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { getSentTransactionsWithLinks, ZkSendLink } from "@mysten/zksend";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SuiTransactionBlockResponse } from "@mysten/sui/client";

interface TransactionWithLinks {
  transaction: SuiTransactionBlockResponse;
  links: ZkSendLink[];
}

interface PageData {
  data: TransactionWithLinks[];
  nextCursor: string | null | undefined;
  hasNextPage: boolean;
}

export function OwnedObjects() {
  const account = useCurrentAccount();
  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction();
  const client = useSuiClient();
  const {
    data,
    isPending,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PageData>({
    queryKey: ["getLinks", account?.address],
    enabled: !!account,
    queryFn: async ({ pageParam }) => {
      const result = await getSentTransactionsWithLinks({
        address: account?.address as string,
        cursor: pageParam as string | undefined,
      });
      return result;
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
    initialPageParam: undefined,
  });

  if (!account) {
    return null;
  }

  if (error) {
    return <Flex>Error: {error.message}</Flex>;
  }

  if (isPending || !data) {
    return <Flex>Loading...</Flex>;
  }

  const allTransactions = data.pages.flatMap((page) => page.data);

  return (
    <Flex direction="column" my="2">
      <ul>
        {allTransactions.map(({ transaction, links }) => (
          <li key={transaction.digest}>
            <Flex>
              <Container>
                <Heading size="4">{transaction.digest}</Heading>
                {links.length ? (
                  <Flex direction="row">
                    {links.map((link, index) => (
                      <Button
                        key={`${transaction.digest}-${index}`}
                        disabled={link.claimed !== false}
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
                        {link.claimed === false
                          ? `Claim Link with ${Object.keys(link.assets?.coins ?? {}).length} coins and ${Object.keys(link.assets?.nfts ?? {}).length} objects`
                          : "Link already claimed"}
                      </Button>
                    ))}
                  </Flex>
                ) : (
                  <Text>No links created by this transaction</Text>
                )}
              </Container>
            </Flex>
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          mt="4"
        >
          {isFetchingNextPage ? "Loading..." : "Load More Transactions"}
        </Button>
      )}
    </Flex>
  );
}
