"""Portal offline adapter: copied upstream validators are authoritative; no URL fetch."""
import os,sys,json,math
from pathlib import Path
ROOT=Path(__file__).resolve().parent/'upstream'
os.environ['AEGLYSAI_COMMUNITY_ROOT']=str(ROOT)
sys.path.insert(0,str(ROOT/'scripts/community'))
from validate_evidence import parse_json_bytes

def safe_numbers(value,depth=0):
    if depth>64:raise ValueError("depth bound")
    if isinstance(value,float) and not math.isfinite(value):raise ValueError("nonfinite")
    if isinstance(value,int) and not isinstance(value,bool) and abs(value)>9007199254740991:
        raise ValueError('integer range')
    if isinstance(value,dict):
        for item in value.values():safe_numbers(item,depth+1)
    if isinstance(value,list):
        for item in value:safe_numbers(item,depth+1)

try:
    data=parse_json_bytes(sys.stdin.buffer.read(1024*1024+1))
    safe_numbers(data)
    kind=sys.argv[1]
    if kind=='parse':
        print(json.dumps(data,allow_nan=False));sys.exit(0)
    import importlib
    modules={'evidence':'validate_evidence','recognition':'validate_recognition','adoption':'validate_adoption','monthly':'validate_monthly'}
    module=importlib.import_module(modules[kind])
    if kind=='monthly':errors=module.validate(data,Path(sys.argv[2]),'--publication' in sys.argv)
    elif kind=='evidence':errors=module.validate(data,'--verified' in sys.argv)
    else:errors=module.validate(data)
    if errors:raise ValueError('contract rejected')
    print('PASS')
except Exception:
    print('Contract input rejected or validation dependency unavailable',file=sys.stderr)
    sys.exit(1)
