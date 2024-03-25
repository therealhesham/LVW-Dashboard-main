// Chakra imports
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
  Textarea,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";

import {
  MdChevronLeft,
  MdChevronRight,
  MdOutlineCalendarMonth,
  MdAvTimer,
  MdOutlineAccessTime,
  MdAdd,
  MdAttachMoney,
} from "react-icons/md";
import Calendar from "react-calendar";
import { parse } from "date-fns";

// Custom components
import Card from "components/card/Card.js";
import SuccessandErrorModals from "../../SuccessandErorrModals/SuccessandErrorModals";
import React, { useState, useEffect } from "react";
// Assets
import { MdEdit, MdUpload } from "react-icons/md";
import Dropzone from "views/admin/profile/components/Dropzone";
import axios from "axios";

export default function Project(props) {
  const { title, ranking, link, image, selectRange, ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, onChange] = useState(null);
  const [time, setTime] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [arabicTourGuides, setArabicTourGuides] = useState([]);
  const [arabicCameraOperators, setArabicCameraOperators] = useState([]);
  const [arabicDirectors, setArabicDirectors] = useState([]);
  const [englishTourGuides, setEnglishTourGuides] = useState([]);
  const [englishCameraOperators, setEnglishCameraOperators] = useState([]);
  const [englishDirectors, setEnglishDirectors] = useState([]);
  const [italianTourGuides, setItalianTourGuides] = useState([]);
  const [italianCameraOperators, setItalianCameraOperators] = useState([]);
  const [italianDirectors, setItalianDirectors] = useState([]);
  const [tourType, setTourType] = useState("");

  const [allCountriesData, setAllCountriesData] = useState([]);
  const [addAddress, setAddAddress] = useState("");
  const [addCity, setAddCity] = useState("");
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [category, setCategory] = useState("");
  const [arabicGuideLocation, setArabicGuideLocation] = useState([]);
  const [arabicOperatorLocation, setArabicOperatorLocation] = useState([]);
  const [arabicDirectorLocation, setArabicDirectorLocation] = useState([]);
  const [englishGuideLocation, setEnglishGuideLocation] = useState([]);
  const [englishOperatorLocation, setEnglishOperatorLocation] = useState([]);
  const [englishDirectorLocation, setEnglishDirectorLocation] = useState([]);
  const [italianGuideLocation, setItalianGuideLocation] = useState([]);
  const [italianOperatorLocation, setItalianOperatorLocation] = useState([]);
  const [italianDirectorLocation, setItalianDirectorLocation] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => {
        setAllCountriesData(res.data);
        console.log(res.data);
        let countries = [...new Set(res.data.map((item) => item.country))];
        countries.sort();
        setCountry(countries);
        console.log(countries);
      })
      .catch((err) => console.log(err));
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    date: {},
    startTime: "",
    hours: "",
    language: [],
    tourGuide: [],
    cameraOperator: [],
    director: [],
    price: "",
    tags: [],
    instructions: [],
    images: [],
    tourType: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  function handleTimeChange(newTime) {
    setTime(newTime);
  }

  const handleDateChange = (date) => {
    // Ensure date is in UTC
    const selectedDate = date instanceof Date ? date : new Date(date);
    selectedDate.setMinutes(
      selectedDate.getMinutes() - selectedDate.getTimezoneOffset()
    );
    setFormData({ ...formData, date: selectedDate.toISOString() });
    onChange(selectedDate);
    console.log(selectedDate);
    onClose();
  };

  const [activeButtons, setActiveButtons] = useState([]);

  function handleButtonClick(language) {
    if (!activeButtons.includes(language)) {
      setActiveButtons([...activeButtons, language]);
      setFormData((prevData) => ({
        ...prevData,
        language: [...prevData.language, language],
        tourGuide: [...prevData.tourGuide, { language: language, guide: null }],
        cameraOperator: [
          ...prevData.cameraOperator,
          { language: language, operator: null },
        ],
        director: [
          ...prevData.director,
          { language: language, director: null },
        ],
      }));
    } else {
      setActiveButtons(activeButtons.filter((button) => button !== language));
      setFormData((prevData) => ({
        ...prevData,
        language: prevData.language.filter((lang) => lang !== language),
        tourGuide: prevData.tourGuide.filter(
          (guide) => guide.language !== language
        ),
        cameraOperator: prevData.cameraOperator.filter(
          (operator) => operator.language !== language
        ),
        director: prevData.director.filter(
          (director) => director.language !== language
        ),
      }));
    }
  }

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedInput = tagInput.trim();
      if (trimmedInput !== "") {
        setTags([...tags, trimmedInput]);
        setTagInput("");
      }
    }
  };

  const handleTagRemove = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };
  const handleAddInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
    console.log(instructions);
    setFormData({ ...formData, instructions: instructions });
  };
  const handleImagesSelect = (imageFiles) => {
    setFormData({ ...formData, images: imageFiles });
  };
  const handleSubmit = () => {
    // Update the formData with the tags array

    setFormData({ ...formData, tags: tags });
    const formDataToSend = new FormData();

    // Append the non-file fields to formDataToSend
    formDataToSend.append("title", formData.title);
    formDataToSend.append("desc", formData.desc);
    formDataToSend.append("date", formData.date ? formData.date : "");
    formDataToSend.append("startTime", formData.startTime);
    formDataToSend.append("hours", formData.hours);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("address", addAddress);
    formDataToSend.append("city", addCity);
    formDataToSend.append("category", category);
    formDataToSend.append("tourType", tourType);

    console.log("my start time is:", formData.startTime);
    console.log("my start time type:", typeof formData.startTime);

    // Append the language fields to formDataToSend
    formData.language.forEach((language) => {
      formDataToSend.append("language", language);
    });

    // Append the tourGuide fields to formDataToSend
    formData.tourGuide.forEach((guide) => {
      formDataToSend.append("tourGuide", JSON.stringify(guide));
    });

    // Append the cameraOperator fields to formDataToSend
    formData.cameraOperator.forEach((operator) => {
      formDataToSend.append("cameraOperator", JSON.stringify(operator));
    });

    // Append the director fields to formDataToSend
    formData.director.forEach((director) => {
      formDataToSend.append("director", JSON.stringify(director));
    });

    // Append the tags array to formDataToSend
    formData.tags.forEach((tag) => {
      formDataToSend.append("tags", tag);
    });

    // Append the instructions array to formDataToSend
    formData.instructions.forEach((instruction) => {
      formDataToSend.append("instructions", instruction);
    });

    // Append each image to formDataToSend
    formData.images.forEach((image, index) => {
      formDataToSend.append(`images`, image);
    });
    console.log(formData);
    // Now you can use formDataToSend to submit your data

    axios
      .post("http://localhost:5000/admin/addTour", formDataToSend, {})
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          setErrorMsg(res.data.message);
          setShowErrorModal(true);
          setTimeout(() => {
            setShowErrorModal(false);
          }, 3000);
        } else if (res.data.status === 400) {
          setShowSuccessModal(true);
          setTimeout(() => {
            setShowSuccessModal(false);
            window.location.reload();
          }, 3000);
        }
      });
  };
  useEffect(() => {
    axios.get("http://localhost:5000/admin/arabicTourGuides").then((res) => {
      console.log(res.data.data);
      setArabicTourGuides(res.data.data);
      console.log(arabicTourGuides);
    });
    axios
      .get("http://localhost:5000/admin/arabicCameraOperators")
      .then((res) => {
        setArabicCameraOperators(res.data.data);
      });
    axios.get("http://localhost:5000/admin/arabicDierctors").then((res) => {
      setArabicDirectors(res.data.data);
    });
    axios.get("http://localhost:5000/admin/englishTourGuides").then((res) => {
      setEnglishTourGuides(res.data.data);
    });
    axios
      .get("http://localhost:5000/admin/englishCameraOperator")
      .then((res) => {
        setEnglishCameraOperators(res.data.data);
      });
    axios.get("http://localhost:5000/admin/englishDirectors").then((res) => {
      setEnglishDirectors(res.data.data);
    });
    axios.get("http://localhost:5000/admin/italianoTourGuides").then((res) => {
      setItalianTourGuides(res.data.data);
    });
    axios
      .get("http://localhost:5000/admin/italianoCameraOperator")
      .then((res) => {
        setItalianCameraOperators(res.data.data);
      });
    axios.get("http://localhost:5000/admin/italianoDirectors").then((res) => {
      setItalianDirectors(res.data.data);
    });
  }, [formData]);

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("white", "navy.700");

  //succes modaal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  return (
    <Card bg={bg} {...rest} p="14px">
      {showErrorModal && (
        <SuccessandErrorModals success={false} message={errorMsg} />
      )}
      {showSuccessModal && (
        <SuccessandErrorModals
          success={true}
          message={"tour Added Successfully"}
        />
      )}

      <Flex align="center" direction={{ base: "column", md: "row" }}>
        <Box w={{ base: "100%", md: "60%" }} me={{ md: "36px" }}>
          <FormControl id="title">
            <FormLabel>Title</FormLabel>
            <InputGroup>
              <Input
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </InputGroup>
          </FormControl>

          <FormControl id="desc">
            <FormLabel>Description</FormLabel>
            <InputGroup>
              <Textarea
                type="text"
                resize="none"
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
              />
            </InputGroup>
          </FormControl>

          <FormControl id="date">
            <FormLabel>Add date</FormLabel>
            <InputGroup>
              <InputLeftAddon width="5rem">
                <Icon
                  as={MdOutlineCalendarMonth}
                  color={brandColor}
                  boxSize={6}
                />
              </InputLeftAddon>
              <Input
                id="date"
                onClick={onOpen}
                value={
                  value
                    ? new Date(value).toLocaleDateString("en-GB", {
                        timeZone: "Africa/Cairo",
                      })
                    : ""
                }
                placeholder="Select date"
                pr="5rem"
                onChange={(e) => {
                  const selectedDate = parse(
                    e.target.value,
                    "dd/MM/yyyy",
                    new Date()
                  );
                  handleDateChange(selectedDate);
                }}
              />
            </InputGroup>
          </FormControl>

          <FormControl id="startTime">
            <FormLabel>Start Time:</FormLabel>
            <InputGroup>
              <input
                type="time"
                id="startTime"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
              />
            </InputGroup>
          </FormControl>

          <FormControl id="hours">
            <FormLabel>Hours</FormLabel>
            <InputGroup>
              <Input
                type="number"
                placeholder="Enter Hours"
                mb="10px"
                onChange={(e) =>
                  setFormData({ ...formData, hours: e.target.value })
                }
              />
            </InputGroup>
          </FormControl>

          <FormLabel>Address:</FormLabel>

          <div style={{ display: "flex" }}>
            <FormControl id="address" style={{ marginRight: "10px" }}>
              <Select
                placeholder="Select Country"
                value={addAddress}
                onChange={(e) => {
                  setAddAddress(e.target.value);
                  const arabicTourGuidesLocation = arabicTourGuides
                    ? arabicTourGuides.filter(
                        (theArabictourGuide) =>
                          theArabictourGuide?.address === e.target.value
                      )
                    : [];
                  const arabicOperatorsLocation = arabicCameraOperators
                    ? arabicCameraOperators.filter(
                        (theArabicOperator) =>
                          theArabicOperator?.address === e.target.value
                      )
                    : [];
                  const arabicDirectorsLocation = arabicDirectors
                    ? arabicDirectors.filter(
                        (theArabicDirector) =>
                          theArabicDirector?.address === e.target.value
                      )
                    : [];
                  const englishTourGuidesLocation = englishTourGuides
                    ? englishTourGuides.filter(
                        (theEnglishtourGuide) =>
                          theEnglishtourGuide?.address === e.target.value
                      )
                    : [];
                  const englishOperatorsLocation = englishCameraOperators
                    ? englishCameraOperators.filter(
                        (theEnglishOperator) =>
                          theEnglishOperator?.address === e.target.value
                      )
                    : [];
                  const englishDirectorsLocation = englishDirectors
                    ? englishDirectors.filter(
                        (theEnglishDirector) =>
                          theEnglishDirector?.address === e.target.value
                      )
                    : [];
                  const italianTourGuidesLocation = italianTourGuides
                    ? italianTourGuides.filter(
                        (theItaliantourGuide) =>
                          theItaliantourGuide?.address === e.target.value
                      )
                    : [];
                  const italianOperatorsLocation = italianCameraOperators
                    ? italianCameraOperators.filter(
                        (theItalianOperator) =>
                          theItalianOperator?.address === e.target.value
                      )
                    : [];
                  const italianDirectorsLocation = italianDirectors
                    ? italianDirectors.filter(
                        (theItalianDirector) =>
                          theItalianDirector?.address === e.target.value
                      )
                    : [];
                  setArabicGuideLocation(arabicTourGuidesLocation);
                  setArabicOperatorLocation(arabicOperatorsLocation);
                  setArabicDirectorLocation(arabicDirectorsLocation);
                  setEnglishGuideLocation(englishTourGuidesLocation);
                  setEnglishOperatorLocation(englishOperatorsLocation);
                  setEnglishDirectorLocation(englishDirectorsLocation);
                  setItalianGuideLocation(italianTourGuidesLocation);
                  setItalianOperatorLocation(italianOperatorsLocation);
                  setItalianDirectorLocation(italianDirectorsLocation);
                }}
                mb="24px"
                name="address"
              >
                <option>Select Country</option>
                {country?.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="city">
              <Select
                placeholder="Select City"
                value={addCity}
                onChange={(e) => setAddCity(e.target.value)}
                mb="24px"
                name="city"
              >
                {addAddress !== "Select Country" &&
                  allCountriesData
                    .filter((item) => item.country === addAddress)
                    .map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
              </Select>
            </FormControl>
          </div>

          <FormControl id="address" style={{ marginRight: "10px" }}>
            <FormLabel>Add Category</FormLabel>
            <Select
              defaultValue={0}
              placeholder="Select Category"
              mb="24px"
              name="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value={"public"}>Public</option>
              <option value={"VIP"}>VIP</option>
              <option value={"free"}>FREE</option>
            </Select>
          </FormControl>

          <FormControl id="address" style={{ marginRight: "10px" }}>
            <FormLabel>Add Type</FormLabel>
            <Select
              defaultValue={0}
              placeholder="Select Type"
              mb="24px"
              name="tourType"
              onChange={(e) => {
                setTourType(e.target.value);
              }}
            >
              <option value={"education"}>Education</option>
              <option value={"tourism"}>Tourism</option>
              <option value={"shopping"}>Shopping</option>
            </Select>
          </FormControl>

          <FormControl id="language">
            <FormLabel>Choose Language:</FormLabel>
            <Button
              fontSize="sm"
              variant="brand"
              w="20%"
              h="10"
              mb="24px"
              mr="10px"
              rightIcon={<Icon as={MdAdd} color="white" boxSize={6} />}
              isActive={activeButtons.includes("Arabic")}
              onClick={() => handleButtonClick("Arabic")}
            >
              Arabic
            </Button>
            {activeButtons.includes("Arabic") && (
              <>
                {tourType != "shopping" && (
                  <Select
                    placeholder="Select tour guide"
                    mb="24px"
                    mr="10px"
                    name="tourGuideArabic"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tourGuide: [
                          ...formData.tourGuide.filter(
                            (guide) => guide.language !== "Arabic"
                          ),
                          { language: "Arabic", guide: e.target.value },
                        ],
                      })
                    }
                  >
                    {arabicGuideLocation &&
                      arabicGuideLocation.map((value, index) => {
                        return (
                          <option key={value._id} value={value._id}>
                            {value.name}
                          </option>
                        );
                      })}
                  </Select>
                )}

                <Select
                  placeholder="Select camera operator"
                  mb="24px"
                  mr="10px"
                  name="cameraOperatorArabic"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cameraOperator: [
                        ...formData.cameraOperator.filter(
                          (operator) => operator.language !== "Arabic"
                        ),
                        { language: "Arabic", operator: e.target.value },
                      ],
                    })
                  }
                >
                  {arabicOperatorLocation &&
                    arabicOperatorLocation.map((value, index) => {
                      return (
                        <option key={value._id} value={value._id}>
                          {value.name}
                        </option>
                      );
                    })}
                </Select>
                {tourType != "shopping" && (
                  <Select
                    placeholder="Select director"
                    mb="24px"
                    mr="10px"
                    name="directorArabic"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        director: [
                          ...formData.director.filter(
                            (director) => director.language !== "Arabic"
                          ),
                          { language: "Arabic", director: e.target.value },
                        ],
                      })
                    }
                  >
                    {arabicDirectorLocation &&
                      arabicDirectorLocation.map((value, index) => {
                        return (
                          <option key={value._id} value={value._id}>
                            {value.name}
                          </option>
                        );
                      })}
                  </Select>
                )}
              </>
            )}

            <Button
              fontSize="sm"
              variant="brand"
              w="20%"
              h="10"
              mb="24px"
              mr="10px"
              rightIcon={<Icon as={MdAdd} color="white" boxSize={6} />}
              isActive={activeButtons.includes("English")}
              onClick={() => handleButtonClick("English")}
            >
              English
            </Button>
            {activeButtons.includes("English") && (
              <>
                {tourType != "shopping" && (
                  <Select
                    placeholder="Select tour guide"
                    mb="24px"
                    mr="10px"
                    name="tourGuideEnglish"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tourGuide: [
                          ...formData.tourGuide.filter(
                            (guide) => guide.language !== "English"
                          ),
                          { language: "English", guide: e.target.value },
                        ],
                      })
                    }
                  >
                    {englishGuideLocation &&
                      englishGuideLocation.map((value, index) => {
                        return (
                          <option key={value._id} value={value._id}>
                            {value.name}
                          </option>
                        );
                      })}
                  </Select>
                )}

                <Select
                  placeholder="Select camera operator"
                  mb="24px"
                  mr="10px"
                  name="cameraOperatorEnglish"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cameraOperator: [
                        ...formData.cameraOperator.filter(
                          (operator) => operator.language !== "English"
                        ),
                        { language: "English", operator: e.target.value },
                      ],
                    })
                  }
                >
                  {englishOperatorLocation &&
                    englishOperatorLocation.map((value, index) => {
                      return (
                        <option key={value._id} value={value._id}>
                          {value.name}
                        </option>
                      );
                    })}
                </Select>
                {tourType != "shopping" && (
                  <Select
                    placeholder="Select director"
                    mb="24px"
                    mr="10px"
                    name="directorEnglish"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        director: [
                          ...formData.director.filter(
                            (director) => director.language !== "English"
                          ),
                          { language: "English", director: e.target.value },
                        ],
                      })
                    }
                  >
                    {englishDirectorLocation &&
                      englishDirectorLocation.map((value, index) => {
                        return (
                          <option key={value._id} value={value._id}>
                            {value.name}
                          </option>
                        );
                      })}
                  </Select>
                )}
              </>
            )}

            <Button
              fontSize="sm"
              variant="brand"
              w="20%"
              h="10"
              mb="24px"
              rightIcon={<Icon as={MdAdd} color="white" boxSize={6} />}
              isActive={activeButtons.includes("Italiano")}
              onClick={() => handleButtonClick("Italiano")}
            >
              Italiano
            </Button>
            {activeButtons.includes("Italiano") && (
              <>
                {tourType != "shopping" && (
                  <Select
                    placeholder="Select tour guide"
                    mb="24px"
                    mr="10px"
                    name="tourGuideItaliano"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tourGuide: [
                          ...formData.tourGuide.filter(
                            (guide) => guide.language !== "Italiano"
                          ),
                          { language: "Italiano", guide: e.target.value },
                        ],
                      })
                    }
                  >
                    {italianGuideLocation &&
                      italianGuideLocation.map((value, index) => {
                        return (
                          <option key={value._id} value={value._id}>
                            {value.name}
                          </option>
                        );
                      })}
                  </Select>
                )}

                <Select
                  placeholder="Select camera operator"
                  mb="24px"
                  mr="10px"
                  name="cameraOperatorItaliano"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cameraOperator: [
                        ...formData.cameraOperator.filter(
                          (operator) => operator.language !== "Italiano"
                        ),
                        { language: "Italiano", operator: e.target.value },
                      ],
                    })
                  }
                >
                  {italianOperatorLocation &&
                    italianOperatorLocation.map((value, index) => {
                      return (
                        <option key={value._id} value={value._id}>
                          {value.name}
                        </option>
                      );
                    })}
                </Select>
                {tourType != "shopping" && (
                  <Select
                    placeholder="Select director"
                    mb="24px"
                    mr="10px"
                    name="directorItaliano"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        director: [
                          ...formData.director.filter(
                            (director) => director.language !== "Italiano"
                          ),
                          { language: "Italiano", director: e.target.value },
                        ],
                      })
                    }
                  >
                    {italianDirectorLocation &&
                      italianDirectorLocation.map((value, index) => {
                        return (
                          <option key={value._id} value={value._id}>
                            {value.name}
                          </option>
                        );
                      })}
                  </Select>
                )}
              </>
            )}
          </FormControl>
          {category != "free" && (
            <FormControl id="price">
              <FormLabel>Add Price</FormLabel>
              <InputGroup>
                <InputLeftAddon width="5rem">
                  <Icon as={MdAttachMoney} color={brandColor} boxSize={6} />
                </InputLeftAddon>
                <Input
                  id="price"
                  type="number"
                  placeholder="Add Price"
                  pr="5rem"
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </InputGroup>
            </FormControl>
          )}

          <FormControl id="tags">
            <FormLabel>Tags</FormLabel>
            <InputGroup>
              <Input
                type="text"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagInputKeyDown}
                placeholder="Add tags (press Enter to add)"
              />
            </InputGroup>
          </FormControl>

          {/* Display the tags */}
          {tags.map((tag, index) => (
            <Tag
              key={index}
              variant="subtle"
              colorScheme="blue"
              mt="2"
              marginRight="10px"
            >
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => handleTagRemove(tag)} />
            </Tag>
          ))}
          <Button
            variant="brand"
            mt="40px"
            display="block"
            onClick={handleAddInstruction}
          >
            Add Instruction
          </Button>

          {/* Display the Instructions */}
          {instructions.map((instruction, index) => (
            <FormControl key={index} id={`instruction_${index}`}>
              <FormLabel>Instruction {index + 1}</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  value={instruction}
                  onChange={(e) =>
                    handleInstructionChange(index, e.target.value)
                  }
                />
              </InputGroup>
            </FormControl>
          ))}

          <Button
            variant="brand"
            mt="40px"
            display="block"
            // onClick={() => console.log(formData)}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>

        <Dropzone
          w={{ base: "100%", md: "auto" }}
          maxH={{ base: "60%", lg: "80%", "2xl": "100%" }}
          minH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          mb="20px"
          onImagesSelect={handleImagesSelect} // Pass the callback function here
          content={
            <Box>
              <Icon as={MdUpload} w="80px" h="80px" color={brandColor} />
              <Flex justify="center" mx="auto" mb="12px">
                <Text fontSize="xl" fontWeight="700" color={brandColor}>
                  Upload Files
                </Text>
              </Flex>
              <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
                PNG, JPG and GIF files are allowed
              </Text>
            </Box>
          }
        />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Select Date</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Calendar
                onChange={handleDateChange}
                value={value}
                selectRange={false}
                view={"month"}
                tileContent={<Text color="brand.500"></Text>}
                prevLabel={
                  <Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />
                }
                nextLabel={
                  <Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />
                }
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </Card>
  );
}
