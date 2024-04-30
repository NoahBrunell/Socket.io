'use client'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

type SocketProps = {
    on: (d: string, callback: (e: any) => void) => void;
    emit: (d: string, b:any) => void;
}

let socket:SocketProps

export default function Socket() {
    const [message, setMessage] = useState('')
    const [timerStatus, setTimerStatus] = useState(false)
    const [countdown, setCountdown] = useState(3)
    const [timer, setTimer] = useState(0)

    useEffect(() => {
        socket = io()
        socket.on('connect', () => {
            console.log('connected')
        })
        socket.on('disconnect', () => {
            console.log('disconnected')
        })
        socket.on('chat', (msg:string) => {
            setMessage(msg)
        })
    }, [])

    function handleCountdown() {
        const timerInterval = setInterval(() => {setCountdown((countdown - 1))}, 1000)
    }

    return (
        <>
        <div className='flex flex-col gap-4 items-center'>
            <input className='border' onChange={(e)=>socket.emit('chat', e.target.value)} type="text" />
            <button>Send</button>
            <h1>{message}</h1>
        </div>
        <br />
        <div className='flex flex-col gap-4 items-center'>
            <button onClick={handleCountdown}>start timer</button>
            <h1>{countdown}</h1>
            
        </div>
        </>
    )
}