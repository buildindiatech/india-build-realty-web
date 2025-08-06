import React from 'react'
import './Button.css'

const Button = ({
  children,
  variant = 'dark',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const baseClasses = 'custom-button'

  const variantClasses = {
    dark: 'dark',
    light: 'light',
    'dark-outline': 'dark-outline',
    'light-outline': 'light-outline',
  }

  const disabledClasses = disabled ? 'disabled' : ''

  const classes = [
    baseClasses,
    variantClasses[variant],
    disabledClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
