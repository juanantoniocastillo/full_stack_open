const Notification = ({notificationInfo}) => {
    if (notificationInfo.message === null) {
        return null
    }

    const notificationStyle = {
        fontStyle: 'italic',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if (notificationInfo.error) {
        notificationStyle.color = 'red'
    } else {
        notificationStyle.color = 'green'
    }

    return (
        <div style={notificationStyle}>
            {notificationInfo.message}
        </div>
    )
}

export default Notification