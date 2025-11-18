const ErrorNotification = ({ errorMessage }) => {
    if (errorMessage === null) {
        return null
    }

    const notificationStyle = {
        fontStyle: 'italic',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: 'red'
    }

    return (
        <div style={notificationStyle}>
            {errorMessage}
        </div>
    )
}

export default ErrorNotification