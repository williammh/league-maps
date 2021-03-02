import React, { useContext } from 'react';
import { ClickAwayListener, IconButton, Tooltip } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { SettingsPanel } from './SettingsPanel';
import { MultiplierPanel } from './MultiplierPanel';
import { useSettingsPanelStyles } from './SettingsPanel.styles';
import { settingsContext } from '../../Contexts/SettingsContext';

export const SettingsButton = () => {
  const settingsClasses = useSettingsPanelStyles();

  const { selectedFormat } = useContext(settingsContext);
  
  const [open, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Tooltip
        title={selectedFormat === 'roto' ? <SettingsPanel /> : <MultiplierPanel />}
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
    </ClickAwayListener>
  );
}
