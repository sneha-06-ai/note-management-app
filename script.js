const form = document.querySelector('form')
const input = document.querySelector('input')
const textarea = document.querySelector('textarea')
const container = document.querySelector('.container')

const API_URL = "http://localhost:3000/notes"

// Fetch and display notes on page load
document.addEventListener('DOMContentLoaded', fetchNotes)

function fetchNotes() {
  fetch(API_URL)
    .then(res => res.json())
    .then(notes => {
      container.innerHTML = ""
      notes.forEach(note => createNote(note))
    })
}

// Handle adding new note
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

// Create note card
function createNote(note) {
  const card = document.createElement('div')
  card.classList.add('note-card')

  const titleEl = document.createElement('h3')
  titleEl.textContent = note.title

  const descEl = document.createElement('p')
  descEl.textContent = note.desc

  const editBtn = document.createElement('button')
  editBtn.textContent = "Edit"
  editBtn.classList.add('edit-btn')

  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = "Delete"
  deleteBtn.classList.add('delete-btn')

  // Append elements
  card.append(titleEl, descEl, editBtn, deleteBtn)
  container.appendChild(card)

  // Edit button
  editBtn.addEventListener('click', () => {
    const newTitle = prompt("Edit title", note.title)
    const newDesc = prompt("Edit description", note.desc)
    if (!newTitle || !newDesc) return

    fetch(`${API_URL}/${note.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, desc: newDesc })
    })
      .then(res => res.json())
      .then(updatedNote => {
        // Update card instantly without re-fetching
        titleEl.textContent = updatedNote.title
        descEl.textContent = updatedNote.desc
        note.title = updatedNote.title
        note.desc = updatedNote.desc
      })
  })

  // Delete button
  deleteBtn.addEventListener('click', () => {
    fetch(`${API_URL}/${note.id}`, { method: "DELETE" })
      .then(() => card.remove())
  })
}
