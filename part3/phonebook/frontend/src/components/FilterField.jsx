const FilterField = ({filter, setFilter}) => {
    
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            Filter: <input value={filter} onChange={handleFilterChange} />
        </div>
    )
}

export default FilterField