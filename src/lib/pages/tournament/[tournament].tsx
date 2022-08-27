import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { isAfter, isBefore } from "date-fns";
import type { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Board } from "../leader-board/board";
import { CountDownTimer } from "lib/components/countDownTimer/CountdownTimer";
import { LoyaltyBoost } from "lib/components/loyaltyBoost/LoyaltyBoost";
import { NftCard } from "lib/components/NFt/NftCard";
import { ROUTE_GAME_PAGE } from "lib/constants/routes";
import type { getServerSideProps } from "pages/tournament/[tournament]/index";

export const TournamentPage = ({
  rows,
  user,
  nfts,
  tournament,
  game,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (router.query.message) {
      toast({
        description: router.query.message,
        status: "info",
        isClosable: true,
        duration: 6000,
        id: "message",
      });
      router.replace(router.asPath.split("?")[0], undefined, { shallow: true });
    }
  }, [router, router.query.message, toast]);

  const startDate = new Date(tournament.dateStart);
  const endDate = new Date(tournament.dateEnd);
  const now = new Date();

  return (
    <Flex flexDirection="column" gap={10}>
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={{ base: 5 }}
        gap={5}
      >
        <Image
          src={tournament.imageUrl}
          alt="Tournament"
          maxW={64}
          rounded="lg"
        />
        <Heading pb={2} fontSize={{ base: "2xl", md: "4xl" }}>
          {tournament.title}
        </Heading>
        {tournament.slug === "web3sf" ? (
          <>
            <Text>
              We&apos;re doing something a little different for this event!{" "}
            </Text>
            <Text>
              The sum of everyone&apos;s score with the same NFT will determine
              the winning group.
            </Text>
            <Text>
              What do you win? The other NFT holder&apos;s buy-in scaled
              according to your score.
            </Text>
            <Text>Team scoreboard coming soon!</Text>
            <Text>Choose wisely.</Text>
          </>
        ) : (
          <Text>{tournament.description}</Text>
        )}
      </Flex>

      <Stack alignItems="center" gap={4}>
        {isBefore(startDate, now) && isAfter(endDate, now) ? (
          <Button
            px={10}
            colorScheme="orange"
            onClick={() => {
              router.push(ROUTE_GAME_PAGE(tournament.slug, game.slug));
            }}
          >
            Play Now
          </Button>
        ) : null}
        {tournament.slug === "web3sf" ? (
          <LoyaltyBoost contractAddress="0xC50Ee7a95AEcEb509f305AAff326481001A5D5b6" />
        ) : null}
        <CountDownTimer
          dateStart={tournament.dateStart}
          dateEnd={tournament.dateEnd}
        />
      </Stack>

      <Stack>
        <Heading fontSize="2xl" textAlign="center" py={4}>
          Choose Your characters
        </Heading>
        <Flex
          flexDirection={{
            base: "column",
            md: "row",
          }}
          alignItems={{ base: "center", md: "unset" }}
          flexWrap="wrap"
          gap={8}
          pb={5}
        >
          {nfts.map((nft) => {
            return (
              <NftCard
                contractAddress={nft.contractAddress}
                contractArgs={nft.contractArgs}
                imageUrl={nft.imageUrl}
                title={nft.title}
                purchaseId={nft.paperId}
                key={nft.title}
              />
            );
          })}
        </Flex>
      </Stack>

      <Board rows={rows} user={user} game={game.name} />
    </Flex>
  );
};
