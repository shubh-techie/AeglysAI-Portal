import {collectMetrics,repository} from './metrics.mjs';
export const response=(body,status=200,headers={})=>new Response(JSON.stringify(body),{status,headers});
export function api(url) {
 if(url.endsWith(repository))return response({full_name:repository,private:false,stargazers_count:2,forks_count:1});
 if(url.includes('/contributors'))return response([{id:1,login:'shubh-techie',type:'User',contributions:20},{id:2,login:'test-only',type:'User',contributions:3}]);
 if(url.includes('/issues'))return response([{id:1},{id:2,pull_request:{}}]);
 if(url.includes('/releases'))return response([{id:1,draft:false},{id:2,draft:true}]);
 if(url.includes('page=2'))return response([{id:1},{id:2}]);
 return response([{id:1}],200,{link:`<https://api.github.com/repos/${repository}/pulls?state=all&page=2>; rel="next"`});
}
export const fixture=()=>collectMetrics({fetcher:api,sleep:async()=>{},now:new Date('2026-10-11T00:00:00Z')});
