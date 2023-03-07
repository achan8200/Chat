import React, { useState } from 'react'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { ChannelListContainer, ChannelContainer, Auth } from './components'

import 'stream-chat-react/dist/css/index.css'
import './App.css'

const cookies = new Cookies()

const apiKey = 'ctuxx9s77qmj'
const authToken = cookies.get('token')

const client = StreamChat.getInstance(apiKey)

if (authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }, authToken)
}

const App = () => {
    const [createType, setCreateType] = useState('')
    const [isCreating, setisCreating] = useState(false)
    const [isEditing, setisEditing] = useState(false)

    if (!authToken) return <Auth />

    return (
        <div className='app__wrapper'>
            <Chat client={client} theme='team light'>
                <ChannelListContainer
                    isCreating = {isCreating}
                    setisCreating = {setisCreating}
                    setCreateType = {setCreateType}
                    setisEditing = {setisEditing}
                />
                <ChannelContainer
                    isCreating = {isCreating}
                    setisCreating = {setisCreating}
                    isEditing = {isEditing}
                    setisEditing = {setisEditing}
                    createType = {createType}
                />
            </Chat>
        </div>
    )
}

export default App