/** Defense in depth for manually sanitized exports; not proof of consent or truth.
 * Private Sheets/Drive data must never reach this public repository. */
export function assertPublicExport(value) {
 const walk=(node)=>{
  if(Array.isArray(node)){node.forEach(walk);return;}
  if(node && typeof node==='object'){
   for(const [key,item] of Object.entries(node)){
    if(/email|contact|spreadsheet|driveid|folderid|token|secret|password|credential|private|invitationletter/i.test(key))throw Error('Public export privacy gate rejected');
    walk(item);
   }
  }else if(typeof node==='string'){
   if(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(node) || /https?:\/\/(?:docs\.google\.com\/(?:spreadsheets|document)|drive\.google\.com|sheets\.googleapis\.com|www\.googleapis\.com\/drive)(?:[/?#]|$)/i.test(node) || /(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|Bearer\s+\S+)/i.test(node))throw Error('Public export privacy gate rejected');
  }
 };
 walk(value);
 return value;
}
