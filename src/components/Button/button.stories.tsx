/**
 * 此文件用于 storybook 页面展示
 * https://storybook.js.org/
*/

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions' // 此插件可以记录组件的行为
// import { withInfo } from '@storybook/addon-info' // 用于展示组件的信息 相当于开发文档

import Button from './button'

/**
 * Decorator 装饰器插件
*/

// const styles: React.CSSProperties = {
//   textAlign: 'center'
// }

// const CenterDecorator = (storyFn: any) => <div style={styles}>{ storyFn() }</div>

const defaultButton = () => (
  <Button onClick={action('clicked')}>default button</Button>
)

const buttonWithSize = () => (
  <>
    <Button size='lg'>Large Button</Button>
    <Button size='sm'>Small Button</Button>
  </>
)

const buttonWithType = () => (
  <>
    <Button btnType='primary'>Primary Button</Button>
    <Button btnType='link' href='https://www.baidu.com/'>Link Button</Button>
    <Button btnType='danger'>Danger Button</Button>
  </>
)

storiesOf('Button Component', module)
  // .addDecorator(CenterDecorator)
  // .addDecorator(withInfo)
  // .addParameters({ // 添加配置信息
  //   info:{
  //     text:` // 展示文本 支持 Markdown 语法
  //       this is a very nice component
  //       ## this is a header
  //       ~~~js
  //       const a = 'hello' // 展示代码示例
  //       ~~~
  //     `,
  //     inline:true
  //   }
  // })
  .add('Button', defaultButton)
  // .add('不同尺寸的 Button', buttonWithSize,{
  //   info:{
  //     inline:false
  //   }
  // })
  .add('不同尺寸的 Button', buttonWithSize)
  .add('不同类型的 Button', buttonWithType)
