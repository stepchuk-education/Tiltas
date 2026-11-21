/* Конституція. Розділи — за «Lietuvos Respublikos Konstitucijos pagrindų egzamino programa» (NŠA).
   Іспит: 20 питань, по 3 варіанти, одна правильна; склав — 14 і більше.
   Правильна відповідь у питаннях стоїть ПЕРШОЮ (застосунок перемішує). */

const KSECTIONS = [
{ id:'k1', week:1, lt:'Lietuvos valstybė', ua:'Литовська держава', arts:'1–17 str.', diagram:'power',
  theory:`<ul>
<li>Литва — <b class="lt">nepriklausoma demokratinė respublika</b> (1 ст.).</li>
<li>Суверенітет належить <b class="lt">Tautai</b> — народу (2 ст.). Народ здійснює владу безпосередньо (референдум) або через обраних представників (4 ст.).</li>
<li>Державну владу здійснюють <b class="lt">Seimas, Respublikos Prezidentas ir Vyriausybė, Teismas</b> (5 ст.).</li>
<li>Закон, що суперечить Конституції, не діє. Діють лише <b>опубліковані</b> закони. Незнання закону не звільняє від відповідальності (7 ст.).</li>
<li><b class="lt">Referendumas</b> призначає Сейм — сам або на вимогу <b>300 000</b> громадян (9 ст.).</li>
<li>Територія неподільна. Кордон змінюють лише міжнародним договором, який ратифікують <b>4/5</b> усіх членів Сейму (10 ст.).</li>
<li>Державна мова — <b class="lt">lietuvių kalba</b> (14 ст.).</li>
<li>Прапор: <b class="lt">geltona, žalia, raudona</b>. Герб: білий <b class="lt">Vytis</b> на червоному тлі (15 ст.). Гімн — <b class="lt">«Tautiška giesmė»</b> Вінцаса Кудірки (16 ст.). Столиця — <b class="lt">Vilnius</b> (17 ст.).</li>
<li>Конституцію ухвалено на референдумі <b>25 жовтня 1992</b>.</li></ul>`,
  nums:[['300 000','громадян можуть вимагати референдуму (9)'],['4/5','голосів Сейму — для зміни кордону (10)'],['1992-10-25','референдум про Конституцію']],
  q:[
   {q:'Kokia yra Lietuvos valstybė pagal Konstituciją?', o:['nepriklausoma demokratinė respublika','konstitucinė monarchija','federacinė respublika'], art:'1', ex:'1 ст.: Литва — незалежна демократична республіка.'},
   {q:'Kam priklauso suverenitetas Lietuvoje?', o:['Tautai','Seimui','Respublikos Prezidentui'], art:'2', ex:'Суверенітет належить народу — Tautai.'},
   {q:'Kas vykdo valstybės valdžią Lietuvoje?', o:['Seimas, Respublikos Prezidentas ir Vyriausybė, Teismas','tik Seimas','Prezidentas ir savivaldybės'], art:'5', ex:'5 ст. називає три гілки: Сейм, Президент з Урядом, Суд.'},
   {q:'Kiek piliečių gali pareikalauti paskelbti referendumą?', o:['300 000','50 000','100 000'], art:'9', ex:'300 000 — референдум; 50 000 — законопроєкт. Не плутайте!'},
   {q:'Kaip gali būti keičiama valstybės siena?', o:['tik tarptautine sutartimi, kurią ratifikuoja 4/5 visų Seimo narių','Vyriausybės nutarimu','Respublikos Prezidento dekretu'], art:'10', ex:'Кордон — лише міжнародним договором, ратифікованим 4/5 Сейму.'},
   {q:'Kokia yra valstybinė kalba?', o:['lietuvių kalba','lietuvių ir lenkų kalbos','lietuvių ir rusų kalbos'], art:'14', ex:'Державна мова одна — литовська.'},
   {q:'Kokių spalvų yra Lietuvos valstybės vėliava?', o:['geltona, žalia, raudona','žalia, geltona, raudona','geltona, raudona, žalia'], art:'15', ex:'Зверху вниз: жовтий, зелений, червоний.'},
   {q:'Kas pavaizduota Lietuvos valstybės herbe?', o:['baltas Vytis raudoname dugne','auksinis liūtas mėlyname dugne','baltas erelis raudoname dugne'], art:'15', ex:'Vytis — білий вершник на червоному тлі.'},
   {q:'Koks yra Lietuvos valstybės himnas?', o:['Vinco Kudirkos „Tautiška giesmė“','„Lietuva brangi“','„Graži tu, mano brangi tėvyne“'], art:'16', ex:'Гімн — «Tautiška giesmė» В. Кудірки.'},
   {q:'Kuris miestas yra Lietuvos sostinė?', o:['Vilnius','Kaunas','Trakai'], art:'17', ex:'Столиця — Вільнюс, давня історична столиця.'},
   {q:'Ar galioja nepaskelbtas įstatymas?', o:['ne, galioja tik paskelbti įstatymai','taip, visada','taip, jeigu jį pasirašė Prezidentas'], art:'7', ex:'Діють лише офіційно оприлюднені закони.'},
   {q:'Kada buvo priimta Lietuvos Respublikos Konstitucija?', o:['1992 m. spalio 25 d. referendumu','1990 m. kovo 11 d.','1918 m. vasario 16 d.'], art:'', ex:'25.10.1992, референдум. 11.03.1990 — відновлення незалежності.'}
  ]},
{ id:'k2', week:1, lt:'Žmogus ir valstybė', ua:'Людина і держава', arts:'18–37 str.',
  theory:`<ul>
<li>Права й свободи людини — природжені (18 ст.). Право на життя захищає закон (19 ст.).</li>
<li>Свобода людини недоторканна. Затриманого протягом <b>48 годин</b> доставляють до суду (20 ст.).</li>
<li>Заборонено катувати, калічити, принижувати гідність (21 ст.). Недоторканні: приватне життя (22), власність (23), житло (24).</li>
<li>Увійти в житло без згоди мешканця можна лише за рішенням суду або у випадках, визначених законом (24 ст.).</li>
<li>Свобода переконань і слова (25), думки, віри й совісті (26). Усі рівні перед законом (29). Право звернутися до суду (30).</li>
<li><b class="lt">Rinkimų teisė</b> — з <b>18 років</b>. Не голосують особи, визнані судом недієздатними (34 ст.).</li>
<li>Свобода об’єднуватися в товариства, партії, асоціації (35 ст.).</li></ul>`,
  nums:[['48','годин — доставити затриманого до суду (20)'],['18','років — право голосу (34)']],
  q:[
   {q:'Per kiek laiko sulaikytas asmuo turi būti pristatytas į teismą?', o:['per 48 valandas','per 24 valandas','per 72 valandas'], art:'20', ex:'48 годин — запам’ятайте як «дві доби».'},
   {q:'Nuo kelerių metų Lietuvos piliečiai turi rinkimų teisę?', o:['nuo 18 metų','nuo 16 metų','nuo 21 metų'], art:'34', ex:'Голосувати — з 18. Бути обраним до Сейму — з 21.'},
   {q:'Kas negali dalyvauti rinkimuose?', o:['teismo pripažinti neveiksniais piliečiai','piliečiai, gyvenantys užsienyje','piliečiai be aukštojo išsilavinimo'], art:'34', ex:'Не голосують лише визнані судом недієздатними.'},
   {q:'Kada be gyventojo sutikimo galima įeiti į jo būstą?', o:['tik teismo sprendimu arba įstatymo nustatytais atvejais','bet kada, jeigu to nori policija','kai leidžia kaimynai'], art:'24', ex:'Житло недоторканне; винятки — суд або закон.'},
   {q:'Ar Konstitucija leidžia kankinti žmogų?', o:['ne, kankinti draudžiama','taip, karo metu','taip, teismo leidimu'], art:'21', ex:'Катування заборонені без винятків.'},
   {q:'Kas yra lygūs prieš įstatymą?', o:['visi asmenys','tik Lietuvos piliečiai','tik valstybės tarnautojai'], art:'29', ex:'Перед законом рівні всі люди.'},
   {q:'Ar žmogus gali laisvai reikšti savo įsitikinimus?', o:['taip, tai laiduoja Konstitucija','ne','tik gavęs leidimą'], art:'25', ex:'Свобода переконань і слова — 25 ст.'}
  ]},
{ id:'k3', week:2, lt:'Visuomenė ir valstybė', ua:'Суспільство і держава', arts:'38–45 str.',
  theory:`<ul>
<li><b class="lt">Šeima</b> — основа суспільства й держави (38 ст.). Шлюб укладається за вільною згодою чоловіка і жінки.</li>
<li>Навчання обов’язкове до <b>16 років</b>. У державних і самоврядних загальноосвітніх, професійних і вищих школах навчання безкоштовне (41 ст.).</li>
<li>Державної релігії <b>немає</b>. Держава визнає традиційні церкви й релігійні організації (43 ст.).</li>
<li>Цензура масової інформації <b>заборонена</b>. Держава, партії, організації не можуть монополізувати ЗМІ (44 ст.).</li></ul>`,
  nums:[['16','років — до цього віку навчання обов’язкове (41)']],
  q:[
   {q:'Kas yra visuomenės ir valstybės pagrindas?', o:['šeima','mokykla','Bažnyčia'], art:'38', ex:'Основа — сім’я.'},
   {q:'Iki kelerių metų mokslas yra privalomas?', o:['iki 16 metų','iki 18 metų','iki 14 metų'], art:'41', ex:'Обов’язкове навчання — до 16 років.'},
   {q:'Ar Lietuvoje yra valstybinė religija?', o:['ne, valstybinės religijos nėra','taip, katalikybė','taip, stačiatikybė'], art:'43', ex:'Державної релігії немає.'},
   {q:'Ar leidžiama masinės informacijos cenzūra?', o:['ne, cenzūra draudžiama','taip','tik rinkimų metu'], art:'44', ex:'Цензура заборонена.'},
   {q:'Kur mokslas yra nemokamas?', o:['valstybinėse ir savivaldybių bendrojo lavinimo mokyklose','tik privačiose mokyklose','niekur'], art:'41', ex:'У державних і самоврядних школах — безкоштовно.'}
  ]},
{ id:'k4', week:2, lt:'Tautos ūkis ir darbas', ua:'Економіка і праця', arts:'46–54 str.',
  theory:`<ul>
<li>Економіка ґрунтується на <b class="lt">privačios nuosavybės teisė</b> і свободі підприємництва (46 ст.).</li>
<li>Виключна власність держави: <b>надра</b>, <b>внутрішні води</b>, ліси й парки державного значення, дороги, історичні, археологічні й культурні об’єкти державного значення (47 ст.).</li>
<li>Кожен може вільно обирати роботу й бізнес. Примусова праця заборонена (48 ст.).</li>
<li>Працівники мають право на <b class="lt">streikas</b> — страйк — для захисту своїх інтересів (51 ст.).</li>
<li>Безпечні умови праці, соціальний захист, пенсії (48, 52 ст.). У державних медичних закладах допомога громадянам <b>безкоштовна</b> (53 ст.).</li></ul>`,
  nums:[],
  q:[
   {q:'Kuo grindžiamas Lietuvos ūkis?', o:['privačios nuosavybės teise ir asmens ūkinės veiklos laisve','tik valstybine nuosavybe','kolektyviniais ūkiais'], art:'46', ex:'Приватна власність + свобода підприємництва.'},
   {q:'Kas išimtine nuosavybės teise priklauso Lietuvos valstybei?', o:['žemės gelmės, vidaus vandenys, valstybinės reikšmės miškai ir parkai','visi butai ir namai','visos parduotuvės'], art:'47', ex:'Надра, внутрішні води, ліси й парки державного значення, дороги…'},
   {q:'Ar priverčiamasis darbas leidžiamas?', o:['ne, jis draudžiamas','taip, valstybės įmonėse','taip, studentams vasarą'], art:'48', ex:'Примусова праця заборонена.'},
   {q:'Ar darbuotojai turi teisę streikuoti?', o:['taip, gindami savo ekonominius ir socialinius interesus','ne','tik su Vyriausybės leidimu'], art:'51', ex:'Право на страйк гарантоване.'},
   {q:'Kur piliečiams medicinos pagalba teikiama nemokamai?', o:['valstybinėse gydymo įstaigose','privačiose klinikose','tik užsienyje'], art:'53', ex:'Безкоштовно — у державних медзакладах.'}
  ]},
{ id:'k5', week:3, lt:'Seimas', ua:'Сейм (парламент)', arts:'55–76 str.', diagram:'law',
  theory:`<ul>
<li><b>141</b> член Сейму, на <b>4 роки</b>, загальні прямі таємні вибори (55 ст.).</li>
<li>Кандидат — громадянин, не пов’язаний присягою з іншою державою, постійно проживає в Литві, на день виборів має щонайменше <b>21 рік</b> (56 ст.; до змін 2022 р. було 25).</li>
<li>Чергові вибори — <b>друга неділя жовтня</b> (57 ст.).</li>
<li>Дострокові вибори: рішенням Сейму (<b>3/5</b> усіх членів) або Президента (58 ст.).</li>
<li>Недоторканність: без згоди Сейму члена Сейму не можна притягнути до кримінальної відповідальності (62 ст.).</li>
<li>Сесії: весняна <b>10 березня – 30 червня</b>, осіння <b>10 вересня – 23 грудня</b> (64 ст.).</li>
<li><b class="lt">Įstatymų leidybos iniciatyva</b> — члени Сейму, Президент, Уряд і <b>50 000</b> громадян (68 ст.).</li>
<li>Президент підписує й оприлюднює закон протягом <b>10 днів</b> або повертає Сейму (71 ст.).</li>
<li><b class="lt">Seimo kontrolieriai</b> (омбудсмени) розглядають скарги на зловживання посадовців (73 ст.).</li>
<li><b class="lt">Apkalta</b> (імпічмент): посадовця усуває <b>3/5</b> усіх членів Сейму (74 ст.).</li></ul>`,
  nums:[['141','член Сейму (55)'],['4','роки — строк Сейму (55)'],['21','рік — мінімальний вік кандидата (56)'],['50 000','громадян — законодавча ініціатива (68)'],['10','днів — Президент підписує закон (71)'],['3/5','голосів — апкала, дострокові вибори (58, 74)']],
  q:[
   {q:'Kiek narių sudaro Seimą?', o:['141','101','151'], art:'55', ex:'141 член Сейму.'},
   {q:'Kelerių metų kadencijai renkamas Seimas?', o:['4 metų','5 metų','3 metų'], art:'55', ex:'Сейм — 4 роки, Президент — 5.'},
   {q:'Kiek metų turi būti kandidatui į Seimo narius rinkimų dieną?', o:['ne mažiau kaip 21','ne mažiau kaip 25','ne mažiau kaip 18'], art:'56', ex:'Після змін 2022 р. — 21 рік.'},
   {q:'Kada vyksta eiliniai Seimo rinkimai?', o:['spalio antrąjį sekmadienį','gegužės pirmąjį sekmadienį','kovo 11 dieną'], art:'57', ex:'Друга неділя жовтня.'},
   {q:'Kas turi įstatymų leidybos iniciatyvos teisę?', o:['Seimo nariai, Respublikos Prezidentas, Vyriausybė ir 50 000 piliečių','tik Seimo nariai','tik Vyriausybė'], art:'68', ex:'Чотири суб’єкти, серед них 50 000 громадян.'},
   {q:'Kiek rinkimų teisę turinčių piliečių gali pateikti Seimui įstatymo projektą?', o:['50 000','300 000','10 000'], art:'68', ex:'50 000 — законопроєкт.'},
   {q:'Kada prasideda Seimo pavasario sesija?', o:['kovo 10 d.','sausio 1 d.','rugsėjo 10 d.'], art:'64', ex:'Весняна — з 10 березня, осіння — з 10 вересня.'},
   {q:'Ką nagrinėja Seimo kontrolieriai?', o:['piliečių skundus dėl pareigūnų piktnaudžiavimo ar biurokratizmo','baudžiamąsias bylas','įstatymų atitiktį Konstitucijai'], art:'73', ex:'Омбудсмени — скарги на посадовців.'},
   {q:'Ar Seimo narį galima patraukti baudžiamojon atsakomybėn be Seimo sutikimo?', o:['ne','taip, visada','taip, jeigu sutinka Prezidentas'], art:'62', ex:'Депутатська недоторканність.'},
   {q:'Kiek balsų reikia, kad Seimas apkaltos proceso tvarka pašalintų pareigūną iš pareigų?', o:['3/5 visų Seimo narių','pusės dalyvaujančių Seimo narių','2/3 dalyvaujančių'], art:'74', ex:'Апкала — 3/5 усіх членів.'},
   {q:'Per kiek dienų Prezidentas turi pasirašyti Seimo priimtą įstatymą arba grąžinti jį Seimui?', o:['per 10 dienų','per 5 dienas','per 30 dienų'], art:'71', ex:'Звичайний закон — 10 днів; зміна Конституції — 5 днів.'}
  ]},
{ id:'k6', week:4, lt:'Respublikos Prezidentas', ua:'Президент', arts:'77–90 str.',
  theory:`<ul>
<li><b class="lt">Valstybės vadovas</b> — глава держави, представляє Литву (77 ст.).</li>
<li>Обирається громадянами на <b>5 років</b>, прямим таємним голосуванням; не більше <b>2 строків поспіль</b> (78 ст.).</li>
<li>Кандидат: громадянин Литви за походженням, останні <b>3 роки</b> живе в Литві, має щонайменше <b>40 років</b> (78 ст.).</li>
<li>Повноваження (84 ст.): вирішує основні питання зовнішньої політики; призначає Прем’єр-міністра <b>за згодою Сейму</b>; надає громадянство; помилує засуджених; призначає суддів (за законом).</li>
<li>Верховний головнокомандувач збройних сил (140 ст.).</li>
<li>Недоторканний; усунути можна лише через апкалу (86 ст.).</li>
<li>Тимчасово заміщає — <b class="lt">Seimo Pirmininkas</b> (89 ст.).</li></ul>`,
  nums:[['5','років — строк Президента (78)'],['2','строки поспіль — максимум (78)'],['40','років — мінімальний вік (78)'],['3','роки — проживання в Литві (78)']],
  q:[
   {q:'Kas yra valstybės vadovas?', o:['Respublikos Prezidentas','Ministras Pirmininkas','Seimo Pirmininkas'], art:'77', ex:'Глава держави — Президент.'},
   {q:'Kelerių metų kadencijai renkamas Respublikos Prezidentas?', o:['5 metų','4 metų','7 metų'], art:'78', ex:'5 років.'},
   {q:'Kiek kartų iš eilės tas pats asmuo gali būti renkamas Prezidentu?', o:['ne daugiau kaip du kartus','tik vieną kartą','neribotai'], art:'78', ex:'Не більше двох строків поспіль.'},
   {q:'Kiek metų turi būti kandidatui į Respublikos Prezidentus?', o:['ne mažiau kaip 40','ne mažiau kaip 35','ne mažiau kaip 50'], art:'78', ex:'40 років.'},
   {q:'Kiek laiko kandidatas į Prezidentus turi būti gyvenęs Lietuvoje?', o:['ne mažiau kaip 3 pastaruosius metus','ne mažiau kaip 1 metus','ne mažiau kaip 10 metų'], art:'78', ex:'Останні 3 роки.'},
   {q:'Kas renka Respublikos Prezidentą?', o:['Lietuvos piliečiai','Seimas','Vyriausybė'], art:'78', ex:'Прямі вибори громадянами.'},
   {q:'Kas laikinai pavaduoja Respublikos Prezidentą?', o:['Seimo Pirmininkas','Ministras Pirmininkas','Konstitucinio Teismo pirmininkas'], art:'89', ex:'Голова Сейму.'},
   {q:'Kas teikia Lietuvos Respublikos pilietybę?', o:['Respublikos Prezidentas','Seimas','Vyriausybė'], art:'84', ex:'Громадянство надає Президент (у порядку, встановленому законом).'},
   {q:'Kas yra vyriausiasis valstybės ginkluotųjų pajėgų vadas?', o:['Respublikos Prezidentas','krašto apsaugos ministras','Ministras Pirmininkas'], art:'140', ex:'Головнокомандувач — Президент.'},
   {q:'Kas gali suteikti malonę nuteistiesiems?', o:['Respublikos Prezidentas','Seimas','teismas'], art:'84', ex:'Помилування — повноваження Президента.'}
  ]},
{ id:'k7', week:4, lt:'Vyriausybė', ua:'Уряд', arts:'91–101 str.', diagram:'gov',
  theory:`<ul>
<li>Уряд — <b class="lt">Ministras Pirmininkas ir ministrai</b> (91 ст.).</li>
<li>Прем’єра призначає Президент <b>за згодою Сейму</b>; міністрів — Президент <b>за поданням Прем’єра</b> (92 ст.).</li>
<li>Протягом <b>15 днів</b> Прем’єр подає Сейму уряд і його програму (92 ст.).</li>
<li>Уряд керує справами країни, виконує закони, готує проєкт бюджету (94 ст.).</li>
<li>Уряд <b>солідарно відповідає перед Сеймом</b> (96 ст.).</li>
<li>Уряд повертає повноваження Президентові після виборів Сейму або виборів Президента (92 ст.). Іде у відставку, якщо Сейм двічі поспіль не схвалив програму або висловив недовіру (101 ст.).</li></ul>`,
  nums:[['15','днів — подати програму уряду Сейму (92)']],
  q:[
   {q:'Kas sudaro Lietuvos Respublikos Vyriausybę?', o:['Ministras Pirmininkas ir ministrai','Prezidentas ir Seimas','Seimo komitetai'], art:'91', ex:'Прем’єр + міністри.'},
   {q:'Kas skiria Ministrą Pirmininką?', o:['Respublikos Prezidentas, Seimui pritarus','Seimas be Prezidento','Tauta referendumu'], art:'92', ex:'Президент — за згодою Сейму.'},
   {q:'Kas skiria ministrus?', o:['Respublikos Prezidentas Ministro Pirmininko teikimu','Seimas','Ministras Pirmininkas be Prezidento'], art:'92', ex:'Президент за поданням Прем’єра.'},
   {q:'Per kiek dienų Ministras Pirmininkas turi pateikti Seimui Vyriausybės programą?', o:['per 15 dienų','per 30 dienų','per 7 dienas'], art:'92', ex:'15 днів.'},
   {q:'Kam Vyriausybė solidariai atsako už bendrą savo veiklą?', o:['Seimui','Konstituciniam Teismui','savivaldybėms'], art:'96', ex:'Перед Сеймом.'},
   {q:'Kas rengia valstybės biudžeto projektą?', o:['Vyriausybė','Seimas','Lietuvos bankas'], art:'94, 130', ex:'Готує Уряд, затверджує Сейм.'}
  ]},
{ id:'k8', week:5, lt:'Konstitucinis Teismas', ua:'Конституційний Суд', arts:'102–108 str.', diagram:'kt',
  theory:`<ul>
<li>Вирішує, чи відповідають закони й акти Сейму Конституції, а акти Президента й Уряду — Конституції та законам (102 ст.).</li>
<li><b>9 суддів</b> на <b>9 років</b>, лише один строк; кожні <b>3 роки</b> оновлюється третина (103 ст.).</li>
<li>По 3 кандидати пропонують Президент, Голова Сейму і Голова Верховного Суду; <b>призначає Сейм</b> (103 ст.).</li>
<li>Суддя — громадянин із бездоганною репутацією, юрист, щонайменше <b>10 років</b> стажу (103 ст.).</li>
<li>Рішення КС мають силу закону й остаточні (107 ст.).</li></ul>`,
  nums:[['9','суддів (103)'],['9','років — строк судді, один раз (103)'],['3','роки — оновлення третини (103)'],['10','років — юридичний стаж (103)']],
  q:[
   {q:'Kiek teisėjų sudaro Konstitucinį Teismą?', o:['9','7','12'], art:'103', ex:'9 суддів.'},
   {q:'Kelerių metų kadencijai skiriami Konstitucinio Teismo teisėjai?', o:['9 metų, tik vienai kadencijai','5 metų','iki gyvos galvos'], art:'103', ex:'9 років, один раз.'},
   {q:'Kas skiria Konstitucinio Teismo teisėjus?', o:['Seimas','Respublikos Prezidentas','Vyriausybė'], art:'103', ex:'Призначає Сейм із кандидатів, запропонованих трьома посадовцями.'},
   {q:'Ką sprendžia Konstitucinis Teismas?', o:['ar įstatymai neprieštarauja Konstitucijai','baudžiamąsias bylas','šeimos ginčus'], art:'102', ex:'Конституційність законів.'},
   {q:'Kas kas trejus metus atnaujinama Konstituciniame Teisme?', o:['trečdalis teisėjų','visi teisėjai','tik pirmininkas'], art:'103', ex:'Третина кожні 3 роки.'}
  ]},
{ id:'k9', week:5, lt:'Teismas', ua:'Суди і прокуратура', arts:'109–118 str.', diagram:'courts',
  theory:`<ul>
<li>Правосуддя здійснюють <b>лише суди</b> (109 ст.). Судді незалежні.</li>
<li>Система: <b class="lt">Aukščiausiasis Teismas</b> (Верховний), <b class="lt">Apeliacinis teismas</b>, окружні й районні суди; для адміністративних справ можуть бути спеціалізовані суди (111 ст.).</li>
<li>Справи в усіх судах розглядаються <b>відкрито</b>; закрите засідання — лише у випадках, визначених законом (117 ст.).</li>
<li><b class="lt">Generalinis prokuroras</b> — призначає Президент за згодою Сейму на <b>7 років</b> (118 ст.).</li></ul>`,
  nums:[['7','років — строк Генерального прокурора (118)']],
  q:[
   {q:'Kas vykdo teisingumą Lietuvos Respublikoje?', o:['tik teismai','prokuratūra','Vyriausybė'], art:'109', ex:'Лише суди.'},
   {q:'Koks yra aukščiausias bendrosios kompetencijos teismas?', o:['Lietuvos Aukščiausiasis Teismas','Konstitucinis Teismas','Apeliacinis teismas'], art:'111', ex:'Верховний Суд. КС — окремий, не входить у систему загальних судів.'},
   {q:'Kas skiria Generalinį prokurorą?', o:['Respublikos Prezidentas, Seimui pritarus','Seimas be Prezidento','Vyriausybė'], art:'118', ex:'Президент за згодою Сейму.'},
   {q:'Kelerių metų kadencijai skiriamas Generalinis prokuroras?', o:['7 metų','5 metų','4 metų'], art:'118', ex:'7 років.'},
   {q:'Ar bylos teismuose nagrinėjamos viešai?', o:['taip, išskyrus įstatymo numatytus atvejus','ne, visada uždarai','tik Konstituciniame Teisme'], art:'117', ex:'Відкрито, крім винятків, визначених законом.'}
  ]},
{ id:'k10', week:5, lt:'Vietos savivalda ir valdymas', ua:'Місцеве самоврядування', arts:'119–124 str.',
  theory:`<ul>
<li>Адміністративні одиниці Литви мають право на самоврядування. Його здійснює <b class="lt">savivaldybės taryba</b> — рада самоврядування (119 ст.).</li>
<li>Раду обирають на <b>4 роки</b> постійні мешканці самоврядування — громадяни Литви й інші постійні мешканці (119 ст.).</li>
<li>Самоврядування діють вільно в межах своєї компетенції (120 ст.).</li>
<li>Чи дотримуються самоврядування Конституції й законів, наглядають <b>представники, яких призначає Уряд</b> (123 ст.).</li></ul>`,
  nums:[['4','роки — строк ради самоврядування (119)']],
  q:[
   {q:'Kelerių metų kadencijai renkamos savivaldybių tarybos?', o:['4 metų','2 metų','5 metų'], art:'119', ex:'4 роки, як і Сейм.'},
   {q:'Kas renka savivaldybės tarybą?', o:['nuolatiniai savivaldybės gyventojai','Seimas','Vyriausybė'], art:'119', ex:'Постійні мешканці самоврядування.'},
   {q:'Kas prižiūri, ar savivaldybės laikosi Konstitucijos ir įstatymų?', o:['Vyriausybės skiriami atstovai','Seimo Pirmininkas','policija'], art:'123', ex:'Представники, яких призначає Уряд.'}
  ]},
{ id:'k11', week:5, lt:'Finansai ir valstybės biudžetas', ua:'Фінанси і бюджет', arts:'125–132 str.',
  theory:`<ul>
<li>Центральний банк — <b class="lt">Lietuvos bankas</b>, частина Євросистеми (125 ст.).</li>
<li>Бюджетний рік: <b>1 січня – 31 грудня</b> (129 ст.).</li>
<li>Проєкт бюджету готує <b>Уряд</b> і подає Сейму; затверджує бюджет <b>Сейм</b> законом (130–131 ст.).</li></ul>`,
  nums:[['01.01–31.12','бюджетний рік (129)']],
  q:[
   {q:'Kaip vadinasi Lietuvos Respublikos centrinis bankas?', o:['Lietuvos bankas','Swedbank','Valstybės iždas'], art:'125', ex:'Lietuvos bankas.'},
   {q:'Kada prasideda ir baigiasi biudžetiniai metai?', o:['sausio 1 – gruodžio 31','liepos 1 – birželio 30','rugsėjo 1 – rugpjūčio 31'], art:'129', ex:'Календарний рік.'},
   {q:'Kas tvirtina valstybės biudžetą?', o:['Seimas','Vyriausybė','Respublikos Prezidentas'], art:'131', ex:'Затверджує Сейм.'},
   {q:'Kas sudaro valstybės biudžeto projektą?', o:['Vyriausybė','Lietuvos bankas','Seimo kontrolieriai'], art:'130', ex:'Готує Уряд.'}
  ]},
{ id:'k12', week:5, lt:'Valstybės kontrolė', ua:'Державний контроль', arts:'133–134 str.',
  theory:`<ul>
<li><b class="lt">Valstybės kontrolė</b> перевіряє, як використовують державне майно й виконують бюджет (134 ст.).</li>
<li><b class="lt">Valstybės kontrolierius</b> призначає Сейм за поданням Президента на <b>5 років</b> (133 ст.).</li></ul>`,
  nums:[['5','років — строк державного контролера (133)']],
  q:[
   {q:'Kas prižiūri valstybės turto valdymą ir biudžeto vykdymą?', o:['Valstybės kontrolė','Lietuvos bankas','Konstitucinis Teismas'], art:'134', ex:'Державний контроль.'},
   {q:'Kas skiria valstybės kontrolierių?', o:['Seimas Respublikos Prezidento teikimu','Ministras Pirmininkas','Seimo Pirmininkas'], art:'133', ex:'Сейм за поданням Президента.'},
   {q:'Kelerių metų kadencijai skiriamas valstybės kontrolierius?', o:['5 metų','4 metų','7 metų'], art:'133', ex:'5 років.'}
  ]},
{ id:'k13', week:5, lt:'Užsienio politika ir valstybės gynimas', ua:'Зовнішня політика і оборона', arts:'135–145 str.',
  theory:`<ul>
<li>Міжнародні договори <b>ратифікує Сейм</b> (67, 138 ст.).</li>
<li>Захищати державу від збройного нападу — право й обов’язок кожного громадянина (139 ст.).</li>
<li><b class="lt">Valstybės gynimo taryba</b> (Рада оборони): Президент, Прем’єр, Голова Сейму, міністр оборони, командувач збройних сил. Очолює <b>Президент</b> (140 ст.).</li>
<li><b class="lt">Karo padėtis</b> (воєнний стан) і мобілізацію запроваджує <b>Сейм</b>. У разі збройного нападу Президент негайно ухвалює рішення про відсіч, запроваджує воєнний стан і передає рішення Сейму (142 ст.).</li>
<li><b class="lt">Nepaprastoji padėtis</b> (надзвичайний стан) — запроваджує Сейм; між сесіями — Президент (144 ст.).</li></ul>`,
  nums:[['5','членів Ради оборони (140)']],
  q:[
   {q:'Kas ratifikuoja tarptautines sutartis?', o:['Seimas','Vyriausybė','Užsienio reikalų ministerija'], art:'67, 138', ex:'Ратифікує Сейм.'},
   {q:'Kas vadovauja Valstybės gynimo tarybai?', o:['Respublikos Prezidentas','krašto apsaugos ministras','kariuomenės vadas'], art:'140', ex:'Очолює Президент.'},
   {q:'Kas įveda karo padėtį?', o:['Seimas','Vyriausybė','krašto apsaugos ministras'], art:'142', ex:'Сейм; у разі збройного нападу — негайно Президент.'},
   {q:'Kas nedelsdamas priima sprendimą dėl ginkluoto užpuolimo atrėmimo?', o:['Respublikos Prezidentas','Ministras Pirmininkas','Seimo kontrolierius'], art:'142', ex:'Президент — і потім передає рішення Сейму.'},
   {q:'Kas įveda nepaprastąją padėtį?', o:['Seimas','Lietuvos bankas','savivaldybės taryba'], art:'144', ex:'Сейм; між сесіями — Президент.'},
   {q:'Ar Lietuvos piliečiai turi ginti valstybę nuo ginkluoto užpuolimo?', o:['taip, tai kiekvieno piliečio teisė ir pareiga','ne, tik kariai','tik savanoriai'], art:'139', ex:'Право й обов’язок кожного громадянина.'}
  ]},
{ id:'k14', week:5, lt:'Konstitucijos keitimas', ua:'Зміна Конституції', arts:'147–149 str.', diagram:'amend',
  theory:`<ul>
<li>Запропонувати зміну можуть щонайменше <b>1/4</b> членів Сейму або <b>300 000</b> виборців (147 ст.).</li>
<li><b>1 стаття</b> («Литва — незалежна демократична республіка») — лише референдумом, «за» має бути щонайменше <b>3/4</b> виборців. Розділи I і XIV — теж лише референдумом (148 ст.).</li>
<li>Інші розділи: Сейм голосує <b>двічі</b> з перервою щонайменше <b>3 місяці</b>; щоразу «за» — щонайменше <b>2/3</b> усіх членів (148 ст.).</li>
<li>Закон про зміну Президент підписує протягом <b>5 днів</b>; набирає чинності не раніше ніж через місяць (149 ст.).</li></ul>`,
  nums:[['1/4','членів Сейму можуть запропонувати зміну (147)'],['3/4','виборців — для зміни 1 статті (148)'],['2/3','членів Сейму — у кожному з двох голосувань (148)'],['3','місяці — перерва між голосуваннями (148)'],['5','днів — підписати закон про зміну (149)']],
  q:[
   {q:'Kas gali teikti siūlymą keisti ar papildyti Konstituciją?', o:['ne mažiau kaip 1/4 Seimo narių arba ne mažiau kaip 300 000 rinkėjų','Respublikos Prezidentas vienas','bet kuri savivaldybė'], art:'147', ex:'1/4 Сейму або 300 000 виборців.'},
   {q:'Kaip galima pakeisti Konstitucijos 1 straipsnį?', o:['tik referendumu, jei pritaria ne mažiau kaip 3/4 rinkėjų','Seimo 2/3 balsų dauguma','Respublikos Prezidento dekretu'], art:'148', ex:'Лише референдум, 3/4 виборців.'},
   {q:'Kiek kartų Seimas balsuoja dėl Konstitucijos pataisos (išskyrus I ir XIV skirsnius)?', o:['du kartus, darydamas ne mažesnę kaip 3 mėnesių pertrauką','vieną kartą','tris kartus per savaitę'], art:'148', ex:'Двічі, перерва ≥ 3 місяці.'},
   {q:'Kokios balsų daugumos reikia kiekviename Seimo balsavime dėl Konstitucijos keitimo?', o:['ne mažiau kaip 2/3 visų Seimo narių','paprastos daugumos','4/5 dalyvaujančių'], art:'148', ex:'2/3 усіх членів, щоразу.'},
   {q:'Per kiek dienų Prezidentas pasirašo įstatymą dėl Konstitucijos keitimo?', o:['per 5 dienas','per 10 dienų','per mėnesį'], art:'149', ex:'5 днів (звичайний закон — 10).'}
  ]},
];

/* Хронологія для блоку «Цікаво» */
const TIMELINE = [
  ['1253','Коронація Міндаугаса — єдиного короля Литви'],
  ['1918-02-16','Акт про незалежність Литви'],
  ['1990-03-11','Відновлення незалежності'],
  ['1992-10-25','Референдум: ухвалено Конституцію'],
  ['2004','Литва вступає до НАТО і ЄС'],
  ['2015-01-01','Литва переходить на євро'],
];
