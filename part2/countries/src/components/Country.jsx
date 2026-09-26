import Weather from './Weather'

const Country = ({ value }) => {
  const capital = value.capital && value.capital.length > 0 ? value.capital[0] : null

  return (
    <div>
      <h1>{value.name.common}</h1>
      <div>capital {value.capital ? value.capital.join(', ') : 'None'}</div>
      <div>area {value.area}</div>

      <h2>languages:</h2>
      <ul>
        {value.languages &&
          Object.entries(value.languages).map(([code, name]) => (
            <li key={code}>{name}</li>
          ))}
      </ul>

      {value.flags?.png ? (
        <img
          src={value.flags.png}
          alt={value.flags.alt || `Flag of ${value.name.common}`}
          width="150"
        />
      ) : (
        <div style={{ fontSize: '6rem' }}>{value.flag}</div>
      )}

      {capital && <Weather key={capital} capital={capital} />}
    </div>
  )
}

export default Country