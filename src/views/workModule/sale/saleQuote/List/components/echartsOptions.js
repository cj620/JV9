export function setOptions(res) {
    let xAxisData = []; // 工序列表
    let QuotationTime = []; // 报价时间
    let HoldingTime = []; // 占用时间
    let surplus = []; // 实际可用时间
    let count = 0;
    res.Items.forEach(item => {
        xAxisData.push(item.Process);
        QuotationTime.push(item.QuotationTime);
        HoldingTime.push(item.HoldingTime);
        surplus.push(item.TotalAvailableTime - item.DownTime);
    })
    return {
        height: 'auto',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '12%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xAxisData
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'QuotationTime', // 报价时间
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                    focus: 'series'
                },
                data: QuotationTime
            },
            {
                name: 'HoldingTime',// 占用时间
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                    focus: 'series'
                },
                label: {
                    formatter: (params) => {
                        if(params.value + QuotationTime[count]  > surplus[count]) {
                            count++;
                            return '可用时间不足！'
                        } else {
                            return ''
                        }

                    },
                    show: true,
                    position: 'top'
                },
                data: HoldingTime
            },
            {
                name: 'surplus', // 可用时间
                type: 'bar',
                data: surplus,
                emphasis: {
                    focus: 'series'
                },
            },
        ]
    }
}
