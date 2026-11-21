/* Мовна частина. Теми — за програмою іспиту з державної мови NŠA (I категорія = A2).
   У вправах з вибором правильна відповідь завжди стоїть ПЕРШОЮ (застосунок перемішує варіанти). */

const TOPICS = [
  {id:'t1', lt:'Asmens tapatybė', ua:'Про себе', week:1, words:[
    ['vardas','ім’я'],['pavardė','прізвище'],['gimimo data','дата народження'],['amžius','вік'],['pilietybė','громадянство'],
    ['vedęs','одружений'],['šeima','сім’я'],['profesija','професія'],['gimtoji kalba','рідна мова'],['adresas','адреса']]},
  {id:'t2', lt:'Pastatai, būstas', ua:'Будинок і житло', week:1, words:[
    ['butas','квартира'],['namas','будинок'],['kambarys','кімната'],['virtuvė','кухня'],['vonios kambarys','ванна кімната'],
    ['miegamasis','спальня'],['aukštas','поверх'],['nuoma','оренда'],['kaimynas','сусід'],['balkonas','балкон']]},
  {id:'t4', lt:'Kasdienis gyvenimas', ua:'Щоденне життя', week:2, words:[
    ['keltis','вставати'],['pusryčiai','сніданок'],['pietūs','обід'],['vakarienė','вечеря'],['darbas','робота'],
    ['poilsis','відпочинок'],['ryte','вранці'],['vakare','увечері'],['dažnai','часто'],['kartais','іноді']]},
  {id:'t5', lt:'Laisvalaikis', ua:'Дозвілля', week:2, words:[
    ['laisvalaikis','вільний час'],['pomėgis','хобі'],['žvejoti','рибалити'],['krepšinis','баскетбол'],['kinas','кіно'],
    ['koncertas','концерт'],['vaikščioti','гуляти'],['savaitgalis','вихідні'],['sportuoti','займатися спортом'],['žiūrėti televizorių','дивитися телевізор']]},
  {id:'t11', lt:'Maistas, gėrimai', ua:'Їжа і напої', week:2, words:[
    ['duona','хліб'],['pienas','молоко'],['mėsa','м’ясо'],['daržovės','овочі'],['vaisiai','фрукти'],
    ['sriuba','суп'],['valgiaraštis','меню'],['sąskaita','рахунок (у кафе)'],['staliukas','столик'],['cepelinai','цепеліни (картопляні зрази)']]},
  {id:'t10', lt:'Pirkiniai', ua:'Покупки', week:3, words:[
    ['parduotuvė','магазин'],['kaina','ціна'],['kainuoti','коштувати'],['nuolaida','знижка'],['dydis','розмір'],
    ['kasa','каса'],['mokėti kortele','платити карткою'],['grynaisiais','готівкою'],['čekis','чек'],['pigus / brangus','дешевий / дорогий']]},
  {id:'t12', lt:'Paslaugos', ua:'Послуги', week:3, words:[
    ['paštas','пошта'],['siuntinys','посилка'],['bankas','банк'],['sąskaita banke','банківський рахунок'],['policija','поліція'],
    ['autoservisas','автосервіс'],['degalinė','АЗС'],['kirpykla','перукарня'],['prašymas','заява'],['dokumentas','документ']]},
  {id:'t6', lt:'Kelionės', ua:'Подорожі', week:4, words:[
    ['kelionė','подорож'],['bilietas','квиток'],['traukinys','потяг'],['autobusų stotis','автовокзал'],['oro uostas','аеропорт'],
    ['tvarkaraštis','розклад'],['išvykimas','відправлення'],['atvykimas','прибуття'],['bagažas','багаж'],['viešbutis','готель']]},
  {id:'t8', lt:'Sveikata, higiena', ua:'Здоров’я і гігієна', week:4, words:[
    ['gydytojas','лікар'],['poliklinika','поліклініка'],['vaistinė','аптека'],['vaistai','ліки'],['receptas','рецепт'],
    ['skauda','болить'],['temperatūra','температура'],['sirgti','хворіти'],['užsiregistruoti','записатися'],['odontologas','стоматолог']]},
  {id:'t9', lt:'Mokslas', ua:'Освіта', week:4, words:[
    ['mokykla','школа'],['kursai','курси'],['mokytojas','вчитель'],['pamoka','урок'],['egzaminas','іспит'],
    ['mokytis','вчитися'],['pažymėjimas','посвідчення, сертифікат'],['išlaikyti egzaminą','скласти іспит'],['klausti','питати'],['atsakyti','відповідати']]},
  {id:'t3', lt:'Gamta, kraštas', ua:'Природа і край', week:5, words:[
    ['oras','погода'],['ežeras','озеро'],['miškas','ліс'],['jūra','море'],['upė','річка'],
    ['lyja','іде дощ'],['sninga','іде сніг'],['šalta','холодно'],['šilta','тепло'],['metų laikai','пори року']]},
  {id:'t7', lt:'Santykiai su žmonėmis', ua:'Стосунки з людьми', week:5, words:[
    ['draugas','друг'],['kolega','колега'],['susitikti','зустрітися'],['pakviesti','запросити'],['padėti','допомогти'],
    ['sveikinti','вітати'],['gimtadienis','день народження'],['dovana','подарунок'],['atsiprašyti','перепросити'],['susipažinti','познайомитися']]},
];

