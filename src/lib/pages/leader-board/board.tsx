import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";

export const Board = ({
  rows,
  game,
  user,
}: {
  game: string;
  rows: { value: string; score: number }[];
  user?: { value: string; rank: number | null; score: number | null };
}) => {
  const [isUserInList, setIsUserInList] = useState(false);
  return (
    <>
      <Heading textAlign="center" fontSize={{ base: "2xl", md: "3xl" }}>
        {game} Leader Board
      </Heading>

      <TableContainer maxW={{ base: "sm", md: "md" }} mx="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th isNumeric>Rank</Th>
              <Th>User</Th>
              <Th isNumeric>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row, index) => {
              if (row.value === user?.value && !isUserInList) {
                setIsUserInList(true);
              }
              return (
                <Tr key={row.value}>
                  <Td isNumeric>{index + 1}</Td>
                  <Td>{row.value}</Td>
                  <Td isNumeric>{row.score}</Td>
                </Tr>
              );
            })}
            {!isUserInList && user && (
              <>
                <Tr>
                  <Td isNumeric>...</Td>
                  <Td>...</Td>
                  <Td isNumeric>...</Td>
                </Tr>
                <Tr>
                  <Td isNumeric>{user.rank}</Td>
                  <Td>{user.value}</Td>
                  <Td isNumeric>{user.score}</Td>
                </Tr>
              </>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Text fontSize="xs" opacity={0.6}>
        Rank for same scoring users is not reflective of actual position
      </Text>
    </>
  );
};
