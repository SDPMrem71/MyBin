'use strict'
const fs = require('fs')
Set.prototype.getByIndex = function (idx) {
    if (typeof idx !== 'number') throw new TypeError(`Argument idx must be a Number. Got [${idx}]`);

    let i = 0;
    for (let iter = this.keys(), curs = iter.next(); !curs.done; curs = iter.next(), i++)
        if (idx === i) return curs.value;

    throw new RangeError(`Index [${idx}] is out of range [0-${i - 1}]`);
}


const filepath = `D:\\AllCombination${Date.now() + Math.random()}.txt`;
let writer = fs.createWriteStream(filepath);
writer.write(`------------------ Created: ${new Date()} /\ ${new Date().getMilliseconds()} /\ ------------------\n`);

function main() {

    let origin = new Set(['X', 'x', '850085', 'magicalNumber', 'HowGreatAmI', '@', '#', '!']);
    let source = new Set(origin);
    let dic = new Set();

    for (let repeat = 0; repeat < 8; repeat++) { //چندبار «ترکیب» لغات بررسی شود.
        //در هر مرحله نیز ترکیب های جدید ساخته شده اضافه میشود.
        for (let index = 0; index < source.size; index++) {
            //eg: index 0 = M //عنصر اولیه جهت ترکیب
            let tmp = source.getByIndex(index);
            if (tmp == '@' ||
                tmp == '!' ||
                tmp == '#') break; //هیچ وقت از این موارد در ابتدا استفاده نکردم

            for (let i = 0; i < source.size; i++) {
                //عنصر حلقه‌ی اول ترکیب شود با بقیه
                dic.add([source.getByIndex(index), source.getByIndex(i)].join(''));
            }
        }
        //ترکیبات پیدا شده، به منبع اضافه شده جهت ترکیبات بعدی
        //با حذف تکراری ها
        source = new Set([...source, ...dic]);

        dic = new Set();
    }
    //source = uniq_fast(source); //حذف تکراری
    source.forEach((item) => { writer.write(`${item}\n`) });
    writer.end(`\n------------------ Done: ${new Date()} /\ ${new Date().getMilliseconds()} /\ ------------------`);
}
main();


function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for (var i = 0; i < len; i++) {
        var item = a[i];
        if (seen[item] !== 1) {
            seen[item] = 1;
            out[j++] = item;
        }
    }
    return out;
}

