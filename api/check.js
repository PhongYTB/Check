import fs from 'fs';
export default function handler(req, res){
  const { key, hiwd } = req.query;
  if(!key || !hiwd) return res.status(400).json({valid:false, reason:'missing_data'});
  
  let data = JSON.parse(fs.readFileSync('./keys.json'));
  if(!data[key]) return res.json({valid:false, reason:'invalid_key'});
  
  let info = data[key];
  if(!info.hiwd){
    info.hiwd = hiwd;
    data[key] = info;
    fs.writeFileSync('./keys.json', JSON.stringify(data, null, 2));
  } else if(info.hiwd !== hiwd){
    return res.json({valid:false, reason:'reset_hiwd_to_use'});
  }

  return res.json({valid:true, expire:info.expire});
}
