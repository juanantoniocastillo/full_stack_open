const SearchField = ({inputCountry, setInputCountry}) => {

    // Eventhandler to update inputCountry value when the input in the search field changes
    const handleInputChange = (event) => {
        setInputCountry(event.target.value)
    }

    // Component render body
    return (
        <div>
            <form>
                Find countries <input value={inputCountry} onChange={handleInputChange} />
            </form>
        </div>
    )
}

export default SearchField