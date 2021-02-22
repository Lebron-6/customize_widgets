import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
// http://www.fontawesome.com.cn/

export type ThemeProps = 'Primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

/**
 * 在 Sass 中使用类似 JavaScript 中的 map 方法 遍历 css 类名
 * 
 * @each $key, $val in $theme-colors {
 *   .icon-#{$key} {
 *     color: $val;
 *   }
 * }
*/

export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps
}

const Icon: React.FC<IconProps> = (props) => {
    const { className, theme, ...restProps } = props
    // icon-primary
    const classes = classNames('viking-icon', className, {
        [`icon-${theme}`]: theme
    })
    return (
        <FontAwesomeIcon className={classes} {...restProps} />
    )
}

export default Icon