/* Граматика. summary — коротке правило для карток повторення. */
const RULES = [
{ id:'present', week:1, lt:'Esamasis laikas', ua:'Теперішній час і дієслово būti',
  summary:'Три групи за 3-ю особою: dirba (-a), turi (-i), skaito (-o). Būti: esu, esi, yra, esame, esate, yra.',
  theory:`
<p>Литовське дієслово в словнику дають трьома формами: <b class="lt">dirbti – dirba – dirbo</b> (неозначена форма – теперішній час – минулий). Саме 3-тя особа теперішнього часу (<span class="lt">dirba</span>) показує, як відмінювати.</p>
<div class="tblwrap"><table class="tbl"><tr><th></th><th>-a: dirbti</th><th>-i: turėti</th><th>-o: skaityti</th></tr>
<tr><td>aš</td><td>dirb<b>u</b></td><td>tur<b>iu</b></td><td>skait<b>au</b></td></tr>
<tr><td>tu</td><td>dirb<b>i</b></td><td>tur<b>i</b></td><td>skait<b>ai</b></td></tr>
<tr><td>jis, ji, jie</td><td>dirb<b>a</b></td><td>tur<b>i</b></td><td>skait<b>o</b></td></tr>
<tr><td>mes</td><td>dirb<b>ame</b></td><td>tur<b>ime</b></td><td>skait<b>ome</b></td></tr>
<tr><td>jūs</td><td>dirb<b>ate</b></td><td>tur<b>ite</b></td><td>skait<b>ote</b></td></tr></table></div>
<p><b>Неправильні, але найчастіші:</b> <span class="lt">būti</span> — esu, esi, <b>yra</b>, esame, esate, <b>yra</b>; <span class="lt">eiti</span> — einu, eini, eina.</p>
<p class="tip">3-тя особа однина й множина однакові: <span class="lt">jis dirba</span> = «він працює», <span class="lt">jie dirba</span> = «вони працюють». Це спрощує життя.</p>`,
  mistakes:[['Aš esu dirbu.','Aš dirbu.','Допоміжне «esu» перед іншим дієсловом не потрібне.'],['Aš turu.','Aš turiu.','turėti — група -i: turiu, turi.'],['Jie dirbia.','Jie dirba.','3-тя особа множини = 3-тя особа однини.']],
  ex:[
    {q:'Aš ___ Vilniuje.', o:['gyvenu','gyvena','gyveni'], ex:'gyventi – gyvena: aš gyven<b>u</b>.'},
    {q:'Mes ___ lietuviškai.', o:['kalbame','kalba','kalbate'], ex:'mes → -ame: kalb<b>ame</b>.'},
    {q:'Jis ___ knygą. (skaityti)', a:['skaito'], ex:'skaityti – skait<b>o</b> (група -o).'},
    {q:'Aš ___ du vaikus. (turėti)', a:['turiu'], ex:'turėti – tur<b>iu</b>, turi, turi.'},
    {q:'Jūs ___ iš Ukrainos?', o:['esate','esame','yra'], ex:'jūs esate — «ви є».'},
    {q:'Ji ___ parduotuvėje. (dirbti)', a:['dirba'], ex:'ji dirb<b>a</b>.'},
    {q:'Aš kasdien ___ į darbą pėsčias.', o:['einu','eina','eini'], ex:'eiti: ein<b>u</b>, eini, eina.'}
  ]},
{ id:'vietininkas', week:1, lt:'Vietininkas', ua:'Місцевий відмінок: де? (Kur?)',
  summary:'Де? → без прийменника: Kaunas→Kaune, Vilnius→Vilniuje, Lietuva→Lietuvoje, gatvė→gatvėje, kambarys→kambaryje.',
  theory:`
<p>На питання <b class="lt">Kur?</b> (де?) литовська <b>не використовує прийменник</b> — змінюється тільки закінчення. Українське «у Вільнюсі» = <span class="lt">Vilniuje</span>.</p>
<div class="tblwrap"><table class="tbl"><tr><th>Називний</th><th>Де?</th><th>Приклад</th></tr>
<tr><td>-as</td><td>-<b>e</b></td><td>miestas → mieste, Kaunas → Kaune</td></tr>
<tr><td>-is, -ys</td><td>-<b>yje</b></td><td>kambarys → kambaryje, Panevėžys → Panevėžyje</td></tr>
<tr><td>-us</td><td>-<b>uje</b></td><td>Vilnius → Vilniuje</td></tr>
<tr><td>-a</td><td>-<b>oje</b></td><td>Lietuva → Lietuvoje, mokykla → mokykloje</td></tr>
<tr><td>-ė</td><td>-<b>ėje</b></td><td>gatvė → gatvėje, parduotuvė → parduotuvėje</td></tr>
<tr><td>множина</td><td>-<b>uose / -ose / -ėse</b></td><td>namuose, parduotuvėse</td></tr></table></div>
<p class="tip">Де? → <span class="lt">esu darbe</span> (місцевий). Куди? → <span class="lt">einu į darbą</span> (прийменник <b>į</b> + знахідний). Плутати їх — найчастіша помилка.</p>
<p>Вдома — <span class="lt">namie</span> або <span class="lt">namuose</span>.</p>`,
  mistakes:[['Aš gyvenu į Vilniuje.','Aš gyvenu Vilniuje.','«Де?» — без прийменника.'],['Einu mokykloje.','Einu į mokyklą.','Рух «куди?» = į + знахідний.']],
  ex:[
    {q:'Aš gyvenu ___.', o:['Kaune','Kaunas','Kauną'], ex:'Kaunas → Kaun<b>e</b>.'},
    {q:'Mano brolis gyvena ___. (Ukraina)', a:['Ukrainoje'], ex:'-a → -<b>oje</b>: Ukrainoje.'},
    {q:'Knyga yra ___.', o:['kambaryje','kambarys','kambario'], ex:'kambarys → kambar<b>yje</b>.'},
    {q:'Susitiksime ___. (kavinė)', a:['kavinėje'], ex:'-ė → -<b>ėje</b>.'},
    {q:'Vaikai dabar ___.', o:['mokykloje','mokykla','mokyklą'], ex:'Де? — mokykl<b>oje</b>.'},
    {q:'Оберіть правильне речення:', o:['Aš gyvenu Vilniuje.','Aš gyvenu į Vilniuje.','Aš gyvenu Vilnių.'], ex:'Місце — без прийменника: Vilniuje.'},
    {q:'Dirbu ___. (parduotuvė)', a:['parduotuvėje'], ex:'parduotuvė → parduotuv<b>ėje</b>.'}
  ]},
{ id:'kilmininkas', week:1, lt:'Kilmininkas', ua:'Родовий відмінок: кого? чого? (Ko?)',
  summary:'Ko? — заперечення (neturiu laiko), кількість (daug žmonių), належність (brolio), після iš, be, prie, nuo, iki, po.',
  theory:`
<p>Родовий — найпотрібніший відмінок на іспиті. Він відповідає на питання <b class="lt">Ko?</b> і вживається:</p>
<ul>
<li><b>заперечення:</b> <span class="lt">Neturiu laiko. Nėra pieno.</span> (як українське «не маю часу»)</li>
<li><b>кількість:</b> <span class="lt">daug žmonių, kilogramas obuolių, butelis vandens</span></li>
<li><b>належність:</b> <span class="lt">brolio automobilis</span> — машина брата</li>
<li><b>після прийменників</b> <span class="lt">iš, be, prie, nuo, iki, po</span>: iš Ukrainos, be cukraus, prie namo, nuo pirmadienio iki penktadienio, po darbo</li>
<li><b>дати:</b> <span class="lt">lapkričio 21 d.</span> — місяць у родовому</li></ul>
<div class="tblwrap"><table class="tbl"><tr><th>Називний</th><th>Ko? (одн.)</th><th>Ko? (мн.)</th></tr>
<tr><td>namas</td><td>nam<b>o</b></td><td>nam<b>ų</b></td></tr>
<tr><td>brolis, kambarys</td><td>brol<b>io</b>, kambar<b>io</b></td><td>brol<b>ių</b></td></tr>
<tr><td>sūnus</td><td>sūn<b>aus</b></td><td>sūn<b>ų</b></td></tr>
<tr><td>mama</td><td>mam<b>os</b></td><td>mam<b>ų</b></td></tr>
<tr><td>gatvė</td><td>gatv<b>ės</b></td><td>gatv<b>ių</b></td></tr></table></div>
<p class="tip">Множина родового майже завжди закінчується на <b>-ų</b>. Почули «-ų» — це «багато чого».</p>`,
  mistakes:[['Neturiu laiką.','Neturiu laiko.','Після заперечення — родовий.'],['Esu iš Ukraina.','Esu iš Ukrainos.','iš + родовий.']],
  ex:[
    {q:'Atsiprašau, neturiu ___.', o:['laiko','laikas','laiką'], ex:'Заперечення → родовий: laik<b>o</b>.'},
    {q:'Esu iš ___. (Ukraina)', a:['Ukrainos'], ex:'iš + родовий: Ukrain<b>os</b>.'},
    {q:'Prašau kavos be ___.', o:['cukraus','cukrus','cukrų'], ex:'be + родовий; cukrus → cukr<b>aus</b>.'},
    {q:'Parduotuvėje nėra ___. (pienas)', a:['pieno'], ex:'nėra + родовий: pien<b>o</b>.'},
    {q:'Nupirkau kilogramą ___.', o:['obuolių','obuoliai','obuolius'], ex:'Кількість → родовий множини -<b>ų</b>.'},
    {q:'Dirbu nuo pirmadienio iki ___. (penktadienis)', a:['penktadienio'], ex:'iki + родовий: penktadien<b>io</b>.'},
    {q:'Tai mano ___ automobilis.', o:['brolio','brolis','broliui'], ex:'Чий? → родовий: brol<b>io</b>.'}
  ]},
{ id:'galininkas', week:2, lt:'Galininkas', ua:'Знахідний відмінок: кого? що? куди? коли?',
  summary:'Ką? — пряма дія (perku duoną), куди: į + Ką (į Kauną), коли: pirmadienį, kiekvieną dieną; man skauda galvą.',
  theory:`
<p>Знахідний (<b class="lt">Ką?</b>) — це об’єкт дії, напрямок і час:</p>
<ul><li><b>об’єкт:</b> <span class="lt">perku duoną, matau draugą, mėgstu kavą</span></li>
<li><b>куди:</b> <span class="lt">į</span> + знахідний — <span class="lt">einu į parduotuvę, važiuoju į Kauną</span></li>
<li><b>коли (дні):</b> <span class="lt">pirmadienį, šeštadienį, kiekvieną dieną</span> — без прийменника!</li>
<li><b>що болить:</b> <span class="lt">Man skauda galvą / pilvą / dantį.</span></li></ul>
<div class="tblwrap"><table class="tbl"><tr><th>Називний</th><th>Ką? (одн.)</th><th>Ką? (мн.)</th></tr>
<tr><td>-as: namas</td><td>nam<b>ą</b></td><td>nam<b>us</b></td></tr>
<tr><td>-is, -ys: brolis</td><td>brol<b>į</b></td><td>brol<b>ius</b></td></tr>
<tr><td>-us: sūnus</td><td>sūn<b>ų</b></td><td>sūn<b>us</b></td></tr>
<tr><td>-a: duona</td><td>duon<b>ą</b></td><td>duon<b>as</b></td></tr>
<tr><td>-ė: gatvė</td><td>gatv<b>ę</b></td><td>gatv<b>es</b></td></tr></table></div>
<p class="tip">Носові літери <b>ą, ę, į, ų</b> у кінці слова — майже завжди знахідний однини. Вимовляються як довгі а, е, і, у.</p>`,
  mistakes:[['Einu parduotuvėje.','Einu į parduotuvę.','Куди? = į + знахідний.'],['Pirmadienyje dirbu.','Pirmadienį dirbu.','Дні тижня «коли?» — знахідний.']],
  ex:[
    {q:'Aš labai mėgstu ___.', o:['kavą','kava','kavos'], ex:'mėgti ką? → kav<b>ą</b>.'},
    {q:'Rytoj važiuosiu į ___. (Kaunas)', a:['Kauną'], ex:'į + знахідний: Kaun<b>ą</b>.'},
    {q:'Susitiksime ___.', o:['šeštadienį','šeštadienis','šeštadienyje'], ex:'Коли? День тижня → šeštadien<b>į</b>.'},
    {q:'Man skauda ___. (galva)', a:['galvą'], ex:'skauda ką? → galv<b>ą</b>.'},
    {q:'Einu į ___.', o:['vaistinę','vaistinė','vaistinėje'], ex:'į + знахідний: vaistin<b>ę</b>.'},
    {q:'Aš perku ___ ir pieną. (duona)', a:['duoną'], ex:'perku ką? → duon<b>ą</b>.'}
  ]},
{ id:'sangrazos', week:2, lt:'Sangrąžiniai veiksmažodžiai', ua:'Зворотні дієслова на -si (keltis, mokytis)',
  summary:'-si = українське -ся: keliuosi, mokausi. З префіксом -si- стає всередину: atsikeliu; з запереченням: nesikeliu.',
  theory:`
<p>Литовське <b>-si</b> = українське <b>-ся</b>: <span class="lt">keltis</span> — вставати, <span class="lt">mokytis</span> — вчитися, <span class="lt">praustis</span> — умиватися, <span class="lt">rengtis</span> — одягатися.</p>
<div class="tblwrap"><table class="tbl"><tr><th></th><th>keltis</th><th>mokytis</th></tr>
<tr><td>aš</td><td>keliu<b>osi</b></td><td>moka<b>usi</b></td></tr>
<tr><td>tu</td><td>kelie<b>si</b></td><td>mokai<b>si</b></td></tr>
<tr><td>jis, jie</td><td>kelia<b>si</b></td><td>moko<b>si</b></td></tr>
<tr><td>mes</td><td>keliam<b>ės</b></td><td>mokom<b>ės</b></td></tr>
<tr><td>jūs</td><td>keliat<b>ės</b></td><td>mokot<b>ės</b></td></tr></table></div>
<p><b>Префікс або «ne-»</b> забирає -si- до себе: <span class="lt">atsikelti → atsikeliu</span>, <span class="lt">susitikti → susitinkame</span>, <span class="lt">nesikeliu</span> (не встаю).</p>
<p class="tip">Готова фраза для говоріння: <span class="lt">Keliuosi septintą valandą, prausiuosi, pusryčiauju ir važiuoju į darbą.</span></p>`,
  mistakes:[['Aš mokau lietuvių kalbos.','Aš mokausi lietuvių kalbos.','mokyti — вчити когось, mokytis — вчитися самому.'],['Nekeliuosi anksti.','Nesikeliu anksti.','Заперечення: ne + si + дієслово.']],
  ex:[
    {q:'Aš ___ lietuvių kalbos.', o:['mokausi','mokau','mokosi'], ex:'Вчуся сам → mok<b>ausi</b>.'},
    {q:'Kiekvieną rytą aš ___ septintą valandą. (keltis)', a:['keliuosi'], ex:'aš keliu<b>osi</b>.'},
    {q:'Kaip jūs ___?', o:['jaučiatės','jaučiate','jaučiasi'], ex:'jaustis: jūs jaučiat<b>ės</b>.'},
    {q:'Mes dažnai ___ prie stoties. (susitikti)', a:['susitinkame'], ex:'susitikti → mes susitinkame (si після префікса su-).'},
    {q:'Šeštadieniais aš ___ anksti.', o:['nesikeliu','nekeliuosi','nekeliu'], ex:'ne + si + keliu = <b>nesikeliu</b>.'},
    {q:'Jis ___ istorija.', o:['domisi','domi','domiasi'], ex:'domėtis (цікавитися) — jis domisi + орудний.'}
  ]},
{ id:'skaiciai', week:2, lt:'Skaitvardžiai, laikas, kainos', ua:'Числа, час, ціни й дати',
  summary:'1, 21 → euras; 2–9 → eurai; 10–20, 30… → eurų. Kelintą valandą? → septintą. 7:30 = pusė aštuonių. Дата: lapkričio 21 d.',
  theory:`
<p><b>1–10:</b> vienas, du, trys, keturi, penki, šeši, septyni, aštuoni, devyni, dešimt. <b>11–19:</b> vienuolika, dvylika, trylika… (-lika). <b>Десятки:</b> dvidešimt, trisdešimt, keturiasdešimt… šimtas (100), tūkstantis (1000).</p>
<div class="tblwrap"><table class="tbl"><tr><th>Число закінчується на</th><th>Форма</th><th>Приклад</th></tr>
<tr><td>1 (крім 11)</td><td>називний однини</td><td>vienas euras, dvidešimt vienas euras</td></tr>
<tr><td>2–9 (крім 12–19)</td><td>називний множини</td><td>du eurai, penki eurai</td></tr>
<tr><td>10–20, 30, 40…</td><td>родовий множини</td><td>dešimt eurų, penkiolika eurų</td></tr></table></div>
<p><b>Час:</b> <span class="lt">Kelinta valanda?</span> — <span class="lt">Dabar trečia.</span> <span class="lt">Kelintą valandą?</span> (о котрій?) — <span class="lt">Septintą valandą.</span> 7:30 — <span class="lt">pusė aštuonių</span> (як «пів на восьму»).</p>
<p><b>Дати:</b> місяць у родовому: <span class="lt">sausio, vasario, kovo, balandžio, gegužės, birželio, liepos, rugpjūčio, rugsėjo, spalio, lapkričio, gruodžio</span>. <span class="lt">Lapkričio 21 d.</span></p>
<p><b>Дні:</b> pirmadienis (пн) … sekmadienis (нд). У розкладах пишуть римськими: <b>I–V</b> = пн–пт, <b>VI</b> = сб, <b>VII</b> = нд.</p>
<p class="tip">Вік: «роки» — <span class="lt">metai</span>, тільки множина, тому особливі числівники: <span class="lt">Man keturiasdešimt šešeri metai.</span> (Мені 46 років.)</p>`,
  mistakes:[['penkiolika eurai','penkiolika eurų','10–20 → родовий множини.'],['Septinta valandą susitiksime.','Septintą valandą susitiksime.','«О котрій?» — знахідний: septintą.']],
  ex:[
    {q:'Bilietas kainuoja penkiolika ___.', o:['eurų','euras','eurai'], ex:'11–19 → родовий множини: eur<b>ų</b>.'},
    {q:'Kava kainuoja du ___.', o:['eurai','euras','eurų'], ex:'2–9 → називний множини: eur<b>ai</b>.'},
    {q:'«Pusė aštuonių» — це…', o:['7:30','8:30','8:00'], ex:'«Половина восьмої» = 7:30.'},
    {q:'Susitiksime ___ valandą. (septinta)', a:['septintą'], ex:'О котрій? → septint<b>ą</b>.'},
    {q:'Mano gimtadienis — ___ 5 d.', o:['gegužės','gegužė','gegužę'], ex:'Дата: місяць у родовому — gegužės.'},
    {q:'Parduotuvė dirba 8–20 val. Kada ji uždaroma?', o:['aštuntą vakaro','aštuntą ryto','dvidešimt minučių'], ex:'20 val. = восьма вечора.'},
    {q:'«VI 9–14» у розкладі означає:', o:['субота, 9:00–14:00','шостого числа','6 годин'], ex:'VI = šeštadienis (субота).'}
  ]},
{ id:'naudininkas', week:3, lt:'Naudininkas', ua:'Давальний відмінок: кому? (Kam?)',
  summary:'Kam? man, tau, jam, jai, mums, jums. Man patinka / reikia / skauda; Man 46 metai; skambinu draugui.',
  theory:`
<p>Давальний (<b class="lt">Kam?</b>) — «кому». У литовській він стоїть там, де українець часто ставить «я»:</p>
<ul><li><span class="lt">Man patinka</span> — мені подобається</li>
<li><span class="lt">Man reikia</span> — мені треба</li>
<li><span class="lt">Man skauda galvą</span> — у мене болить голова</li>
<li><span class="lt">Man 46 metai</span> — мені 46</li>
<li><span class="lt">Kaip jums sekasi?</span> — як у вас справи?</li>
<li><span class="lt">skambinti, duoti, padėti</span> + кому: <span class="lt">skambinu draugui</span></li></ul>
<div class="tblwrap"><table class="tbl"><tr><th>Займенник</th><th>Kam?</th><th>Іменник</th><th>Kam?</th></tr>
<tr><td>aš / tu</td><td>man / tau</td><td>draugas</td><td>draug<b>ui</b></td></tr>
<tr><td>jis / ji</td><td>jam / jai</td><td>brolis</td><td>brol<b>iui</b></td></tr>
<tr><td>mes / jūs</td><td>mums / jums</td><td>žmona</td><td>žmon<b>ai</b></td></tr>
<tr><td>jie / jos</td><td>jiems / joms</td><td>kaimynė</td><td>kaimyn<b>ei</b></td></tr></table></div>`,
  mistakes:[['Aš patinka Lietuva.','Man patinka Lietuva.','Хто відчуває — у давальному.'],['Aš reikia gydytojo.','Man reikia gydytojo.','reikia + кому + чого.']],
  ex:[
    {q:'___ patinka Lietuva.', o:['Man','Aš','Mane'], ex:'Кому подобається? → <b>Man</b>.'},
    {q:'Kiek ___ metų? (jūs)', a:['jums'], ex:'Kiek <b>jums</b> metų? — Скільки вам років?'},
    {q:'Vakare paskambinsiu ___.', o:['draugui','draugas','draugą'], ex:'skambinti kam? → draug<b>ui</b>.'},
    {q:'___ reikia gydytojo. (aš)', a:['Man'], ex:'<b>Man</b> reikia…'},
    {q:'Dovaną nupirkau ___.', o:['žmonai','žmona','žmonos'], ex:'Кому? → žmon<b>ai</b>.'},
    {q:'Kaip ___ sekasi?', o:['tau','tu','tave'], ex:'Kaip <b>tau</b> sekasi? — Як справи?'}
  ]},
{ id:'tariamoji', week:3, lt:'Tariamoji nuosaka', ua:'Ввічливі прохання: norėčiau, galėtumėte',
  summary:'Ввічливо: Norėčiau… (я б хотів), Ar galėtumėte…? (чи не могли б ви). Утворення: -ti → -čiau (aš), -tumėte (jūs).',
  theory:`
<p>Умовний спосіб — це «чарівні слова» для пошти, лікарні, магазину. Утворюється від неозначеної форми:</p>
<div class="tblwrap"><table class="tbl"><tr><th></th><th>norėti</th><th>galėti</th></tr>
<tr><td>aš</td><td>norė<b>čiau</b></td><td>galė<b>čiau</b></td></tr>
<tr><td>tu</td><td>norė<b>tum</b></td><td>galė<b>tum</b></td></tr>
<tr><td>jis, ji</td><td>norė<b>tų</b></td><td>galė<b>tų</b></td></tr>
<tr><td>jūs</td><td>norė<b>tumėte</b></td><td>galė<b>tumėte</b></td></tr></table></div>
<p><b>Готові фрази:</b></p>
<ul><li><span class="lt">Norėčiau užsiregistruoti pas gydytoją.</span> — Я хотів би записатися до лікаря.</li>
<li><span class="lt">Ar galėtumėte pakartoti?</span> — Чи не могли б ви повторити?</li>
<li><span class="lt">Gal galite kalbėti lėčiau?</span> — Можете говорити повільніше?</li>
<li><span class="lt">Prašau kavos.</span> — Каву, будь ласка (prašau + родовий).</li></ul>
<p><b>Наказовий</b> (інструкції, оголошення): <span class="lt">-k / -kite</span>: <span class="lt">palaukite</span> — зачекайте, <span class="lt">paskambinkite</span> — зателефонуйте, <span class="lt">atsineškite</span> — візьміть із собою.</p>`,
  mistakes:[['Aš noriu kavą.','Norėčiau kavos.','Ввічливіше — умовний спосіб і родовий.'],['Kalbėk lėčiau!','Gal galite kalbėti lėčiau?','До незнайомих — на «ви» і з «gal / ar galėtumėte».']],
  ex:[
    {q:'___ užsisakyti staliuką dviem.', o:['Norėčiau','Norėjau','Norės'], ex:'Ввічливо зараз → <b>Norėčiau</b>.'},
    {q:'Ar ___ pakartoti?', o:['galėtumėte','galėjote','galėsite'], ex:'Ввічливе прохання до «ви» → galė<b>tumėte</b>.'},
    {q:'Aš ___ kavos su pienu. (norėti, ввічливо)', a:['norėčiau'], ex:'norėti → norė<b>čiau</b>.'},
    {q:'Prašau ___. (кави)', o:['kavos','kava','kavą'], ex:'prašau + родовий: kav<b>os</b>.'},
    {q:'Як ввічливо попросити говорити повільніше?', o:['Gal galite kalbėti lėčiau?','Kalbėk lėčiau!','Kalbate lėtai.'], ex:'Ввічлива рятівна фраза для іспиту.'},
    {q:'Ar ___ man padėti? (galėti, jūs)', a:['galėtumėte'], ex:'jūs → galė<b>tumėte</b>.'}
  ]},
{ id:'butasis', week:4, lt:'Būtasis kartinis laikas', ua:'Минулий час',
  summary:'Дві групи за 3-ю особою: dirbo (-o): dirbau, dirbai, dirbo; skaitė (-ė): skaičiau, skaitei, skaitė. Būti: buvau, buvo.',
  theory:`
<p>Третя форма словника показує минулий час: <span class="lt">dirbti – dirba – <b>dirbo</b></span>, <span class="lt">skaityti – skaito – <b>skaitė</b></span>.</p>
<div class="tblwrap"><table class="tbl"><tr><th></th><th>-o: dirbti</th><th>-ė: skaityti</th><th>būti</th></tr>
<tr><td>aš</td><td>dirb<b>au</b></td><td>skaič<b>iau</b></td><td>buvau</td></tr>
<tr><td>tu</td><td>dirb<b>ai</b></td><td>skait<b>ei</b></td><td>buvai</td></tr>
<tr><td>jis, jie</td><td>dirb<b>o</b></td><td>skait<b>ė</b></td><td>buvo</td></tr>
<tr><td>mes</td><td>dirb<b>ome</b></td><td>skait<b>ėme</b></td><td>buvome</td></tr>
<tr><td>jūs</td><td>dirb<b>ote</b></td><td>skait<b>ėte</b></td><td>buvote</td></tr></table></div>
<p><b>Вивчіть трійки:</b> eiti – eina – <b>ėjo</b>; važiuoti – važiuoja – <b>važiavo</b>; gyventi – gyvena – <b>gyveno</b>; pirkti – perka – <b>pirko</b>; matyti – mato – <b>matė</b>; valgyti – valgo – <b>valgė</b>; gerti – geria – <b>gėrė</b>.</p>
<p class="tip">Для групи -ė: т → č, д → dž перед -iau: matyti → <b>mačiau</b>, skaityti → <b>skaičiau</b>.</p>`,
  mistakes:[['Vakar aš esu namie.','Vakar aš buvau namie.','vakar (учора) → минулий час.'],['Aš matau filmą vakar.','Vakar mačiau filmą.','matyti → mačiau.']],
  ex:[
    {q:'Vakar aš ___ namie.', o:['buvau','esu','būsiu'], ex:'Учора → <b>buvau</b>.'},
    {q:'Praėjusią savaitę mes ___ į Kauną. (važiuoti)', a:['važiavome'], ex:'važiuoti – važiavo → mes važiav<b>ome</b>.'},
    {q:'Vakar jis ___ įdomų filmą.', o:['matė','mato','matys'], ex:'matyti – matė.'},
    {q:'Anksčiau aš ___ Kyjive. (gyventi)', a:['gyvenau'], ex:'gyventi – gyveno → aš gyven<b>au</b>.'},
    {q:'Ką tu ___ vakar?', o:['veikei','veiki','veiksi'], ex:'veikti – veikė → tu veik<b>ei</b>.'},
    {q:'Vakar aš ___ naują telefoną. (pirkti)', a:['pirkau'], ex:'pirkti – perka – pirko → pirk<b>au</b>.'}
  ]},
{ id:'busimasis', week:4, lt:'Būsimasis laikas', ua:'Майбутній час',
  summary:'Основа неозначеної форми без -ti + s: dirbsiu, dirbsi, dirbs, dirbsime, dirbsite. Būti: būsiu, bus.',
  theory:`
<p>Найпростіший час: беремо неозначену форму, відкидаємо <b>-ti</b> і додаємо <b>-s-</b> з закінченням.</p>
<div class="tblwrap"><table class="tbl"><tr><th></th><th>dirbti</th><th>važiuoti</th><th>būti</th></tr>
<tr><td>aš</td><td>dirb<b>siu</b></td><td>važiuo<b>siu</b></td><td>būsiu</td></tr>
<tr><td>tu</td><td>dirb<b>si</b></td><td>važiuo<b>si</b></td><td>būsi</td></tr>
<tr><td>jis, jie</td><td>dirb<b>s</b></td><td>važiuo<b>s</b></td><td><b>bus</b></td></tr>
<tr><td>mes</td><td>dirb<b>sime</b></td><td>važiuo<b>sime</b></td><td>būsime</td></tr>
<tr><td>jūs</td><td>dirb<b>site</b></td><td>važiuo<b>site</b></td><td>būsite</td></tr></table></div>
<p>Якщо основа закінчується на s, z, š, ž — зайве s зливається: <span class="lt">nešti → nešiu, neš</span>.</p>
<p class="tip">Слова-маркери: <span class="lt">rytoj</span> (завтра), <span class="lt">poryt</span> (післязавтра), <span class="lt">kitą savaitę</span> (наступного тижня), <span class="lt">vasarą</span> (влітку).</p>`,
  mistakes:[['Rytoj aš buvau namie.','Rytoj būsiu namie.','rytoj → майбутній.'],['Rytoj bus šaltas.','Rytoj bus šalta.','Про погоду — šalta, šilta (без -as).']],
  ex:[
    {q:'Rytoj aš ___ namie.', o:['būsiu','buvau','esu'], ex:'Завтра → <b>būsiu</b>.'},
    {q:'Kitą savaitę mes ___ prie jūros. (važiuoti)', a:['važiuosime'], ex:'važiuo + <b>sime</b>.'},
    {q:'Rytoj ___ šalta.', o:['bus','buvo','yra'], ex:'būti → jis <b>bus</b>.'},
    {q:'Ar tu ___ šeštadienį? (ateiti)', a:['ateisi'], ex:'ateiti → atei<b>si</b>.'},
    {q:'Rytoj po darbo aš ___ vakarienę.', o:['gaminsiu','gaminau','gaminu'], ex:'gaminti → gamin<b>siu</b>.'},
    {q:'Vasarą jie ___ Klaipėdoje. (dirbti)', a:['dirbs'], ex:'jie dirb<b>s</b>.'}
  ]},
{ id:'inagininkas', week:4, lt:'Įnagininkas', ua:'Орудний відмінок: з ким? чим? (Su kuo? Kuo?)',
  summary:'su draugu, su žmona; važiuoju autobusu (без su!); dirbu vairuotoju; kava su pienu.',
  theory:`
<ul><li><b>з ким / з чим:</b> <span class="lt">su draugu, su žmona, kava su pienu</span></li>
<li><b>транспорт — БЕЗ su:</b> <span class="lt">važiuoju autobusu, traukiniu, automobiliu, dviračiu</span></li>
<li><b>ким працюю:</b> <span class="lt">dirbu vairuotoju, statybininku, mokytoja</span></li>
<li><b>цікавлюся чим:</b> <span class="lt">domiuosi krepšiniu</span></li></ul>
<div class="tblwrap"><table class="tbl"><tr><th>Називний</th><th>Kuo? (одн.)</th><th>Kuo? (мн.)</th></tr>
<tr><td>draugas</td><td>draug<b>u</b></td><td>draug<b>ais</b></td></tr>
<tr><td>brolis, traukinys</td><td>brol<b>iu</b>, traukin<b>iu</b></td><td>brol<b>iais</b></td></tr>
<tr><td>sūnus</td><td>sūn<b>umi</b></td><td>sūn<b>umis</b></td></tr>
<tr><td>žmona</td><td>žmon<b>a</b></td><td>žmon<b>omis</b></td></tr>
<tr><td>kaimynė</td><td>kaimyn<b>e</b></td><td>kaimyn<b>ėmis</b></td></tr></table></div>
<p class="tip">Жіночі на -a в орудному пишуться так само, як у називному (<span class="lt">su šeima</span>), різниця лише в наголосі.</p>`,
  mistakes:[['Važiuoju su autobusu.','Važiuoju autobusu.','Транспорт — орудний без su.'],['Dirbu kaip vairuotojas.','Dirbu vairuotoju.','Професія — орудний.']],
  ex:[
    {q:'Į darbą važiuoju ___.', o:['autobusu','autobusas','autobusą'], ex:'Чим? → autobus<b>u</b>, без su.'},
    {q:'Gyvenu su ___. (šeima)', a:['šeima'], ex:'su + орудний: šeima (пишеться так само).'},
    {q:'Prašau kavos su ___.', o:['pienu','pienas','pieno'], ex:'su + орудний: pien<b>u</b>.'},
    {q:'Dirbu ___. (vairuotojas)', a:['vairuotoju'], ex:'Ким? → vairuotoj<b>u</b>.'},
    {q:'Savaitgalį einu į parką su ___.', o:['vaikais','vaikai','vaikų'], ex:'Множина орудного: vaik<b>ais</b>.'},
    {q:'Оберіть правильне речення:', o:['Važiuoju traukiniu į Kauną.','Važiuoju su traukiniu į Kauną.','Važiuoju traukinį į Kauną.'], ex:'Транспорт → орудний без su.'}
  ]},
{ id:'budvardziai', week:5, lt:'Būdvardžiai', ua:'Прикметники: рід і узгодження',
  summary:'Узгоджуємо з іменником: geras namas / gera knyga; gražus / graži; didelis / didelė. Порівняння: didesnis.',
  theory:`
<div class="tblwrap"><table class="tbl"><tr><th>Чоловічий</th><th>Жіночий</th><th>Мн. ч. / ж.</th></tr>
<tr><td>gera<b>s</b> butas</td><td>ger<b>a</b> virtuvė</td><td>ger<b>i</b> / ger<b>os</b></td></tr>
<tr><td>graž<b>us</b></td><td>graž<b>i</b></td><td>graž<b>ūs</b> / graž<b>ios</b></td></tr>
<tr><td>didel<b>is</b></td><td>didel<b>ė</b></td><td>didel<b>i</b> / didel<b>ės</b></td></tr></table></div>
<p><b>Пари для опису:</b> naujas – senas, didelis – mažas, brangus – pigus, šviesus – tamsus, šiltas – šaltas, patogus (зручний), ramus (спокійний).</p>
<p><b>Де?</b> <span class="lt">naujame name</span>, <span class="lt">naujoje virtuvėje</span>. <b>Порівняння:</b> <span class="lt">didesnis, geresnis, pigesnis</span> (-esnis). <span class="lt">Ar turite didesnį dydį?</span></p>
<p class="tip">Про погоду й відчуття — середня форма без закінчення роду: <span class="lt">šalta, šilta, gera, gražu</span>. <span class="lt">Šiandien šalta.</span></p>`,
  mistakes:[['Mano virtuvė didelis.','Mano virtuvė didelė.','virtuvė — жіночого роду.'],['Lauke yra šaltas.','Lauke šalta.','Погода — безродова форма.']],
  ex:[
    {q:'Mano butas yra ___.', o:['šviesus','šviesi','šviesios'], ex:'butas (ч. р.) → šviesus.'},
    {q:'Ta gatvė labai ___.', o:['graži','gražus','gražų'], ex:'gatvė (ж. р.) → graži.'},
    {q:'Mano virtuvė ___. (didelis)', a:['didelė'], ex:'virtuvė (ж. р.) → didel<b>ė</b>.'},
    {q:'Gyvenu ___ name.', o:['naujame','naujas','naujoje'], ex:'Де? name (ч. р.) → naujame.'},
    {q:'Šis megztinis per mažas. Ar turite ___?', o:['didesnį','didelis','didesnė'], ex:'turite ką? → didesn<b>į</b> (знахідний).'},
    {q:'Obuoliai šiandien labai ___.', o:['pigūs','pigus','pigi'], ex:'obuoliai (мн. ч. р.) → pigūs.'}
  ]},
{ id:'jungtukai', week:5, lt:'Jungtukai', ua:'Сполучники: nes, todėl, kai, jeigu, kad',
  summary:'ir (і), o (а), bet (але), nes (бо), todėl (тому), kai (коли), jeigu (якщо), kad (що), ar (чи). Їх оцінюють у листі!',
  theory:`
<p>На письмовому іспиті оцінюють <b>зв’язність</b>: чи вміє кандидат поєднати речення. 5–6 сполучників у листі — і бал за текст вищий.</p>
<div class="tblwrap"><table class="tbl"><tr><th>Литовською</th><th>Українською</th><th>Приклад</th></tr>
<tr><td>ir</td><td>і</td><td>Dirbu ir mokausi.</td></tr>
<tr><td>o</td><td>а</td><td>Aš mėgstu kavą, o žmona – arbatą.</td></tr>
<tr><td>bet</td><td>але</td><td>Norėčiau ateiti, bet neturiu laiko.</td></tr>
<tr><td>nes</td><td>бо</td><td>Liksiu namie, nes sergu.</td></tr>
<tr><td>todėl</td><td>тому</td><td>Lijo, todėl likau namie.</td></tr>
<tr><td>kai</td><td>коли</td><td>Kai grįžtu iš darbo, ilsiuosi.</td></tr>
<tr><td>jeigu / jei</td><td>якщо</td><td>Jeigu bus gražu, važiuosime prie ežero.</td></tr>
<tr><td>kad</td><td>що</td><td>Žinau, kad tu užsiėmęs.</td></tr>
<tr><td>ar</td><td>чи</td><td>Parašyk, ar galėsi ateiti.</td></tr></table></div>
<p class="tip"><b>nes</b> = причина (бо…), <b>todėl</b> = наслідок (тому…). Перед обома ставимо кому.</p>`,
  mistakes:[['Lijo, nes likau namie.','Lijo, todėl likau namie.','Дощ — причина, лишився вдома — наслідок → todėl.']],
  ex:[
    {q:'Šiandien neisiu į darbą, ___ sergu.', o:['nes','todėl','bet'], ex:'Причина → <b>nes</b> (бо).'},
    {q:'Lijo lietus, ___ likau namie.', o:['todėl','nes','kad'], ex:'Наслідок → <b>todėl</b>.'},
    {q:'___ bus gražus oras, važiuosime prie ežero.', o:['Jeigu','Nes','Bet'], ex:'Умова → <b>Jeigu</b>.'},
    {q:'Aš mėgstu kavą, ___ žmona mėgsta arbatą.', o:['o','nes','kad'], ex:'Протиставлення «а» → <b>o</b>.'},
    {q:'Žinau, ___ tu esi užsiėmęs.', o:['kad','kai','ar'], ex:'«що» → <b>kad</b>.'},
    {q:'___ grįžtu iš darbo, gaminu vakarienę.', o:['Kai','Nes','Todėl'], ex:'«коли» → <b>Kai</b>.'},
    {q:'Paklausk, ___ parduotuvė dar dirba.', o:['ar','kad','nes'], ex:'«чи» → <b>ar</b>.'}
  ]},
];

