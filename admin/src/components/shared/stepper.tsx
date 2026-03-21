import React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useTheme } from '@mui/material/styles';

const AddProductStepper = ({activeStep, steps}:{activeStep:number,steps:string[]}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <div>
      <Stepper   
      className='mt-10 ' 
        activeStep={activeStep}
        alternativeLabel={true}>
        {steps.map((label, ) => (
          <Step 
            key={label}>
            <StepLabel 
              sx={{
                '& .MuiStepLabel-label': {
                  color: isDarkMode ? 'rgba(62, 93, 178, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                  '&.Mui-active': {
                    color: isDarkMode ? '#0b5448ff' : '#000000',
                    fontWeight: 'bold',
                    textDecorationColor: isDarkMode ? '#0b5448ff' : '#fffff',
                  },
                  '&.Mui-completed': {
                    color: isDarkMode ? '#098157ff' : '#279f8bff',
                  },
                },
                '& .MuiStepIcon-root': {
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : '#2f6ad1ff',
                  '&.Mui-active': {
                    color: isDarkMode ? '#64dd17' : '#098157ff',
                  },
                  '&.Mui-completed': {
                    color: isDarkMode ? '#4caf50' : '#0b5448ff',
                  },
                },
                '& .MuiStepConnector-line': {
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : '#e0e0e0',
                },
              }}
            >{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default AddProductStepper