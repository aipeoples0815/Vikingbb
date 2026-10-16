import sharp from 'sharp';

const THEMES = {
 korean_classic_cinema: {name:'1970s–1980s 한국 고전 영화 스타', description:'Bright 1970s-1980s Korean cinema star portrait, elegant vintage European living room, antique sofa, plants, rotary telephone, warm analog film tone with subtle grain.'},
 viking_beer: {name:'바이킹 비어밤 프리미엄 수제맥주 광고', description:'High-end, photorealistic Korean premium beer brand campaign. In a warm, bright modern copper-tank brewery or luxury pub with sparkling taps, amber bokeh and wooden bar, place the same recognizable reference person on the RIGHT half in an attractive relaxed commercial pose, holding a clear tall glass of gold beer with dense white foam. Leave the LEFT side visually clean for sophisticated print-ad typography. Incorporate elegant festival poster lettering naturally into the IMAGE itself, without opaque background boxes: upper-left white vintage serif title VIKING CRAFT BEER, below it large expressive WHITE Korean brush calligraphy 조타카이 and small GOLD JOTAKAI. At the lower-left, tastefully letter 지금, 조타카이로 건배! in white and warm gold brush typography. Natural cinematic poster integration, bright cheerful premium atmosphere. Exact Korean spelling: 조타카이 (not 조타가이, 조타카). Show tasteful snacks and brown beer bottles only if room allows. No interface frames, black rectangles or text overlapping face. Prioritize face likeness, realistic hands, readable brand lettering, lively clean advertising look. If letterform accuracy is uncertain, avoid gibberish.'},
 royal_hanbok: {name:'한국 전통 궁중 한복', description:'Authentic Korean royal historic portrait in a gorgeous hanok hall, lattice windows, elegant folding screen, beautiful bright natural light.'},
 viking_fantasy_harbor: {name:'바이킹 판타지 비어 하버', description:'Photorealistic fantasy film still on Viking longship deck in a sunny or bright sunset harbor, barrels and sails, foamy beer stein.'},
 vintage_hollywood_50s: {name:'1940s–1950s 서구권 빈티지 스타', description:'Glamorous 1940s-1950s Hollywood cinematic portrait, vintage theater, classic cars or retro diner; authentic mid-century styling and bright studio light.'}
};
const STYLES = {
 cinema_male_classic:'classic pompadour and luxurious wool three-piece suit, antique camera or screenplay',
 cinema_female_pure:'short wavy bob, straw hat, cream flower-pattern dress, seated on vintage armchair holding a small yellow flower',
 cinema_female_madam:'voluminous bob, white blouse, green velvet skirt and silk scarf, vintage floral sofa',
 cinema_female_actress:'voluminous bob, solid-color vintage dress and pearls, holding a movie screenplay',
 beer_male_casual:'fashionable neat hair, rolled-up white shirt, denim or slacks, standing cheers pose',
 beer_male_vest:'fashionable neat hair, white shirt and dark vest, standing master brewer pose',
 beer_male_suit:'fashionable neat hair, dark suit with wide open collar, standing VIP pose',
 beer_female_floral:'long full wavy hair, fresh makeup, blue or red floral dress, seated at bar stool toasting',
 beer_female_trendy:'long full wavy hair, white shirt and tasteful miniskirt, seated on barstool holding craft beer',
 hanbok_male_king:'Korean royal dragon-embroidered robe, traditional feathered headpiece, holding traditional bow in palace archery courtyard',
 hanbok_male_scholar:'traditional Korean black gat hat, dark navy silk dopo robe, holding painted fan',
 hanbok_female_green:'traditional coiffure and green dangui jacket with white skirt',
 hanbok_female_pink:'traditional coiffure and pink dangui jacket with yellow skirt',
 hanbok_female_black:'elaborate traditional coiffure and black dangui robe',
 hanbok_female_red:'traditional elaborate hairpiece and red dangui robe',
 hanbok_female_white:'traditional coiffure and white dangui jacket with red skirt',
};
const STYLE_FALLBACK = {male:'period-appropriate handsome dignified men’s attire',female:'period-appropriate elegant women’s attire'};
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}});
const allow=(request)=>(request.headers.get('x-operator-pin')||'')==='0815';
const keyFor=(request)=>process.env.OPENAI_API_KEY || request.headers.get('x-openai-key') || '';
const promptFor=({themeId,styleId,gender,ageGroup})=>{
 const t=THEMES[themeId]; if(!t) throw Error('선택된 테마를 확인할 수 없습니다.');
 const ages={'20대':'a naturally youthful adult in their twenties, clear healthy skin, subtle natural facial fullness, NO infantilization','30대':'a charismatic attractive adult in their thirties, smooth skin and healthy mature vitality','40대':'a dignified well-groomed adult in their forties, gently reduced wrinkles and sagging, authentic mature skin texture'};
 return `You are a fine-art portrait photographer creating ONE photorealistic Korean festival studio image by editing the UPLOADED REFERENCE PERSON. Preserve their recognizable facial identity: original distinct eye shape and angle, eyebrows, nose, lips, jawline, and natural ethnic features. Do not replace with a different person. The customer explicitly selected the following artistic rejuvenation: ${ages[ageGroup]||ages['30대']}. Treat the person as an adult. Make the portrait flattering, beautiful, fresh, naturally vibrant, and age-appropriate, not plastic or doll-like.\nEXACTLY ONE CHOSEN THEME: ${t.description}\nEXACTLY ONE CHOSEN STYLE: ${STYLES[styleId]||STYLE_FALLBACK[gender]}. ${gender==='male'?'Male style.':'Female style.'}\n${themeId==='viking_beer'?'CRITICAL BEER AD COMPOSITION: keep person face and torso on the RIGHT, advertise naturally with integrated white and gold premium brush-lettering on the LEFT of the image. Write exactly 조타카이, JOTAKAI, VIKING CRAFT BEER; lower left line 지금, 조타카이로 건배! Do not use any opaque typography boxes or put text on the face.':''}\nCOMPOSITION: 5:7 vertical poster crop, knee-up three-quarter editorial shot, include outfit, scenery, head and hair. No passport headshot. Camera at eye level. Bright 3-point softbox lighting with fill reflector and catchlights; faces and clothes clearly visible. Realistic body proportions, clean detailed skin, rich warm color. NO heavy shadows, underexposure, vignette, warped hands, distorted text, duplicate body parts, low resolution, modern cars unless theme requests classic vintage, mixing with other themes. The photo is for a happy family memory festival. Return IMAGE ONLY.`;
};
async function openaiEdit(request,data){
 const key=keyFor(request);if(!key) return json({error:'OpenAI API 키가 없습니다. 운영자 설정에서 등록해 주세요.'},401);
 const input=data.image||'';const match=input.match(/^data:(image\/(?:jpeg|png|webp));base64,([\s\S]+)$/i);if(!match)return json({error:'JPG, PNG, WebP 이미지 데이터가 필요합니다.'},400);
 const inputBytes=Buffer.from(match[2],'base64'); if(inputBytes.length>7_000_000)return json({error:'사진 크기가 너무 큽니다. 7MB 이하로 줄여 주세요.'},413);
 const form=new FormData();form.set('model',process.env.OPENAI_IMAGE_MODEL||'gpt-image-1');form.set('prompt',promptFor(data));form.set('size','1024x1536');form.set('quality','high');form.set('n','1');form.set('image',new Blob([inputBytes],{type:match[1]}),'portrait.'+(match[1]==='image/png'?'png':'jpg'));
 const result=await fetch('https://api.openai.com/v1/images/edits',{method:'POST',headers:{Authorization:`Bearer ${key}`},body:form,signal:AbortSignal.timeout(115000)});
 const content=await result.json();if(!result.ok){const status=result.status;const msg=content?.error?.message||'OpenAI 이미지 생성 오류';return json({error:status===401?'OpenAI API 키가 유효하지 않습니다.':status===429?'API 사용량 제한 또는 결제 한도를 확인해 주세요.':`OpenAI 오류 (${status}): ${msg.slice(0,300)}`},status)}
 const base64=content?.data?.[0]?.b64_json;if(!base64)return json({error:'OpenAI에서 이미지 데이터를 받지 못했습니다.'},502);
 const final=await sharp(Buffer.from(base64,'base64')).resize(1000,1400,{fit:'cover',position:'attention'}).jpeg({quality:87,mozjpeg:true}).toBuffer();
 return json({imageUrl:'data:image/jpeg;base64,'+final.toString('base64')});
}
export default async (request, context) => {
 try {
 const pathname=new URL(request.url).pathname;const endpoint=new URL(request.url).searchParams.get('endpoint') || pathname.split('/').pop();
 if(endpoint==='health')return json({todayCount:0,server:'netlify'});
 if(endpoint==='api-key-status')return json({isConfigured:Boolean(process.env.OPENAI_API_KEY),pinConfigured:true,maskedKey:process.env.OPENAI_API_KEY?'Netlify 환경변수 설정됨':'관리자 세션 키 이용 가능'});
 if(endpoint==='check-face')return json({message:'사진이 등록되었습니다. 얼굴이 선명한지 확인해 주세요.'});
 if(endpoint==='download-zip')return json({error:'GitHub 저장소에서 ZIP을 다운로드해 주세요.'},404);

 if(!allow(request))return json({error:'운영자 PIN이 일치하지 않습니다. 숫자 4자리를 확인하세요.',code:'PIN_MISMATCH'},403);
 if(endpoint==='check-key')return json({isConfigured:Boolean(keyFor(request))},keyFor(request)?200:400);
 if(endpoint==='generate-retro-portrait'){
   if(request.method!=='POST')return json({error:'POST 전용'},405);
   const body=await request.json();return await openaiEdit(request,body);
 }
 return json({error:'지원되지 않는 경로입니다.'},404);
 }catch(error){return json({error:error?.name==='TimeoutError'?'이미지 생성 시간이 너무 길어졌습니다. 재시도해 주세요.':String(error?.message||error).slice(0,250)},500)}
};

