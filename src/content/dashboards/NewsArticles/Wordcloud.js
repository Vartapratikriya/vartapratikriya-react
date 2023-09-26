import { useState, useEffect } from 'react';
import { TagCloud } from 'react-tagcloud';
import {
  Card,
  CardContent,
  Typography,
  useTheme,
  styled
} from '@mui/material';

const RootWrapper = styled(Card)(
  ({ theme }) => `
    background: ${theme.colors.gradients.green1};
    color: ${theme.colors.alpha.white[100]};
`
);

function Wordcloud() {
  const theme = useTheme();
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch('https://vartapratikriya-api.vercel.app/articles/headlines')
        .then((response) => response.json())
        .then((data) => {
          const allWords = data.articles
          .map((item) => item.title.split(/\s+/))
          .flat();
          const wordCount = {};
          allWords.forEach((word) => {
            const lowercaseWord = word.toLowerCase();
            wordCount[lowercaseWord] = (wordCount[lowercaseWord] || 0) + 1;
          });
          const sortedWords = Object.entries(wordCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 70);

          const topWords = sortedWords.map(([value, count]) => ({ value, count }));
          setWords(topWords);
        })
          .catch((error) => {
            console.error('Error fetching data from API:', error);
          });
      }, []);
  return (
    <RootWrapper
      sx={{
        p: 2
      }}
    >
      <Typography
        variant="h3"
        sx={{
          px: 2,
          pb: 1,
          pt: 2,
          fontSize: `${theme.typography.pxToRem(23)}`,
          color: `${theme.colors.alpha.white[100]}`
        }}
      >
        Wordcloud
      </Typography>
      <CardContent >
      <TagCloud
        minSize={12}
        maxSize={35}
        tags={words}
        randomSeed={1337}
        disableRandomColor
      />
      </CardContent>
    </RootWrapper>
  );
}

export default Wordcloud;
