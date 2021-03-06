import React, {
  useState,
  useContext,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  useEffect
} from 'react';
import { maxTeamSize } from '../../Util/Util'
import { TextField, Tooltip, ClickAwayListener } from '@material-ui/core';
import { RadioButtonUncheckedRounded } from '@material-ui/icons';
import { leagueContext } from '../../Contexts/LeagueContext';
import { CirclePicker } from 'react-color';

interface ITeamLabelProps {
  id: number;
}

export const TeamLabel = ({ id }: ITeamLabelProps): JSX.Element => {
  const { teamList, updateTeam } = useContext(leagueContext);
  const thisTeam = teamList.find(team => team.id === id)!;
  const { color } = thisTeam;

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

  const editColor = () => {
    setIsEditingColor(true);
  }

  const handleChangeComplete = (color: any) => {
    thisTeam.color = color.hex;
    updateTeam(thisTeam);
  }

  const onClickAway = () => {
    setIsEditingColor(false)
  }

  const nameEditor = (): JSX.Element => {
    return (
      <TextField
        size='small'
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
      <span className='roster-size'>({roster.length}{roster.length >= maxTeamSize && '*'})</span>
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
              margin: '0px 4px 0px 0px',
              cursor: 'pointer',
              height: 28,
              width: 28
            }}
            onClick={editColor}
          />
        </Tooltip>
      </ClickAwayListener>
      {isEditingName ? nameEditor() : <span className='label' onClick={handleClick}>{name}</span>}
    </div>
  )
}