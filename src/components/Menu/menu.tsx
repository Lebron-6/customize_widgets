// 导航菜单组件

import React, { useState, createContext } from 'react'
// createContext 用于父组件给子组件传值
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
import { type } from 'os'

// 横向 | 纵向   布局采用 flex 弹性盒子布局
type MenuMode = 'horizontal' | 'vertical'

type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
  defaultIndex?: string // 默认选中 高亮
  className?: string // 自定义的class
  mode?: MenuMode
  style?: React.CSSProperties
  // onSelect?: (selectedIndex: number) => void
  onSelect?: SelectCallback
  defaultOpenSubMenus?: string[] // 默认展开
}

// 需要传给子组件(MenuItem)的值
interface IMenuContext {
  // index: number
  index: string
  // 下标需要使用"x-x"的字符串类型 避免使用纯number类型被占用
  onSelect?: SelectCallback
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({index: '0'}) // 下标默认传0

const Menu: React.FC<MenuProps> = (props) => {
  const { className, children, style, mode, defaultIndex, onSelect, defaultOpenSubMenus } = props
  const [ currentActive, setActive ] = useState(defaultIndex)
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })
  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  // 传给子组件的值
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect : handleClick,
    mode: mode,
    defaultOpenSubMenus: defaultOpenSubMenus
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
    // 拿到 children 上面的所有属性
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // return child
        return React.cloneElement(childElement, {index: index.toString()})
      } else {
        // 报警告 ： 子节点只能是 MenuItem
      }
    })
  }
  return (
    <ul
      className={classes}
      style={style}
    >
      <MenuContext.Provider
        value={passedContext}
      >
        { renderChildren() }
        {/* 需要判断类型  只允许添加 MenuItem子节点 否则报警告*/}
      </MenuContext.Provider>
    </ul>
    // React推出了两个遍历 children 的方法
    /**
     * React.Children.map(children, function[(thisArg)])
     * 在 children 里的每个直接子节点上调用一个函数，并将 this 设置为 thisArg。
     * 如果 children 是一个数组，它将被遍历并为数组中的每个子节点调用该函数。
     * 如果子节点为 null 或是 undefined，则此方法将返回 null 或是 undefined，而不会返回数组。
     * 如果 children 是一个 Fragment 对象，它将被视为单一子节点的情况处理，而不会被遍历
    */

    /**
     * React.Children.forEach(children, function[(thisArg)])
     * 与 React.Children.map() 类似，但它不会返回一个数组。
     * 返回 children 中的组件总数量，等同于通过 map 或 forEach 调用回调函数的次数。
     * 验证 children 是否只有一个子节点（一个 React 元素），如果有则返回它，否则此方法会抛出错误。
    */
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu
