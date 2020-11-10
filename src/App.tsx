import React from 'react';
import { PlayerListContextProvider } from './Contexts/PlayerListContext'
import { TeamListContextProvider } from './Contexts/TeamListContext'
import { AppStatsContextProvider } from './Contexts/AppStatsContext'
import { SettingsContextProvider } from './Contexts/SettingsContext'
import { Grid } from '@material-ui/core';
import { AddTeamButton } from './components/AddTeamButton';
import { AllTeamsContainer } from './components/AllTeamsContainer/AllTeamsContainer';
import { useAppGridStyles } from './App.styles';
import { SettingsButton } from './components/SettingsButton/SettingsButton';
import { Visualizations } from './components/Visualizations/Visualizations';

function App() {

  const appGridClasses = useAppGridStyles();

  return (
    <AppStatsContextProvider>
      <PlayerListContextProvider>
        <TeamListContextProvider>
          <SettingsContextProvider>
            <Grid
              container
              direction='column'
              classes={appGridClasses}
            >

              {/* top 10% */}
              <Grid
                item
                md={12}
              >
                <Grid
                  container
                  direction='row'
                  style={{height: '10vh'}}
                >
                    <AddTeamButton />
                    <SettingsButton />
                    <h1 style={{color: '#FFF'}}>www.leaguemaps.com</h1>
                </Grid>
              </Grid>

              {/* bottom 90% */}
              <Grid
                item
                md={12}
              >
                <Grid
                  container
                  direction='row'
                >

                  {/* left 25% */}
                  <Grid
                    item
                    md={3}
                    style={{height: '90vh', overflowY: 'scroll'}}
                    className='sidebar-scrollbar'
                  >
                    <Grid
                      container
                      direction='column'
                     
                    >
                        <AllTeamsContainer />
                    </Grid>
                  </Grid>

                  {/* right 75% */}
                  <Grid
                    item
                    md={9}
                    style={{height: '90vh', overflowY: 'scroll'}}
                    className='visualizations-container'
                  >
                    <Grid
                      container
                      direction='column'
                     
                    >
                      <Visualizations />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </SettingsContextProvider>
        </TeamListContextProvider>
      </PlayerListContextProvider>
    </AppStatsContextProvider>
  );
}

// Did LeagueMaps help you win money in your fantasy league?
// A modest $9 donation pays to keep LeagueMaps online for another 6 months...just in time for your draft next season

// https://www.d3-graph-gallery.com/barplot.html
// https://www.apollographql.com/blog/layering-graphql-on-top-of-rest-569c915083ad/
export default App;
