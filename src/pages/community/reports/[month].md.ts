import { reports } from '../../../data/community/reports';
import { impactMarkdown } from '../../../../scripts/community/impact-report.mjs';
export function getStaticPaths(){return reports.map(report=>({params:{month:report.month},props:{report}}));}
export function GET({props}: any){return new Response(impactMarkdown(props.report.contract),{headers:{'Content-Type':'text/markdown; charset=utf-8'}});}
