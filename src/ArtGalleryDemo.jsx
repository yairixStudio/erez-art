import { useState, useEffect } from "react";

// ===== DATA =====
const curator = {
  name: 'קורין אברהם',
  bio: 'קורין אברהם היא יוצרת, אוצרת ויזמית תוכן הפועלת בצומת שבין אופנה, תרבות, אמנות ורגש. היא מייסדת פלטפורמת הלייף־סטייל והקריאייטיב ונמנית עם יוצרות התוכן בישראל ובעולם שפועלות בשפה חזותית מבוססת נרטיב. בשנים האחרונות פועלת אברהם כמשפיענית לייף סטייל בינלאומית וכמפיקה קריאייטיבית, ומשלבת בין עשייה דיגיטלית לעשייה תרבותית. היא שימשה כשגרירת המדיה הרשמית הראשונה של עיריית תל־אביב יפו, ויצרה שיתופי פעולה עם מותגי יוקרה בינלאומיים. בהכשרתה היא עורכת דין ובהדרגה פנתה לעשייה יצירתית הנשענת על צילום. עבודתה מאופיינת בדיוק אסתטי וביכולת לבנות סיפור דרך דימוי.',
};

const artists = [
  { id: 'a1', name: 'זוהר רון', nameEn: 'Zohar Ron', bio: 'זוהר רון הוא אומן חזותי, במאי וצלם המבטא חיבור ויזואלי ורעיוני בין פולחן טקסי לאסתטיקה ויופי. השימוש באלמנטים מהעולם השבטי מופיעים במרבית עבודותיו כסמל לחיבור לשורש התרבותי ממנו נובעת ההשראה והשפה הויזואלית ביצירותיו. זוהר רון פורם את הגבולות שבין שפה, גוף ודימוי, ויוצר מערכת יחסים חדשה ביניהם. הכתב העברי, מסורת עתיקת יומין של ביטוי פנימי ותפילה, מקבל בסדרה זו חיים חדשים כחומר ויזואלי, כמעט פיזי, הנכתב בדיו ומכחול ישירות על הגוף.', location: 'זוהר רון 48, תל-אביב יפו', gallery: 'גלריה בכיכר המדינה', img: 'https://static.wixstatic.com/media/3e3f5c_522cd7f84c694d77b2e235e64f05de77~mv2.jpg', instagram: 'https://instagram.com/zohar.ron.art', website: 'https://zoharron.com', email: 'zohar@zoharron.com' },
  { id: 'a2', name: 'איתן גולדסון', nameEn: 'Eitan Goldson', bio: 'איתן גולדסון, 31, נולד בקליפורניה ארה"ב וגדל בקיבוץ עין דור. העבודה שלו מגיעה מדו-שיח פנימי עמוק בין תרבויות מן העבר מול תרבות ההווה מול פנטזיות על עתיד פוסט אפוקליפטי בו נוצר מיזוג בין מודרניות לפרימיטיביות וטריבאליזם, מפגש בין מיתוס מן העולם למיתוס האישי שלו. מגיל צעיר מתעסק בציור ופיסול בחומרים מגוונים, כיום משלב צילום סטילז וגם וידאו וסאונד.', medium: 'מדיה מעורבת - צבעי שמן, אקריליק, גרפיט וקפה על קנוואס מודפס בלייזר', img: 'https://static.wixstatic.com/media/3e3f5c_a8c39ca649bb44ac8583c52c0c808bb9~mv2.jpg', instagram: 'https://instagram.com/eitangoldson', facebook: 'https://facebook.com/eitan.goldson.art', whatsapp: '972521234567' },
  { id: 'a3', name: 'הולי קדוש', nameEn: 'Holy Kadosh', bio: 'טל קדוש, 36, תל אביב. במקור נולדה וגדלה בצפת. אמנית רב תחומית היוצרת במגוון מדיות כמו אומנות דיגיטלית, ציור על רדי מיידי ויצירות קנבס באקריל ובצבעי פנדה. היצירה שלה נולדת מתוך חיבור עמוק לתת המודע, מרפה משליטה ונותנת לדימויים לעלות מעצמם, בהובלת זרם פנימי אינטואיטיבי ורוחני. כל יצירה עבורה היא שער רוחני, מראה לנשמה ומסע מתמשך של גילוי עצמי.', gallery: 'גלריה בכיכר המדינה', img: 'https://static.wixstatic.com/media/3e3f5c_d62329c917cf4ece864915f23d93c28f~mv2.jpg', instagram: 'https://instagram.com/holykadosh', tiktok: 'https://tiktok.com/@holykadosh', email: 'holy@holykadosh.art', whatsapp: '972537654321' },
  { id: 'a4', name: 'טל נהוראי', nameEn: 'Tal Nehorai', bio: 'טל נהוראי, אמנית רב־תחומית בת 50, יוצרת עבודות המשלבות בין חומרים עכשוויים לטכניקות מסורתיות והופכות אותם לאובייקטים חדים ומעוררי מחשבה. האסתטיקה הצבעונית והפופ־ארטית שלה משמשת כעדשה ביקורתית על התרבות המערבית ועל המרדף המודרני.', img: 'https://static.wixstatic.com/media/3e3f5c_7e76cf65f6cd4ff1a014e1acc1a6ee87~mv2.jpg', facebook: 'https://facebook.com/tal.nehorai.art', email: 'tal@nehorai.co.il', website: 'https://talnehorai.com' },
  { id: 'a5', name: 'אמניות אנונימיות', nameEn: 'Anonymous Artists', bio: 'סדרה שנולדה מתוך מפגש בין שתי יוצרות אנונימיות, שבחרו לוותר על חתימה פרטית ולתת למעגלי הסמל, הציור והטקסט לדבר בעצמם. בתוך כל עבודה חבוי כתב־סתרים מקורי – מערכת קודים שנוצרה במיוחד עבור הסדרה, מעין לחישות חזותיות המשמשות כקמעות. הדימויים נשענים על שפות עתיקות אך מסרבים להישאר קשורים לזמן מסוים.', instagram: 'https://instagram.com/anonymous.artists.tlv', email: 'contact@anonymousartists.com' },
  { id: 'a6', name: 'זוהר שטרית', nameEn: 'Zohar Shitrit', bio: 'זוהר שטרית, 36, תל אביב, צלם, במאי ויוצר חזותי. העבודה שלו מציגה תקריב מטושטש של פני ליצן – דימוי תרבותי המזוהה עם החצנה, תנועה ותגובה מיידית. באמצעות טשטוש מכוון וחיתוך, הדימוי מנותק מהקשרו הטבעי, והחיוך חדל מלתפקד כתגובה ברורה.', img: 'https://static.wixstatic.com/media/3e3f5c_048e722d5e394696a3a9899ada07148c~mv2.jpg', instagram: 'https://instagram.com/zohar.shitrit', facebook: 'https://facebook.com/zohar.shitrit.photo', whatsapp: '972501122334', website: 'https://zoharshitrit.com' },
  { id: 'a7', name: 'רז רונן', nameEn: 'Raz Ronen', bio: 'רז רונן הוא צייר שיצירתו נעה על התפר שבין כאוס לשליטה, בין זוהר לחספוס. גדילתו בחולון עיצבה את קולו האמנותי. את דרכו החל בציור על חולצות שמכר בעצמו – גישה ישירה, גופנית ומיידית. ציוריו נוצרים במהירות ובאופן אינסטינקטיבי, מתוך אמונה שהאמנות הטובה ביותר נובעת מהבטן ולא מהראש.', gallery: 'גלריה בכיכר דיזינגוף', img: 'https://static.wixstatic.com/media/3e3f5c_94d7c1976de94f68ad610638d49ee3fa~mv2.jpg', instagram: 'https://instagram.com/raz.ronen.art', tiktok: 'https://tiktok.com/@razronen', whatsapp: '972549988776', email: 'raz@razronen.art' },
];

