import { Button, Flex, Input, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone(props) {
  const { content, onImagesSelect, ...rest } = props;
  const [selectedImages, setSelectedImages] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: ["image/png", "image/jpeg", "image/gif"],
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        setSelectedImages((prevSelectedImages) => [...prevSelectedImages, ...acceptedFiles]);
        onImagesSelect([...selectedImages, ...acceptedFiles]);
      }
    },
  });

  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");

  return (
    <Flex
      align="center"
      justify="center"
      bg={bg}
      border="1px dashed"
      borderColor={borderColor}
      borderRadius="16px"
      w="100%"
      h="max-content"
      minH="100%"
      cursor="pointer"
      {...getRootProps({ className: "dropzone" })}
      {...rest}
    >
      <Input variant="main" {...getInputProps()} />
      <Button variant="no-effects">{content}</Button>
    </Flex>
  );
}

export default Dropzone;
