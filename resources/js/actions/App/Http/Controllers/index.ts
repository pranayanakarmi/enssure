import ContactController from './ContactController'
import ReportController from './ReportController'
import VacancyPageController from './VacancyPageController'
import VacancyApplicationController from './VacancyApplicationController'
import Settings from './Settings'
import Admin from './Admin'

const Controllers = {
    ContactController: Object.assign(ContactController, ContactController),
    ReportController: Object.assign(ReportController, ReportController),
    VacancyPageController: Object.assign(VacancyPageController, VacancyPageController),
    VacancyApplicationController: Object.assign(VacancyApplicationController, VacancyApplicationController),
    Settings: Object.assign(Settings, Settings),
    Admin: Object.assign(Admin, Admin),
}

export default Controllers