const artworks = [
  { id: 'w1', title: 'גוף ושפה', artistId: 'a1', year: 2025, medium: 'צילום, דיו ומכחול על גוף', description: 'המילים, שנוצרות מתוך דיאלוג אינטואיטיבי עם המוזה המצולמת, אינן משמשות כתוספת צורנית או עיטורית, אלא כפעולה טקסית, אינטימית, בעלת ממד כמעט מאגי. הגוף הופך קנבס חי, והטקסט ללחש, שכבת תקשורת, הגנה או גילוי. הצילום לוכד את הרגע שבו נולדת זהות חדשה בין גוף לשפה, בין חוץ לפנים, בין זכר לנקבה.', exhibitionIds: ['e1'], media: [
    { type: 'image', label: 'מבט קדמי', url: 'https://static.wixstatic.com/media/3e3f5c_9f8bdf75b4e64c9da6d7c57340c3b4a6~mv2.jpg' },
    { type: 'image', label: 'פרט - כתב על גוף', url: 'https://static.wixstatic.com/media/3e3f5c_7aea5515de4346c7be5858e32500b1f0~mv2.jpg' },
    { type: 'image', label: 'פרט נוסף', url: 'https://static.wixstatic.com/media/3e3f5c_cd6c8bf9f05f4811ac4d6c8d7fd94d01~mv2.jpg' },
    { type: 'image', label: 'תיעוד תהליך', url: 'https://static.wixstatic.com/media/3e3f5c_f7dc503b9c324ce784700b639f3eef6d~mv2.jpg' },
  ] },
  { id: 'w2', title: 'תשע נשמות', artistId: 'a2', year: 2025, medium: 'מדיה מעורבת - צבעי שמן, אקריליק, גרפיט וקפה על קנוואס מודפס בלייזר', description: 'עבודה משותפת עם הנריקה רוטנברג. כחלק מהפרוייקט המשותף, תהליך חשיבה ארוך על כל קנוואס, איך ליצור סימביוזה בין שתי הנשמות ולייצר בכל ציור נשמה אחת משותפת. בחירה לגשת ליצירה עם דגש על המיתוס האומר כי לחתול יש תשע נשמות, תוך התייחסות לחיים המודרנים.', exhibitionIds: ['e1'], media: [
    { type: 'image', label: 'מבט כללי', url: 'https://static.wixstatic.com/media/3e3f5c_e90d3845ab844e429bad3476217c025b~mv2.jpg' },
    { type: 'image', label: 'פרט', url: 'https://static.wixstatic.com/media/3e3f5c_923d724a10194534ba2f17bc6b527196~mv2.jpg' },
  ] },
  { id: 'w3', title: 'גן החיות של התודעה', artistId: 'a3', year: 2025, medium: 'אומנות דיגיטלית, אקריל וצבעי פנדה על קנבס', description: 'אוסף יצירות שנולד מתת־מודע, מרחב פנימי של דימויים פראיים, קולות, קונפליקטים ודמויות שמופיעות כמעט למרות. למרות העושר והעומס החזותי, בלב הסדרה מתקיימת תחושת בדידות. היצירות מציגות את הרגע שבו האדם צופה על עצמו מבפנים, בתוך "גן חיות" בלתי צפוי ואף כאוטי.', exhibitionIds: ['e1'], media: [
    { type: 'image', label: 'מבט כללי', url: 'https://static.wixstatic.com/media/3e3f5c_33e9bc48115a443f93955bd8d4c0f741~mv2.jpg' },
    { type: 'image', label: 'פרט', url: 'https://static.wixstatic.com/media/3e3f5c_8cc3ed72100646498b56078fbe20379b~mv2.jpg' },
  ] },
  { id: 'w4', title: '100 דולר', artistId: 'a3', year: 2025, medium: 'אומנות דיגיטלית', description: 'יצירה שמציגה שטר של 100 דולר בגווני כחול־סגול, צבעוניות המדגישה את המתח בין העולם החומרי, הקר והמנוכר, לבין רמז לרובד רוחני ותודעתי. הדמויות המאוירות באפור מדגישות את דעיכת האנושי בתוך המערכת. סביב הדמות המרכזית מופיעים מלאך, שטן וארנב — סמלים של מצפון מתערער, פיתוי ואשליה.', exhibitionIds: ['e1'], media: [
    { type: 'image', label: 'מבט כללי', url: 'https://static.wixstatic.com/media/3e3f5c_d41329c66b9644ddb5248ff888a3bf79~mv2.jpg' },
  ] },
  { id: 'w5', title: 'שק האגרוף', artistId: 'a3', year: 2025, medium: 'פיסול, מדיה מעורבת', description: 'שק האגרוף, המעוטר במסכות אצטקיות ובכתובות ברכה, מציב בלב חלל תוסס את מה שאנו נוטים להצניע: מסע ההתמודדות הפנימי. היצירה מעניקה לדפוסים הפנימיים צורה, פנים וסמלים, ומזמינה את הצופה לא רק להיאבק בהם, אלא להכיר בהם כשליחים של תודעה מבקשת ריפוי.', exhibitionIds: ['e1'], media: [{ type: 'image', label: 'מבט קדמי' }, { type: 'image', label: 'פרט - מסכות' }, { type: 'image', label: 'פרט - כתובות' }, { type: 'video', label: 'סביב היצירה' }] },
  { id: 'w6', title: 'קמעות', artistId: 'a5', year: 2025, medium: 'ציור וטקסט, טכניקה מעורבת', description: 'בתוך כל עבודה חבוי כתב־סתרים מקורי — מערכת קודים שנוצרה במיוחד עבור הסדרה, מעין לחישות חזותיות המשמשות כקמעות. כל קוד נכתב כטקס זימון, כהזמנה מדויקת לעבודה פנימית: הגנות, התמרה, בהירות. הציורים אינם ארכיאולוגיה של רוחניות, אלא פרשנות חיה ואקטואלית של טקסי מעבר.', exhibitionIds: ['e1'], media: [{ type: 'image', label: 'מבט כללי' }, { type: 'image', label: 'פרט - כתב סתרים' }, { type: 'image', label: 'פרט - סמלים' }] },
  { id: 'w7', title: 'ליצן', artistId: 'a6', year: 2025, medium: 'צילום', description: 'העבודה מציגה תקריב מטושטש של פני ליצן — דימוי תרבותי המזוהה עם החצנה, תנועה ותגובה מיידית. הטשטוש מבטל זהות, מגדר והבעה כוללת, ומשאיר סימן חזותי טעון: אדום בוהק, מוגזם, כזה שנועד להיראות מרחוק. הליצן הוא דמות של כוח פרפורמטיבי, בעלת רישיון חברתי לחרוג.', exhibitionIds: ['e1'], media: [
    { type: 'image', label: 'מבט כללי', url: 'https://static.wixstatic.com/media/3e3f5c_43cd1f7ecfcc4bc78ca2538f175aad2d~mv2.jpg' },
  ] },
  { id: 'w8', title: 'כאוס ושליטה', artistId: 'a7', year: 2025, medium: 'ציור - טכניקה מעורבת', description: 'ציורים שנוצרים במהירות ובאופן אינסטינקטיבי. תנועות המכחול פרועות אך מכוונות; חצופות אך מהפנטות. קומפוזיציה רנדומלית אך מלאה, מתח שמתקיים בין גסות לבין אסתטיקה, בין מקריות לבין דיוק פנימי. אמנות שמרגישים לפני שמבינים.', exhibitionIds: ['e1'], media: [
    { type: 'image', label: 'מבט כללי', url: 'https://static.wixstatic.com/media/3e3f5c_4ce5eee9acdb48948a8ed374e79588dd~mv2.jpg' },
    { type: 'image', label: 'פרט', url: 'https://static.wixstatic.com/media/3e3f5c_5a9e6d13284d4708a77a14521d6ae6b9~mv2.jpg' },
  ] },
  { id: 'w9', title: 'פופ וביקורת', artistId: 'a4', year: 2025, medium: 'מדיה מעורבת, חומרים עכשוויים', description: 'עבודות המשלבות בין חומרים עכשוויים לטכניקות מסורתיות והופכות אותם לאובייקטים חדים ומעוררי מחשבה. האסתטיקה הצבעונית והפופ־ארטית משמשת כעדשה ביקורתית על התרבות המערבית ועל המרדף המודרני.', exhibitionIds: ['e1'], media: [
    { type: 'image', label: 'מבט כללי', url: 'https://static.wixstatic.com/media/3e3f5c_456455c259914d0c90878d43e32d9871~mv2.jpg' },
    { type: 'image', label: 'פרט', url: 'https://static.wixstatic.com/media/3e3f5c_7157c8d9b35e4212a0db4634173652ee~mv2.jpg' },
    { type: 'image', label: 'בהצבה', url: 'https://static.wixstatic.com/media/3e3f5c_3310c18f67c54be19c86d1c2b61cfcc9~mv2.jpg' },
    { type: 'image', label: 'פרט נוסף', url: 'https://static.wixstatic.com/media/3e3f5c_9bf8871285474864b669c78a9710f585~mv2.jpg' },
  ] },
];

