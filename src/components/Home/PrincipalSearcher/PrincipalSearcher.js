import * as React from "react";
import Typography from "@mui/material/Typography";
import { Stack, Box, Divider, Button, CircularProgress } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme/theme";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { RegisterDepositRequestButton } from "../../Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AutocompleteSearcher } from "../../Autocomplete";

export function PrincipalSearcher() {
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);

  const handleCitiesLoaded = (loadedCities) => {
    setCities(loadedCities);
  };

  const handleSearch = async (searchCity) => {
    window.gtag("event", "principal_search_button_click", {
      method: "click",
    });

    setIsLoading(true);

    const foundCity = cities.find((city) => city.label === searchCity);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (foundCity) {
      navigate(
        `/search-deposits?city=${foundCity.cityName}&department=${foundCity.departmentName}`
      );
    } else {
      if (searchCity === "") {
        navigate(`/search-deposits`);
      } else {
        navigate(`/search-deposits?city=${searchCity}`);
      }
    }
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "40px",
          paddingBottom: "80px",
          backgroundColor: "#0B2C4D",
          color: "white",
          position: "relative",
        }}
      >
        <Box
        sx={{
          display: "block",
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#a2a2b9d6",
          zIndex: "99",
          top: 0
        }}
        onClick={(e) => e.preventDefault()}
      ></Box>
        <Typography variant="h4" sx={{ marginBottom: 6 }}>
          Comienza tu búsqueda
        </Typography>
        <Stack direction={"row"} spacing={2} width={"50%"}>
          <Box width={"80%"}>
            <AutocompleteSearcher
              setSearchedCity={setSearchCity}
              onCitiesLoaded={handleCitiesLoaded}
            />
          </Box>

          <Button
            startIcon={<SearchRoundedIcon />}
            onClick={() => handleSearch(searchCity)}
            variant="outlined"
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              border: "1px solid white",
              borderRadius: "10px",
              width: "20%",
              transition: "width 0.3s ease-in-out",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "black";
              e.currentTarget.style.width = "150px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.width = "150px";
            }}
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              <>
                <span style={{ fontSize: "1rem" }}>BUSCAR</span>
              </>
            )}
          </Button>
        </Stack>

        <Divider sx={theme.welcomePage.divider} />
        <Box>
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ y: -5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{ width: "100%" }}
          >
            <RegisterDepositRequestButton />
          </motion.div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
