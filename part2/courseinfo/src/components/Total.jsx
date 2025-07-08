const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => (sum + part.exercises), 0) //Exercise 3 was already done in exercise 2

    return(
        <div>
            <p>Total of {total} exercises</p>
        </div>
    )
}

export default Total