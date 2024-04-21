import { useEffect, useRef } from 'react'
import styles from './styles.module.scss'

const CustomInput = ({ groupClass, inputClass, placeholder, roudned }) => {
  const inputRef = useRef(null)
  const groupRef = useRef(null)
  const handleFocus = () => {
    groupRef.current && groupRef.current.classList.add(styles.focus)
  }
  const handleBlur = () => {
    groupRef.current && groupRef.current.classList.remove(styles.focus)
  }
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('focus', handleFocus)
      inputRef.current.addEventListener('blur', handleBlur)
    }

    return () => {
      inputRef.current &&
        inputRef.current.removeEventListener('focus', handleFocus)
      inputRef.current &&
        inputRef.current.removeEventListener('blur', handleBlur)
    }
  }, [])

  return (
    <div
      className={`${styles.group} ${groupClass || ''} ${
        roudned ? 'rounded-2xl overflow-hidden' : ''
      }`}
      ref={groupRef}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className={`${styles.input} ${inputClass || ''}`}
      />
    </div>
  )
}

export default CustomInput