/* Шпаргалка відмінків (схема) */
const CASES = [
  ['Vardininkas','Kas?','хто? що?','namas, mama'],
  ['Kilmininkas','Ko?','кого? чого?','namo, mamos'],
  ['Naudininkas','Kam?','кому?','namui, mamai'],
  ['Galininkas','Ką?','кого? що? куди?','namą, mamą'],
  ['Įnagininkas','Kuo?','ким? чим?','namu, mama'],
  ['Vietininkas','Kur? Kame?','де?','name, mamoje'],
];

/* Читання: тексти у стилі побутових текстів іспиту */
const READING = [
{ id:'r1', title:'Skelbimas: butas nuomai', ua:'Оголошення про оренду', week:1,
  text:'Išnuomojamas dviejų kambarių butas Kaune, Šilainiuose. Butas yra trečiame aukšte, su balkonu. Kaina – 450 eurų per mėnesį, mokesčiai atskirai. Galima gyventi su gyvūnais. Skambinkite vakarais nuo 18 iki 21 val. Tel. +370 612 34567.',
  gloss:[['išnuomojamas','здається в оренду'],['mokesčiai atskirai','комунальні окремо'],['gyvūnai','тварини']],
  q:[{q:'Kiek kambarių yra bute?', o:['du','vienas','trys']},
     {q:'Kokiame aukšte yra butas?', o:['trečiame','antrame','ketvirtame']},
     {q:'Kada galima skambinti?', o:['vakarais','rytais','visą dieną']},
     {q:'Ar mokesčiai įskaičiuoti į kainą?', o:['ne, mokami atskirai','taip','nežinoma']}]},
{ id:'r2', title:'Klinikos darbo laikas', ua:'Графік роботи клініки', week:2,
  text:'Šeimos klinika „Sveikata“. Darbo laikas: I–V 7.30–20.00, VI 9.00–14.00, VII nedirbame. Registracija telefonu arba internetu. Kraujo tyrimai – darbo dienomis nuo 7.30 iki 10.00. Atsineškite asmens dokumentą.',
  gloss:[['kraujo tyrimai','аналізи крові'],['atsineškite','візьміть із собою'],['nedirbame','не працюємо']],
  q:[{q:'Kada klinika nedirba?', o:['sekmadienį','šeštadienį','pirmadienį']},
     {q:'Iki kelintos valandos galima atlikti kraujo tyrimus?', o:['iki 10.00','iki 14.00','iki 20.00']},
     {q:'Ką reikia atsinešti?', o:['asmens dokumentą','receptą','nuotrauką']}]},
{ id:'r3', title:'Laiškas iš Palangos', ua:'Лист з Паланги', week:2,
  text:'Labas, Petrai! Rašau iš Palangos. Čia jau trečia diena. Oras puikus, kasdien maudomės jūroje. Gyvename nedideliame viešbutyje prie parko. Vakar buvome Gintaro muziejuje – labai įdomu! Grįšime sekmadienį vakare autobusu. Iki susitikimo! Andrius',
  gloss:[['maudomės','купаємося'],['gintaras','бурштин'],['grįšime','повернемося']],
  q:[{q:'Kur dabar yra Andrius?', o:['Palangoje','Vilniuje','Kaune']},
     {q:'Kur jie gyvena?', o:['viešbutyje','pas draugus','kempinge']},
     {q:'Ką jie veikė vakar?', o:['buvo muziejuje','žvejojo','maudėsi upėje']},
     {q:'Kaip jie grįš?', o:['autobusu','traukiniu','lėktuvu']}]},
{ id:'r4', title:'Prekybos centro skelbimas', ua:'Оголошення торгового центру', week:3,
  text:'Prekybos centras „Banga“. Nuo gruodžio 1 d. iki gruodžio 24 d. visoms žieminėms striukėms – 30 % nuolaida. Prekybos centras dirba kasdien 8–22 val. Gruodžio 24 d. dirbame iki 18 val., gruodžio 25 d. nedirbame. Automobilių stovėjimas – 2 valandas nemokamai.',
  gloss:[['striukė','куртка'],['nuolaida','знижка'],['stovėjimas','паркування']],
  q:[{q:'Kam taikoma nuolaida?', o:['žieminėms striukėms','batams','maistui']},
     {q:'Kurią dieną prekybos centras nedirba?', o:['gruodžio 25 d.','gruodžio 24 d.','gruodžio 1 d.']},
     {q:'Kiek laiko galima stovėti nemokamai?', o:['2 valandas','1 valandą','visą dieną']}]},
{ id:'r5', title:'Pranešimas keleiviams', ua:'Повідомлення для пасажирів', week:4,
  text:'Dėmesio! Nuo sausio 5 d. keičiasi 10-ojo autobuso maršrutas. Autobusas nevažiuos Gedimino gatve. Stotelė „Centras“ laikinai perkeliama į Vilniaus gatvę. Darbo dienomis autobusai važiuos kas 15 minučių, savaitgaliais – kas 30 minučių.',
  gloss:[['maršrutas','маршрут'],['stotelė','зупинка'],['laikinai perkeliama','тимчасово переноситься']],
  q:[{q:'Kas keičiasi?', o:['maršrutas','bilieto kaina','autobuso numeris']},
     {q:'Kaip dažnai autobusai važiuos šeštadienį?', o:['kas 30 minučių','kas 15 minučių','kas valandą']},
     {q:'Kur bus stotelė „Centras“?', o:['Vilniaus gatvėje','Gedimino gatvėje','prie stoties']}]},
{ id:'r6', title:'Nemokami kursai', ua:'Безкоштовні курси', week:5,
  text:'Nemokami lietuvių kalbos kursai suaugusiesiems! Pamokos vyks bibliotekoje (Žalioji g. 5) antradieniais ir ketvirtadieniais nuo 18 iki 19.30 val. Kursai prasideda vasario 3 d. ir truks tris mėnesius. Registracija iki sausio 25 d. el. paštu arba telefonu. Vietų skaičius ribotas.',
  gloss:[['suaugusieji','дорослі'],['truks','триватиме'],['ribotas','обмежений']],
  q:[{q:'Kur vyks pamokos?', o:['bibliotekoje','mokykloje','savivaldybėje']},
     {q:'Kiek kartų per savaitę vyks pamokos?', o:['du kartus','vieną kartą','tris kartus']},
     {q:'Iki kada reikia užsiregistruoti?', o:['iki sausio 25 d.','iki vasario 3 d.','iki kovo 3 d.']},
     {q:'Kiek kainuoja kursai?', o:['nieko, jie nemokami','25 eurus','nenurodyta']}]},
];

