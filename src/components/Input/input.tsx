import React, { FC, InputHTMLAttributes, ReactElement, ChangeEvent } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Icon from '../Icon/icon'

library.add(fas)

type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  // Omit 忽略某个值
  disabled?: boolean
  /** 设置 input 大小 取值 'lg' | 'sm' */
  size?: InputSize
  /** 支持的图标 在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp
  /** input 前缀  用于配置一些固定组合 */
  prepend?: string | ReactElement
  /** input 后缀 */
  append?: string | ReactElement
  // 受控组件使用时 onChange 的 event 是 ChangeEvent<HTMLElement>，所以 e.target 没有 value 属性
  // 此时需要类型类型断言为 HTMLInputElement
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 * # Input 输入框
 * *通过键盘输入内容，是最基础的表单域的包装*
 * 
 * **支持 HTMLInput 的所有基本属性**
*/

export const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props
  // 根据属性计算不同的 className
  const cnames = classNames('viking-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })

  // 防止没传初始值时报错
  const fixControlledValue = (value:any) => {
    if(typeof value === 'undefined' || value === null){
      return ''
    }
    return value
  }
  
  // 防止 value 和 defaultValue 同时存在 （即 一个组件不能既是受控组件 又是非受控组件）
  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  return (
    // 根据属性判断是否要添加特定的节点
    <div className={cnames} style={style}>
      {prepend && <div className='viking-input-group-prepend'>{prepend}</div>}
      {icon && <div className='icon-wrapper'><Icon icon={icon} title={`title`}/></div>}
      <input
        className='viking-input-inner'
        disabled={disabled}
        {...restProps}
      />
      {append && <div className='viking-input-group-append'>{append}</div>}
    </div>
  )
}

export default Input
