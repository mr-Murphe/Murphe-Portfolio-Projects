from pathlib import Path
from html.parser import HTMLParser
import json,re
root=Path(__file__).resolve().parents[1]
class Audit(HTMLParser):
 def __init__(self): super().__init__();self.ids=[];self.links=[];self.errors=[];self.h1=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id'in a:self.ids.append(a['id'])
  if tag=='h1':self.h1+=1
  if tag=='img' and (not a.get('alt')or not a.get('width')or not a.get('height')):self.errors.append('image alt/dimensions missing')
  if tag in ['a','script','link','img']:
   v=a.get('href')or a.get('src');
   if v and not v.startswith(('https:','http:','mailto:','#','data:')):self.links.append(v.split('#')[0].split('?')[0])
errors=[]
for f in root.glob('*.html'):
 a=Audit();s=f.read_text();a.feed(s)
 if len(a.ids)!=len(set(a.ids)):errors.append(str(f)+': duplicate IDs')
 if a.h1!=1:errors.append(str(f)+': h1 count '+str(a.h1))
 if 'noindex,nofollow'not in s or 'Independent'not in s:errors.append(str(f)+': disclaimer/indexing')
 for link in a.links:
  if not (root/link).exists():errors.append(str(f)+': missing '+link)
 errors.extend(a.errors)
for f in (root/'theme/templates').glob('*.json'):
 data=json.loads(f.read_text());assert set(data['order'])==set(data['sections'])
 for x in data['sections'].values():assert (root/'theme/sections'/f"{x['type']}.liquid").exists()
for f in (root/'theme/sections').glob('*.liquid'):
 match=re.search(r'{% schema %}(.*){% endschema %}',f.read_text(),re.S);assert match;json.loads(match.group(1))
assert not errors,errors
result={'status':'passed','html_pages':len(list(root.glob('*.html'))),'checks':['local asset/link integrity','single h1','no duplicate ids','image alternatives and dimensions','noindex','JSON template references','section schema JSON'],'limits':'static checks only; no rendered browser/accessibility compliance claim'}
(root/'docs/static-results.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2))
