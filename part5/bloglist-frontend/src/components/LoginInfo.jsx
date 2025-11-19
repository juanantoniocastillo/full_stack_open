const LoginInfo = ({ name, setUser }) => {

  const handleClick = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      <p>
        {name} is logged in. <button onClick={handleClick}>Log out</button>
      </p>
    </div>
  )
  
}

export default LoginInfo