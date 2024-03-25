import SuccessandErrorModals from "../../../views/admin/SuccessandErorrModals/SuccessandErrorModals";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/New Project.png";
import logo from "assets/img/logo.svg"
import vector from "assets/img/Group 39467.svg"
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import Footer from "components/footer/FooterAuth"
import axios from "axios";
import { useHistory } from 'react-router-dom';

function SignIn() {

  const history = useHistory();
  const [showSignUpForm, setShowSignUpForm] = React.useState(false);
  const [showSignInForm, setShowSignInForm] = React.useState(true);


  //sign up form
  const [signUpEnail, setSignUpEmail] = useState("")
  const [signUpName, setSignUpName] = useState("")
  const [signUpPassword, setSignUpPasswors] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")


  //success register
  const [showRegisterSuccessModal, setShowRegisterSuccessModal] = useState(false)
  //error register
  const [showerrorRegisterModal, setShowErrorRegisterModal] = useState(false)
  const [errorRegisterMsg, setErrorRegisterMsg] = useState("")


  // login
  //success
  const [showLoginSuccessModal,setShowLoginSuccessModal] = useState(false)
  //error
  const [showerrorLoginModal,setShowerrorLoginModal] = useState(false)
  const [errorLoginMsg,setErrorLoginMsg] = useState("")



  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );

  // Function to toggle between login and signup forms
  const toggleSignInForm = () => {
    setShowSignInForm(true);
    setShowSignUpForm(false);
  };

  const toggleSignUpForm = () => {
    setShowSignInForm(false);
    setShowSignUpForm(true);
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <DefaultAuth illustrationBackground={illustration}>
      
      
      
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='76%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "6vh" }}
        flexDirection='column'>

        {showSignInForm && (
          <>
            <Box me='auto'>
              <Heading color={textColor} fontSize='36px' mb='10px'>
                Sign In
              </Heading>
              <Text
                mb='36px'
                ms='4px'
                color={textColorSecondary}
                fontWeight='400'
                fontSize='md'>
                Enter your email and password to sign in!
              </Text>
            </Box>
            <Flex
              zIndex='2'
              direction='column'
              w={{ base: "100%", md: "420px" }}
              maxW='100%'
              background='transparent'
              borderRadius='15px'
              mx={{ base: "auto", lg: "unset" }}
              me='auto'
              mb={{ base: "20px", md: "auto" }}>
              <Button
                fontSize='sm'
                me='0px'
                mb='26px'
                py='15px'
                h='50px'
                borderRadius='16px'
                bg={googleBg}
                color={googleText}
                fontWeight='500'
                _hover={googleHover}
                _active={googleActive}
                _focus={googleActive}>
                <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
                Sign in with Google
              </Button>
              <Flex align='center' mb='25px'>
                <HSeparator />
                <Text color='gray.400' mx='14px'>
                  or
                </Text>
                <HSeparator />
              </Flex>
              <FormControl>
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  Email<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  // isRequired={true}
                  // variant='auth'
                  // id="logemail"
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='email'
                  placeholder='mail@simmmple.com'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  onChange={(e) => {
                    console.log(e.target.value)
                    setLoginEmail(e.target.value)
                  }}
                />
                <FormLabel
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  display='flex'>
                  Password<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size='md'>
                  <Input
                    // isRequired={true}
                    // id="logpass"
                    fontSize='sm'
                    placeholder='Min. 8 characters'
                    mb='24px'
                    size='lg'
                    type={show ? "text" : "password"}
                    onChange={(e) => {
                      console.log(e.target.value)
                      setLoginPassword(e.target.value)
                    }}
                  // variant='auth'
                  />
                  <InputRightElement display='flex' alignItems='center' mt='4px'>
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <Flex justifyContent='space-between' align='center' mb='24px'>
                  <FormControl display='flex' alignItems='center'>
                    <Checkbox
                      id='remember-login'
                      colorScheme='brandScheme'
                      me='10px'
                    />
                    <FormLabel
                      htmlFor='remember-login'
                      mb='0'
                      fontWeight='normal'
                      color={textColor}
                      fontSize='sm'>
                      Keep me logged in
                    </FormLabel>
                  </FormControl>
                  <NavLink to='/auth/forgot-password'>
                    <Text
                      color={textColorBrand}
                      fontSize='sm'
                      w='124px'
                      fontWeight='500'>
                      Forgot password?
                    </Text>
                  </NavLink>
                </Flex>
                <Button
                  fontSize='sm'
                  variant='brand'
                  fontWeight='500'
                  w='100%'
                  h='50'
                  mb='24px'
                  onClick={() => {
                    axios.post("http://localhost:5000/admin/login", {
                      email: loginEmail,
                      password: loginPassword
                    }).then((res) => {
                      if (res.data.status === 200) {
                        console.log(res.data.data)
                        setShowLoginSuccessModal(true)
                        localStorage.setItem("admin", JSON.stringify(res.data.data._id));
                        setTimeout(()=>{
                          setShowLoginSuccessModal(false)
                          history.push("/admin/default");
                        },3000)
                      } else if(res.data.status === 400) {
                        setErrorLoginMsg(res.data.message)
                        setShowerrorLoginModal(true)
                        setTimeout(()=>{
                          setShowerrorLoginModal(false)
                        },3000)
                      }
                    })
                  }}>
                  Sign In
                </Button>
              </FormControl>
              <Flex
                flexDirection='column'
                justifyContent='center'
                alignItems='start'
                maxW='100%'
                mt='0px'>
                <Box mt="20px">
                  {showSignInForm ? (
                    <Text
                      color={textColorDetails}
                      fontWeight="400"
                      fontSize="14px"
                      cursor="pointer"
                    >
                      Not registered yet?{" "}
                      <Text
                        color={textColorBrand}
                        onClick={toggleSignUpForm}
                        cursor="pointer"
                        as="span"
                        fontWeight="500"
                      >
                        Create an Account
                      </Text>
                    </Text>
                  ) : (
                    <Text
                      color={textColorDetails}
                      fontWeight="400"
                      fontSize="14px"
                      cursor="pointer"
                    >
                      Already have an account?{" "}
                      <Text
                        color={textColorBrand}
                        onClick={toggleSignInForm}
                        cursor="pointer"
                        as="span"
                        fontWeight="500"
                      >
                        Sign In
                      </Text>
                    </Text>
                  )}
                </Box>
              </Flex>
            </Flex>
          </>
        )}

        {/*********Sign Up form*********/}
        {
          showRegisterSuccessModal &&
        <SuccessandErrorModals success={true} message={"You Register Successfully"} />
        }
        {
          showLoginSuccessModal &&
        <SuccessandErrorModals success={true} message={"Welcome Back"} />
        }
        {
          showerrorRegisterModal &&
        <SuccessandErrorModals success={false} message={errorRegisterMsg} />
        }
        {
          showerrorLoginModal &&
        <SuccessandErrorModals success={false} message={errorLoginMsg} />
        }
        {showSignUpForm && (
          <>
            <Box position="absolute" top="50px">
              <Heading color={textColor} fontSize='36px' mb='10px'>
                Sign Up
              </Heading>
              <Text
                mb='36px'
                ms='4px'
                color={textColorSecondary}
                fontWeight='400'
                fontSize='md'>
                Enter your information to sign up!
              </Text>
            </Box>
            <Box
              position="absolute"
              top="23%"
              left={showSignUpForm ? "176px" : "0"}
              transition="left 0.3s ease-in-out"
              w="100%"
              zIndex="1"
            >
              <Flex
                zIndex='2'
                direction='column'
                w={{ base: "100%", md: "420px" }}
                maxW='100%'
                background='transparent'
                borderRadius='15px'
                mx={{ base: "auto", lg: "unset" }}
                me='auto'
                mb={{ base: "20px", md: "auto" }}>
                <Button
                  fontSize='sm'
                  me='0px'
                  mb='26px'
                  py='15px'
                  h='50px'
                  borderRadius='16px'
                  bg={googleBg}
                  color={googleText}
                  fontWeight='500'
                  _hover={googleHover}
                  _active={googleActive}
                  _focus={googleActive}>
                  <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
                  Sign Up with Google
                </Button>
                <Flex align='center' mb='25px'>
                  <HSeparator />
                  <Text color='gray.400' mx='14px'>
                    or
                  </Text>
                  <HSeparator />
                </Flex>
                <FormControl>
                  <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    Name<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    // isRequired={true}
                    // variant='auth'
                    // id="name"
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='text'
                    placeholder='Enter Your Name'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                    onChange={(e) => {
                      console.log(e.target.value)
                      setSignUpName(e.target.value)
                    }}
                  />

                  <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    Email<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    // isRequired={true}
                    // variant='auth'
                    // id="email"
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='email'
                    placeholder='mail@simmmple.com'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                    onChange={(e) => {
                      console.log(e.target.value)
                      setSignUpEmail(e.target.value)
                    }}
                  />
                  <FormLabel
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    display='flex'>
                    Password<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <InputGroup size='md'>
                    <Input
                      // isRequired={true}
                      // id="password"
                      fontSize='sm'
                      placeholder='Min. 8 characters'
                      mb='24px'
                      size='lg'
                      type={show ? "text" : "password"}
                      onChange={(e) => {
                        console.log(e.target.value)
                        setSignUpPasswors(e.target.value)
                      }}
                    // variant='auth'
                    />
                    <InputRightElement display='flex' alignItems='center' mt='4px'>
                      <Icon
                        color={textColorSecondary}
                        _hover={{ cursor: "pointer" }}
                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                        onClick={handleClick}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <Button
                    fontSize='sm'
                    variant='brand'
                    fontWeight='500'
                    w='100%'
                    h='50'
                    mb='24px'
                    onClick={() => {
                      axios.post("http://localhost:5000/admin/register", {
                        name: signUpName,
                        email: signUpEnail,
                        password: signUpPassword
                      }).then((res) => {
                        if (res.data.status === 200) {
                          console.log(res.data.data);
                          setShowRegisterSuccessModal(true)
                          setTimeout(() => {
                            setShowRegisterSuccessModal(false)
                            toggleSignInForm()
                          }, 3000)
                        }
                        else if(res.data.status === 400){
                          setErrorRegisterMsg(res.data.message)
                          setShowErrorRegisterModal(true)
                          setTimeout(()=>{
                            setShowErrorRegisterModal(false)
                          },3000)
                        }
                      })
                    }}
                  >
                    Sign Up
                  </Button>
                </FormControl>
                <Flex
                  flexDirection='column'
                  justifyContent='center'
                  alignItems='start'
                  maxW='100%'
                  mt='0px'>
                  {/* Toggle between forms */}
                  <Box mt="20px">
                    {showSignUpForm ? (
                      <Text
                        color={textColorDetails}
                        fontWeight="400"
                        fontSize="14px"
                        cursor="pointer"
                        onClick={toggleSignInForm}
                      >
                        Already have an account?{" "}
                        <Text
                          color={textColorBrand}
                          onClick={toggleSignInForm}
                          cursor="pointer"
                          as="span"
                          fontWeight="500"
                        >
                          Sign In
                        </Text>
                      </Text>
                    ) : (
                      <Text
                        color={textColorDetails}
                        fontWeight="400"
                        fontSize="14px"
                        cursor="pointer"
                        onClick={toggleSignUpForm}
                      >
                        Not registered yet?{" "}
                        <Text
                          color={textColorBrand}
                          onClick={toggleSignUpForm}
                          cursor="pointer"
                          as="span"
                          fontWeight="500"
                        >
                          Create an Account
                        </Text>
                      </Text>
                    )}
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </>
        )}
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
