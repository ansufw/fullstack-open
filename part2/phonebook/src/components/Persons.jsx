import Delete from "./Delete"


const Persons = ({ persons, search, deletePerson }) => {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((p) => (
          <p key={p.id}>
            {p.name} {p.number} <Delete id={p.id} deletePerson={deletePerson} />
          </p>
        ))}
    </>
  )
}

export default Persons