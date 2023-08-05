import React, { useState } from "react";
import { Text, Select, Button, Textarea, VStack, Box } from "@chakra-ui/react";
import axios from "axios";

function App() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [debugOutput, setDebugOutput] = useState("");
  const [qualityOutput, setQualityOutput] = useState("");

  const baseURL = "https://converter-server-heel.vercel.app";

  const handleConvert = () => {
    axios
      .post(`${baseURL}/code/${language}`, { code: code })
      .then((res) => {
        setOutput(res.data);
        setDebugOutput("");
        setQualityOutput("");
      })
      .catch((error) => {
        console.error(error);
        setOutput("Error occurred while converting code.");
      });
  };

  const handleDebug = () => {
    axios
      .post(`${baseURL}/debug`, { code: code })
      .then((res) => {
        setDebugOutput(res.data);
      })
      .catch((error) => {
        console.error(error);
        setDebugOutput("Error occurred while debugging.");
      });
  };

  const handleQualityCheck = () => {
    axios
      .post(`${baseURL}/quality`, { code: code })
      .then((res) => {
        setQualityOutput(res.data);
      })
      .catch((error) => {
        console.error(error);
        setQualityOutput("Error occurred while checking quality.");
      });
  };

  return (
    <VStack
      spacing={4}
      align="center"
      p={8}
      borderRadius="md"
      bgGradient="linear(to-b, blue.200, blue.400)"
    >
      <Text fontWeight={600} fontSize="25px" color="white">
        Code Converter
      </Text>
      <Select
        w="50%"
        onChange={(event) => setLanguage(event.target.value)}
        bg="white"
        placeholder="Select code language"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
      </Select>
      <Box w="100%">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={10}
          resize="none"
          width="100%"
          bg="white"
          color="gray.800"
          borderRadius="md"
          boxShadow="sm"
          p={2}
          style={{ backgroundColor: "#f8f8f8", color: "rgb(107,70,193)" }}
        />
        <Box display={"flex"} gap={"5px"}>
          <Button
            onClick={handleConvert}
            bg="blue.500"
            color="white"
            mt={2}
            mb={2}
          >
            Convert
          </Button>
          <Button
            onClick={handleDebug}
            bg="blue.500"
            color="white"
            mt={2}
            mb={2}
          >
            Debug
          </Button>
          <Button
            onClick={handleQualityCheck}
            bg="blue.500"
            color="white"
            mt={2}
          >
            Quality Check
          </Button>
        </Box>
      </Box>
      <Box w="100%">
        <Textarea
          value={output || debugOutput || qualityOutput}
          rows={output.split("\n").length}
          readOnly
          resize="none"
          width="100%"
          bg="white"
          color="gray.800"
          borderRadius="md"
          boxShadow="sm"
          p={2}
          style={{ backgroundColor: "#f8f8f8", color: "rgb(107,70,193)" }}
        />
      </Box>
    </VStack>
  );
}

export default App;
