// 导航菜单子组件

import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps {
  index?: string
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}
/**
 * 使用 cloneElement 解决每个 index 必传的问题
 * React.cloneElement(
 *  element,
 *  [props],
 *  [...children]
 * )
 * 以 element 元素为样板克隆并返回新的 React 元素。
 * 返回元素的 props 是将新的 props 与原始元素的 props 
 * 浅层合并后的结果。新的子元素将取代现有的子元素，
 * 而来自原始元素的 key 和 ref 将被保留。
 *
 * React.cloneElement() 几乎等同于：
 * <element.type {...element.props} {...props}>{children}</element.type>
*/

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })
  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }
  return (
    <li
      className={classes}
      style={style}
      onClick={handleClick}
    >
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
