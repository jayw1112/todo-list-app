import React, { useEffect } from 'react'
import classes from './Checkbox.module.css'

const Checkbox = ({ todoId, isChecked, setIsChecked }) => {
  useEffect(() => {
    localStorage.setItem(`checkbox-${todoId}`, JSON.stringify(isChecked))
  }, [isChecked])

  const checkHandler = () => {
    setIsChecked(!isChecked)
  }

  return (
    <label className={classes.checkLabel}>
      <input
        type='checkbox'
        className={classes.checkInput}
        onChange={checkHandler}
        checked={isChecked}
        aria-hidden='true'
      />
      <span
        className={`${classes.checkbox} ${isChecked ? classes.active : ''}`}
        aria-hidden='true'
      />
    </label>
  )
}

export default Checkbox
