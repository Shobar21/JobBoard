import React from 'react'

const InputFrom = ({
  htmlFor,
  labelText,
  type,
  name,
  value,
  handleChange,
  placeholder,
}) => {
  return (
    <>
      <div className='mb-3'>
        <label htmlFor={htmlFor} className='form-label'>
          {labelText}
        </label>
        <input
          type={type}
          className='form-control'
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    </>
  )
}

export default InputFrom
