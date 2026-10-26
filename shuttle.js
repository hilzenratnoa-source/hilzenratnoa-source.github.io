(function(){
// Paste the Apps Script Web App URL here. Empty = fall back to the Welcome page.
var ENDPOINT = 'https://script.google.com/macros/s/AKfycbxS9YNQcol1QmNWv1S5WsQgUhNtGnbMeRvLf2j_ldKlwAJt_0L9xZFgVUIJg4UjV6IG/exec';
var FALLBACK = 'https://app.welcome-rsvp.com/he/wedding-website/Noa_%26_Gilad';
var css = `
#sh-ov{position:fixed;inset:0;z-index:9999;background:rgba(20,24,16,.82);display:flex;align-items:flex-end;justify-content:center;font-family:Assistant,Heebo,Arial,sans-serif;direction:rtl}
@media(min-width:640px){#sh-ov{align-items:center}}
#sh-box{background:#2B3324;color:#EFE8D8;width:100%;max-width:460px;max-height:92vh;overflow:auto;border-radius:22px 22px 0 0;padding:28px 22px 26px;position:relative;box-shadow:0 -10px 40px rgba(0,0,0,.4);border:1px solid rgba(185,195,148,.25)}
@media(min-width:640px){#sh-box{border-radius:22px}}
#sh-box h3{font-family:Ethna,'Frank Ruhl Libre',serif;font-size:34px;margin:0 0 4px;text-align:center;font-weight:400}
#sh-box .sub{text-align:center;color:#B9C394;margin:0 0 20px;font-size:16px}
#sh-box label.f{display:block;margin:14px 0 6px;font-size:16px}
#sh-box input[type=text],#sh-box input[type=tel],#sh-box input[type=number]{width:100%;box-sizing:border-box;background:rgba(239,232,216,.07);border:1px solid rgba(185,195,148,.4);color:#EFE8D8;border-radius:12px;padding:12px 14px;font-size:17px;font-family:inherit}
#sh-box input:focus{outline:none;border-color:#B9C394}
.sh-seg{display:flex;gap:8px}.sh-seg label{flex:1}.sh-seg input{position:absolute;opacity:0}
.sh-seg span{display:block;text-align:center;padding:11px 6px;border-radius:12px;border:1px solid rgba(185,195,148,.4);cursor:pointer;font-size:16px}
.sh-seg input:checked+span{background:#B9C394;color:#2B3324;font-weight:600}
#sh-yes{display:none}#sh-box .req{color:#B9C394}
#sh-send{margin-top:22px;width:100%;background:#EFE8D8;color:#2B3324;border:0;border-radius:999px;padding:14px;font-size:18px;font-weight:600;cursor:pointer;font-family:inherit}
#sh-send:disabled{opacity:.6}#sh-err{color:#f0b4a0;text-align:center;margin-top:10px;min-height:1em}
#sh-x{position:absolute;top:12px;left:12px;background:none;border:0;color:#EFE8D8;font-size:26px;cursor:pointer;line-height:1}
#sh-thanks{text-align:center;padding:30px 0 10px}#sh-thanks .big{font-family:Ethna,'Frank Ruhl Libre',serif;font-size:40px}
.sh-hp{position:absolute;left:-9999px}`;
function el(h){var d=document.createElement('div');d.innerHTML=h;return d.firstElementChild}
window.openShuttle=function(fb){
  if(!ENDPOINT){if(fb)fb();else window.open(FALLBACK,'_blank');return}
  if(!document.getElementById('sh-css')){var s=document.createElement('style');s.id='sh-css';s.textContent=css;document.head.appendChild(s)}
  var ov=el(`<div id="sh-ov"><div id="sh-box" role="dialog" aria-label="הרשמה להסעה"><button id="sh-x" aria-label="סגירה">×</button>
  <form id="sh-form" novalidate><h3>הסעות</h3><p class="sub">צריכים הסעה? תירשמו כאן – נארגן הסעות בהתאם לביקוש 🚌</p>
  <label class="f">שם מלא <span class="req">*</span></label><input type="text" name="name" autocomplete="name" required>
  <label class="f">צריכים הסעה? <span class="req">*</span></label>
  <div class="sh-seg"><label><input type="radio" name="need" value="כן"><span>כן</span></label><label><input type="radio" name="need" value="לא"><span>לא</span></label></div>
  <div id="sh-yes"><label class="f">מאיפה?</label><input type="text" name="from" list="sh-cities" placeholder="עיר / נקודת איסוף">
  <datalist id="sh-cities"><option>תל אביב</option><option>ירושלים</option><option>חיפה</option><option>באר שבע</option><option>אחר</option></datalist>
  <label class="f">כיוון</label><div class="sh-seg"><label><input type="radio" name="direction" value="הלוך"><span>הלוך</span></label><label><input type="radio" name="direction" value="חזור"><span>חזור</span></label><label><input type="radio" name="direction" value="הלוך וחזור" checked><span>הלוך וחזור</span></label></div>
  <label class="f">כמה נוסעים?</label><input type="number" name="count" min="1" max="20" value="1" inputmode="numeric"></div>
  <label class="f">טלפון (לא חובה)</label><input type="tel" name="phone" autocomplete="tel" inputmode="tel">
  <input class="sh-hp" type="text" name="website" tabindex="-1" autocomplete="off">
  <button id="sh-send" type="submit">שליחה</button><div id="sh-err"></div></form>
  <div id="sh-thanks" hidden><div class="big">תודה!</div><p>קיבלנו 🤍<br>נתראה בקרוב</p><button id="sh-send2" type="button" style="margin-top:18px;background:none;border:1px solid #B9C394;color:#EFE8D8;border-radius:999px;padding:10px 26px;font-size:16px;cursor:pointer">סגירה</button></div></div></div>`);
  document.body.appendChild(ov);document.body.style.overflow='hidden';
  var f=ov.querySelector('#sh-form'),yes=ov.querySelector('#sh-yes'),err=ov.querySelector('#sh-err');
  function close(){ov.remove();document.body.style.overflow=''}
  ov.querySelector('#sh-x').onclick=close;ov.querySelector('#sh-send2').onclick=close;
  ov.addEventListener('click',function(e){if(e.target===ov)close()});
  f.addEventListener('change',function(){var n=f.querySelector('[name=need]:checked');yes.style.display=n&&n.value==='כן'?'block':'none'});
  f.addEventListener('submit',function(e){e.preventDefault();err.textContent='';
    var d=new FormData(f);
    if(!String(d.get('name')||'').trim()){err.textContent='נשמח לשם מלא';return}
    if(!d.get('need')){err.textContent='סמנו כן או לא';return}
    if(d.get('need')==='כן'&&!String(d.get('from')||'').trim()){err.textContent='מאיפה תצטרכו הסעה?';return}
    var b=ov.querySelector('#sh-send');b.disabled=true;b.textContent='שולחים...';
    fetch(ENDPOINT,{method:'POST',mode:'no-cors',body:new URLSearchParams(d)}).then(function(){f.hidden=true;ov.querySelector('#sh-thanks').hidden=false})
    .catch(function(){b.disabled=false;b.textContent='שליחה';err.textContent='משהו השתבש, נסו שוב'})});
};
})();
