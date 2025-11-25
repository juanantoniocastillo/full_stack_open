const Notification = ({ notificationMessage }) => {
    if (notificationMessage.message === null) {
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
        color: 'green'
    }

    if (notificationMessage.error) {
        notificationStyle.color = 'red'
    }

    return (
        <div style={notificationStyle}>
            {notificationMessage.message}
        </div>
    )
}

export default Notification