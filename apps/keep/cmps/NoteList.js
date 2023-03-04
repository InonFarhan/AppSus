import NotePreview from './NotePreview.js'
import NoteTxt from './NoteTxt.js'
import NoteImg from './NoteImg.js'


export default {
  props: ['notes'],

  template: `
        <section class="note-list" >
            <ul>
                <li class="note-card" v-for="note in notes" :key="note.id">
                    <NoteTxt :note="note" />
                    <span class="icon" @click="remove(note.id)">🗑️</span>
                    <input class="color" type="color" >
                    <label>
                    <span class="icon" @click="OnColorChange(note.id)">🎨</span>
                    <input type="color">
                    </label>
                </li>
            </ul>
        </section>
    `,
    
  methods: {
    remove(noteId) {
      this.$emit('remove', noteId)
    },
    showDetails(noteId) {
      this.$emit('show-details', noteId)
    },
  
   
    
  },
  components: {
    NotePreview,
    NoteTxt,
    NoteImg,
    
  },
  emits: ['remove'],
}
