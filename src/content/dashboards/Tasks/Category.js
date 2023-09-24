import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import {
  Box,
  Typography,
  useTheme,
  Card,
  CardHeader,
} from '@mui/material';

function Category() {
  const theme = useTheme();

  const [languageLabels, setlanguageLabels] = useState([]);
  const [sentiment, setSentiment] = useState([]);
  const [fact, setFact] = useState([]);
  useEffect(() => {
    fetch('https://vartapratikriya-api.vercel.app/articles/sentiment?filterBy=category')
        .then((response) => response.json())
        .then((data) => {
          setSentiment(Object.values(data).map(value => value.toFixed(2)));
          setlanguageLabels(Object.keys(data).map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()));
        })
        .catch((error) => {
          console.error('Error fetching data from API:', error);
        });
    fetch('https://vartapratikriya-api.vercel.app/articles/fact?filterBy=category')
        .then((response) => response.json())
        .then((data) => {
          setFact(Object.values(data).map(value => value.toFixed(2)));
        })
        .catch((error) => {
          console.error('Error fetching data from API:', error);
        });
    }, []);
    const chartOptions = {
      chart: {
        background: 'transparent',
        type: 'bar',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 6,
          columnWidth: '35%'
        }
      },
      colors: [theme.colors.warning.main, theme.colors.primary.main],
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
          colorStops: [],
        }
      },
      theme: {
        mode: theme.palette.mode
      },
      stroke: {
        show: true,
        width: 3,
        colors: ['transparent']
      },
      legend: {
        show: false
      },
      labels: languageLabels,
      grid: {
        strokeDashArray: 5,
        borderColor: theme.palette.divider
      },
      xaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: theme.palette.text.secondary
          }
        }
      },
      yaxis: {
        tickAmount: 6,
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: theme.palette.text.secondary
          },
          formatter: function (value) {
            return parseInt(value);
          }
        }
      },
      tooltip: {
        x: {
          show: false
        },
        marker: {
          show: false
        },
        y: {
          formatter: function (val) {
            return val;
          }
        },
        theme: 'dark'
      }
    };
  
    const chartData = [
      {
        name: 'Fact',
        data: fact
      },
      {
        name: 'Sentiment',
        data: sentiment
      }
    ];


  return (
    <Card>
      <CardHeader title="Categories" />
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
              type="area"
              height={320}
            />
          </Box>
    </Card>
  );
}

export default Category;