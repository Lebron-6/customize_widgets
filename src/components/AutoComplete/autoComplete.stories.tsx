import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete, DataSourceType } from './autoComplete'

// interface LakersProps {
//   name: string
//   number: number
// }

interface GithubUserProps {
  login: string
  url: string
  avatar_url: string
}

const SimpleComplete = () => {
  /**
   * 例题1：简单数据类型
  */
  // const lakers = ['詹姆斯', '戴维斯', '施罗德', '小枷锁', '波普', '库兹马', '莫里斯', '卡鲁索', '马修斯', '哈雷尔']

  /**
   * 例题2：复杂数据类型
  */
  // const lakers = [
  //   {name: '詹姆斯', number: 23},
  //   {name: '戴维斯', number: 3},
  //   {name: '施罗德', number: 17},
  //   {name: '小枷锁', number: 14},
  //   {name: '波普', number: 1},
  //   {name: '库兹马', number: 0},
  //   {name: '马修斯', number: 9},
  //   {name: '哈雷尔', number: 15},
  //   {name: '卡鲁索', number: 4}
  // ]

  // const handleFetch = (query: string) => {
  //   return lakers.filter(name => name.includes(query)).map(name => ({value: name}))
  // }

  // const handleFetch = (query: string) => {
  //   return lakers.filter(player => player.name.includes(query))
  // }

  /**
   * 例题3：异步请求
  */
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({items}) => {
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
      })
  }

  // const renderOption = (item: DataSourceType<LakersProps>) => {
  //   return (
  //     <>
  //       <span>Name: {item.name}</span>
  //       <span>No: {item.number}</span>
  //     </>
  //   )
  // }

  // const renderOption = (item: DataSourceType<GithubUserProps>) => {
  //   return (
  //     <>
  //       <div>Name: {item.login}</div>
  //       <p>URL: {item.url}</p>
  //     </>
  //   )
  // }

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      // renderOption={renderOption}
    />
  )
}

storiesOf('AutoComplete Component', module)
  .add('AutoComplete', SimpleComplete)
