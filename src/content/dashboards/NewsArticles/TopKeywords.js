import { useRef, useState, useEffect } from 'react';
import {
  Button,
  Box,
  Menu,
  alpha,
  MenuItem,
  Typography,
  useTheme
} from '@mui/material';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import Chart from 'react-apexcharts';

function TopKeywords() {
  const theme = useTheme();

  const [keywordLabels, setkeywordLabels] = useState([]);
  const [keywordCounts, setkeywordCounts] = useState([]);

  useEffect(() => {
    fetch('https://vartapratikriya-api.vercel.app/articles/topKeywords')
        .then((response) => response.json())
        .then((data) => {
          // setkeywordLabels(Object.keys(data[0]).map(function (str) {
          //   return str.includes(' ') ? str.split(' ') : str;
          // }));
          setkeywordLabels(Object.keys(data[0]));
          setkeywordCounts(Object.values(data[0]));
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
    colors: [theme.colors.primary.main, alpha(theme.colors.primary.main, 0.5)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1
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
    labels: keywordLabels,
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
          colors: theme.palette.text.secondary,
          fontSize: '10px',
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
          return `${val} times`;
        }
      },
      theme: 'dark'
    }
  };

  const chartData = [
    {
      name: 'Appeared',
      data: keywordCounts
    }
  ];

  const periods = [
    {
      value: 'today',
      text: 'Today'
    },
    {
      value: 'yesterday',
      text: 'Yesterday'
    },
    {
      value: 'last_month',
      text: 'Last month'
    },
    {
      value: 'last_year',
      text: 'Last year'
    }
  ];

  const actionRef1 = useRef(null);
  const [openPeriod, setOpenMenuPeriod] = useState(false);
  const [period, setPeriod] = useState(periods[0].text);

  return (
    <Box>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">Top Keywords</Typography>
        <Button
          size="small"
          variant="contained"
          color="secondary"
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
        type="bar"
        height={270}
      />
    </Box>
  );
}

export default TopKeywords;
