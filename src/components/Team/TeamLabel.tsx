import React, {
  useState,
  useContext,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  useEffect
} from 'react';
import { maxTeamSize, isBestInCategory } from '../../Util/Util'
import { TextField, Tooltip, ClickAwayListener } from '@material-ui/core';
import { RadioButtonUncheckedRounded } from '@material-ui/icons';
import { leagueContext } from '../../Contexts/LeagueContext';
import { settingsContext } from '../../Contexts/SettingsContext';
import { CirclePicker } from 'react-color';

interface ITeamLabelProps {
  id: number;
}

export const TeamLabel = ({ id }: ITeamLabelProps): JSX.Element => {
  const { teamList, setTeamList, leagueStats, updateTeam } = useContext(leagueContext);
  const thisTeam = teamList.find(team => team.id === id)!;
  const { stats, color } = thisTeam;

  const { selectedStats } = useContext(settingsContext);
  
  const defaultDisplayName = `Team ${id}`;

  const { name = defaultDisplayName, roster } = thisTeam;
  
  const [ isEditingName, setIsEditingName ] = useState(false);
  const [ displayName, setDisplayName ] = useState(name);
  const [ isEditingColor, setIsEditingColor ] = useState(false);


  const nameEditorRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsEditingName(true);
  }

  const handleChange = ({ target }: ChangeEvent<{value: string}>) => {
    setDisplayName(target.value);
  }

  const handleKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    key === 'Enter' && nameEditorRef.current!.blur();
  }

  const handleBlur = () => {
    displayName.trim() || setDisplayName(defaultDisplayName);
    setIsEditingName(false);
  }

  useEffect(() => {
    if (isEditingName) {
      nameEditorRef.current!.select();
    } else {
      thisTeam.name = displayName.trim();
      updateTeam(thisTeam);
    }
  }, [isEditingName]);

  const label = (): JSX.Element => {
    return (
      <span
        className='label'
        onClick={handleClick}
      >
        {name}
      </span>
    )
  }

  const editColor = () => {
    setIsEditingColor(true);
  }

  const handleChangeComplete = (color: any) => {
    // console.log(color.constructor.name);
    thisTeam.color = color.hex;
    updateTeam(thisTeam);
  }

  const onClickAway = () => {
    setIsEditingColor(false)
  }

  const nameEditor = (): JSX.Element => {
    return (
      <TextField
        variant='outlined'
        value={displayName}
        autoFocus
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        inputProps={{ ref: nameEditorRef, /*maxLength: 12 */ }}
      />
    )
  }

  return (
    <div
      className='teamLabelContainer'
    >
      <span>({roster.length}{roster.length >= maxTeamSize && '*'})&nbsp;</span>
      <ClickAwayListener onClickAway={onClickAway}>
        <Tooltip
          title={
            <CirclePicker 
              color={color}
              onChangeComplete={handleChangeComplete}
            />
          }
          open={isEditingColor}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          interactive
        >
          <RadioButtonUncheckedRounded
            style={{
              backgroundColor: color,
              fill: '#fff',
              borderRadius: '20px',
              margin: '0px 6px'
            }}
            onClick={editColor}
          />
        </Tooltip>
      </ClickAwayListener>
      {/* {isEditingColor && (
        <CirclePicker 
          color={color}
          onChangeComplete={handleChangeComplete}
        />
      )} */}
      {isEditingName ? nameEditor() : label()}
    </div>
  )
}