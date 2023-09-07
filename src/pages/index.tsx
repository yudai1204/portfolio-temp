import { Box, Button, Flex, Text, Container, Center } from "@chakra-ui/react";
import { useState } from "react";

let interval: NodeJS.Timeout;

const generateRandomNumber = (used: number[], setCount) => {
  const random = Math.floor(Math.random() * 75 + 1);
  if (used.includes(random)) {
    generateRandomNumber(used, setCount);
  } else {
    setCount(random);
  }
};

const SButton = (props: any) => {
  const {
    setIsCount,
    isCount,
    onClick,
    usedList,
    setUsedList,
    setCount,
    count,
  } = props;
  return (
    <Button
      colorScheme={(isCount && "whatsapp") || "teal"}
      onClick={() => {
        if (isCount) {
          //count stop
          clearInterval(interval);
          const stopCount = Math.random() * 5 + 5;
          let cnt = 0;
          const inter = setInterval(() => {
            cnt++;
            generateRandomNumber(usedList, setCount);
            if (cnt > stopCount) {
              clearInterval(inter);
              setUsedList([...usedList, count]);
              onClick(false);
            }
          }, 300);
        } else {
          //count start
          onClick(true);
          interval = setInterval(() => {
            generateRandomNumber(usedList, setCount);
          }, 100);
        }
      }}
    >
      {isCount ? "ストップ！" : "スタート！"}
    </Button>
  );
};

export default function Home() {
  const [isCount, setIsCount] = useState(false);
  const [count, setCount] = useState(0);
  const [usedList, setUsedList] = useState([]);
  return (
    <Container>
      <Box>
        <Center>
          <Text
            fontSize="20vh"
            fontWeight="bold"
            color={isCount ? "#bbb" : "black"}
          >
            {count}
          </Text>
        </Center>
      </Box>
      <Center>
        <SButton
          isCount={isCount}
          count={count}
          onClick={setIsCount}
          setCount={setCount}
          usedList={usedList}
          setUsedList={setUsedList}
        />
      </Center>
      <Center>
        {usedList.length > 0 && (
          <Flex
            border="1px solid #ccc"
            p="2vh"
            maxW="80vw"
            mt="3vh"
            borderRadius="1vw"
            flexWrap="wrap"
            gap="2vh"
          >
            {usedList.map((item) => (
              <Text>{item}</Text>
            ))}
          </Flex>
        )}
      </Center>
    </Container>
  );
}
