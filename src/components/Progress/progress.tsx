import { spawn } from 'child_process'
import React, { FC } from 'react'
import { ThemeProps } from 'vikingship/dist/components/Icon/icon'
import {} from '../Icon/icon'

export interface ProgressProps {
  percent: number
  storkeHeight?: number
  showText?: boolean
  styles?: React.CSSProperties
  theme?: ThemeProps
}

const Progress: FC<ProgressProps> = (props) => {
  const { percent, storkeHeight, showText, styles, theme } = props 
  return (
    <div className='viking-progress-bar' style={styles}>
      <div className='viking-progress-bar-outer' style={{height: `${storkeHeight}px`}}>
        <div
          className={`viking-progress-bar-inner color-${theme}`}
          style={{width: `${percent}%`}}
        >
          {showText && <span className='inner-text'>{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  storkeHeight: 15,
  showText: true,
  theme: 'primary'
}

export default Progress
