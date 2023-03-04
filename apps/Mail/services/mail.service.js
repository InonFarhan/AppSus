

'use strict'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
const loggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Inon farhan'
}

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getUser,
}

function query() {
    return storageService.query(MAIL_KEY)
}

function getUser() {
    return loggedInUser
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
    // .then(mail => _setNextPrevMailId(mail))
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail() {
    return {
        subject: '',
        body: '',
        isRead: true,
        sentAt: null,
        removedAt: null,
        from: loggedInUser.email,
        to: '',
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'e101',
                subject: 'I am sorry!',
                body: 'Please talk with me...',
                isRead: false,
                sentAt: Date.now() - (1000 * 60 * 60 * 23),
                removedAt: null,
                from: 'Sarah',
                to: 'user@appsus.com'
            }, {
                id: 'e102',
                subject: 'You get the job!',
                body: 'Please Enter this mail...',
                isRead: false,
                sentAt: Date.now() - (1000 * 60 * 60 * 30),
                removedAt: null,
                from: 'IBM',
                to: 'user@appsus.com'
            },
            {
                id: 'e103',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: 1676841611900,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            }, {
                id: 'e106',
                subject: 'Hello',
                body: 'I need help with my order please.',
                isRead: true,
                sentAt: 1676841510900,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'AliExpress@momo.com'
            }, {
                id: 'e107',
                subject: 'hi!',
                body: 'I am so exiting for our vacation',
                isRead: true,
                sentAt: 1676841341900,
                removedAt: null,
                from: 'Best friend',
                to: 'user@appsus.com'
            }, {
                id: 'e104',
                subject: 'How are you?',
                body: 'I hope i will see you next week',
                isRead: true,
                sentAt: 1627841611900,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            }, {
                id: 'e105',
                subject: 'Hi user!',
                body: 'New stuff on sale in our shop!',
                isRead: false,
                sentAt: 1377841411900,
                removedAt: null,
                from: 'AliExpress',
                to: 'user@appsus.com'
            }, {
                id: 'e108',
                subject: 'Hi user!',
                body: 'We miss you...',
                isRead: true,
                sentAt: 1357841611900,
                removedAt: null,
                from: 'Twitter',
                to: 'user@appsus.com'
            }, {
                id: 'e110',
                subject: 'Hi user',
                body: 'Your order in the way!',
                isRead: true,
                sentAt: 1524851911110,
                removedAt: null,
                from: 'Stuff shop',
                to: 'user@appsus.com'
            }, {
                id: 'e109',
                subject: 'About order: 194678830',
                body: 'I need to cancel my order please.',
                isRead: true,
                sentAt: 1524751900010,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'AliExpress@momo.com'
            },
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currmail) => currmail.id === mail.id)
        mail.nextmailId = mails[mailIdx + 1] ? mails[mailIdx + 1].id : mails[0].id
        mail.prevmailId = mails[mailIdx - 1]
            ? mails[mailIdx - 1].id
            : mails[mails.length - 1].id
        return mail
    })
}