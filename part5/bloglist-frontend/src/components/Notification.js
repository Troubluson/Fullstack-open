import React from 'react'
import '../index.css'

const Notification = ({ message, messageType }) => {

  if (!message) return null

  return <div className={messageType}>{message}</div>
}


export default Notification


