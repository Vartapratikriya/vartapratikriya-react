import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const JsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #fef8d8;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
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
            component="a"
            target="_blank"
            rel="noopener"
            href="https://bloomui.com/product/tokyo-free-black-react-javascript-material-ui-admin-dashboard"
            size="large"
            variant="text"
          >
            Key Features
          </Button>
          <Grid container spacing={3} mt={5}>
            <Grid item md={6}>
              <MuiAvatar>
                <img
                  src="/static/images/logo/material-ui.svg"
                  alt="Material-UI"
                />
              </MuiAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Powered by MUI (Material-UI)</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  A simple and customizable component library to build faster,
                  beautiful, and accessible React apps.
                </Typography>
              </Typography>
            </Grid>
            <Grid item md={6}>
              <JsAvatar>
                <img
                  src="/static/images/logo/javascript.svg"
                  alt="Javascript"
                />
              </JsAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Built with Javascript</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  Tokyo Free React Admin Dashboard features a modern technology
                  stack and is built with React + Javascript.
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
