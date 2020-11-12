import React, { useState, useEffect } from 'react';
import axios from 'axios'
// import logo from './logo.svg';
// import './App.css';
import 'vikingship/dist/index.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

// import Button, { ButtonType, ButtonSize } from './components/Button/button'
// import Menu from './components/Menu/menu'
// import MenuItem from './components/Menu/menuItem'
// import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'

library.add(fas)

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* <FontAwesomeIcon icon={faCoffee} /> */}
//         <Icon icon="coffee" theme="danger" size="lg" />
//         {/* <Menu defaultIndex='0' onSelect={(index) => { alert(index) }} mode="vertical" defaultOpenSubMenus={['2']}> */}
//         <Menu defaultIndex='0' onSelect={(index) => { alert(index) }} defaultOpenSubMenus={['2']}>
//           <MenuItem>cool link1</MenuItem>
//           <MenuItem>cool link2</MenuItem>
//           <SubMenu title="dropdown">
//             <MenuItem>dropdown 1</MenuItem>
//             <MenuItem>dropdown 2</MenuItem>
//             <MenuItem>dropdown 3</MenuItem>
//           </SubMenu>
//           <MenuItem>cool link3</MenuItem>
//           {/* <li>HELLO</li> */}
//         </Menu>

//         <Button disabled>Click</Button>
//         <Button autoFocus>Click</Button>
//         <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>Click</Button>
//         <Button btnType={ButtonType.Link} href="http://www.baidu.com">BaiDu</Button>
//         {/* <img src={logo} className="App-logo" alt="logo" /> */}
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// const App: React.FC = () => {
//   const [title, setTitle] = useState('')
//   const postData = {
//     title: 'my title',
//     body: 'hello man'
//   }
//   useEffect(() => {
//     //   axios.get('https://jsonploceholder.typicode.com/posts/1', {
//     //     headers: {
//     //       'X-Requested-With': 'XMLHttpRequest'
//     //     },
//     //     responseType: 'json'
//     //   })
//     //     .then(resp => {
//     //       console.log(resp)
//     //       setTitle(resp.data.title)
//     //     })

//     // axios.post('https://jsonploceholder.typicode.com/posts',postData)
//     //   .then(resp => {
//     //     console.log(resp)
//     //     setTitle(resp.data.title)
//     //   })

//   })
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>{title}</p>
//       </header>
//     </div>
//   )
// }

const App: React.FC = () => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const uploadedFile = files[0]
      const formData = new FormData()
      formData.append(uploadedFile.name, uploadedFile)
      axios.post("https://jsonplaceholder.typicode.com/posts", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(resp => {
        console.log(resp)
      })
    }
  }
  return (
    <div className="App" style={{ marginTop: '100px', marginLeft: '100px' }}>
      <input type="file" name="myFile" onChange={handleFileChange} />
    </div>
  )
}

export default App;
