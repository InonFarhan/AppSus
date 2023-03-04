export default {
    template: `
        <header class="app-header">
            <h1>AppSus</h1>
            <i @click="isShowLinks = !isShowLinks" class="fa-solid fa-ellipsis"></i>
        </header>
        <nav class="apps flex" v-if="isShowLinks">
            <router-link  @click="isShowLinks = !isShowLinks" to="/" title="Home" class="fa-solid fa-house" ></router-link> 
            <router-link  @click="isShowLinks = !isShowLinks" to="/about" title="About" class="fa-regular fa-handshake"></router-link>
            <router-link  @click="isShowLinks = !isShowLinks" to="/mail" title="Mail" class="fa-regular fa-envelope"></router-link>
            <router-link  @click="isShowLinks = !isShowLinks" to="/note" title="Notes" class="fa-solid fa-note-sticky"></router-link> 
        </nav>
    `,
    data() {
        return {
            isShowLinks: false,
        }
    },
}
