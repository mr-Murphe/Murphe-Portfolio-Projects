const {chromium}=require('playwright');
const fs=require('fs');
exports.launchChromium=async()=>{
  if(fs.existsSync(chromium.executablePath()))return chromium.launch({headless:true});
  const vendor=(await import('@sparticuz/chromium')).default;
  return chromium.launch({headless:true,executablePath:await vendor.executablePath(),args:vendor.args.filter(a=>!['--single-process','--disable-web-security','--allow-running-insecure-content'].includes(a))});
};

exports.launchBrowser=async(name)=>name==='chromium'?exports.launchChromium():require('playwright')[name].launch({headless:true,...(name==='firefox'?{env:{...process.env,MOZ_DISABLE_CONTENT_SANDBOX:'1',MOZ_DISABLE_GMP_SANDBOX:'1',MOZ_DISABLE_GPU_SANDBOX:'1'}}:{})});
