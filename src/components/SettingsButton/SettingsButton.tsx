import React from 'react';
import { ClickAwayListener, IconButton, Tooltip } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { SettingsPanel } from './SettingsPanel';
import { useSettingsPanelStyles } from './SettingsPanel.styles';

export const SettingsButton = () => {
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
      <div>
        <Tooltip
          title={<SettingsPanel />}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          open={open}
          interactive
          classes={settingsClasses}
          arrow
        >
          <IconButton onClick={handleClick}>
            <VisibilityIcon style={{color: '#666666'}} />
          </IconButton>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
}
