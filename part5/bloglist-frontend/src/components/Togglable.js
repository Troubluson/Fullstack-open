import { useState } from 'react'

const Togglable = (props) => {
  const [contentVisible, setContentVisible] = useState(false)

  const displayButton = { display: !contentVisible ? '' : 'none' }
  const displayContent = { display: contentVisible ? '' : 'none' }
  return (
    <div>
      <div style={displayButton}>
        <button onClick={() => setContentVisible(true)}>{props.name}</button>
      </div>
      <div style={displayContent}>
        {props.children}
        <button onClick={() => setContentVisible(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default Togglable
