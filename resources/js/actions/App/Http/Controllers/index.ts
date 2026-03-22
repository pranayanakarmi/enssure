import ContactController from './ContactController'
import Settings from './Settings'
import Admin from './Admin'

const Controllers = {
    ContactController: Object.assign(ContactController, ContactController),
    Settings: Object.assign(Settings, Settings),
    Admin: Object.assign(Admin, Admin),
}

export default Controllers