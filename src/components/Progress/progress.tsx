import React, { FC } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { ThemeProps } from '../Icon/icon'

library.add(fas)

export interface ProgressProps {
    percent: number
    storkeHeight?: number
    showText?: boolean
    styles?: React.CSSProperties
    theme?: ThemeProps
}

const Progress: FC<ProgressProps> = (props) => {

    const { percent, showText, storkeHeight, styles, theme } = props

    return (
        <div className="viking-progress-bar" style={styles}>
            <div className="viking-progress-bar-outer" style={{ height: `${storkeHeight}px` }}>
                <div
                    className={`viking-progress-bar-inner color-${theme}`}
                    style={{ width: `${percent}%` }}
                >
                    {showText && <span className="inner-text">{`${percent}%`}</span>}
                </div>
            </div>
        </div>
    )
}

Progress.defaultProps = {
    storkeHeight: 15,
    showText: true,
    theme: "Primary"
}

export default Progress;