import React from 'react'
import classes from './RadioInput.module.css'

const RadioInput = () => {
  return (
    <div className={classes.buttonContainer}>
      <label className={classes.radioLabel} htmlFor='radio1'>
        <input type='radio' name='radio' id='radio1' />
        <span className={classes.customRadio} />
        Show All
      </label>
      <label className={classes.radioLabel} htmlFor='radio2'>
        <input type='radio' name='radio' id='radio2' />
        <span className={classes.customRadio} />
        Completed
      </label>
      <label className={classes.radioLabel} htmlFor='radio3'>
        <input type='radio' name='radio' id='radio3' />
        <span className={classes.customRadio} />
        In Progress
      </label>
    </div>
  )
}

export default RadioInput