/* Аудіювання: читає синтезатор мовлення */
const LISTENING = [
{ id:'l1', title:'Skambutis iš poliklinikos', ua:'Дзвінок з поліклініки', week:1,
  lines:['Laba diena, skambiname iš poliklinikos. Jūsų vizitas pas gydytoją perkeltas į ketvirtadienį, dešimtą valandą ryto. Kabineto numeris – dvidešimt trys. Jeigu negalite atvykti, paskambinkite mums. Ačiū.'],
  q:[{q:'Kada bus vizitas?', o:['ketvirtadienį, 10 val.','trečiadienį, 10 val.','ketvirtadienį, 12 val.']},
     {q:'Koks kabineto numeris?', o:['23','13','32']}]},
{ id:'l2', title:'Pranešimas stotyje', ua:'Оголошення на вокзалі', week:2,
  lines:['Dėmesio! Traukinys Vilnius – Klaipėda išvyksta iš antrojo kelio. Išvykimo laikas – penkiolika valandų trisdešimt minučių. Traukinys vėluoja dešimt minučių.'],
  q:[{q:'Iš kurio kelio išvyksta traukinys?', o:['iš antrojo','iš pirmojo','iš trečiojo']},
     {q:'Koks išvykimo laikas pagal tvarkaraštį?', o:['15:30','13:50','15:13']},
     {q:'Kiek vėluoja traukinys?', o:['10 minučių','5 minutes','30 minučių']}]},
{ id:'l3', title:'Parduotuvėje', ua:'У магазині', week:3,
  lines:['Mieli pirkėjai! Šiandien visoms daržovėms – dvidešimt procentų nuolaida. Kilogramas obuolių kainuoja tik vieną eurą dvidešimt centų. Parduotuvė dirba iki dvidešimt antros valandos.'],
  q:[{q:'Kam šiandien nuolaida?', o:['daržovėms','vaisiams','mėsai']},
     {q:'Kiek kainuoja kilogramas obuolių?', o:['1,20 €','2,10 €','1,02 €']},
     {q:'Iki kelintos valandos dirba parduotuvė?', o:['iki 22','iki 20','iki 21']}]},
{ id:'l4', title:'Draugo žinutė', ua:'Повідомлення від друга', week:3,
  lines:['Labas, čia Tomas. Šeštadienį važiuojame prie ežero žvejoti. Išvažiuojame anksti, šeštą valandą ryto, nuo mano namų. Pasiimk šiltus drabužius, nes bus vėsu. Paskambink, ar važiuosi.'],
  q:[{q:'Kur važiuos draugai?', o:['prie ežero','į mišką','prie jūros']},
     {q:'Kada jie išvažiuos?', o:['6 val. ryto','7 val. ryto','16 val.']},
     {q:'Ką reikia pasiimti?', o:['šiltus drabužius','meškerę','maisto']}]},
{ id:'l5', title:'Kavinėje', ua:'У кафе (діалог)', week:4,
  lines:['Laba diena. Ką užsisakysite?','Prašau vieną porciją cepelinų ir arbatos.','Juodos ar žaliosios arbatos?','Žaliosios, prašau.','Gerai. Iš viso bus aštuoni eurai keturiasdešimt centų.'],
  q:[{q:'Ką užsisakė klientas?', o:['cepelinus ir arbatą','cepelinus ir kavą','sriubą ir arbatą']},
     {q:'Kokios arbatos jis norėjo?', o:['žaliosios','juodos','vaisinės']},
     {q:'Kiek reikės mokėti?', o:['8,40 €','4,80 €','8,14 €']}]},
{ id:'l6', title:'Orų prognozė', ua:'Прогноз погоди', week:5,
  lines:['Rytoj Lietuvoje bus debesuota. Vakarų Lietuvoje lis. Dieną temperatūra bus nuo dviejų iki penkių laipsnių šilumos, naktį – iki trijų laipsnių šalčio.'],
  q:[{q:'Kur rytoj lis?', o:['Vakarų Lietuvoje','Rytų Lietuvoje','visoje Lietuvoje']},
     {q:'Kokia bus temperatūra dieną?', o:['2–5 laipsniai šilumos','3 laipsniai šalčio','5–7 laipsniai šilumos']}]},
];

