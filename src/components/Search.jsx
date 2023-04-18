import React from 'react'
import classes from './Search.module.css'

const Search = () => {
  return (
    <div className={classes.search}>
      {/* <p>Search Todo's</p> */}
      <input type='text' placeholder="Search Todo's" />
    </div>
  )
}

export default Search
