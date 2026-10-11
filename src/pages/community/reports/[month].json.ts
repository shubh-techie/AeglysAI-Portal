import { reports } from '../../../data/community/reports';
export function getStaticPaths(){return reports.map(report=>({params:{month:report.month},props:{report}}));}
export function GET({props}: any){return new Response(JSON.stringify(props.report.contract,null,2)+'\n',{headers:{'Content-Type':'application/json; charset=utf-8'}});}