/* Письмо */
const WRITING = [
{ id:'w1', week:1, kind:'anketa', title:'Anketa kursams', ua:'Анкета для курсів',
  task:'Užpildykite anketą lietuvių kalbos kursams. Paskutiniame laukelyje parašykite 2–3 sakinius: kodėl norite lankyti kursus.',
  fields:['Vardas','Pavardė','Gimimo data','Pilietybė','Šeiminė padėtis','Gyvenamoji vieta, adresas','Profesija, darbovietė','Kodėl norite lankyti kursus?'],
  phrases:['Noriu geriau kalbėti lietuviškai, nes…','Man reikia išlaikyti egzaminą.','Darbe kalbu su klientais lietuviškai.'],
  model:'Vardas: Olegas. Pavardė: … Gimimo data: 1980-…-… Pilietybė: Ukrainos. Šeiminė padėtis: vedęs. Adresas: Vilnius, … g. … Profesija: … Kodėl: Noriu geriau kalbėti lietuviškai, nes gyvenu ir dirbu Lietuvoje. Man reikia išlaikyti valstybinės kalbos egzaminą. Taip pat noriu daugiau kalbėtis su kaimynais.'},
{ id:'w2', week:1, title:'Kvietimas į gimtadienį', ua:'Запрошення на день народження',
  task:'Parašykite draugui Tomui laišką (50–80 žodžių). Pakvieskite jį į gimtadienį. Parašykite: kada ir kur bus šventė, kas dar ateis, ką reikia atsinešti.',
  points:['kada (diena, valanda)','kur','kas dar ateis','ką atsinešti'],
  phrases:['Rašau, nes noriu tave pakviesti…','Šventsime šeštadienį, … valandą.','Gal galėtum atnešti…?','Parašyk, ar galėsi ateiti.'],
  model:'Labas, Tomai!\nRašau, nes noriu tave pakviesti į savo gimtadienį. Šventsime šeštadienį, lapkričio 28 dieną, septintą valandą vakaro. Susitiksime kavinėje „Rožė“, Pilies gatvėje. Bus mano draugai iš darbo ir kaimynai. Dovanų nereikia, bet gal galėtum atnešti savo gitarą? Visi labai mėgsta tavo dainas.\nParašyk, ar galėsi ateiti.\nIki greito!\nOlegas'},
{ id:'w3', week:2, title:'Laiškas apie savaitgalį', ua:'Лист про вихідні (минулий час)',
  task:'Parašykite draugei Rūtai laišką (50–80 žodžių). Papasakokite, ką veikėte praėjusį savaitgalį: kur buvote, su kuo, kas jums patiko ir kodėl.',
  points:['kur buvote','su kuo','ką veikėte','kas patiko ir kodėl'],
  phrases:['Praėjusį savaitgalį buvau…','Važiavome su… automobiliu.','Man labai patiko…, nes…','O kaip tavo savaitgalis?'],
  model:'Sveika, Rūta!\nAčiū už laišką. Praėjusį savaitgalį buvau Trakuose su žmona ir draugais. Važiavome automobiliu. Aplankėme pilį ir pasivaikščiojome prie ežero. Pietums valgėme kibinų. Man labai patiko, nes oras buvo gražus ir buvo ramu. Vakare grįžome namo pavargę, bet laimingi.\nO kaip tavo savaitgalis? Parašyk!\nIki!\nOlegas'},
{ id:'w4', week:3, title:'Žinutė kolegai: sergu', ua:'Повідомлення колезі: захворів',
  task:'Parašykite žinutę kolegai (40–60 žodžių). Šiandien sergate ir neateisite į darbą. Parašykite, kas jums yra, kada grįšite ir ko prašote kolegos.',
  points:['kodėl neateisite','kas skauda / kaip jaučiatės','kada grįšite','prašymas kolegai'],
  phrases:['Deja, šiandien neateisiu į darbą, nes…','Man skauda…, turiu temperatūrą.','Tikiuosi grįžti…','Ar galėtum…?'],
  model:'Labas, Jonai!\nDeja, šiandien neateisiu į darbą, nes sergu. Man skauda gerklę ir turiu temperatūrą. Šiandien eisiu pas gydytoją. Tikiuosi grįžti ketvirtadienį. Ar galėtum paskambinti klientui ir pasakyti, kad susitikimas bus kitą savaitę? Labai ačiū!\nOlegas'},
{ id:'w5', week:3, title:'Laiškas viešbučiui', ua:'Офіційний лист до готелю',
  task:'Parašykite viešbučiui oficialų laišką (50–80 žodžių). Norite užsisakyti kambarį. Parašykite datas, kiek bus žmonių ir paklauskite apie pusryčius ir automobilio stovėjimą.',
  points:['datos','kiek žmonių','klausimas apie pusryčius','klausimas apie automobilio stovėjimą'],
  phrases:['Laba diena,','Norėčiau užsisakyti dvivietį kambarį…','Ar į kainą įeina pusryčiai?','Su pagarba,'],
  model:'Laba diena,\nnorėčiau užsisakyti dvivietį kambarį nuo gegužės 10 iki gegužės 12 dienos. Atvyksime dviese: aš ir mano žmona. Ar į kainą įeina pusryčiai? Atvažiuosime automobiliu, todėl norėčiau paklausti, ar prie viešbučio yra stovėjimo aikštelė ir kiek ji kainuoja. Prašau atsakyti el. paštu.\nSu pagarba\nOlegas …'},
{ id:'w6', week:4, title:'Laiškas apie naują butą', ua:'Лист другові про нову квартиру',
  task:'Parašykite draugui laišką (50–80 žodžių). Neseniai persikraustėte į naują butą. Aprašykite butą, papasakokite, kas jums patinka ir ko trūksta, pakvieskite draugą į svečius.',
  points:['koks butas (kambariai, aukštas)','kas patinka','ko trūksta / kas nepatinka','kvietimas'],
  phrases:['Neseniai persikrausčiau į…','Butas yra … aukšte.','Man labai patinka…, bet…','Atvažiuok į svečius!'],
  model:'Labas, Andriau!\nNeseniai persikrausčiau į naują butą. Jis yra ketvirtame aukšte, turi du kambarius, virtuvę ir balkoną. Man labai patinka, nes butas šviesus ir šiltas, o pro langą matyti parkas. Deja, name nėra lifto, todėl sunku nešti pirkinius. Atvažiuok į svečius šeštadienį – išgersime kavos ir pasikalbėsime.\nIki!\nOlegas'},
{ id:'w7', week:5, title:'Skelbimas: parduodu dviratį', ua:'Оголошення: продаю велосипед',
  task:'Parašykite skelbimą (30–50 žodžių). Parduodate dviratį. Parašykite: koks jis, kiek metų, kodėl parduodate, kaina ir kaip su jumis susisiekti.',
  points:['koks dviratis','kiek metų / būklė','kodėl parduodate','kaina','kontaktai'],
  phrases:['Parduodu…','Dviratis yra … metų, geros būklės.','Parduodu, nes…','Kaina – … eurų. Skambinkite…'],
  model:'Parduodu kalnų dviratį. Jis juodas, dvejų metų, geros būklės. Važiavau nedaug, tik savaitgaliais. Parduodu, nes nusipirkau automobilį ir dviračiu nebevažinėju. Kaina – 180 eurų. Skambinkite vakarais po 18 val. tel. +370 600 00000.'},
{ id:'w8', week:5, title:'Laiškas kaimynui', ua:'Лист сусідові',
  task:'Parašykite kaimynui laišką (40–60 žodžių). Šeštadienį vakare švęsite šventę ir gali būti triukšminga. Atsiprašykite, parašykite kada ir kodėl, pakvieskite kaimyną.',
  points:['atsiprašymas','kada bus šventė','kokia proga','kvietimas'],
  phrases:['Gerbiamas kaimyne,','Iš anksto atsiprašau, nes…','Švęsime…','Būsime labai laimingi, jeigu ateisite.'],
  model:'Gerbiamas kaimyne,\niš anksto atsiprašau, nes šį šeštadienį vakare mūsų bute gali būti triukšminga. Švęsime mano sūnaus gimtadienį nuo septynių iki vienuoliktos valandos vakaro. Būsime labai laimingi, jeigu ir jūs ateisite pas mus į svečius.\nSu pagarba\nOlegas iš 12 buto'},
];

