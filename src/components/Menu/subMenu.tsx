import React, { FunctionComponentElement, useContext, useState } from 'react'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'

library.add(fas)

export interface SubMenuProps {
    index?: string
    title: string
    className?: string
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children }) => {
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [menuOpen, setOpen] = useState(isOpend)
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opend': menuOpen,
        'is-vertical': context.mode === 'vertical'
    })
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!menuOpen)
    }
    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 300)
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
        },
        onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
        }
    } : {}
    const renderChildren = () => {
        const subMenuClasses = classNames('viking-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childrenElement = child as FunctionComponentElement<MenuItemProps>
            if (childrenElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childrenElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error("Warning:Menu has a child which is not a MenuItem compnent")
            }
        })
        return (
            <CSSTransition
                in={menuOpen}
                timeout={300}
                classNames="zoom-in-top"
                appear
                unmountOnExit
            >
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </CSSTransition>
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