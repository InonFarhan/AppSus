import NoteTxt from './NoteTxt.js'
import NoteImg from './NoteImg.js'

export default {
  props: ['note'],
  template: `
    <div >
    <component 
    :is="note.type"
    :info="note.info" />
    
    </div>
    `,
  components: {
    txt: NoteTxt,
    img: NoteImg,
  },
}
