import Button from './Button'

const Delete = ({id, deletePerson}) => {
    return (
    <Button text="delete" onClick={() => deletePerson(id)} />
    )
}

export default Delete;