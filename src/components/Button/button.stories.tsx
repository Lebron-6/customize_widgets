import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
// import { withInfo } from '@storybook/addon-info'

import Button, { ButtonSize, ButtonType } from './button'

const defaultButton = () => (
    <Button onClick={action('clicked')}>default button</Button>
)

const buttonWithSize = () => (
    <>
        <Button size={ButtonSize.Large}>Large Button</Button>
        <Button size={ButtonSize.Small}>Small Button</Button>
    </>
)

const buttonWithType = () => (
    <>
        <Button btnType={ButtonType.Primary}>Primary Button</Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com/">Link Button</Button>
        <Button btnType={ButtonType.Danger}>Danger Button</Button>
    </>
)

storiesOf('Button Component', module)
    // .addDecorator(withInfo)
    // .addParameters({
    //     info:{
    //         text:`
    //             this is a very nice component
    //             ## this is a header
    //             ~~~js
    //             const a = 'hello'
    //             ~~~
    //         `,
    //         inline:true
    //     }
    // })
    .add('Button', defaultButton)
    // .add('不同尺寸的 Button', buttonWithSize,{
    //     info:{
    //         inline:false
    //     }
    // })
    .add('不同尺寸的 Button', buttonWithSize)
    .add('不同类型的 Button', buttonWithType)