import React from 'react'
import { configure,addDecorator,addParameters } from "@storybook/react" // 配置全局插件
import { withInfo } from '@storybook/addon-info'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import 'vikingship/dist/index.css'

library.add(fas)

const wrapperStyle:React.CSSProperties = {
  padding:'20px 40px'
}

const storyWrapper = (storyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
)

addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({info: {inline: true, header: false}})

// configure(require.context('../src', true, /\.stories\.tsx$/), module)

// const styles: React.CSSProperties = {
//     textAlign: 'center'
// }

// const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>

// addDecorator(CenterDecorator)

const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')]
  const req = require.context('../src/components', true, /\.stories\.tsx$/)
  req.keys().forEach(fname => allExports.push(req(fname)))
  return allExports
}

configure(loaderFn, module)
