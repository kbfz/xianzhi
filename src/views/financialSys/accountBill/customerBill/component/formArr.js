
/**
 * 
 *  修改计算当前账单的收费标准 中的 form的集合
 * 
 * **/

   // 快递费
const expressFee = [{
    label:'首重',
    prop:'firstWeight',
    type:'input',
},{
    label:'续重',
    prop:'continuedWeight',
    type:'input',
}];

   // 操作费
const handleFee = [{
    label:'操作费',
    prop:'firstG',
    type:'input',
}];

   // 操作费
const joinFee = [{
    label:'超额附加费',
    prop:'firstG',
    type:'input',
}];

   // 包材
const material = [{
    label:'包材编号',
    prop:'firstG',
    type:'input',
},{
    label:'包材',
    prop:'firstG',
    type:'input',
},{
    label:'规格', 
    prop:'firstG',
    type:'input',
},{
    label:'单价（元）', 
    prop:'firstG',
    type:'input',
}];
   // 区间
const section = [{
    label:'首重（元/kg）',
    prop:'firstG',
    type:'input',
},{
    label:'续重（元/kg）',
    prop:'firstG',
    type:'input',
},{
    label:'适用省份',
    prop:'firstG',
    type:'select',
}];

   // 区间
const storageFee = [{
    label:'仓储费',
    prop:'firstG',
    type:'input',
}];

export  default{
    expressFee,
    handleFee,
    material,
    section,
    joinFee,
    storageFee
}