import { Container, Divider } from "@mui/material";
import {
  Gallery,
  Description,
  Services,
} from "../../components/PublicationView";
import { Footer } from "../../components/Footer";
import React, { useEffect } from "react";
import "../../theme/PublicationView.css";

import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";
import image from "../../assets/official-images/productCurvyLines.png";

export function PublicationView() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const depositId = searchParams.get("id");

  useEffect(() => {
    document.title = "Publicación";
  }, []);

  const styles = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
  };

  return (
    <Box sx={styles}>
      <Container component="section" maxWidth={"lg"}>
        <Box className="core">
          <Gallery depositId={depositId} />
          <Description depositId={depositId} />
        </Box>
        <Divider />
        <Box className="core">
          <Services depositId={depositId} />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
