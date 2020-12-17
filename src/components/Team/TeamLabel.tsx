import React, {
  useState,
  useContext,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  useEffect
} from 'react';
import { maxTeamSize } from '../../Util/Util'
import { TextField } from '@material-ui/core';
import { teamListContext } from '../../Contexts/TeamListContext';

interface ITeamLabelProps {
  id: number;
}

export const TeamLabel = ({ id }: ITeamLabelProps): JSX.Element => {
  const { teamList, setTeamList } = useContext(teamListContext);
  const defaultDisplayName = `Team ${id}`;

  const index = teamList.findIndex(team => team.id === id);

  const { name = defaultDisplayName, roster } = teamList[index];
  
  const [ isEditing, setIsEditingName ] = useState(false);
  const [ displayName, setDisplayName ] = useState(name);

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
    if (isEditing) {
      nameEditorRef.current!.select();
    } else {
      teamList[index].name = displayName!.trim();
      setTeamList([...teamList]);
    }
  }, [isEditing]);

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
      {/* <RadioButtonUncheckedIcon
        style={{
          backgroundColor: color,
          fill: 'white',
          borderRadius: '20px',
        }}
      /> */}
      <span>({roster.length}{roster.length >= maxTeamSize && '*'})&nbsp;</span>
      {isEditing ? nameEditor() : label()}
    </div>
  )
}