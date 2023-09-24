import { useState, useEffect } from 'react';
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
  MenuItem,
  styled,
  useTheme,
  Select
} from '@mui/material';
import { formatDistance } from 'date-fns';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Text from 'src/components/Text';

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
  const [sortSentiment, setSortSentiment] = useState('all');
  const [sortFact, setSortFact] = useState('all');

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
      if (filter.type === 'language') {
        filteredArticles = filteredArticles.filter((article) =>
          article[filter.type]
            .toLowerCase()
            .includes(filter.value.toLowerCase())
        );
      }
    });

    if (sortSentiment !== 'all') {
      filteredArticles = filteredArticles.filter(
        (article) => article.sentiment.toLowerCase() === sortSentiment
      );
    }

    if (sortFact !== 'all') {
      filteredArticles = filteredArticles.filter(
        (article) => article.fact === sortFact
      );
    }

    return filteredArticles;
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

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
          placeholder="Enter language here..."
          value={searchTerm}
          onChange={handleSearchChange}
          endAdornment={
            <InputAdornment position="end">
              <Button
                variant="contained"
                size="small"
                onClick={() => addFilter('language', searchTerm)}
              >
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
          <Typography variant="subtitle2" sx={{ pr: 1 }}>
            Sort by:
          </Typography>
          <div style={{ marginRight: '20px' }}>
            <Select
              value={sortSentiment}
              onChange={(e) => setSortSentiment(e.target.value)}
            >
              <MenuItem value="all">All Sentiments</MenuItem>
              <MenuItem value="positive">Positive Sentiments</MenuItem>
              <MenuItem value="neutral">Neutral Sentiments</MenuItem>
              <MenuItem value="negative">Negative Sentiments</MenuItem>
            </Select>
          </div>
          <div>
            <Select
              value={sortFact}
              onChange={(e) => setSortFact(e.target.value)}
            >
              <MenuItem value="all">All Facts</MenuItem>
              <MenuItem value="TRUE">True Facts</MenuItem>
              <MenuItem value="FAKE">Fake Facts</MenuItem>
            </Select>
          </div>
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
                  label={
                    article.sentiment.charAt(0).toUpperCase() +
                    article.sentiment.slice(1)
                  }
                />
                <Chip
                  sx={{
                    mr: 0.5
                  }}
                  size="small"
                  label={
                    article.fact.charAt(0) + article.fact.slice(1).toLowerCase()
                  }
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
