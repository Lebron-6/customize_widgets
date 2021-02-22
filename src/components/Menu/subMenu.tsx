// 下拉菜单

import React, { useContext, useState, FunctionComponentElement } from 'react'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Icon from '../Icon/icon'

library.add(fas)

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, children ,className } = props
  const context = useContext(MenuContext)
  // context.defaultOpenSubMenus 是个 string | undefined类型  需要类型断言
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
  // 下拉菜单的显示与隐藏
  const [ menuOpen, setOpen] = useState(isOpened)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  })
  // 纵向时点击展开下拉菜单
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }
  // 横向时 鼠标移上去触发下拉菜单展开
  let timer:any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    },150)
    // 延迟150毫秒打开下拉菜单
  }
  // 纵向时鼠标点击触发
  const clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {}
  // 横向时鼠标移入触发
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {}
  const renderChildren = () => {
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        // return childElement
        // 使用 cloneElement 解决每个 index 必传的问题
        return React.cloneElement(childElement, { index: `${index}-${i}`})
      } else {
        // 报警告: 子节点必须是 MenuItem
      }
    })
    return (
      <CSSTransition
        in={menuOpen} // in 为控制动画开启关闭的“开关”
        timeout={150} // timeout 为动画执行时间
        classNames="zoom-in-top"
        appear // appear 是否第一次加载该组件时启用相应的动画渲染
        unmountOnExit // unmountOnExit 当动画效果为隐藏时，该标签会从dom树上移除
        // onEntered 入场动画结束时触发的钩子
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </CSSTransition>
      // CSSTransiton 标签包裹的div会被加上相应的动画
      // 为了解决在使用 display: none 和 display: block 时，其他动画不生效的问题
    )
  }
  return (
    <li
      key={index}
      className={classes}
      {...hoverEvents}
    >
      <div
        className="submenu-title"
        {...clickEvents}
      >
        {title}
        <Icon icon="angle-down" className="arrow-icon"/>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