const exhibitions = [
  { id: 'e2', title: 'How Many Partners Have You Had?', curator: 'קורין אברהם', startDate: 'TBD', endDate: 'TBD', status: 'call', description: 'קול קורא לאמנים! תערוכה חדשה בנושא יחסים, אינטימיות וקשרים אנושיים בעידן המודרני. אנחנו מחפשים אמנים ויצירות מכל תחומי האומנות. שלחו תמונה של היצירה, שם היצירה, שם אמן ואת הסיפור שמאחוריה.', artistIds: [], artworkIds: [], location: 'TBD' },
  { id: 'e1', title: 'Loneliness in a Vibrant Environment', curator: 'קורין אברהם', startDate: '28.12.2025', endDate: '28.02.2026', status: 'current', description: 'בדידות אינה תמיד שקט. לעיתים היא מתרחשת דווקא במקומות הרועשים ביותר — שפע, צבע, תנועה, דימויים ואנשים. זו בדידות שאינה נובעת מהיעדר, אלא מעודף. מעודף גירויים, מעודף מסכות, מעודף קולות שמטשטשים את הקול הפנימי. התערוכה מבקשת להתבונן ברגע שבו אדם נמצא בלב ההמולה ועדיין מרגיש לבד. לא כקריסה, אלא כמצב תודעתי. כהשהיה. כהתפכחות. העבודות נעות בין גוף לשפה, בין חומר לרגש, בין פיתוי לנחמה, בין משחקיות לפצע.', artistIds: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'], artworkIds: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9'], location: 'כיכר המדינה, ז\'בוטינסקי 131, תל אביב' },
];

const blogPosts = [
  {
    id: 'p1', title: 'בדידות בסביבה תוססת: על התערוכה החדשה', date: '28.12.2025', author: 'קורין אברהם',
    excerpt: 'התערוכה מבקשת להתבונן ברגע שבו אדם נמצא בלב ההמולה ועדיין מרגיש לבד. לא כקריסה, אלא כמצב תודעתי.',
    content: `{link:e1:התערוכה "בדידות בסביבה תוססת"} נפתחה בגלריה שלנו בכיכר המדינה, ומזמינה את הצופים לחוויה רב-חושית. האוצרת קורין אברהם בחרה שבעה אמנים שכל אחד מהם מציע נקודת מבט שונה על אותה חוויה אנושית: גוף שנוכח אך לא נענה, דימוי שמושך את העין אך מסתיר ריק.

כבר בכניסה, עבודותיו של {link:a1:זוהר רון} תופסות את העין. ב{link:w1:"גוף ושפה"}, הכתב העברי מקבל חיים חדשים כחומר ויזואלי, הנכתב בדיו ומכחול ישירות על הגוף. המילים אינן עיטור — הן פעולה טקסית, אינטימית, בעלת ממד כמעט מאגי.

{link:a2:איתן גולדסון} מציג את {link:w2:"תשע נשמות"}, עבודה משותפת עם הנריקה רוטנברג. גולדסון מביא לתערוכה את הדו-שיח הפנימי שלו בין תרבויות — מן העבר מול ההווה מול פנטזיות על עתיד פוסט אפוקליפטי.

מנגד, {link:a3:הולי קדוש} מציגה את סדרת {link:w3:"גן החיות של התודעה"} — מרחב פנימי של דימויים פראיים שנולד מתת־מודע. לצידה, {link:w5:"שק האגרוף"} שלה מציב את מסע ההתמודדות הפנימי בלב חלל תוסס.

{link:e1:התערוכה} פתוחה עד 28.2.2026. מומלץ בחום.`,
    imagePlaceholders: 3
  },
  {
    id: 'p2', title: 'גוף, שפה ומסכות: על האמנים בתערוכה', date: '15.01.2026', author: 'צוות הגלריה',
    excerpt: 'מזוהר רון ועד רז רונן — הכרות עם שבעת האמנים שמציגים בתערוכת "בדידות בסביבה תוססת".',
    content: `שבעה אמנים, שבע שפות חזותיות, חוויה אחת משותפת. {link:e1:התערוכה "בדידות בסביבה תוססת"} מאגדת יוצרים מגוונים שכולם עוסקים בשאלות של זהות, שייכות וחיפוש.

{link:a6:זוהר שטרית}, צלם ובמאי, מציג את {link:w7:"ליצן"} — תקריב מטושטש של פני ליצן, דימוי תרבותי המזוהה עם החצנה. הטשטוש מבטל זהות ומגדר, ומשאיר סימן חזותי טעון. העבודה בוחנת את המתח שבין ההגנה שהמסכה מספקת לבין המחיר שהיא גובה.

{link:a7:רז רונן} מביא את {link:w8:"כאוס ושליטה"} — ציורים שנוצרים במהירות ובאופן אינסטינקטיבי. גדילתו בחולון עיצבה את קולו האמנותי, והציתה משיכה מתמשכת אל הגולמי, המרדני, ואל יופי שמסרב להיות מהוקצע.

{link:a4:טל נהוראי} ב{link:w9:"פופ וביקורת"} מפתיעה עם אסתטיקה צבעונית ופופ־ארטית שמשמשת כעדשה ביקורתית על התרבות המערבית. ו{link:a5:האמניות האנונימיות} ב{link:w6:"קמעות"} מציעות כתב־סתרים מקורי — מערכת קודים שנוצרה במיוחד כלחישות חזותיות.

כל האמנים מציגים בגלריה בכיכר המדינה, {link:a7:רז רונן} מציג גם בגלריה בכיכר דיזינגוף.`,
    imagePlaceholders: 4
  },
  {
    id: 'p3', title: 'ארז זילינסקי־רוזן: "ריח כיצירה, יצירה כבית"', date: '01.01.2026', author: 'צוות הגלריה',
    excerpt: 'על החזון של ארז זילינסקי־רוזן, מייסד המותג, לחבר בין עולם הבישום לאמנות עכשווית.',
    content: `ארז זילינסקי־רוזן הוא קודם כול אמן. לפני שהוא רוקח, לפני שהוא יזם — הוא יוצר. עולם הבישום עבורו הוא קנבס בלתי נראה שנבנה משכבות של רגש וזיכרון. הוא עובד מתוך אינטואיציה טהורה — ממצב רוח, מחוויות, מהחיים עצמם. כל בושם שהוא יוצר הוא יצירת אמנות, עם סיפור, עם צבע, עם פעימה.

בדיוק כמו שהבשמים נולדים מתוך דיאלוג של רגש וחומר, כך גם הגלריות של ארז הן מקום שבו האמנות מתרחשת, זזה ומתפתחת, באופן שממשיך את מהות המותג: ריח כיצירה, יצירה כבית.

הגלריות פועלות ללא מטרות רווח — כל ההכנסות חוזרות לאמנים. הגלריות פועלות מתוך משיכה לאסתטיקה עכשווית ולאפשר מפגש ישיר ובלתי אמצעי בין יוצרים לקהל.

{link:e1:התערוכה הנוכחית "בדידות בסביבה תוססת"} היא דוגמה מושלמת לחזון הזה. היצירות מעלות שאלות של זהות, שייכות ואמת — ומאפשרות לקהל לפגוש את עצמו דרך האמנות. אמנים כמו {link:a1:זוהר רון}, {link:a3:הולי קדוש} ו{link:a7:רז רונן} מביאים לגלריה אנרגיה חדשה ומרגשת.

"אמנות היא חלק בלתי נפרד מהמותג", אומר ארז. "אותו חופש שמוביל אותי בבישום, הוביל אותי לפתוח מרחבים שמכילים יצירה חיה ונושמת."`,
    imagePlaceholders: 3
  },
];

