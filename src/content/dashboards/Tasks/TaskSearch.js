import { useRef, useState, useEffect } from 'react';
import {
  Button,
  Card,
  Grid,
  Box,
  FormControl,
  CardActions,
  Typography,
  Divider,
  Link,
  OutlinedInput,
  Chip,
  Pagination,
  InputAdornment,
  Menu,
  MenuItem,
  styled,
  useTheme
} from '@mui/material';
import { formatDistance } from 'date-fns';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';

import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Text from 'src/components/Text';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import TranslateTwoToneIcon from '@mui/icons-material/TranslateTwoTone';

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
    padding-right: ${theme.spacing(0.7)}
  `
);

function TaskSearch() {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [Articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const [filters, setFilters] = useState([]);

  useEffect(() => {
    fetch('https://vartapratikriya-api-rumbleftw.vercel.app/articles/headlines')
      .then((response) => response.json())
      .then((data) => {
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
        }
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  const applyFilters = (articles) => {
    let filteredArticles = articles;

    filters.forEach((filter) => {
      filteredArticles = filteredArticles.filter((article) =>
        article[filter.type].toLowerCase().includes(filter.value.toLowerCase())
      );
    });

    return filteredArticles;
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const periods = [
    {
      value: 'popular',
      text: 'Most popular'
    },
    {
      value: 'recent',
      text: 'Recent tasks'
    },
    {
      value: 'updated',
      text: 'Latest updated tasks'
    },
    {
      value: 'oldest',
      text: 'Oldest tasks first'
    }
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const addFilter = (type, value) => {
    const newFilter = { type, value };
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (index) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  const actionRef1 = useRef(null);
  const [openPeriod, setOpenMenuPeriod] = useState(false);
  const [period, setPeriod] = useState(periods[0].text);

  const filteredArticles = applyFilters(Articles);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  return (
    <>
      <FormControl variant="outlined" fullWidth>
        <OutlinedInputWrapper
          type="text"
          placeholder="Search terms here..."
          value={searchTerm}
          onChange={handleSearchChange}
          endAdornment={
            <InputAdornment position="end">
              <Button variant="contained" size="small" onClick={() => addFilter('language', searchTerm)}>
                Add Filter
              </Button>
            </InputAdornment>
          }
          startAdornment={
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <Box
        py={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle2">
            Showing{' '}
            <Text color="black">
              <b>{filteredArticles.length} articles</b>
            </Text>
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography
            variant="subtitle2"
            sx={{
              pr: 1
            }}
          >
            Sort by:
          </Typography>
          <Button
            size="small"
            variant="outlined"
            ref={actionRef1}
            onClick={() => setOpenMenuPeriod(true)}
            endIcon={<ExpandMoreTwoToneIcon fontSize="small" />}
          >
            {period}
          </Button>
          <Menu
            disableScrollLock
            anchorEl={actionRef1.current}
            onClose={() => setOpenMenuPeriod(false)}
            open={openPeriod}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            {periods.map((_period) => (
              <MenuItem
                key={_period.value}
                onClick={() => {
                  setPeriod(_period.text);
                  setOpenMenuPeriod(false);
                }}
              >
                {_period.text}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      <Box display="flex" flexWrap="wrap" gap={1} py={1}>
        {filters.map((filter, index) => (
          <Chip
            key={index}
            label={`${filter.type}: ${filter.value}`}
            onDelete={() => removeFilter(index)}
          />
        ))}
      </Box>
      <Grid container spacing={3}>
        {currentArticles.map((article, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              variant="outlined"
              sx={{
                p: 3,
                background: `${theme.colors.alpha.black[5]}`
              }}
            >
              <Box>
                <Typography
                  display="flex"
                  alignItems="center"
                  variant="subtitle2"
                  pb={2}
                >
                  <TodayTwoToneIcon
                    sx={{
                      mr: 1
                    }}
                  />
                  {formatDistance(new Date(article.publishedAt), new Date(), {
                    addSuffix: true
                  })}
                </Typography>
              </Box>
              <Link href={article.url} variant="h3" color="text.primary">
                {article.title}
              </Link>
              <Box
                sx={{
                  py: 2
                }}
              >
                <Chip
                  sx={{
                    mr: 0.5
                  }}
                  size="small"
                  label={article.sentiment}
                />
                <Chip
                  sx={{
                    mr: 0.5
                  }}
                  size="small"
                  label={article.fact}
                />
              </Box>
              <Typography
                sx={{
                  pb: 2
                }}
                color="text.secondary"
              >
                {article.description}
              </Typography>
              <Link href={article.url}>
                <Button size="small" variant="contained">
                  View article
                </Button>
              </Link>
              <Divider
                sx={{
                  my: 2
                }}
              />
              <CardActions
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography
                  display="flex"
                  alignItems="center"
                  variant="subtitle2"
                >
                  <TranslateTwoToneIcon
                    sx={{
                      mr: 1
                    }}
                  />
                  {article.language}
                </Typography>
                <Typography variant="subtitle2">
                  {article.source.name}
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          pt: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Pagination
          showFirstButton
          showLastButton
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          size="large"
          shape="rounded"
          color="primary"
        />
      </Box>
    </>
  );
}

export default TaskSearch;
