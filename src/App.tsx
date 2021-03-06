import React from 'react';
import { AllPlayersContextProvider } from './Contexts/AllPlayersContext'
import { LeagueContextProvider } from './Contexts/LeagueContext'
import { SettingsContextProvider } from './Contexts/SettingsContext'
import { Grid } from '@material-ui/core';
import { AddTeamButton } from './components/AddTeamButton/AddTeamButton';
import { AllTeamsContainer } from './components/AllTeamsContainer/AllTeamsContainer';
import { useAppGridStyles } from './App.styles';
import { SettingsButton } from './components/SettingsButton/SettingsButton';
import { MultiplierButton } from './components/MultiplierButton/MultiplierButton';
import { Visualizations } from './components/Visualizations/Visualizations';
import { SeasonSelect } from './components/SeasonSelect/SeasonSelect';

function App() {

  const appGridClasses = useAppGridStyles();

  const spacer = { width: 6 };

  return (
    <AllPlayersContextProvider>
      <LeagueContextProvider>
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
                className='top-bar'
                alignItems='center'
                justify='space-between'
              >
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <AddTeamButton />
                    <span  style={spacer} />
                    <SettingsButton />
                    <span  style={spacer} />
                    <MultiplierButton />
                    <span  style={spacer} />
                    <SeasonSelect />
                  </div>
                  <h1>LeagueMaps.com</h1>
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
                  className='sidebar-scrollbar scrollbar-padding-top'
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
                  className='visualizations-container scrollbar-padding-top'
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
      </LeagueContextProvider>
    </AllPlayersContextProvider>
  );
}

// Did LeagueMaps help you win money in your fantasy league?
// A modest $9 donation pays to keep LeagueMaps online for another 6 months...just in time for your draft next season

// https://www.d3-graph-gallery.com/barplot.html
// https://www.apollographql.com/blog/layering-graphql-on-top-of-rest-569c915083ad/
export default App;
