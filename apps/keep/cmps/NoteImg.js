export default {
    props: ['note'],
    template: `
          <article class="note-preview">
              <h2> {{note.info.title}} </h2>  
              <h1> {{note.info.txt}} </h1>  
              <!-- <img id="note-img" :src="note.info.url" :alt="" /> -->
              <span> {{note.createdAt}} </span>
              
          </article>
      `,
  }
  