function MessageBox({ message }) {
  if (!message) return null

  return (
    <span className={`error-message ${message.type}`}>
      {message.text}
    </span>
  )
}

export default MessageBox