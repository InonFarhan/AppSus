'use strict'
import { utilService } from     '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
const gNotes =  [
  {
  id: 'n101',
  type: 'img',
  isPinned: true,
  createdAt: new Date().toLocaleString(),
  style: {
    backgroundColor: '#DDE8B9',
  },
  info: {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'lunch',
    txt: 'Having lunch with the kids at the mall',
  },
},
{
  id: 'n102',
  createdAt: new Date().toLocaleString(),
  type: 'todos',
  isPinned: false,
  info: {
    title: 'Get my stuff together',
    txt: 'getting ready for next week',
  },
  todos: [
    { txt: 'Drivig license', doneAt: null },
    { txt: 'Coding power', doneAt: 187111111 },
  ],
},
{
  id: 'n103',
  type: 'img',
  createdAt: new Date().toLocaleString(),
  isPinned: false,
  info: {
    url: 'https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'sprint 3',
    txt: 'Fullstack Me Baby! ',
  },
  style: {
    backgroundColor: '#E8D2AE',
  },
},
{
  id: 'n104',
  type: 'txt',
  isPinned: true,
  createdAt: new Date().toLocaleString(),
  style: {
    backgroundColor: '#00d',
  },
  info: {
    title: 'Think positive',
    txt: 'Dont compare yourself with anyone else. Because you have potential inside you that no one else on the planet has.',
  },
},
{
  id: 'n105',
  type: 'img',
  createdAt: new Date().toLocaleString(),
  isPinned: false,
  info: {
    url: 'https://demolay.org/wp-content/uploads/2018/12/Vacation.jpg',
    title: 'After sprint 4',
    txt: 'Going on a vacation! ',
  },
  style: {
    backgroundColor: '#D7B29D',
  },
},

{
  id: 'n106',
  type: 'txt',
  isPinned: true,
  createdAt: new Date().toLocaleString(),
  style: {
    backgroundColor: '#CB8589',
  },
  info: {
    title: 'EuroTrip',
    txt: 'Start in amsterdam!!!',
    url: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
},
{
  id: 'n107',
  type: 'img',
  createdAt: new Date().toLocaleString(),
  isPinned: false,
  info: {
    url: 'https://images.unsplash.com/photo-1592609931095-54a2168ae893?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Coding',
    txt: 'improve your skills in vue! ',
  },
  style: {
    backgroundColor: '#796465',
  },
},
{
  id: 'n108',
  type: 'txt',
  isPinned: true,
  createdAt: new Date().toLocaleString(),
  style: {
    backgroundColor: '#CB8589',
  },
  info: {
    title: 'Reminder',
    txt: 'Dont scroll past life. Life is this very moment.',
  },
},
{
  id: 'n109',
  type: 'img',
  createdAt: new Date().toLocaleString(),
  isPinned: false,
  info: {
    url: 'https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    title: 'Good vibes',
    txt: 'You attract the energy that you give off. Spread good vibes. Think positively. Enjoy life.',
  },
  style: {
    backgroundColor: '#796465',
  },
},
]


_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  createNote,
  loadImageFromInput,
}

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      notes = notes.filter((note) => regex.test(note.info.title))
    }
    if (filterBy.bookPrice) {
      notes = notes.filter((book) => book.bookPrice >= filterBy.bookPrice)
    }
    return notes
  })
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
  .then(note =>{
    return setNextPrevBookId(note)
  }) 
}

function remove(noteId) {

  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    note.id = utilService.makeId()
    return storageService.post(NOTE_KEY, note)
  }
}

function getEmptyNote() {
return notes
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
   notes = gNotes
 
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

function createNote(title,body) {
  let note = {
    id: '',
    type: '',
    isPinned: true,
    createdAt: new Date().toLocaleString(),
    style: {
      backgroundColor: '#00d',
    },
    info: {
      url: 'http://some-img/me',
      txt: body,
      title,
    },
  }

  return save(note)
}

function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader()
  // After we read the file
  reader.onload = function (event) {
    let img = new Image() // Create a new html img element
    img.src = event.target.result // Set the img src to the img file we read
    // Run the callBack func, To render the img on the canvas
    img.onload = onImageReady.bind(null, img)
    // Can also do it this way:
    // img.onload = () => onImageReady(img)
  }
  reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}




