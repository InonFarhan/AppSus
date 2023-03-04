import { noteService } from '../services/note.service.js'
import NoteList from '../cmps/NoteList.js'
import { showErrorMsg, showSuccessMsg} from '../../../services/event-bus.service.js'

export default {
  template: `
        <section class="text-editor">
            <form @submit="">
                <button class="add-note" @click="onCreateNote">Add a note</button>
                <section class="txt-box">
                    <input type="text" v-model="title" placeholder="What's on Your Mind...">
                    <input type="text" v-model="body" placeholder="Enter a note msg....">
                </section>
            </form>
            <NoteList 
            @remove="removeNote" 
            :notes="notes"/>   
</section>    
    `,
  data() {
    return {
        title : '',
        body : '',
        notes: [],
        filterBy: {},
    }
  },
  created() {
    noteService.query().then((notes) => (this.notes = notes))
  },
  methods: {
    removeNote(NoteId) {
      noteService
        .remove(NoteId)
        .then(() => {
          const idx = this.notes.findIndex((note) => note.id === NoteId)
          this.notes.splice(idx, 1)
          showSuccessMsg('Note removed')
        })
        .catch((err) => {
          showErrorMsg('Note remove failed')
        })
    },
    onCreateNote() {
      noteService.createNote(this.title, this.body)
      .then((note) => {
        this.notes.push(note)
      })
    },
   
  },
  components: {
    NoteList,
  },
}
