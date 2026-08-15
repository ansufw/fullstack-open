const Persons = ({persons, search}) => {

  return (
    <>
    {persons.filter(person => person.name.toLowerCase().includes(search)).map(person => (  
        <p>{person.name}  {person.number}</p>
    ))}
    </>
  )

}

export default Persons;