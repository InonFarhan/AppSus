export default {
    props: ['mail'],
    template: `
            <tr :class="[(mail.isRead)? 'isRead' : 'isUnRead']">
                <td>
                <span><i class="fa-solid fa-trash" title="Garbage" @click="moveToGarbage(mail.id)"></i> |
                <i class="fa-solid fa-share-from-square" title="Replay" @click="replyMail(mail.id)"></i> |
                <i class="fa-solid fa-up-right-from-square"  title="Forward" @click="forwardMail(mail.id)"></i></span>    
                {{ mail.from }}</td>
                <td><RouterLink :to="'/mail/'+mail.id"
                ><span class="bold">{{mail.subject}}</span> - {{mail.body }}</RouterLink></td>
                <td>{{ sentAt }}</td>
            </tr>
            `,
    created() {
        this.showTimeMsg()
    },
    data() {
        return {
            sentAt: new Intl.DateTimeFormat('en-GB',
                { dateStyle: 'short', timeStyle: 'short', timeZone: 'Israel' }).format(this.mail.sentAt),
        }
    },
    methods: {
        moveToGarbage(mailId) {
            this.$emit('moveToGarbage', mailId)
        },
        forwardMail(mailId) {
            this.$emit('forwardMail', mailId)
        },
        replyMail(mailId) {
            this.$emit('replyMail', mailId)
        },
        showTimeMsg() {
            let diff = Date.now() - this.mail.sentAt
            if (diff < 1000 * 60) this.sentAt = 'Just now'
            else if (diff < 1000 * 60 * 60) this.sentAt = `${Math.floor(diff / 1000 / 60)} minuets ago`
            else if (diff < 1000 * 60 * 61) this.sentAt = `One hour ago`
            else if (diff < 1000 * 60 * 60 * 24) this.sentAt = `Today at ${new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format(this.mail.sentAt)}`
            else if (diff < 1000 * 60 * 60 * 48) this.sentAt = `Yesterday at ${new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format(this.mail.sentAt)}`
        },
    },
}