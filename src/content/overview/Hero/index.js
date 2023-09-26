import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

function Hero() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} mx="auto">
          <LabelWrapper color="success">Version 1.0.0</LabelWrapper>
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
            VartaPratikriya
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
           Welcome to Vartapratikriya, where responsible news moderation meets innovation! Our mission is to assist governments in curbing the spread of negative news by providing a comprehensive and intelligent news moderation system that operates on a state-by-state basis. In an age of information overload, it's crucial to ensure that news dissemination is responsible and free from sensationalism.
          </TypographyH2>
          <Button
           rel="noopener"
           href="https://github.com/Vartapratikriya"
           size="large"
            variant="contained"
          >
            Github
          </Button>
          <Button
            sx={{ ml: 2 }}
            component={NavLink}
            rel="noopener"
            to="/dashboards/news-articles"
            size="large"
            variant="contained"
          >
            Dashboard
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
