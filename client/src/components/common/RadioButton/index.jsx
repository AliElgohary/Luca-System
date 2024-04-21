import React from 'react'
import styles from './RadioButton.module.scss'

function RadioButton({ name, id, children, value, disabled }) {
  return (
    <div className={styles.radio}>
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        disabled={disabled}
      />
      <label htmlFor={id} className={styles.radioLabel}>
        {children}
      </label>
    </div>
  )
}

export default RadioButton
