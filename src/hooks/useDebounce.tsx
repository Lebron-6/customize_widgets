/**
 * 自定义 hooks  -> 函数防抖
*/
import React, { useState, useEffect } from 'react'

function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}

export default useDebounce