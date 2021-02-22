import React, { ChangeEvent, FC, useRef, useState } from 'react'
import UploadList from './uploadList'
import axios from 'axios'

import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: File // 原文件
  response?: any
  error?: any
}

/**
 * Upload 一个文件的生命周期
 * 
 * 开始 -> 点击按钮选中文件 -> beforeUpload(file) -> onProgress(event, file) -> 
 * onChange(file) -> onSuccess(response, file) || onError(error, file)
*/

export interface UploadProps {
  action: string // 需要发送到哪个接口
  defaultFileList?: UploadFile[]
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void // 百分比
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onChange?: (file: File) => void
  onRemove?: (file: UploadFile) => void
  headers?: {[key: string]: any}
  name?: string
  data?: {[key: string]: any}
  withCredentials?: boolean
  accept?: string // 限制上传文件的类型
  multiple?: boolean // 是否多选
  drag?: boolean // 是否可支持拖拽上传
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onError,
    onProgress,
    onSuccess,
    beforeUpload,
    onChange,
    defaultFileList,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    children,
    accept,
    multiple,
    drag
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [ fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    // updateFile: 更新哪个file  updateObj：更新哪些值       Partial表示更新任何几项都可以
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }
  // 上传文件的函数
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files) // 把files转换成数组
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        // 判断是否为Promise
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
      // const formData = new FormData
      // formData.append(file.name, file)
      // axios.post(action, formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   onUploadProgress: (e) => {
      //     // 上传进度百分比
      //     let percentage = Math.round((e.loaded * 100) / e.total) || 0
      //     if (percentage < 100) {
      //       if (onProgress) {
      //         onProgress(percentage, file)
      //       }
      //     }
      //   }
      // }).then(res => {
      //     if (onSuccess) {
      //       onSuccess(res.data, file)
      //     }
      // })
    })
  }
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    // setFileList([_file, ...fileList])
    // 注意： 在多次调用的后 拿不到 fileList 最新结果 ，需要使用回调函数去更新
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    /**
      需求：
        1. 添加自定义 Header
        2. 添加 name 属性 - 代表发到后台文件参数名称
        3. 添加 data 属性 - 上传所需的额外参数
        4. 添加 input 本身的 file 约束性 - multiple，accept等

        multiple：多个文件可以被同时选中
        accept：限制上传文件的类型
    */
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        // 上传进度百分比
        let percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (percentage < 100) {
          // setFileList((prevList) => {
          //   return prevList
          //   // 拿到最新的 fileList
          // })
          updateFileList(_file, {percent: percentage, status: 'uploading'})
          // 对fileList里面进行更新
          // 注：要返回更新后新的数组，而不是直接修改fileList中的某一项去返回
          if (onProgress) {
            onProgress(percentage, file)
          }
        }
      }
    }).then(res => {
        updateFileList(_file, {status: 'success', response: res.data})
        if (onSuccess) {
          onSuccess(res.data, file)
        }
        if (onChange) {
          onChange(file)
        }
    }).catch(err => {
        updateFileList(_file, {status: 'error', error: err})
        if (onError) {
          onError(err, file)
        }
        if (onChange) {
          onChange(file)
        }
    })
  }
  return (
    <div 
      className='viking-upload-component'
    >
      <div className='viking-upload-input'
        style={{display: 'inline-block'}}
        onClick={handleClick}>
          {
            drag ? <Dragger onFile={(files) => {uploadFiles(files)}}>{children}</Dragger> : children
          }
        <input
          className='viking-file-input'
          style={{display: 'none'}}
          ref={fileInput}
          onChange={handleFileChange}
          type='file'
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList 
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}

export default Upload

/**
 * Fetch 的缺点
 * 1. 至多网络请求报错，对400 500 都当做成功的请求
 * 2. 默认不带 cookie
 * 3. 不支持 abort，不支持超时控制
 * 4. 没有办法原生检测请求的进度
*/