/* Говоріння: питання екзаменатора й відповіді-шаблони (чоловічий рід) */
const SPEAKING = [
 {id:'s1', week:1, q:'Kuo jūs vardu?', ua:'Як вас звати?', a:'Mano vardas Olegas, pavardė [pavardė].'},
 {id:'s2', week:1, q:'Iš kur jūs esate?', ua:'Звідки ви?', a:'Esu iš Ukrainos, iš [miesto]. Esu ukrainietis.'},
 {id:'s3', week:1, q:'Kur jūs gyvenate?', ua:'Де ви живете?', a:'Gyvenu [Vilniuje]. Gyvenu su [žmona / šeima].'},
 {id:'s4', week:1, q:'Papasakokite apie savo būstą.', ua:'Розкажіть про своє житло.', a:'Gyvenu bute. Jis nedidelis: du kambariai, virtuvė ir vonios kambarys. Man patinka, nes jis šviesus ir šiltas.'},
 {id:'s5', week:2, q:'Kokia jūsų diena?', ua:'Який у вас день?', a:'Keliuosi septintą valandą. Pusryčiauju ir važiuoju į darbą. Dirbu iki [penkių]. Vakare ilsiuosi, žiūriu televizorių arba vaikštau.'},
 {id:'s6', week:2, q:'Ką veikiate laisvalaikiu?', ua:'Що робите у вільний час?', a:'Laisvalaikiu mėgstu [žvejoti, žiūrėti krepšinį, vaikščioti po miestą]. Savaitgalį kartais važiuoju į gamtą.'},
 {id:'s7', week:2, q:'Ką jūs mėgstate valgyti?', ua:'Що ви любите їсти?', a:'Mėgstu [sriubą ir mėsą]. Iš lietuviškų patiekalų man patinka cepelinai ir šaltibarščiai.'},
 {id:'s8', week:3, q:'Kiek laiko gyvenate Lietuvoje?', ua:'Скільки часу живете в Литві?', a:'Lietuvoje gyvenu jau [trejus metus].'},
 {id:'s9', week:3, q:'Kuo jūs dirbate?', ua:'Ким ви працюєте?', a:'Dirbu [vairuotoju / statybininku]. Darbe kalbu lietuviškai su kolegomis.'},
 {id:'s10', week:3, q:'Kur jūs dažniausiai perkate maistą?', ua:'Де ви найчастіше купуєте їжу?', a:'Maistą dažniausiai perku prekybos centre netoli namų. Kartais einu į turgų, nes ten šviežios daržovės.'},
 {id:'s11', week:4, q:'Ką veikėte praėjusį savaitgalį?', ua:'Що робили минулих вихідних?', a:'Praėjusį savaitgalį buvau namie. Šeštadienį tvarkiau butą, o sekmadienį su draugais važiavome prie ežero.'},
 {id:'s12', week:4, q:'Kokie jūsų planai vasarai?', ua:'Які плани на літо?', a:'Vasarą važiuosiu prie jūros, į Palangą. Ilsėsiuosi, maudysiuosi ir daug vaikščiosiu.'},
 {id:'s13', week:4, q:'Ką darote, kai sergate?', ua:'Що робите, коли хворієте?', a:'Kai sergu, lieku namie ir geriu daug arbatos. Jeigu labai blogai, registruojuosi pas gydytoją.'},
 {id:'s14', week:5, q:'Koks jūsų mėgstamiausias metų laikas? Kodėl?', ua:'Ваша улюблена пора року? Чому?', a:'Mano mėgstamiausias metų laikas yra vasara, nes šilta ir galima ilgai būti lauke.'},
 {id:'s15', week:5, q:'Papasakokite apie savo šeimą.', ua:'Розкажіть про свою сім’ю.', a:'Mano šeima nedidelė. Turiu [žmoną ir sūnų]. [Sūnus] mokosi mokykloje.'},
 {id:'s16', week:5, q:'Kodėl mokotės lietuvių kalbos?', ua:'Чому вивчаєте литовську?', a:'Noriu gyventi Lietuvoje, kalbėtis su žmonėmis ir geriau suprasti šios šalies kultūrą. Taip pat man reikia išlaikyti egzaminą.'},
];

