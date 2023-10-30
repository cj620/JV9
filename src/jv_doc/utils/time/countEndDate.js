let result = '';

function fn(startTime, dayNum) {
    // 获取开始时间的时间戳
    let date = new Date(startTime).getTime();
    console.log(new Date(startTime))
    // 一共有多少天 乘以时间戳，得出结束的日期
    let endStamp = date + dayNum * 86400000;
    // 结束日期
    let endDate = new Date(endStamp)
    console.log(endDate)
    // 有几天周末
    let remain = countWorkDay(startTime,endDate) ? dayNum - countWorkDay(startTime,endDate) + 1 : dayNum - countWorkDay(startTime,endDate)
    if(remain) {
        fn(endDate, remain)
    } else {
        let res = new Date(endDate.getTime() - 86400000)
        let month = res.getMonth()+1 < 10 ? '0' + (res.getMonth()+1) : res.getMonth()+1
        result = res.getFullYear()+'-'+month+'-'+ (res.getDate() < 10 ? '0'+res.getDate(): res.getDate())
    }
}

function stringToDate(dateString){
    dateString = dateString.split('-');
    return new Date(dateString[0], dateString[1] - 1, dateString[2]);
}

function countWorkDay(date1, date2){
    if(typeof date1 === 'string') {
        date1 = stringToDate(date1);
    }
    if(typeof date2 === 'string') {
        date2 = stringToDate(date2);
    }
    let delta = (date2 - date1) / (1000 * 60 * 60 * 24) + 1; // 计算出总时间
    delta = Math.floor(delta)
    let weeks = 0;
    for(let i = 0; i < delta; i++){
        if(date1.getDay() == 0 || date1.getDay() == 6) weeks ++;  // 若为周六或周天则加1
        date1 = date1.valueOf();
        date1 += 1000 * 60 * 60 * 24;
        date1 = new Date(date1);
    }
    return delta - weeks;
}

export default function countEndDate(startTime, planTime, unit = 8) {
    let dayNum = Math.floor(planTime/unit)-1

    // 这里是判断是不是正好只有一天 只有一天 就返回startTime
    dayNum = planTime % unit ? ++dayNum : dayNum;
    console.log(dayNum, '天')
    if(dayNum < 1) return startTime
    fn(startTime, dayNum)
    console.log(result)
    return result
}
