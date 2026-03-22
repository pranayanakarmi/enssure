import ContactController from './ContactController'
import VacancyPageController from './VacancyPageController'
import VacancyApplicationController from './VacancyApplicationController'
import Settings from './Settings'
import Admin from './Admin'

const Controllers = {
    ContactController: Object.assign(ContactController, ContactController),
    VacancyPageController: Object.assign(VacancyPageController, VacancyPageController),
    VacancyApplicationController: Object.assign(VacancyApplicationController, VacancyApplicationController),
    Settings: Object.assign(Settings, Settings),
    Admin: Object.assign(Admin, Admin),
}

export default Controllers