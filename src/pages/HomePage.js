import React from "react";

// import ConnectWallet from "../components/ConnectWallet";
// import Companies from "../components/Companies";
// import Products from "../components/Products";
// import Influencers from "../components/Influencers";
import sectionImage from "../banner-1.svg";

// import Image from 'next/image';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
} from "theme-ui";

import "./HomePage.css"
import MainNavigation from "../components/MainNavigation";

const BANNER_DATA = {
  title: "A Creative way to grow your Exciting Business ideas",
  text: "DecAd is a new affiliate/referral marketing service that tracks user events and actions over the blockchain. We create a decentralized economy by providing a meeting point for brands and publishers where they can directly negotiate their collaboration. You can check out the meeting point or subscribe to learn about new campaigns.",

  image: sectionImage,
};

const HomePage = () => {
  const { title, text, image } = BANNER_DATA;

  return (
    <div>
    <MainNavigation />
      <Box as="section" id="banner" sx={styles.section}>
        <Container sx={styles.container}>
          <Flex sx={styles.flex}>
            <Box sx={styles.content}>
              <Heading as="h2">{title}</Heading>
              <Text className="desc" as="p">{text}</Text>
            </Box>
            <Box sx={styles.images}>
              <img src={image} width="700" height="500" alt="section image" />
            </Box>
          </Flex>
        </Container>
      </Box>
    </div>
  );
};

export default HomePage;

const styles = {
  section: {
    overflow: "hidden",
    backgroundColor: "#F9FBFD",
    pt: ["50px", null, null, null, "90px"],
    pb: ["70px", null, null, null, "100px"],
  },
  container: {
    maxWidth: ["100%", null, null, null, null, "1170px", "1280px"],
    position: "relative",
  },
  flex: {
    flexWrap: "wrap",
    gap: 0,
    textAlign: ["center", "left", null, "center", "left"],
  },
  content: {
    textAlign: ["center", "left", null, "center", "left"],
    flex: ["0 0 100%", null, null, null, "0 0 50%", "0 0 40%"],
    h2: {
      fontFamily: "Bree Serif",
      color: "#02073E",
      letterSpacing: "-1px",
      fontSize: ["28px", null, "32px", null, null, "45px", "55px"],
      lineHeight: 1.45,
      maxWidth: "546px",
      mb: "10px",
      mx: ["0", null, null, "auto"],
    },
  },
  images: {
    flex: ["0 0 100%", null, null, null, "0 0 50%", "0 0 60%"],
    position: "relative",
    left: ["auto", null, null, null, "50px", "100px"],
    mt: ["30px", null, "40px", null, "0"],
  },
};