import React, { useContext } from 'react';
import { IconButton, Popover } from '@material-ui/core'
import { settingsContext } from '../../Contexts/SettingsContext';
import { teamListContext } from '../../Contexts/TeamListContext';
import { appStatsContext } from '../../Contexts/AppStatsContext';
import SettingsIcon from '@material-ui/icons/Settings';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { SettingsPanel } from '../SettingsPanel/SettingsPanel';

export const SettingsButton = () => {


  const teamList = useContext(teamListContext); 
  const appStats = useContext(appStatsContext); 

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;



  return (
    <>
      <IconButton
        onClick={handleClick}
      >
			  <VisibilityIcon style={{color: '#FFF'}} />
		  </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <SettingsPanel />
      </Popover>
    </>
  );
}
