function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="loading-container">
      <div className="loading-spinner-enhanced">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-core">
          <span className="loading-emoji">🧠</span>
        </div>
      </div>
      <p className="loading-message gradient-text">{message}</p>
    </div>
  )
}

export default LoadingSpinner