const galleries = [
  { name: 'גלריה כיכר המדינה', address: 'ז\'בוטינסקי 131, תל אביב', hours: 'א\'-ה\' 10:00-19:00 | ו\' 10:00-14:00 | שבת סגור', mapUrl: 'https://maps.google.com/?q=ז\'בוטינסקי+131+תל+אביב' },
  { name: 'גלריה כיכר דיזינגוף', address: 'כיכר דיזינגוף, תל אביב', hours: 'א\'-ה\' 10:00-19:00 | ו\' 10:00-14:00 | שבת סגור', mapUrl: 'https://maps.google.com/?q=כיכר+דיזינגוף+תל+אביב' },
  { name: 'עולי ציון, יפו', address: 'רח\' עולי ציון 5, תל אביב-יפו', hours: 'א\'-ה\' 10:00-20:00 | ו\' 10:00-15:00 | שבת סגור', mapUrl: 'https://maps.google.com/?q=עולי+ציון+5+תל+אביב+יפו' },
];

// ===== HELPER: get first image URL from an exhibition's artworks =====
const getExhibitionCoverUrl = (ex) => {
  for (const wid of ex.artworkIds) {
    const w = artworks.find((a) => a.id === wid);
    if (w) {
      const img = w.media.find((m) => m.type === 'image' && m.url);
      if (img) return img.url;
    }
  }
  return null;
};

// ===== ICONS =====
const Icons = {
  exhibitions: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  artists: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
    </svg>
  ),
  art: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  blog: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16v16H4z" /><path d="M8 8h8M8 12h8M8 16h4" />
    </svg>
  ),
  back: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  calendar: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
  ),
  location: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  curator: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 016-6h4a6 6 0 016 6v1"/></svg>
  ),
  home: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
    </svg>
  ),
  instagram: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
  ),
  facebook: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  ),
  tiktok: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/>
    </svg>
  ),
  whatsapp: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
    </svg>
  ),
  website: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  ),
  emailIcon: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/>
    </svg>
  ),
};

// ===== PLACEHOLDER — preserves original proportions =====
const Placeholder = ({ height = 180, rounded = 8, src }) => {
  if (src) {
    return (
      <div style={{ width: "100%", borderRadius: rounded, overflow: "hidden", backgroundColor: "#e8e4df" }}>
        <img
          src={src}
          alt=""
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    );
  }
  return (
    <div style={{ width: "100%", height, backgroundColor: "#e8e4df", borderRadius: rounded, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#bbb5ad" strokeWidth="1.2">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
      </svg>
    </div>
  );
};

// ===== SLIDESHOW — preserves original proportions =====
const MediaSlideshow = ({ media }) => {
  const [idx, setIdx] = useState(0);
  const total = media.length;
  const item = media[idx];
  const isVideo = item.type === "video";
  const hasUrl = item.url;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  const arrowStyle = (side) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [side]: 8,
    width: 36,
    height: 36,
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.85)",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
    zIndex: 2,
    transition: "background 0.2s",
  });

  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", backgroundColor: "#e8e4df" }}>
      {/* media area — auto height for real images, fixed for placeholders */}
      {isVideo ? (
        <div style={{ width: "100%", height: 280, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#bbb5ad" strokeWidth="1.2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span style={{ fontSize: 12, color: "#bbb5ad" }}>וידאו</span>
        </div>
      ) : hasUrl ? (
        <img src={item.url} alt={item.label || ''} style={{ width: "100%", height: "auto", display: "block" }} />
      ) : (
        <div style={{ width: "100%", height: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#bbb5ad" strokeWidth="1.2">
            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
      )}

      {/* arrows */}
      {total > 1 && (
        <>
          <button onClick={next} style={arrowStyle("right")}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,1)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.85)")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
          <button onClick={prev} style={arrowStyle("left")}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,1)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.85)")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
        </>
      )}

      {/* dots + label */}
      <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 2 }}>
        <div style={{ backgroundColor: "rgba(0,0,0,0.45)", color: "#fff", fontSize: 11, padding: "3px 10px", borderRadius: 12, fontWeight: 500 }}>
          {item.label} &middot; {idx + 1}/{total}
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {media.map((_, i) => (
            <div key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 16 : 6, height: 6, borderRadius: 3,
              backgroundColor: i === idx ? "#fff" : "rgba(255,255,255,0.5)",
              cursor: "pointer", transition: "all 0.25s",
            }} />
          ))}
        </div>
      </div>
    </div>
  );
};

const AvatarPlaceholder = ({ size = 56, src }) => {
  if (src) {
    return (
      <div style={{ width: size, height: size, minWidth: size, borderRadius: "50%", overflow: "hidden", backgroundColor: "#e8e4df" }}>
        <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    );
  }
  return (
    <div style={{ width: size, height: size, minWidth: size, borderRadius: "50%", backgroundColor: "#e8e4df", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size * 0.45} height={size * 0.45} viewBox="0 0 24 24" fill="none" stroke="#bbb5ad" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 016-6h4a6 6 0 016 6v1" />
      </svg>
    </div>
  );
};

// ===== STATUS BADGE =====
const StatusBadge = ({ status }) => {
  const config = {
    current: { label: 'תערוכה פעילה', bg: '#e6f4ea', color: '#1e7e34' },
    call: { label: 'קול קורא', bg: '#fff3e0', color: '#e65100' },
    past: { label: 'תערוכת עבר', bg: '#f0f0f0', color: '#757575' },
  };
  const c = config[status];
  if (!c) return null;
  return (
    <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 12, backgroundColor: c.bg, color: c.color, fontSize: 11, fontWeight: 600, lineHeight: 1.5 }}>
      {c.label}
    </span>
  );
};

// ===== SEARCH INPUT =====
const SearchInput = ({ value, onChange, placeholder }) => (
  <div style={{ position: "relative", marginBottom: 16 }}>
    <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
      {Icons.search()}
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "10px 40px 10px 14px",
        borderRadius: 12,
        border: "1px solid #e8e4df",
        backgroundColor: "#fff",
        fontSize: 14,
        fontFamily: "Heebo, sans-serif",
        color: "#1a1a1a",
        outline: "none",
        direction: "rtl",
        transition: "border-color 0.2s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#ccc5bc")}
      onBlur={(e) => (e.target.style.borderColor = "#e8e4df")}
    />
  </div>
);

// ===== REUSABLE COMPONENTS =====
const Tag = ({ children, onClick }) => (
  <span
    onClick={onClick}
    style={{ display: "inline-block", padding: "4px 12px", borderRadius: 20, backgroundColor: "#f0ece7", color: "#5a5249", fontSize: 12, fontWeight: 500, cursor: onClick ? "pointer" : "default", transition: "background 0.2s", lineHeight: 1.5 }}
    onMouseEnter={(e) => onClick && (e.target.style.backgroundColor = "#e5dfd8")}
    onMouseLeave={(e) => onClick && (e.target.style.backgroundColor = "#f0ece7")}
  >
    {children}
  </span>
);

const SectionHeader = ({ children }) => (
  <h3 style={{ fontSize: 13, fontWeight: 600, color: "#999", letterSpacing: "0.05em", margin: "24px 0 12px", textTransform: "uppercase" }}>{children}</h3>
);

const SocialButton = ({ icon, label, url, color }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 20, backgroundColor: color || "#f0ece7", color: color ? "#fff" : "#5a5249", fontSize: 12, fontWeight: 500, cursor: "pointer", textDecoration: "none", transition: "opacity 0.2s" }}
    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
  >
    <span style={{ display: "flex", alignItems: "center" }}>{icon}</span> {label}
  </a>
);

