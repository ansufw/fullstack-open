const Country = ({value}) => {
  return (
    <>
    <h1>{value.name.common}</h1>
    Capital {value.capital}
    <br />
    Area {value.area}
    <h2>Languages</h2>
    <ul>
    {Object.entries(value.languages).map(([code, name]) => <li key={code}>{name}</li> )}
    </ul>
    <div style={{ fontSize: '6rem' }}>
      {value.flag}
    </div>
    </>
  )
}

export default Country;