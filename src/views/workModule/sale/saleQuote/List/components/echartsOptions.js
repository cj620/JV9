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
                name: i18n.t("sale.Sa_QuotationTime"), // 报价时间
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                    focus: 'series'
                },
                data: QuotationTime
            },
            {
                name: i18n.t("sale.Sa_HoldingTime"),// 占用时间
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                    focus: 'series'
                },
                label: {
                    formatter: (params) => {
                        console.log(count)
                        console.log(QuotationTime,surplus)
                        if(params.value + QuotationTime[count]  > surplus[count]) {
                            count++;
                            return '可用时间不足！'
                        } else {
                            count++;
                            return ''
                        }

                    },
                    fontWeight: 'bold',
                    fontSize: '18px',
                    color: 'red',
                    show: true,
                    position: 'top'
                },
                data: HoldingTime
            },
            {
                name: i18n.t("sale.Sa_TotalAvailableTime"), // 可用时间
                type: 'bar',
                data: surplus,
                emphasis: {
                    focus: 'series'
                },
            },
        ]
    }
}