// Parse blog content with inline links
const ParsedContent = ({ content, navigate }) => {
  const parts = content.split(/(\{link:[^}]+\})/g);
  return (
    <span>
      {parts.map((part, i) => {
        const match = part.match(/\{link:([^:]+):([^}]+)\}/);
        if (match) {
          const [, id, text] = match;
          let onClick;
          if (id.startsWith('a')) onClick = () => navigate('artist', id);
          else if (id.startsWith('w')) onClick = () => navigate('artwork', id);
          else if (id.startsWith('e')) onClick = () => navigate('exhibition', id);
          return <span key={i} style={{ color: "#5a5249", textDecoration: "underline", textDecorationColor: "#ccc", cursor: "pointer", fontWeight: 500 }} onClick={onClick}>{text}</span>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

// ===== MAIN APP =====
export default function ArtGalleryApp() {
  const [nav, setNav] = useState({ page: "home", id: null, history: [] });
  const [artistSearch, setArtistSearch] = useState("");
  const [artSearch, setArtSearch] = useState("");

  const currentTab = ["exhibitions", "artists", "art", "blog"].includes(nav.page) ? nav.page : null;

  const navigate = (type, id = null) => {
    setNav(prev => ({ page: type, id, history: [...prev.history, { page: prev.page, id: prev.id }] }));
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    setNav(prev => {
      const history = [...prev.history];
      const last = history.pop() || { page: "home", id: null };
      return { page: last.page, id: last.id, history };
    });
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    setNav({ page: "home", id: null, history: [] });
    window.scrollTo(0, 0);
  };

  const getArtist = (id) => artists.find((a) => a.id === id);
  const getArtwork = (id) => artworks.find((w) => w.id === id);

  const getArtworkThumb = (w) => {
    if (!w || !w.media) return null;
    const imgItem = w.media.find((m) => m.type === 'image' && m.url);
    return imgItem ? imgItem.url : null;
  };

  // ===== TEXTURE: load, mirror-tile, rotate 90deg, stretch =====
  const [textureUrl, setTextureUrl] = useState(null);
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const w = img.width, h = img.height;
        const tile = document.createElement('canvas');
        tile.width = w * 2; tile.height = h * 2;
        const t = tile.getContext('2d');
        t.drawImage(img, 0, 0);
        t.save(); t.translate(w * 2, 0); t.scale(-1, 1); t.drawImage(img, 0, 0); t.restore();
        t.save(); t.translate(0, h * 2); t.scale(1, -1); t.drawImage(img, 0, 0); t.restore();
        t.save(); t.translate(w * 2, h * 2); t.scale(-1, -1); t.drawImage(img, 0, 0); t.restore();
        const rot = document.createElement('canvas');
        rot.width = tile.height; rot.height = tile.width;
        const r = rot.getContext('2d');
        r.translate(rot.width / 2, rot.height / 2);
        r.rotate(Math.PI / 2);
        r.drawImage(tile, -tile.width / 2, -tile.height / 2);
        setTextureUrl(rot.toDataURL('image/png'));
      } catch (e) { /* CORS fallback: no texture */ }
    };
    img.src = 'https://static.wixstatic.com/media/9a84d8_9e8753c1c6de4b26a548ed1d0ee33642~mv2.png';
  }, []);

  const textureOverlay = textureUrl ? {
    position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
    backgroundImage: `url("${textureUrl}")`,
    backgroundRepeat: 'repeat',
    backgroundSize: '100% auto',
    opacity: 0.1,
  } : null;

  const TexturedContainer = ({ children, style }) => (
    <div style={{ ...style, position: 'relative', overflow: 'hidden' }}>
      {textureOverlay && <div style={textureOverlay} />}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );

  // ===== HOME PAGE =====
  const renderHome = () => (
    <div style={{ animation: "fadeIn 0.2s ease", backgroundColor: "#0a0a0a" }}>
      {/* Hero */}
      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        <img
          src="https://static.wixstatic.com/media/3e3f5c_8efc9803b8384a6cb0f5bd4b5c6f672e~mv2.jpg"
          alt="Erez Zielinski Rozen"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.35) 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <div style={{ fontSize: 13, fontWeight: 400, color: "rgba(255,255,255,0.85)", letterSpacing: 2, textAlign: "center", marginBottom: 2 }}>ברוכים הבאים</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: 3, textAlign: "center", textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>ZIELINSKI & ROZEN</div>
          <div style={{ fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.9)", letterSpacing: 5, textAlign: "center" }}>THE ART GALLERY</div>
        </div>
      </div>

      {/* Nav bar */}
      {/* About */}
      <div style={{ padding: "32px 24px", borderBottom: "1px solid rgba(200,180,140,0.1)" }}>
        <p style={{ fontSize: 14, lineHeight: 1.9, color: "#bfb5a3", margin: 0, textAlign: "center" }}>
          ארז זילינסקי־רוזן הוא קודם כול אמן. עולם הבישום עבורו הוא קנבס בלתי נראה שנבנה משכבות של רגש וזיכרון. הגלריות הן מקום שבו האמנות מתרחשת — ופועלות ללא מטרות רווח. כל ההכנסות חוזרות לאמנים.
        </p>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <div style={{ width: 24, height: 1, backgroundColor: "rgba(200,180,140,0.3)", margin: "0 auto" }} />
        </div>
      </div>

      {/* Nav buttons */}
      <div style={{ display: "flex", gap: 10, padding: "16px 20px" }}>
        {[
          { key: "exhibitions", label: "תערוכות", icon: Icons.exhibitions },
          { key: "artists", label: "אמנים", icon: Icons.artists },
          { key: "art", label: "אומנות", icon: Icons.art },
          { key: "blog", label: "בלוג", icon: Icons.blog },
        ].map((item) => (
          <div key={item.key} onClick={() => navigate(item.key)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", padding: "12px 0", border: "1px solid rgba(200,180,140,0.15)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8b99a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{item.icon(false).props.children}</svg>
            <div style={{ fontSize: 11, fontWeight: 400, color: "#c8b99a", letterSpacing: 1, lineHeight: 1 }}>{item.label}</div>
          </div>
        ))}
      </div>
      <div style={{ height: 1, backgroundColor: "rgba(200,180,140,0.12)" }} />

      {/* Exhibitions scroll */}
      <div style={{ padding: "28px 0 16px" }}>
        <div onClick={() => navigate("exhibitions")} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", marginBottom: 18, cursor: "pointer" }}>
          <div style={{ fontSize: 10, fontWeight: 400, color: "#9a8e7a", letterSpacing: 4, textTransform: "uppercase" }}>תערוכות</div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9a8e7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingLeft: 20, paddingRight: 20, scrollbarWidth: "none", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
          {exhibitions.map(ex => {
            const coverUrl = getExhibitionCoverUrl(ex);
            return (
              <div key={ex.id} onClick={() => navigate("exhibition", ex.id)} style={{ flexShrink: 0, width: 200, cursor: "pointer", scrollSnapAlign: "center" }}>
                <div style={{ width: 200, height: 120, overflow: "hidden", border: "1px solid rgba(200,180,140,0.15)" }}>
                  {coverUrl ? <img src={coverUrl} alt={ex.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(200,180,140,0.08)" }} />}
                </div>
                <div style={{ fontSize: 11, color: "#ede8e0", marginTop: 6, lineHeight: 1.3, direction: "ltr" }}>{ex.title.length > 28 ? ex.title.substring(0, 28) + "…" : ex.title}</div>
              </div>
            );
          })}
          <div onClick={() => navigate("exhibitions")} style={{ flexShrink: 0, width: 200, cursor: "pointer", scrollSnapAlign: "center" }}>
            <div style={{ width: 200, height: 120, overflow: "hidden", border: "1px solid rgba(200,180,140,0.15)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(200,180,140,0.06)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a89a82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="17" y1="17" x2="7" y2="7"/><polyline points="17 7 7 7 7 17"/></svg>
            </div>
            <div style={{ fontSize: 11, color: "#a89a82", marginTop: 6, lineHeight: 1.3, textAlign: "center" }}>עוד</div>
          </div>
        </div>
      </div>
      <div style={{ height: 1, backgroundColor: "rgba(200,180,140,0.12)" }} />

      {/* Artists scroll */}
      <div style={{ padding: "28px 0 16px" }}>
        <div onClick={() => navigate("artists")} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", marginBottom: 18, cursor: "pointer" }}>
          <div style={{ fontSize: 10, fontWeight: 400, color: "#9a8e7a", letterSpacing: 4, textTransform: "uppercase" }}>אמנים</div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9a8e7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </div>
        <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingLeft: 20, paddingRight: 20, scrollbarWidth: "none", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
          {artists.map(ar => (
            <div key={ar.id} onClick={() => navigate("artist", ar.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", flexShrink: 0, scrollSnapAlign: "center" }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", overflow: "hidden", border: "1.5px solid rgba(200,180,140,0.25)" }}>
                {ar.img ? <img src={ar.img} alt={ar.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(200,180,140,0.1)" }} />}
              </div>
              <div style={{ fontSize: 10, color: "#a89a82", textAlign: "center", maxWidth: 64, lineHeight: 1.2 }}>{ar.name.split(" ")[0]}</div>
            </div>
          ))}
          <div onClick={() => navigate("artists")} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", flexShrink: 0, scrollSnapAlign: "center" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", border: "1.5px solid rgba(200,180,140,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a89a82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="17" y1="17" x2="7" y2="7"/><polyline points="17 7 7 7 7 17"/></svg>
            </div>
            <div style={{ fontSize: 10, color: "#a89a82", textAlign: "center", maxWidth: 64, lineHeight: 1.2 }}>עוד</div>
          </div>
        </div>
      </div>
      <div style={{ height: 1, backgroundColor: "rgba(200,180,140,0.12)" }} />

      {/* Artworks grid */}
      <div style={{ padding: "28px 20px 16px" }}>
        <div onClick={() => navigate("art")} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, cursor: "pointer" }}>
          <div style={{ fontSize: 10, fontWeight: 400, color: "#9a8e7a", letterSpacing: 4, textTransform: "uppercase" }}>אמנות</div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9a8e7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {artworks.filter(w => getArtworkThumb(w)).slice(0, 6).map(w => (
            <div key={w.id} onClick={() => navigate("artwork", w.id)} style={{ cursor: "pointer", overflow: "hidden", border: "1px solid rgba(200,180,140,0.12)" }}>
              <img src={getArtworkThumb(w)} alt={w.title} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          ))}
        </div>
        <div onClick={() => navigate("art")} style={{ marginTop: 16, padding: "12px 0", border: "1px solid rgba(200,180,140,0.2)", textAlign: "center", cursor: "pointer" }}>
          <span style={{ fontSize: 12, color: "#a89a82", letterSpacing: 2 }}>עוד</span>
        </div>
      </div>
      <div style={{ height: 1, backgroundColor: "rgba(200,180,140,0.12)" }} />

      {/* Galleries */}
      <div style={{ padding: "28px 24px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "0", marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 400, color: "#9a8e7a", letterSpacing: 4, textTransform: "uppercase" }}>הגלריות</div>
        </div>
        {galleries.map((g, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderBottom: i < galleries.length - 1 ? "1px solid rgba(200,180,140,0.08)" : "none" }}>
            <div style={{ width: 48, height: 48, backgroundColor: "rgba(200,180,140,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(200,180,140,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 14, color: "#ede8e0", marginBottom: 3 }}>{g.name}</div>
              <div style={{ fontSize: 12, color: "#a89a82", marginBottom: 2 }}>{g.address}</div>
              <div style={{ fontSize: 11, color: "#8a7e6c" }}>{g.hours}</div>
            </div>
            <div onClick={(e) => { e.stopPropagation(); window.open(g.mapUrl, '_blank'); }} style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(200,180,140,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#a89a82"><path d="m21.41 10.59-7.99-8c-.78-.78-2.05-.78-2.83 0l-8.01 8c-.78.78-.78 2.05 0 2.83l8.01 8c.78.78 2.05.78 2.83 0l7.99-8c.79-.79.79-2.05 0-2.83zM13.5 14.5V12H10v3H8v-4c0-.55.45-1 1-1h4.5V7.5L17 11l-3.5 3.5z"/></svg>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: 1, backgroundColor: "rgba(200,180,140,0.12)" }} />

      {/* Blog scroll */}
      <div style={{ padding: "28px 0 16px" }}>
        <div onClick={() => navigate("blog")} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", marginBottom: 18, cursor: "pointer" }}>
          <div style={{ fontSize: 10, fontWeight: 400, color: "#9a8e7a", letterSpacing: 4, textTransform: "uppercase" }}>בלוג</div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9a8e7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingLeft: 20, paddingRight: 20, scrollbarWidth: "none", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
          {blogPosts.slice(0, 3).map(post => (
            <div key={post.id} onClick={() => navigate("post", post.id)} style={{ flexShrink: 0, width: 200, cursor: "pointer", scrollSnapAlign: "center" }}>
              <div style={{ width: 200, height: 120, overflow: "hidden", border: "1px solid rgba(200,180,140,0.15)", backgroundColor: "rgba(200,180,140,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(200,180,140,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" /><path d="M8 8h8M8 12h8M8 16h4" /></svg>
              </div>
              <div style={{ fontSize: 12, color: "#ede8e0", marginTop: 6, lineHeight: 1.4 }}>{post.title.length > 36 ? post.title.substring(0, 36) + "…" : post.title}</div>
              <div style={{ fontSize: 10, color: "#8a7e6c", marginTop: 3 }}>{post.date}</div>
            </div>
          ))}
          <div onClick={() => navigate("blog")} style={{ flexShrink: 0, width: 200, cursor: "pointer", scrollSnapAlign: "center" }}>
            <div style={{ width: 200, height: 120, overflow: "hidden", border: "1px solid rgba(200,180,140,0.15)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(200,180,140,0.06)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a89a82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="17" y1="17" x2="7" y2="7"/><polyline points="17 7 7 7 7 17"/></svg>
            </div>
            <div style={{ fontSize: 11, color: "#a89a82", marginTop: 6, lineHeight: 1.3, textAlign: "center" }}>עוד</div>
          </div>
        </div>
      </div>
      <div style={{ height: 130 }} />
    </div>
  );

  // ===== EXHIBITIONS LIST =====
  const renderExhibitions = () => (
    <TexturedContainer style={styles.listContainer}>
      <div style={styles.listHeader}>
        <button onClick={goHome} style={styles.backBtn}>{Icons.back()}</button>
        <h1 style={styles.pageTitle}>תערוכות</h1>
      </div>
      <div style={{ fontSize: 13, color: "#999", marginBottom: 20, marginTop: -12 }}>תערוכות עבר, הווה ועתיד בגלריות זילינסקי רוזן</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {exhibitions.map((ex) => {
          const coverUrl = getExhibitionCoverUrl(ex);
          return (
            <div key={ex.id} onClick={() => navigate("exhibition", ex.id)} style={{ cursor: "pointer" }}>
              <Placeholder height={190} rounded={12} src={coverUrl} />
              <div style={{ padding: "16px 4px 4px" }}>
                <div style={{ textAlign: "center", marginBottom: 8 }}>
                  <StatusBadge status={ex.status} />
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 6px", color: "#1a1a1a", textAlign: "center", direction: "ltr" }}>{ex.title}</h2>
                <div style={{ display: "flex", gap: 14, alignItems: "center", color: "#888", fontSize: 12, margin: "8px 0 4px", flexWrap: "wrap" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>{Icons.calendar()} {ex.startDate} — {ex.endDate}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>{Icons.location()} {ex.location}</span>
                </div>
                <div style={{ fontSize: 12, color: "#aaa", marginBottom: 8 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>{Icons.curator()} אוצרת: {ex.curator}</span>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "#7a756e", margin: 0 }}>
                  {ex.description.length > 100 ? ex.description.substring(0, 100) + "..." : ex.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </TexturedContainer>
  );

  // ===== ARTISTS LIST =====
  const renderArtists = () => {
    const q = artistSearch.trim().toLowerCase();
    const filtered = q
      ? artists.filter(ar => ar.name.includes(artistSearch.trim()) || ar.nameEn.toLowerCase().includes(q) || ar.bio.includes(artistSearch.trim()))
      : artists;

    return (
      <TexturedContainer style={styles.listContainer}>
        <div style={styles.listHeader}>
          <button onClick={goHome} style={styles.backBtn}>{Icons.back()}</button>
          <h1 style={styles.pageTitle}>אמנים</h1>
        </div>
        <div style={{ fontSize: 13, color: "#999", marginBottom: 16, marginTop: -12 }}>היוצרים שמאחורי העבודות</div>
        <SearchInput value={artistSearch} onChange={setArtistSearch} placeholder="חיפוש אמנים..." />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#999", fontSize: 14 }}>לא נמצאו תוצאות</div>
          )}
          {filtered.map((ar) => {
            const workCount = artworks.filter((w) => w.artistId === ar.id).length;
            return (
              <div key={ar.id} onClick={() => navigate("artist", ar.id)} style={styles.artistRow}>
                <AvatarPlaceholder size={52} src={ar.img} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#1a1a1a" }}>{ar.name}</div>
                  <div style={{ fontSize: 12, color: "#999", marginTop: 3 }}>{ar.nameEn} &middot; {workCount} יצירות</div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
              </div>
            );
          })}
        </div>
      </TexturedContainer>
    );
  };

  // ===== ART LIST =====
  const renderArt = () => {
    const q = artSearch.trim().toLowerCase();
    const filtered = q
      ? artworks.filter(w => {
          const ar = getArtist(w.artistId);
          return w.title.includes(artSearch.trim()) || w.title.toLowerCase().includes(q) || (ar && (ar.name.includes(artSearch.trim()) || ar.nameEn.toLowerCase().includes(q))) || (w.medium && w.medium.includes(artSearch.trim()));
        })
      : artworks;

    return (
      <TexturedContainer style={styles.listContainer}>
        <div style={styles.listHeader}>
          <button onClick={goHome} style={styles.backBtn}>{Icons.back()}</button>
          <h1 style={styles.pageTitle}>אומנות</h1>
        </div>
        <div style={{ fontSize: 13, color: "#999", marginBottom: 16, marginTop: -12 }}>יצירות מקוריות מהתערוכות שלנו</div>
        <SearchInput value={artSearch} onChange={setArtSearch} placeholder="חיפוש יצירות, אמנים..." />
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#999", fontSize: 14 }}>לא נמצאו תוצאות</div>
        )}
        <div style={{ columns: 2, columnGap: 14 }}>
          {filtered.map((w) => {
            const ar = getArtist(w.artistId);
            const thumbUrl = getArtworkThumb(w);
            return (
              <div key={w.id} onClick={() => navigate("artwork", w.id)} style={{ cursor: "pointer", breakInside: "avoid", marginBottom: 16 }}>
                <Placeholder height={140} rounded={10} src={thumbUrl} />
                <div style={{ padding: "8px 2px 0" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.3 }}>{w.title}</div>
                  <div style={{ fontSize: 11, color: "#999", marginTop: 3 }}>{ar?.name}</div>
                  <div style={{ fontSize: 11, color: "#bbb" }}>{w.medium}</div>
                </div>
              </div>
            );
          })}
        </div>
      </TexturedContainer>
    );
  };

  // ===== BLOG LIST =====
  const renderBlog = () => (
    <TexturedContainer style={styles.listContainer}>
      <div style={styles.listHeader}>
        <button onClick={goHome} style={styles.backBtn}>{Icons.back()}</button>
        <h1 style={styles.pageTitle}>בלוג</h1>
      </div>
      <div style={{ fontSize: 13, color: "#999", marginBottom: 20, marginTop: -12 }}>כתבות, ראיונות והצצה מאחורי הקלעים</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {blogPosts.map((p) => (
          <div key={p.id} onClick={() => navigate("post", p.id)} style={{ cursor: "pointer" }}>
            <Placeholder height={170} rounded={12} />
            <div style={{ padding: "14px 4px 4px" }}>
              <div style={{ fontSize: 11, color: "#999", marginBottom: 4 }}>{p.date} &middot; {p.author}</div>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px", color: "#1a1a1a", lineHeight: 1.4 }}>{p.title}</h2>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "#7a756e", margin: 0 }}>{p.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </TexturedContainer>
  );

  // ===== EXHIBITION DETAIL =====
  const renderExhibitionDetail = () => {
    const ex = exhibitions.find((e) => e.id === nav.id);
    if (!ex) return null;
    const coverUrl = getExhibitionCoverUrl(ex);
    return (
      <div style={{ ...styles.page, animation: "slideIn 0.25s ease" }}>
        <div style={styles.detailHeader}>
          <button onClick={goBack} style={styles.backBtn}>{Icons.back()}</button>
          <span style={styles.detailHeaderTitle}>תערוכה</span>
        </div>
        <div style={{ padding: "0 20px 120px" }}>
          <Placeholder height={220} rounded={12} src={coverUrl} />
          <div style={{ textAlign: "center", margin: "20px 0 8px" }}>
            <StatusBadge status={ex.status} />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 6px", color: "#1a1a1a", lineHeight: 1.3, textAlign: "left", direction: "ltr" }}>{ex.title}</h1>
          <div style={{ display: "flex", gap: 14, alignItems: "center", color: "#888", fontSize: 13, margin: "0 0 6px", flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>{Icons.calendar()} {ex.startDate} — {ex.endDate}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>{Icons.location()} {ex.location}</span>
          </div>
          <div style={{ fontSize: 13, color: "#aaa", marginBottom: 16 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>{Icons.curator()} אוצרת: {ex.curator}</span>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#4a4540", margin: "0 0 20px" }}>{ex.description}</p>

          {ex.status === 'call' && (
            <button
              style={{
                width: "100%",
                padding: "14px 24px",
                backgroundColor: "#e65100",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                marginBottom: 20,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#bf4500")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e65100")}
            >
              הגשת מועמדות
            </button>
          )}

          {ex.artistIds.length > 0 && (
            <>
              <SectionHeader>אמנים משתתפים</SectionHeader>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {ex.artistIds.map((aid) => {
                  const ar = getArtist(aid);
                  return ar ? <Tag key={aid} onClick={() => navigate("artist", aid)}>{ar.name}</Tag> : null;
                })}
              </div>
            </>
          )}

          {ex.artworkIds.length > 0 && (
            <>
              <SectionHeader>יצירות בתערוכה</SectionHeader>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {ex.artworkIds.map((wid) => {
                  const w = getArtwork(wid);
                  if (!w) return null;
                  const ar = getArtist(w.artistId);
                  const thumbUrl = getArtworkThumb(w);
                  return (
                    <div key={wid} onClick={() => navigate("artwork", wid)} style={styles.miniCard}>
                      <div style={{ width: 72, height: 72, minWidth: 72, borderRadius: 8, backgroundColor: "#e8e4df", overflow: "hidden" }}>
                        {thumbUrl ? (
                          <img src={thumbUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        ) : null}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a" }}>{w.title}</div>
                        <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{ar?.name} &middot; {w.year}</div>
                        <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>{w.medium}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // ===== BUILD SOCIAL BUTTONS FOR ARTIST =====
  const buildSocialButtons = (ar) => {
    const buttons = [];
    if (ar.instagram) buttons.push({ icon: Icons.instagram(), url: ar.instagram });
    if (ar.facebook) buttons.push({ icon: Icons.facebook(), url: ar.facebook });
    if (ar.tiktok) buttons.push({ icon: Icons.tiktok(), url: ar.tiktok });
    if (ar.website) buttons.push({ icon: Icons.website(), url: ar.website });
    if (ar.whatsapp) buttons.push({ icon: Icons.whatsapp(), url: `https://wa.me/${ar.whatsapp}` });
    if (ar.email) buttons.push({ icon: Icons.emailIcon(), url: `mailto:${ar.email}` });
    return buttons;
  };

  // ===== ARTIST DETAIL =====
  const renderArtistDetail = () => {
    const ar = artists.find((a) => a.id === nav.id);
    if (!ar) return null;
    const works = artworks.filter((w) => w.artistId === ar.id);
    const exs = exhibitions.filter((e) => e.artistIds.includes(ar.id));
    const socials = buildSocialButtons(ar);

    const zoneBg = "#f7f4f0";
    return (
      <div style={{ ...styles.page, animation: "slideIn 0.25s ease" }}>
        {/* Header — same tinted bg */}
        <div style={{ ...styles.detailHeader, backgroundColor: "rgba(247,244,240,0.92)" }}>
          <button onClick={goBack} style={styles.backBtn}>{Icons.back()}</button>
          <span style={styles.detailHeaderTitle}>אמן/ית</span>
        </div>

        {/* Zone 1: Profile + icons + bio — slightly tinted bg */}
        <div style={{ backgroundColor: zoneBg, padding: "0 20px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <AvatarPlaceholder size={100} src={ar.img} />
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: "16px 0 4px", color: "#1a1a1a" }}>{ar.name}</h1>
            <div style={{ fontSize: 13, color: "#999", marginBottom: 10 }}>{ar.nameEn}</div>
            {socials.length > 0 && (
              <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                {socials.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                    style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#f0ece7", color: "#5a5249", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", transition: "opacity 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#6a6560", margin: 0, textAlign: "right" }}>{ar.bio}</p>
        </div>

        {/* Zone 2: Artworks — normal bg */}
        <div style={{ backgroundColor: "#faf8f5", padding: "0 20px 24px" }}>
          <div style={{ textAlign: "right" }}>
            <SectionHeader>יצירות</SectionHeader>
            <div style={{ columns: 2, columnGap: 12 }}>
              {works.map((w) => {
                const thumbUrl = getArtworkThumb(w);
                return (
                  <div key={w.id} onClick={() => navigate("artwork", w.id)} style={{ cursor: "pointer", breakInside: "avoid", marginBottom: 14 }}>
                    <Placeholder height={120} rounded={10} src={thumbUrl} />
                    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 8, color: "#1a1a1a" }}>{w.title}</div>
                    <div style={{ fontSize: 11, color: "#999" }}>{w.year}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Zone 3: Exhibitions — normal bg with subtle divider */}
        <div style={{ padding: "0 20px 120px" }}>
          <div style={{ borderTop: "1px solid #e8e4df", marginTop: 4, paddingTop: 0 }} />
          <div style={{ textAlign: "right" }}>
            <SectionHeader>תערוכות</SectionHeader>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {exs.map((e) => (
                <Tag key={e.id} onClick={() => navigate("exhibition", e.id)}>{e.title}</Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ===== ARTWORK DETAIL =====
  const renderArtworkDetail = () => {
    const w = artworks.find((a) => a.id === nav.id);
    if (!w) return null;
    const ar = getArtist(w.artistId);
    const exs = exhibitions.filter((e) => e.artworkIds.includes(w.id));
    return (
      <div style={{ ...styles.page, animation: "slideIn 0.25s ease" }}>
        <div style={styles.detailHeader}>
          <button onClick={goBack} style={styles.backBtn}>{Icons.back()}</button>
          <span style={styles.detailHeaderTitle}>יצירה</span>
        </div>
        <div style={{ padding: "0 20px 120px" }}>
          <MediaSlideshow media={w.media} />
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: "20px 0 6px", color: "#1a1a1a", lineHeight: 1.3 }}>{w.title}</h1>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
            <Tag onClick={() => navigate("artist", w.artistId)}>{ar?.name}</Tag>
            <span style={{ fontSize: 13, color: "#999" }}>{w.year}</span>
          </div>
          <div style={{ fontSize: 13, color: "#aaa", marginBottom: 16 }}>{w.medium}</div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#4a4540", margin: "0 0 20px" }}>{w.description}</p>

          {exs.length > 0 && (
            <>
              <SectionHeader>מוצגת בתערוכות</SectionHeader>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {exs.map((e) => (
                  <Tag key={e.id} onClick={() => navigate("exhibition", e.id)}>{e.title}</Tag>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // ===== POST DETAIL =====
  const renderPostDetail = () => {
    const post = blogPosts.find((p) => p.id === nav.id);
    if (!post) return null;
    const paragraphs = post.content.split('\n\n');
    let imgIdx = 0;
    return (
      <div style={{ ...styles.page, animation: "slideIn 0.25s ease" }}>
        <div style={styles.detailHeader}>
          <button onClick={goBack} style={styles.backBtn}>{Icons.back()}</button>
          <span style={styles.detailHeaderTitle}>בלוג</span>
        </div>
        <div style={{ padding: "0 20px 120px" }}>
          <Placeholder height={200} rounded={12} />
          <div style={{ fontSize: 12, color: "#999", marginTop: 16 }}>{post.date} &middot; {post.author}</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: "8px 0 16px", color: "#1a1a1a", lineHeight: 1.4 }}>{post.title}</h1>
          {paragraphs.map((para, i) => {
            const showImg = imgIdx < post.imagePlaceholders && i > 0 && i % 2 === 0;
            if (showImg) imgIdx++;
            return (
              <div key={i}>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: "#4a4540", margin: "0 0 14px" }}>
                  <ParsedContent content={para} navigate={navigate} />
                </p>
                {showImg && (
                  <div style={{ marginBottom: 14, borderRadius: 10, overflow: "hidden" }}>
                    <Placeholder height={160} rounded={0} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ===== RENDER CURRENT PAGE =====
  const renderPage = () => {
    switch (nav.page) {
      case "home": return renderHome();
      case "exhibitions": return renderExhibitions();
      case "artists": return renderArtists();
      case "art": return renderArt();
      case "blog": return renderBlog();
      case "exhibition": return renderExhibitionDetail();
      case "artist": return renderArtistDetail();
      case "artwork": return renderArtworkDetail();
      case "post": return renderPostDetail();
      default: return renderHome();
    }
  };

  const tabs = [
    { key: "exhibitions", label: "תערוכות", icon: Icons.exhibitions },
    { key: "artists", label: "אמנים", icon: Icons.artists },
    { key: "art", label: "אומנות", icon: Icons.art },
    { key: "blog", label: "בלוג", icon: Icons.blog },
  ];

  return (
    <div style={styles.device}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Heebo', sans-serif; -webkit-tap-highlight-color: transparent; }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* HEADER */}
      <div style={{ ...styles.header, padding: 0, position: "relative" }}>
        <div onClick={goHome} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", height: "100%", cursor: "pointer" }}>
          <span style={{ direction: "ltr", unicodeBidi: "bidi-override" }}>ZIELINSKI AND ROZEN <span style={{ color: "#fff" }}>| ART</span></span>
        </div>
        <a href="https://www.zrp.co.il" target="_blank" rel="noopener noreferrer" style={{ position: "absolute", left: 0, top: 0, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 10px", backgroundColor: "rgba(0,0,0,0.25)", color: "#e8e4df", fontSize: 10, fontWeight: 600, textDecoration: "none", letterSpacing: 1 }}>לחנות</a>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        {renderPage()}
      </div>

      {/* BOTTOM TAB BAR */}
      <div style={styles.tabBar}>
        {tabs.map((t) => {
          const active = currentTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => navigate(t.key)}
              style={{ ...styles.tabBtn, color: active ? "#1a1a1a" : "#999" }}
            >
              {t.icon(active)}
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, marginTop: 3, transition: "all 0.2s" }}>{t.label}</span>
              {active && <div style={styles.tabIndicator} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ===== STYLES =====
const styles = {
  device: {
    width: "100%",
    maxWidth: 430,
    margin: "0 auto",
    minHeight: "100vh",
    backgroundColor: "#faf8f5",
    position: "relative",
    direction: "rtl",
    paddingBottom: 62,
  },
  header: {
    height: 42,
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2A4C39",
    color: "#e8e4df",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 2,
    cursor: "pointer",
    flexShrink: 0,
    zIndex: 10,
  },
  content: {
    position: "relative",
  },
  tabBar: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 430,
    height: 58,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(250, 248, 245, 0.92)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderTop: "1px solid #eae6e0",
    zIndex: 100,
    paddingBottom: 2,
  },
  tabBtn: {
    background: "none",
    border: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "6px 16px",
    cursor: "pointer",
    position: "relative",
    transition: "all 0.2s",
  },
  tabIndicator: {
    position: "absolute",
    bottom: -2,
    width: 20,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#1a1a1a",
  },
  listContainer: {
    padding: "8px 20px 120px",
  },
  listHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 800,
    color: "#1a1a1a",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  artistRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "14px 4px",
    cursor: "pointer",
    borderBottom: "1px solid #f0ece7",
  },
  miniCard: {
    display: "flex",
    gap: 14,
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    cursor: "pointer",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  page: {
    minHeight: "100%",
  },
  detailHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "8px 20px 12px",
    position: "sticky",
    top: 0,
    backgroundColor: "rgba(250,248,245,0.92)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    zIndex: 5,
  },
  detailHeaderTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#999",
  },
  backBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