const RESCUE = [
  ['Atsiprašau, nesupratau. Gal galite pakartoti?','Вибачте, я не зрозумів. Можете повторити?'],
  ['Gal galite kalbėti lėčiau?','Можете говорити повільніше?'],
  ['Ką reiškia žodis …?','Що означає слово …?'],
  ['Nežinau, kaip pasakyti lietuviškai, bet…','Не знаю, як сказати литовською, але…'],
  ['Palaukite, pagalvosiu.','Зачекайте, я подумаю.'],
];

/* Рольові ігри з ШІ-співрозмовником */
const ROLEPLAYS = [
 {id:'p1', week:2, title:'Kavinėje', ua:'У кафе', role:'padavėja kavinėje', goal:'Замовте суп, другу страву й напій; запитайте рахунок і заплатіть карткою.', start:'Laba diena! Ką užsisakysite?'},
 {id:'p2', week:3, title:'Drabužių parduotuvėje', ua:'У магазині одягу', role:'pardavėja drabužių parduotuvėje', goal:'Попросіть показати светр, запитайте ціну, попросіть більший розмір, дізнайтеся, чи можна платити карткою.', start:'Laba diena! Kuo galiu padėti?'},
 {id:'p3', week:3, title:'Pašte', ua:'На пошті', role:'pašto darbuotoja', goal:'Відправте посилку в Україну: дізнайтеся ціну, як довго йде, що треба заповнити.', start:'Laba diena. Klausau jūsų.'},
 {id:'p4', week:4, title:'Poliklinikoje', ua:'У поліклініці', role:'poliklinikos registratūros darbuotoja', goal:'Запишіться до сімейного лікаря: поясніть, що болить і скільки днів, домовтеся про день і час.', start:'Registratūra, laba diena. Kuo galiu padėti?'},
 {id:'p5', week:4, title:'Kelias į stotį', ua:'Як пройти до вокзалу', role:'praeivis gatvėje Vilniuje', goal:'Запитайте, як дійти до автовокзалу, чи далеко, яким автобусом можна доїхати.', start:'Taip, klausau?'},
 {id:'p6', week:5, title:'Buto nuoma telefonu', ua:'Оренда квартири телефоном', role:'buto savininkas, kuris išnuomoja butą', goal:'Подзвоніть за оголошенням: чи вільна квартира, ціна, комунальні, поверх, коли можна подивитися.', start:'Alio, klausau.'},
 {id:'p7', week:6, title:'Egzaminuotojas', ua:'Екзаменатор (як на іспиті)', role:'valstybinės kalbos egzamino egzaminuotojas, kuris užduoda paprastus klausimus apie kandidatą: vardas, kilmė, darbas, šeima, laisvalaikis, būstas', goal:'Відповідайте на питання повними реченнями, по 2–3 речення.', start:'Laba diena. Prašom atsisėsti. Kuo jūs vardu?'},
];

