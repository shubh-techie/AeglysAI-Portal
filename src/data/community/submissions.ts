import challenges from './challenges.json';
import { hackathonForms,publicFormUrl } from '../hackathonForms';
export { challenges };
export const submissionService=publicFormUrl(hackathonForms.project.url,hackathonForms.project.open);
