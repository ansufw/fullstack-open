import ReactDOM from 'react-dom/client'
import App from './App'

const notes = [
  {
    id: 1,
    name: 'Uzumaki Naruto',
    number: '081234'
  },
  {
    id: 2,
    name: 'Sasuke Itachi',
    number: '084322'
  },
  {
    id: 3,
    name: 'Mo Salah',
    number: '064321'
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)