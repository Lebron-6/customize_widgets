import React from 'react'
import 'vikingship/dist/index.css'
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// 把所有的图标引入进来
// import Icon from './components/Icon/icon'
// import { library } from '@fortawesome/fontawesome-svg-core'
// library.add(fas)

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Icon icon="coffee" theme="danger" size="7x"/> */}
        <Menu
          defaultIndex='0'
          onSelect={() => {}}
        >
          <MenuItem>
            ROSE
          </MenuItem>
          <MenuItem  disabled>
            LISA
          </MenuItem>
          <MenuItem>
            JENNIE
          </MenuItem>
          <SubMenu title="LeeJiEun">
            <MenuItem>
              李至安
            </MenuItem>
            <MenuItem>
              张满月
            </MenuItem>
          </SubMenu>
          <MenuItem>
            JISOO
          </MenuItem>
        </Menu>
        <Button>Hello</Button>
        <Button disabled>Hello</Button>
        <Button btnType="primary" size="lg">PrimaryLarge</Button>
        {/* target="_blank" 表示在新窗口打开 */}
        <Button btnType="link" href="http://www.baidu.com" target="_blank">BAIDU.LINK</Button>
      </header>
    </div>
  )
}

export default App