const Filter = ({setNewSearch}) => {

  const handleSearch = (e) => {
    setNewSearch(e.target.value)
  }

  return (
    <div>
      filter shown with: <input onChange={handleSearch} />
    </div>
  )

}

export default Filter;