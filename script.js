const form = document.querySelector('form ')
const addButton = document.querySelector('.add-btn')
const input = document.querySelector('input')
const textarea =document.querySelector('textarea')
const container =document.querySelector('.container')
let notes = JSON.parse(localStorage.getItem('notes')) || []


notes.forEach(note => {
  createNote(note.title, note.desc)
})

form.addEventListener('submit' ,(e) =>{
   e.preventDefault()
    const title = input.value
    const desc =textarea.value 


const card = document.createElement('div')
card.classList.add('note-card')
card.innerHTML = `
    <h1>${title}</h1>
     <p>${desc}</p>
     <button>Delete</button>
     <button class="delete-btn">Delete</button>
       <button class="edit-btn">Edit</button>
     <Button>Edit</Button>
`
container.appendChild(card)
console.log(card)
})
container.addEventListener('click', (e) => {
     const card = e.target.parentElement

    if (e.target.classList.contains('delete-btn')) {
    card.remove()
 }

 if (e.target.classList.contains('edit-btn')) {
     input.value = card.querySelector('h1').innerText
     textarea.value = card.querySelector('p').innerText
    card.remove() // remove old note while editing
  }
})


function createNote(title, desc) {
     const card = document.createElement('div')
      card.classList.add('note-card')
      card.innerHTML = `
      <h1>${title}</h1>
        <p>${desc}</p>
         <button class="delete-btn">Delete</button>
         <button class="edit-btn">Edit</button>
   `
   container.appendChild(card)
}