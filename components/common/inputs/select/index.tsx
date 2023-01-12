import {
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  SvgIcon,
} from '@mui/material';

const UnfoldMoreTwoToneIcon = () => (
  <SvgIcon>
    <svg
      width="20"
      height="20"
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5556 9.5L6.27778 6L2 9.5"
        stroke="#CCCCCC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 15.3333L6.27778 18.8333L10.5556 15.3333"
        stroke="#CCCCCC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </SvgIcon>
);

const styles = () => ({
  root: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#E0E1E2',
    },
  },
  wselect: {
    color: '#666',
  },
  wselectMenu: {
    '& .MuiPaper-root': {
      marginTop: '4px',
      marginLeft: '20px',
      minWidth: '138px !important',
      borderRadius: '6px',
      borderColor: '#E0E1E2',
      boxShadow: '0px 2px 10px 0px #00000014',
    },
    '& .MuiList-root': {
      padding: '8px',
    },
    '& .MuiButtonBase-root': {
      padding: '8px',
      borderRadius: '6px',
      color: '#666',
      '&.Mui-selected': {
        backgroundColor: '#F5F5F5',
      },
    },
  },
});

const SelectControl = styled(FormControl)(({ theme }) => ({
  backgroundColor: '#fff',
  maring: 0,
  borderRadius: '6px',
  '& .MuiInputBase-root': {
    borderRadius: '6px',
  },
  '& .MuiSelect-select': {
    padding: '10px 2px 10px 14px',
    paddingRight: '0px !important',
  },
  // Mui-focused
  '& .Mui-focused': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export interface OptionType {
  id: string;
  name: string;
}

interface WSelectType {
  name: string;
  value: string;
  width: string;
  onChange: (event: SelectChangeEvent) => void;
  options: OptionType[];
}

const WSelect = (props: WSelectType) => {
  const { name, value, onChange, options, width } = props;

  return (
    <SelectControl size="small" sx={{ width: width }}>
      <Select
        labelId={name}
        id={name}
        value={value}
        onChange={onChange}
        SelectDisplayProps={{ style: styles().wselect }}
        MenuProps={{ sx: styles().wselectMenu }}
        IconComponent={UnfoldMoreTwoToneIcon}
        // className={styles().root}
      >
        {options.map((option, index) => {
          return (
            <MenuItem value={option.id} key={index}>
              {option.name}
            </MenuItem>
          );
        })}
      </Select>
    </SelectControl>
  );
};

export default WSelect;