/* Цікавинки про Литву */
const FACTS = [
 'Литовська — одна з найархаїчніших живих індоєвропейських мов. Мовознавці порівнюють деякі її форми із санскритом.',
 'Дні тижня в литовській просто пронумеровані: <b class="lt">pirmadienis</b> — «перший день», <b class="lt">ketvirtadienis</b> — «четвертий день». Лише неділя — <b class="lt">sekmadienis</b>.',
 'Вільнюс уперше згадано 1323 року в листах великого князя <b class="lt">Gediminas</b>. За легендою, місто з’явилося після його сну про залізного вовка.',
 'Кольори прапора: жовтий — сонце й достаток, зелений — ліси й надія, червоний — кров, пролита за свободу.',
 'Гімн <b class="lt">«Tautiška giesmė»</b> 1898 року написав лікар <b class="lt">Vincas Kudirka</b> — і слова, і музику.',
 '16 лютого 1918 — Акт про незалежність Литви. 11 березня 1990 — Литва першою з радянських республік відновила незалежність.',
 '23 серпня 1989 — «Балтійський шлях»: близько двох мільйонів людей узялися за руки від Вільнюса до Таллінна.',
 '<b class="lt">Užgavėnės</b> — литовська масляна: маски, млинці й спалення опудала зими <b class="lt">Morė</b>.',
 '<b class="lt">Kūčios</b> — Святвечір 24 грудня: на столі 12 пісних страв і обов’язково <b class="lt">kūčiukai</b> з маковим молоком.',
 '<b class="lt">Joninės</b> (або Rasos) — ніч на 24 червня. Шукають цвіт папороті й стрибають через вогнище, як на Івана Купала.',
 'Баскетбол — «друга релігія» Литви: збірна тричі поспіль брала олімпійську бронзу (1992, 1996, 2000).',
 'Старе місто Вільнюса, Куршська коса й Кернаве внесені до Світової спадщини ЮНЕСКО.',
 'Литва в НАТО і ЄС з 2004 року, а з 1 січня 2015-го розраховується в євро.',
 'Географічний центр Європи, за підрахунками французьких географів 1989 року, лежить приблизно за 26 км від Вільнюса.',
 'Конституцію Литви ухвалили на референдумі 25 жовтня 1992 року. Цей день — <b class="lt">Konstitucijos diena</b>.',
];
