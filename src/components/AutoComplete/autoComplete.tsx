import React, { FC, useState, useRef, ChangeEvent, KeyboardEvent, ReactElement, useEffect } from 'react'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import Input, { InputProps } from '../Input/input'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

library.add(fas)

interface DataSourceObject {
  value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject // 交叉类型  为了支持更多类型的数据

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions:(str: string) => DataSourceType[] | Promise<DataSourceType[]> // 筛选 支持异步操作
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement // 下拉菜单展示项
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, renderOption, value, ...restProps } = props
  const [ inputValue, setInputValue ] = useState(value as string)
  // 输入框中的值
  const [ suggestions, setSuggestions ] = useState<DataSourceType[]>([])
  // 下拉框中的值
  const [ loading, setLoading ] = useState(false)
  // 添加 loading 图标
  const [ showDropdown, setShowDropdown] = useState(false)
  // 是否展示下拉框
  const [ highlightIndex, setHihglightIndex ] = useState(-1)
  // 选中项高亮
  const triggerSearch = useRef(false)
  // 为了解决回车选中某项之后再触发一次搜索
  const componentRef = useRef<HTMLDivElement>(null)
  // 用作 点击非下拉区域时 下拉框隐藏
  const debounceValue = useDebounce(inputValue, 300)
  // 函数防抖
  useClickOutside(componentRef, () => {
    setSuggestions([]) // 点击其他区域时，下拉菜单置空
  })
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const results = fetchSuggestions(debounceValue)
      // 此处需要判断是否为异步
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        setSuggestions(results)
        setShowDropdown(true)
        if (results.length > 0) {
          setShowDropdown(true)
        }
      }
    } else {
      // setSuggestions([])
      setShowDropdown(false)
    }
    setHihglightIndex(-1)
  }, [debounceValue, fetchSuggestions])
  // 函数防抖 依赖输入的值
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
    // if (value) {
    //   const results = fetchSuggestions(value)
    //   // 此处需要判断是否为异步
    //   if (results instanceof Promise) {
    //     setLoading(true)
    //     results.then(data => {
    //       setLoading(false)
    //       setSuggestions(data)
    //     })
    //   } else {
    //     setSuggestions(results)
    //   }
    // } else {
    //   setSuggestions([])
    // }
  }
  const highlight = (index: number) => {
    if (index < 0) { // 移到第一项之后不能再向前移动
      index = 0
    }
    if (index >= suggestions.length) { // 移到最后一项之后不能再向后移动
      // setHihglightIndex(index)
      index = suggestions.length - 1
    }
    setHihglightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break // 回车键
      case 38:
        highlight(highlightIndex - 1)
        break // 向上
      case 40:
        highlight(highlightIndex + 1)
        break // 向下
      case 27:
        // setSuggestions([])
        setShowDropdown(false)
        break // Esc键
      default:
        break
    }
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value) // 1.设置输入框中的值
    setShowDropdown(false)
    // setSuggestions([]) // 2.清空下来菜单
    if (onSelect) {
      onSelect(item) // 3.触发 onSelect
    }
    triggerSearch.current = false
  }
  const renderTemplate = (item: DataSourceType) => { // 下拉菜单展示项
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    return (
      <CSSTransition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {setSuggestions([])}}
      >
        <ul className="viking-suggestion-list">
          { loading &&
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin/>
            </div>
          }
          {suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex
            })
            return (
              <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </CSSTransition>
    )
  }
  return (
    <div className='viking-auto-complete' ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {/* { loading && <Icon icon='spinner' spin/> } */}
      {/* { (suggestions.length > 0) && generateDropdown() } */}
      {/* suggestions.length > 0 时， 显示 generateDropdown */}
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete
