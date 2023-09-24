import PropTypes from 'prop-types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const DateComponent = ({ label, name, value, onChange, sxStyles }) => {
  const handleDateChange = (newDate) => {
    const formattedDate = newDate.format('YYYY-MM-DD'); // Formato 'mm/dd/yyyy'
    onChange({ target: { name, value: formattedDate } });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        name={name}
        value={value}
        onChange={handleDateChange}
        sx={{
          '& .MuiInputBase-input': {
            color: 'white', // Color del texto de entrada
          },
          ...sxStyles, // Agrega estilos personalizados adicionales
        }}
        inputProps={{ style: { color: 'white' } }} 
        InputLabelProps={{ style: { color: 'white' } }} 
      />
    </LocalizationProvider>
  );
};

DateComponent.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string, 
  onChange: PropTypes.func.isRequired,
  sxStyles: PropTypes.object,
};

export default DateComponent;
