import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import {
  Typography,
  Card,
  CardHeader,
  Box,
} from '@mui/material';


function PolarArea() {
  const [languagePosts, setLanguagePosts] = useState([]);
  const [languageLabels, setLanguageLabels] = useState([]);

  useEffect(() => {
    fetch('https://vartapratikriya-api.vercel.app/articles/categories')
        .then((response) => response.json())
        .then((data) => {
          const counts = data.articles.reduce((counts, obj) => {
            const category = obj.category;
            counts[category] = (counts[category] || 0) + 1;
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
      width: 390,
      type: 'polarArea'
    },
    labels: languageLabels,
    fill: {
      opacity: 1,
    },
    stroke: {
      width: 0,
    },
    yaxis: {
      show: false
    },
    legend: {
      position: 'right'
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
    dataLabels: {
      enabled: false
    }
  }
  const chartData = languagePosts;

  return (
    <Card>
      <CardHeader title="Article counts by category" />
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
              type="polarArea"
              height={390}
            />
          </Box>
    </Card>
  );
}

export default PolarArea;
