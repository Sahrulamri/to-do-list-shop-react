import { useState } from 'react'

const groceryItems = [
  {
    id: 1,
    name: 'Kopi Bubuk',
    quantity: 2,
    checked: true,
  },
  {
    id: 2,
    name: 'Gula Pasir',
    quantity: 5,
    checked: false,
  },
  {
    id: 3,
    name: 'Air Mineral',
    quantity: 3,
    checked: false,
  },
];

export default function App() {
  const [items, setItems] = useState(groceryItems);

  function handleDeleteItem (id) {
    setItems(items.filter(item => item.id !== id ))
  }

  function handleToggle(id) {
    setItems(items.map(item => item.id === id ? {...item, checked: !item.checked} : item ))
  }

  function handleAddItem (item) {
    setItems([...items, item])
  }
  return (
  <div className="app">
    <Header/>
    <Form onAddItem={handleAddItem}/>
    <GroceryItems items={items} onDeleteItem={handleDeleteItem} onToggle={handleToggle}/>
    <Footer/>
  </div>
  )
}
function Header () {
  return <h1>Catatan Belanjaku 📝</h1>
}

function Form ({onAddItem}) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)

  function handleSubmit (e) {
    e.preventDefault()
    const newItem = {
      name:name,
      quantity:quantity,
      checked:false,
      id: Date.now()
    } 
    onAddItem(newItem)
  }



  const quantityNum = [...Array(15)].map((_, i) => (
    <option value={i+1} key={i+1} >{i+1}</option>
  ))
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Hari ini belanja apa kita?</h3>
      <div>
        <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
          {quantityNum}
        </select>
        <input type="text" placeholder="nama barang..." value={name} onChange={(e) => setName(e.target.value)}/>
      </div>
      <button>Tambah</button>
    </form>
  ) 
}

function GroceryItems ({items, onDeleteItem, onToggle}) {
  return (
    <>
      <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggle={onToggle}/>
        ))}
      </ul>
    </div>
    <div className="actions">
      <select>
        <option value="input">Urutkan berdasarkan urutan input</option>
        <option value="name">Urutkan berdasarkan nama barang</option>
        <option value="checked">Urutkan berdasarkan ceklis</option>
      </select>
      <button>Bersihkan Daftar</button>
    </div>
    </>
  )
}

function Footer () {
  return <footer className="stats">Ada 10 barang di daftar belanjaan, 5 barang sudah dibeli (50%)</footer>
}
function Item ({item, onDeleteItem, onToggle}) {
  return (
    <li key={item.id}>
      <input type="checkbox" checked={item.checked} onChange={() => onToggle(item.id)}/>
      <span style={ item.checked ? { textDecoration: 'line-through' } : {}}>{item.quantity} {item.name}</span>
      <button onClick={() =>onDeleteItem(item.id)}>&times;</button>
    </li>
  )
}
