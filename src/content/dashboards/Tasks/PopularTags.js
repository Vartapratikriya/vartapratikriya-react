import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import {
  Typography,
  Card,
  CardHeader,
  Box,
  useTheme,
} from '@mui/material';


function PopularTags() {
  const theme = useTheme();
  const [languagePosts, setLanguagePosts] = useState([]);
  const [languageLabels, setLanguageLabels] = useState([]);

  useEffect(() => {
    fetch('https://vartapratikriya-api.vercel.app/articles/headlines')
        .then((response) => response.json())
        .then((data) => {
          const counts = data.articles.reduce((counts, obj) => {
            const language = obj.language;
            counts[language] = (counts[language] || 0) + 1;
            return counts;
          }, {});
          setLanguageLabels(Object.keys(counts).map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()));
          setLanguagePosts(Object.values(counts));
        })
        .catch((error) => {
          console.error('Error fetching data from API:', error);
        });
      }, []);

  const chartOptions = {
    chart: {
      width: 380,
      type: 'pie'
    },
    labels: languageLabels,
    fill: {
      opacity: 1
    },
    stroke: {
      width: 1,
      colors: undefined
    },
    yaxis: {
      show: false
    },
    legend: {
      position: 'bottom'
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0
        },
        spokes: {
          strokeWidth: 0
        },
      }
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        color: theme.colors.primary.main,
        shadeIntensity: 0.6
      },
    },
    dataLabels: {
      enabled: false
    }
  }
  const chartData = languagePosts;

  return (
    <Card>
      <CardHeader title="Article counts by language" />
          <Box>
            <Box display="flex" alignItems="center" pb={2}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mr: 2
                }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              />
            </Box>
            <Chart
              options={chartOptions}
              series={chartData}
              type="pie"
              height={320}
            />
          </Box>
    </Card>
  );
}

export default PopularTags;
