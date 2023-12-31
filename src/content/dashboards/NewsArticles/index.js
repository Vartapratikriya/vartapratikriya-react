import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import Footer from 'src/components/Footer';
import {
  Grid,
  Tab,
  Tabs,
  Divider,
  Container,
  Card,
  Box,
  useTheme,
  styled
} from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import TopKeywords from './TopKeywords';
import Wordcloud from './Wordcloud';
import KeywordsTracking from './KeywordsTracking';
import PieChart from './PieChart';
import PolarArea from './PolarArea';
import Language from './Language';
import Category from './Category';
import TaskSearch from './TaskSearch';

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
      padding: 0 ${theme.spacing(2)};
      position: relative;
      bottom: -1px;

      .MuiTabs-root {
        height: 44px;
        min-height: 44px;
      }

      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }

      .MuiTabs-indicator {
          min-height: 4px;
          height: 4px;
          box-shadow: none;
          bottom: -4px;
          background: none;
          border: 0;

          &:after {
            position: absolute;
            left: 50%;
            width: 28px;
            content: ' ';
            margin-left: -14px;
            background: ${theme.colors.primary.main};
            border-radius: inherit;
            height: 100%;
          }
      }

      .MuiTab-root {
          &.MuiButtonBase-root {
              height: 44px;
              min-height: 44px;
              background: ${theme.colors.alpha.white[50]};
              border: 1px solid ${theme.colors.alpha.black[10]};
              border-bottom: 0;
              position: relative;
              margin-right: ${theme.spacing(1)};
              font-size: ${theme.typography.pxToRem(14)};
              color: ${theme.colors.alpha.black[80]};
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;

              .MuiTouchRipple-root {
                opacity: .1;
              }

              &:after {
                position: absolute;
                left: 0;
                right: 0;
                width: 100%;
                bottom: 0;
                height: 1px;
                content: '';
                background: ${theme.colors.alpha.black[10]};
              }

              &:hover {
                color: ${theme.colors.alpha.black[100]};
              }
          }

          &.Mui-selected {
              color: ${theme.colors.alpha.black[100]};
              background: ${theme.colors.alpha.white[100]};
              border-bottom-color: ${theme.colors.alpha.white[100]};

              &:after {
                height: 0;
              }
          }
      }
  `
);

function DashboardTasks() {
  const theme = useTheme();

  const [currentTab, setCurrentTab] = useState('overview');

  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'articleSearch', label: 'Articles' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Helmet>
        <title>VartaPratikriya</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <TabsContainerWrapper>
          <Tabs
            onChange={handleTabsChange}
            value={currentTab}
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </TabsContainerWrapper>
        <Card variant="outlined">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={0}
          >
            {currentTab === 'overview' && (
              <>
                <Grid item xs={12}>
                  <Divider />
                  <Box
                    p={4}
                    sx={{
                      background: `${theme.colors.alpha.black[5]}`
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6} md={8}>
                        <TopKeywords />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Wordcloud />
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Box p={4}>
                    <KeywordsTracking />
                  </Box>
                  <Divider />
                </Grid>
              </>
            )}
            {currentTab === 'articleSearch' && (
              <Grid item xs={12}>
                <Box p={4}>
                  <TaskSearch />
                </Box>
              </Grid>
            )}
          </Grid>
        </Card>
      </Container>
      {currentTab === 'overview' && (
        <Container sx={{ mt: 3 }} maxWidth="lg">
          <Grid container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}>
                <Grid item xs={12} md={8}>
                  <Language />
                </Grid>
                <Grid item xs={12} md={4}>
                  <PieChart />
                <Grid/>
          </Grid>
        </Grid>
        </Container>
      )}
      {currentTab === 'overview' && (
        <Container sx={{ mt: 3 }} maxWidth="lg">
          <Grid container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}>
            <Grid item xs={14} md={5}>
              <PolarArea />
            </Grid>
            <Grid item xs={14} md={7}>
              <Category />
            <Grid/>
          </Grid>
        </Grid>
        </Container>
      )}
      <Footer />
    </>
  );
}

export default DashboardTasks;
