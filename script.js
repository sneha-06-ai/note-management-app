const form = document.querySelector('form')
const input = document.querySelector('input')
const textarea = document.querySelector('textarea')
const container = document.querySelector('.container')

const API_URL = "http://localhost:3000/notes"


document.addEventListener('DOMContentLoaded', fetchNotes)

function fetchNotes() {
  fetch(API_URL)
    .then(res => res.json())
    .then(notes => {
      container.innerHTML = ""
      notes.forEach(note => createNote(note))
    })
}


form.addEventListener('submit', (e) => {
  e.preventDefault()
  const title = input.value.trim()
  const desc = textarea.value.trim()

  if (!title || !desc) {
    alert("Note cannot be empty")
    return
  }

  const newNote = { title, desc }

 
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newNote)
  })
    .then(res => res.json())
    .then(note => {
      createNote(note)
      form.reset()
    })
})


function createNote(note) {
  const card = document.createElement('div')
  card.classList.add('note-card')
  card.innerHTML = `
    <h1>${note.title}</h1>
    <p>${note.desc}</p>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `
  container.appendChild(card)

  // Delete
  card.querySelector('.delete-btn').addEventListener('click', () => {
    fetch(`${API_URL}/${note.id}`, { method: "DELETE" })
      .then(() => card.remove())
  })

 
  card.querySelector('.edit-btn').addEventListener('click', () => {
    const newTitle = prompt("Edit title", note.title)
    const newDesc = prompt("Edit description", note.desc)
    if (!newTitle || !newDesc) return

    fetch(`${API_URL}/${note.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, desc: newDesc })
    })
      .then(() => fetchNotes())
  })
}
