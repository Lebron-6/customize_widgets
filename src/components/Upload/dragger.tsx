import React, { FC, useState, DragEvent } from 'react'
import classNames from 'classnames'


export interface DraggerProps {
    onFile: (file: FileList) => void
}

export const Dragger: FC<DraggerProps> = (props) => {

    const { onFile, children } = props
    const [dragOver, setDragOver] = useState(false)
    const klass = classNames('viking-uploader-dragger', {
        'is-dragover': dragOver
    })

    const handleDrog = (e: DragEvent<HTMLElement>) => {
        e.preventDefault()
        setDragOver(false)
        onFile(e.dataTransfer.files)
    }

    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setDragOver(over)
    }

    return (
        <div
            className={klass}
            onDragOver={e => { handleDrag(e, true) }}
            onDragLeave={e => { handleDrag(e, false) }}
            onDrop={handleDrog}
        >
            {children}
        </div>
    )
}

export default Dragger
