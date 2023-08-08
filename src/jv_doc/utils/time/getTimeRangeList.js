export function getTimeRangeList(MinimumTime, MaximumTime) {
    if(!(isNaN(MinimumTime) && !isNaN(Date.parse(MinimumTime)))) return {}
    if(!(isNaN(MaximumTime) && !isNaN(Date.parse(MaximumTime)))) return {}

    const startDate = new Date(MinimumTime);
    const endDate = new Date(MaximumTime);

    const startYear = startDate.getFullYear();
    const endtYear = endDate.getFullYear();

    const startMonth = startDate.getMonth() ? startDate.getMonth() + 1 : 1;
    const endMonth = endDate.getMonth() ? endDate.getMonth() + 1 : 1;

    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    console.log('endDay::: ', endDay);

    const bigMonth = [1, 3, 5, 7, 8, 10, 12];
    const smallMonth = [2, 4, 6, 9, 11];
    
    let monthArr = []; // 月列表 仅展示月份
    let monthDetails = []; // 月份详情列表，展示当月是哪一年等；
    let weekDetails = []; // 周列表 从日期开始到日期结束一共有多少个周的列表，不满7天也为1项
    let dayArr = []; // 日列表 仅展示多少号
    let dayDetails = []; // 日详情，展示当日是几年几月星期几
    let hourArr = []; // 小时列表 仅展示小时
    let hourDetails = []; // 小时详情，展示年月日周几
    let minuteArr = []; // 分钟列表，10分钟为单位
    // 添加月列表
    if(endtYear > startYear) {
        for(let i = startMonth; i <= 12; i++) {
            monthArr.push(i)
            monthDetails.push({
                month: i,
                year: startYear, // 年份
                isLeapYear: isLeapYear(startYear), // 是不是闰年
            })
        }
        // 判断间隔年数是不是大于1 例如2023-2025
        if(endtYear - startYear - 1) {
            // 循环间隔年数 例如1年 1次
            for(let j = 1; j < endtYear - startYear; j++) {
                // 直接循环12个月
                for(let i = 1; i <= 12; i++) {
                    monthArr.push(i);
                    monthDetails.push({
                        month: i,
                        year: startYear+j, // 年份
                        isLeapYear: isLeapYear(startYear+j), // 是不是闰年
                    })
                }
            }
            // 循环最后一年的几个月
            for(let i = 1; i <= endMonth; i++) {
                monthArr.push(i);
                monthDetails.push({
                    month: i,
                    year: endtYear, // 年份
                    isLeapYear: isLeapYear(endtYear), // 是不是闰年
                })
            }
        } else {
            // 如果endtYear只比startYear大一年 只push endtYear的月份
            for(let i = 1; i <= endMonth; i++) {
                monthArr.push(i)
                monthDetails.push({
                    month: i,
                    year: startYear+1, // 年份
                    isLeapYear: isLeapYear(startYear+1), // 是不是闰年
                })
            }
        }
    } else {
        // 如果只是当年 endtYear == startYear 则只提取他们之间的月份
        for(let i = startMonth; i <= endMonth; i++) {
            monthArr.push(i);
            monthDetails.push({
                month: i,
                year: startYear, // 年份
                isLeapYear: isLeapYear(startYear), // 是不是闰年
            })
        }
    }
    // 添加日列表
    monthArr.forEach((item,i) => {
        let days = 0;
        // 判断是不是2月份             
        if (item == 2) {
            days = monthDetails[i].isLeapYear ? 29 : 28
        }
        // 判断是不是大月31天
        else if (bigMonth.indexOf(item) !== -1) {
            days = 31;
        } 
        // 判断是不是小月30天
        else if (smallMonth.indexOf(item) !== -1) {
            days = 30;
        }
        if(i === 0) {
            let num = monthArr.length > 1 ? days : endDay
            for (let j = startDay; j <= num; j++) {
                let wk = new Date(startYear+'-'+ (startMonth<10?'0'+startMonth:startMonth)+ '-' +( j<10?'0'+j:j)).getUTCDay();
                dayArr.push(j);
                dayDetails.push({
                    year: startYear, // 年份
                    month: item, // 月份
                    day: j, // 号
                    week: wk ? wk : 7, // 星期几
                    number: 24,
                    text: `${startYear}-${item<10?'0'+item:item}-${j<10?'0'+j:j}`
                })
            }
        } else if(i === monthArr.length - 1) {
            for (let j = 1; j <= endDay; j++) {
                let wk = new Date(endtYear+'-'+ (endMonth<10?'0'+endMonth:endMonth)+ '-' +( j<10?'0'+j:j)).getUTCDay();
                dayArr.push(j);
                dayDetails.push({
                    year: endtYear, // 年份
                    month: item, // 月份
                    day: j, // 号
                    week: wk ? wk : 7, // 星期几
                    number: 24,
                    text: `${endtYear}-${item<10?'0'+item:item}-${j<10?'0'+j:j}`
                })
            }
        } else {
            for (let j = 1; j <= days; j++) {
                let wk = new Date(monthDetails[i].year+'-'+ (item<10?'0'+item:item) + '-' + (j<10?'0'+j:j)).getUTCDay();
                dayArr.push(j);
                dayDetails.push({
                    year: monthDetails[i].year, // 年份
                    month: item, // 月份
                    day: j, // 号
                    week: wk ? wk : 7, // 星期几
                    number: 24,
                    text: `${monthDetails[i].year}-${item<10?'0'+item:item}-${j<10?'0'+j:j}`
                })
            }
        }
        // for (let i = 1; i <= days; i++) {

        //     weekDetails.push(wk ? wk : 7);
        // }
        
    })

    // 添加周列表 、 小时列表
    dayDetails.forEach((item, i) => {
        for(let j = 1; j < 7;j++) {
            // 时间结束的位置
            if(item.week === 1 && !dayDetails[i+j] && dayDetails[i+j-1]) {
                weekDetails.push({
                    startYear: item.year,
                    endYear: dayDetails[i+j-1].year,
                    startMonth: item.month,
                    endMonth: dayDetails[i+j-1].month,
                    startDay: item.day,
                    endDay: dayDetails[i+j-1].day,
                    number: dayDetails[i+j-1].day-item.day+1,
                    text: `${item.year}-${item.month<10 ? '0'+item.month : item.month}-${item.day<10 ? '0'+item.day : item.day}  ~  
                    ${dayDetails[i+j-1].year}-${dayDetails[i+j-1].month<10 ? '0'+dayDetails[i+j-1].month : dayDetails[i+j-1].month}-${dayDetails[i+j-1].day<10? '0'+dayDetails[i+j-1].day: dayDetails[i+j-1].day}`
                })
                // 时间开始的位置
            } else if(item.week === 7 && !dayDetails[i-j] && dayDetails[i-j+1]) {
                    weekDetails.push({
                        startYear:  dayDetails[i-j+1].year,
                        endYear: item.year,
                        startMonth:  dayDetails[i-j+1].month,
                        endMonth: item.month,
                        startDay:  dayDetails[i-j+1].day,
                        endDay: item.day,
                        number: 7- dayDetails[i-j+1].week + 1,
                        text: `${dayDetails[i-j+1].year}-${dayDetails[i-j+1].month<10? '0'+dayDetails[i-j+1].month : dayDetails[i-j+1].month}-${dayDetails[i-j+1].day<10? '0'+dayDetails[i-j+1].day : dayDetails[i-j+1].day}  ~  
                        ${item.year}-${item.month<10?'0'+item.month:item.month}-${item.day<10 ? '0'+item.day : item.day}`
                    })
            }
        }
        // 中间部分
        if(item.week === 7 && dayDetails[i-6]) {
            weekDetails.push({
                startYear: dayDetails[i-6].year,
                endYear: item.year,
                startMonth: dayDetails[i-6].month,
                endMonth: item.month,
                startDay: dayDetails[i-6].day,
                endDay: item.day,
                number: 7,
                text: `${dayDetails[i-6].year}-${dayDetails[i-6].month<10?'0'+dayDetails[i-6].month:dayDetails[i-6].month}-${dayDetails[i-6].day<10?'0'+dayDetails[i-6].day:dayDetails[i-6].day}  ~  
                ${item.year}-${item.month<10?'0'+item.month:item.month}-${item.day<10?'0'+item.day:item.day}`,
            })
        }
        for (let idx = 0; idx < 24; idx++) {
            hourArr.push(idx);
            hourDetails.push({
                number: 6,
                year: item.year,
                month: item.month,
                day: item.day,
                week: item.week,
                hour: idx,
                text: `${item.year}-${item.month<10?'0'+item.month: item.month}-${item.day<10?'0'+item.day:item.day} ${idx<10?'0'+idx:idx}时`
            })
        }
    })
    
    // 添加分钟列表
    hourArr.forEach(item => {
        for (let i = 0; i < 60; i += 10) {
            minuteArr.push(i)
        }
    });
    return {
        monthArr,
        monthDetails,
        weekDetails,
        dayArr,
        dayDetails,
        hourArr,
        hourDetails,
        minuteArr
    }
}

// 判断平年闰年 true为闰年29 false为平年28
function isLeapYear(year) {
    return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
}