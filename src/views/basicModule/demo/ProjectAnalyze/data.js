/*
 * @Author: C.
 * @Date: 2021-08-13 10:12:18
 * @LastEditTime: 2021-12-03 11:24:30
 * @Description: file content
 */
function getDay(count){
  let fields={}
 for (let i=1;i<count-1;i++) {
       fields['d'+i]=Math.floor(Math.random() * 200)
      // fields['d'+i]=150
 }
 // console.log(fields,5564545688888);
 return fields
}
export const Data = {
  // this.tableData = Data.Datas
  // this.pager.Total = Data.Count
  Items: [
    {
    id: 'id75788785',
    image:'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      name:'CNC',
      ...getDay(33),
      type:'1',
      Children:[
        {
          name: 'CNC#1',
          id:'54sdfasd',
          image:'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
          ...getDay(33),
          type:'2',
        },
        {
          name: 'CNC#2',
          id:'sdaf5665sdf',
          image:'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
          ...getDay(33),
          type:'2',
        }
      ]
    },
    {
      id: 'id7578458785',
      image:'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
        name:'PG',
        ...getDay(33),
        type:'1',
        Children:[
          {
            id:'56489dsff',
            name: 'PG#1',
            image:'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
            ...getDay(33),
            type:'2',
          },
          {
            name: 'PG#2',
            id:'56489dsfdggdffdff',
            image:'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
            ...getDay(33),
            type:'2',
          }
        ]
      },
  ],
  Count: 5

}
