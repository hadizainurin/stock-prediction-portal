import React from 'react'

const Button = (props) => {
  return (
    <>
        {/* in react we don't use href, instead we use link component to router its */}
        <a className={`btn ${props.class}`} href='#'>{props.text}</a>
    </>
  )
}

export default Button