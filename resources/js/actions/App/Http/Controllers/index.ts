import HomeCoverageProvinceController from './HomeCoverageProvinceController'
import ContactController from './ContactController'
import ReportController from './ReportController'
import VacancyPageController from './VacancyPageController'
import VacancyApplicationController from './VacancyApplicationController'
import Admin from './Admin'
import Settings from './Settings'

const Controllers = {
    HomeCoverageProvinceController: Object.assign(HomeCoverageProvinceController, HomeCoverageProvinceController),
    ContactController: Object.assign(ContactController, ContactController),
    ReportController: Object.assign(ReportController, ReportController),
    VacancyPageController: Object.assign(VacancyPageController, VacancyPageController),
    VacancyApplicationController: Object.assign(VacancyApplicationController, VacancyApplicationController),
    Admin: Object.assign(Admin, Admin),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers