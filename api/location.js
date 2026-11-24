module.exports = (req,res) => {
  res.setHeader('Cache-Control','private, no-store, max-age=0');
  if(req.method !== 'GET') return res.status(405).json({error:'Method not allowed'});
  const h = key => String(req.headers['x-vercel-ip-'+key] || '');
  const lat=h('latitude'),lon=h('longitude'),timezone=h('timezone'),country=h('country');
  let city=h('city');try{city=decodeURIComponent(city)}catch{}
  if(!lat||!lon||!timezone||!country||!Number.isFinite(Number(lat))||!Number.isFinite(Number(lon)))return res.status(503).json({error:'IP location unavailable'});
  return res.status(200).json({city,country,latitude:Number(lat),longitude:Number(lon),timezone});
};
