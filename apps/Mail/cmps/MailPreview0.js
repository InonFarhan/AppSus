export default {
    props: ['mail'],
    template: ` 
            <tr :class="[(mail.isRead)? 'isRead' : 'isUnRead']">
                <td><h1 class="showNameOnSmartphone">{{ mail.from }}
                <span class="showTimeOnSmartphone">{{ sentAt }}</span></h1>
                <RouterLink :to="'/mail/'+mail.id">
                    <span class="bold">{{mail.subject}}</span> - {{mail.body }}</RouterLink></td>
            </tr>
            `,
    created() {
        this.showTimeMsg()
    },
    data() {
        return {
            sentAt: new Intl.DateTimeFormat('en-GB',
                { dateStyle: 'short' }).format(this.mail.sentAt),
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
            else if (diff < 1000 * 60 * 60 * 24) this.sentAt = `Today`
            else if (diff < 1000 * 60 * 60 * 48) this.sentAt = `Yesterday`
        },
    },
}