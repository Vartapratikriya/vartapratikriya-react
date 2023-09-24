import { useState, useEffect } from 'react';
import {
  Button,
  CardHeader,
  Box,
  Grid,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  LinearProgress,
  styled,
  useTheme
} from '@mui/material';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import Text from 'src/components/Text';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import TopicTwoToneIcon from '@mui/icons-material/TopicTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';

const AvatarWrapperSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.lighter};
      color:  ${theme.colors.success.main};
`
);

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        height: 10px;
        margin: ${theme.spacing(1, 0, 2)};
        
        &.MuiLinearProgress-root {
          background-color: ${theme.colors.alpha.black[10]};
        }
        
        .MuiLinearProgress-bar {
          border-radius: ${theme.general.borderRadiusXl};
        }
`
);

function KeywordsTracking() {
  const theme = useTheme();
  const [sentiment, setSentiment] = useState({});
  const [fact, setFact] = useState({});
  useEffect(() => {
    fetch('https://vartapratikriya-api.vercel.app/articles/sentiment?filterBy=category')
        .then((response) => response.json())
        .then((data) => {
          setSentiment(data);
        })
        .catch((error) => {
          console.error('Error fetching data from API:', error);
        });
    fetch('https://vartapratikriya-api.vercel.app/articles/fact?filterBy=category')
        .then((response) => response.json())
        .then((data) => {
          setFact(data);
        })
        .catch((error) => {
          console.error('Error fetching data from API:', error);
        });
    }, []);
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3
        }}
      >
        <Typography variant="h3">Keywords Tracking</Typography>
        <Box>
          <Button size="small" variant="outlined">
            View all projects
          </Button>
        </Box>
      </Box>
      <Grid container spacing={4}>
      {Object.keys(sentiment).map((cat) => (
        <Grid key={cat} item xs={12} md={4}>
          <Box>
            <CardHeader
              sx={{
                px: 0,
                pt: 0
              }}
              avatar={
                <AvatarWrapperSuccess>
                  <TopicTwoToneIcon />
                </AvatarWrapperSuccess>
              }
              action={
                <IconButton size="small" color="primary">
                  <MoreVertTwoToneIcon />
                </IconButton>
              }
              title={cat.charAt(0).toUpperCase() + cat.slice(1)}
              titleTypographyProps={{
                variant: 'h5',
                color: 'textPrimary'
              }}
            />
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Sentiment index: {' '}
                <Text color="black">
                  <b>{sentiment[cat]?.toFixed(2)}</b>
                </Text>
              </Typography>
              <LinearProgressWrapper
                value={Math.abs(((sentiment[cat] || 0) / (Object.values(sentiment).reduce((acc, currentValue) => acc + (currentValue || 0), 0) || 1)) * 100)}
                color={sentiment[cat] < 0 ? "warning" : "primary"}
                variant="determinate"
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Fact index: {' '}
                <Text color="black">
                  <b>{fact[cat]?.toFixed(2)}</b>
                </Text>
              </Typography>
              <LinearProgressWrapper
                value={Math.abs(((fact[cat] || 0) / (Object.values(fact).reduce((acc, currentValue) => acc + (currentValue || 0), 0) || 1)) * 100)}
                color={fact[cat] < 0 ? "warning" : "primary"}
                variant="determinate"
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box>
                <Tooltip arrow title="View project calendar" placement="top">
                  <IconButton
                    size="small"
                    color="secondary"
                    sx={{
                      ml: 0.5
                    }}
                  >
                    <CalendarTodayTwoToneIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  arrow
                  title="Mark keyword as favourite"
                  placement="top"
                >
                  <IconButton
                    size="small"
                    sx={{
                      color: `${theme.colors.warning.main}`,
                      ml: 0.5
                    }}
                  >
                    <StarTwoToneIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Grid>))}
      </Grid>
    </>
  );
}

export default KeywordsTracking;
