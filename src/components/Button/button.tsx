// Button组件

import React, { FC, ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
// 使用 react-docgen-typescript-loader 插件时有一个问题
// 就是不能直接使用 React.Component 
// 需要使用 { Component } 导出才可以
import classNames from 'classnames'
import { type } from 'os'

// export enum ButtonSize {
//   Large = 'lg',
//   Small = 'sm'
// }

export type ButtonSize = 'lg' | 'sm'

// export enum ButtonType {
//   Primary = 'primary',
//   Default = 'default',
//   Danger = 'danger',
//   Link = 'link'
// }

export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps { // 此处的注释会显示在 storybook 的表格 description 中
  className?: string
  /** 设置 Button 是否禁用 */
  disabled?: boolean
  /** 设置 Button 的尺寸大小 */
  size?: ButtonSize
  /** 设置 Button 的类型 */
  btnType?: ButtonType
  children: ReactNode
  href?: string
}

// 类型别名  联合类型    React为我们提供好的 这里接收Button所有的Props
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
// 这里创建的是 a 链接的属性
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
// Partial 可将属性变为可选属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
/**
 * ## 这是一个 Button 组件
 * *此注释可以显示在storybook页面*
 * 
 * **支持 Markdown 语法**
*/

export const Button: FC<ButtonProps> = (props) => {
  // className 为用户自定义的class    ...restProps 为剩余属性
  const { btnType, className, disabled, size, children, href, ...restProps } = props

  // classNames插件 给class类名前加上 xxx-前缀
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled
  })
  if (btnType === 'link' && href) {
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

// react-docgen-typescript-loader 插件导出时 不能只有此处导出 定义函数时也需要导出
export default Button
