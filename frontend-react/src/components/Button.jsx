import React from 'react'
import { Link } from 'react-router-dom'

const Button = (props) => {
  return (
    <>
        {/* in react we don't use href, instead we use link component to router its */}
        <Link className={`btn ${props.class}`} to={props.url}>{props.text}</Link>
    </>
  )
}

export default Button