import fs from 'fs';
export default function handler(req, res){
  if(req.method === 'POST'){
    fs.writeFileSync('./keys.json', JSON.stringify(req.body, null, 2));
    return res.status(200).json({status:'ok'});
  }
  return res.status(400).json({error:'Use POST'});
      }
