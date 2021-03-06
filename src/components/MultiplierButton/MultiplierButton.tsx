import React from 'react';
import { ClickAwayListener, IconButton, Tooltip } from '@material-ui/core'
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting'

import { MultiplierPanel } from './MultiplierPanel';
import { useSettingsPanelStyles } from '../SettingsButton/SettingsPanel.styles';

export const MultiplierButton = () => {
  const settingsClasses = useSettingsPanelStyles();
  
  const [open, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      {/* this div is necessary for click away listener to work */}
      <div>
        <Tooltip
          title={<MultiplierPanel />}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          open={open}
          interactive
          classes={settingsClasses}
          arrow
        >
          <IconButton onClick={handleClick}>
            <PermDataSettingIcon style={{color: '#666666'}} />
          </IconButton>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
}
