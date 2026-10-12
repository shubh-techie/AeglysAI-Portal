import challenges from './challenges.json';
import { hackathonForms,approvedFormUrl } from '../hackathonForms';
export { challenges };
export const submissionService=approvedFormUrl(hackathonForms.project);
