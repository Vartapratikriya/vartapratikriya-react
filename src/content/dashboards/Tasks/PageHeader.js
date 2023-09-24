import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Box,
  alpha,
  lighten,
  Avatar,
  styled
} from '@mui/material';
import DocumentScannerTwoToneIcon from '@mui/icons-material/DocumentScannerTwoTone';

const AvatarPageTitle = styled(Avatar)(
  ({ theme }) => `
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      color: ${theme.colors.primary.main};
      margin-right: ${theme.spacing(2)};
      background: ${
        theme.palette.mode === 'dark'
          ? theme.colors.alpha.trueWhite[10]
          : theme.colors.alpha.white[50]
      };
      box-shadow: ${
        theme.palette.mode === 'dark'
          ? '0 1px 0 ' +
            alpha(lighten(theme.colors.primary.main, 0.8), 0.2) +
            ', 0px 2px 4px -3px rgba(0, 0, 0, 0.3), 0px 5px 16px -4px rgba(0, 0, 0, .5)'
          : '0px 2px 4px -3px ' +
            alpha(theme.colors.alpha.black[100], 0.4) +
            ', 0px 5px 16px -4px ' +
            alpha(theme.colors.alpha.black[100], 0.2)
      };
`
);

function PageHeader() {
  const [version, setVersion] = useState('0.0.0');
  const [crawl, setCrawl] = useState('...');


  useEffect(() => {
    fetch('https://vartapratikriya-api.vercel.app')
      .then((response) => response.json())
      .then((data) => {
        const dateTime = new Date(data["last_crawled"]);
        const year = dateTime.getFullYear();
        const month = dateTime.getMonth() + 1; 
        const day = dateTime.getDate();
        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const seconds = dateTime.getSeconds();
        const amOrPm = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;
        const formattedDate = `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}.`;
        const formattedTime = `${hours12}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${amOrPm}`;
        const formattedDateTime = `${formattedTime}, ${formattedDate}`;
        setVersion(data["vartapratikriya-api"]);
        setCrawl(formattedDateTime);
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  return (
    <Box
      display="flex"
      alignItems={{ xs: 'stretch', md: 'center' }}
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <AvatarPageTitle variant="rounded">
          <img src="https://avatars.githubusercontent.com/u/144566551?s=200&v=4" alt="#" width="64" height="64"/>
        </AvatarPageTitle>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Welcome to Vartapratikriya {version}!
          </Typography>
          <Typography variant="subtitle2">
            Last crawled on: {crawl}
          </Typography>
        </Box>
      </Box>
      <Box mt={{ xs: 3, md: 0 }}>
        <a href="https://vartapratikriya-api.vercel.app/config">
          <Button variant="contained" startIcon={<DocumentScannerTwoToneIcon />}>
            Config
          </Button>
        </a>
      </Box>
    </Box>
  );
}

export default PageHeader;
