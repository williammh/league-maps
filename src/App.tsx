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
              direction='row'
              classes={appGridClasses}
            >
              {/* left quarter */}
              <Grid
                item
                md={3}
              >
                {/** side bar */}
                <Grid
                  container
                  direction='column'
                  alignItems='center'
                  spacing={1}
                  wrap='nowrap'
                  className='sidebar-scrollbar sidebar'
                >
                  <AddTeamButton />
                  <AllTeamsContainer />
                </Grid>
              </Grid>
              
              {/** right three quarters */}
              <Grid
                item
                md={9}
              >
                {/** top bar */}
                <Grid
                  container
                  direction='row'
                  style={{
                    color: 'white',
                  }}
                >
                  <SettingsButton />
                </Grid>
                <Grid
                  container
                  direction='column'
                  alignItems='center'
                  wrap='nowrap'
                  className='visualizations-container'
                  style={{height: '90vh'}}
                >
                  <Visualizations />
                </Grid>
              </Grid>
            </Grid>
          </SettingsContextProvider>
        </TeamListContextProvider>
      </PlayerListContextProvider>
    </AppStatsContextProvider>
  );
}

// www.graphball.com
// www.ballgraph.com
// www.leaguemap.com ($2795)
// www.leaguemaps.com *
// www.cheatgraph.com
// www.fantasymap.com ($2700)
// www.chartballer.com
// www.leaguecheat.com
// www.cheatleague.com
// www.graphleague.com
// www.fantasygraphs.com
// www.cheatingfantasy.com

// LeagueMaps.com
// like cheating at fantasy
/*
 LeagueMaps is a data visualization web application for fantasy basketball
 players looking to gain an unfair advantage on the competiton

 it is built using React.js (Hooks + Context), TypeScript, D3.js and Material UI
*/
// Did LeagueMaps help you win money in your fantasy league?
// A modest $9 donation pays to keep LeagueMaps online for another 6 months...just in time for your draft next season

// https://www.d3-graph-gallery.com/barplot.html
// https://www.apollographql.com/blog/layering-graphql-on-top-of-rest-569c915083ad/
export default App;
