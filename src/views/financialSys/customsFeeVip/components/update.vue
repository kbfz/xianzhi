<template>
    <div>
        <h5 v-if ="updateView">详情</h5>
        <h5  v-else>编辑</h5>
           <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                                                                   <el-form-item label="客户编码" prop="customerCode">
                 <el-input v-model="form.customerCode" placeholder="请输入客户编码" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="客户名称" prop="customerName">
                 <el-input v-model="form.customerName" placeholder="请输入客户名称" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="类型:1报关，2仓储" prop="type">
                 <el-input v-model="form.type" placeholder="请输入类型:1报关，2仓储" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="节点名称" prop="typeName">
                 <el-input v-model="form.typeName" placeholder="请输入节点名称" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="订单UUID" prop="orderUuid">
                 <el-input v-model="form.orderUuid" placeholder="请输入订单UUID" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="订单号" prop="orderNo">
                 <el-input v-model="form.orderNo" placeholder="请输入订单号" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="运单号" prop="logisticsNo">
                 <el-input v-model="form.logisticsNo" placeholder="请输入运单号" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="是否已计算:0否，1是" prop="isCount">
                 <el-input v-model="form.isCount" placeholder="请输入是否已计算:0否，1是" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="价格" prop="price">
                 <el-input v-model="form.price" placeholder="请输入价格" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="关税" prop="tariff">
                 <el-input v-model="form.tariff" placeholder="请输入关税" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="消费税" prop="saleTax">
                 <el-input v-model="form.saleTax" placeholder="请输入消费税" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="增值税" prop="valueAddedTax">
                 <el-input v-model="form.valueAddedTax" placeholder="请输入增值税" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="非现金抵扣" prop="noCashDeduction">
                 <el-input v-model="form.noCashDeduction" placeholder="请输入非现金抵扣" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="订单总费用" prop="orderTotalFee">
                 <el-input v-model="form.orderTotalFee" placeholder="请输入订单总费用" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="订单总税费" prop="orderTotalTax">
                 <el-input v-model="form.orderTotalTax" placeholder="请输入订单总税费" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="订单总货值" prop="orderTotalValue">
                 <el-input v-model="form.orderTotalValue" placeholder="请输入订单总货值" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="运费" prop="shippingFee">
                 <el-input v-model="form.shippingFee" placeholder="请输入运费" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="创建时间" prop="createTime">
                 <el-input v-model="form.createTime" placeholder="请输入创建时间" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="作业完成时间" prop="completeTime">
                 <el-input v-model="form.completeTime" placeholder="请输入作业完成时间" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="计算时间" prop="countTime">
                 <el-input v-model="form.countTime" placeholder="请输入计算时间" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="备注" prop="remark">
                 <el-input v-model="form.remark" placeholder="请输入备注" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="扩展字段1" prop="ext1">
                 <el-input v-model="form.ext1" placeholder="请输入扩展字段1" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="扩展字段2" prop="ext2">
                 <el-input v-model="form.ext2" placeholder="请输入扩展字段2" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="扩展字段3" prop="ext3">
                 <el-input v-model="form.ext3" placeholder="请输入扩展字段3" :disabled="formEdit"></el-input>
               </el-form-item>
                                        </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button  type="primary" @click="change" v-if = "updateView">修改</el-button>
                <el-button  type="primary" @click="update('form')" v-else>保存</el-button>
            </div>
    </div>
</template>

<script>
    import {
        addObj,
        putObj
    } from 'api/financialSys/customsFeeVip/index';
    import { mapGetters } from 'vuex';
    export default {
        name: 'customsFeeVip',
    data() {
        return {
            form: {
                                                        customerCode : undefined,                                                customerName : undefined,                                                type : undefined,                                                typeName : undefined,                                                orderUuid : undefined,                                                orderNo : undefined,                                                logisticsNo : undefined,                                                isCount : undefined,                                                price : undefined,                                                tariff : undefined,                                                saleTax : undefined,                                                valueAddedTax : undefined,                                                noCashDeduction : undefined,                                                orderTotalFee : undefined,                                                orderTotalTax : undefined,                                                orderTotalValue : undefined,                                                shippingFee : undefined,                                                createTime : undefined,                                                completeTime : undefined,                                                countTime : undefined,                                                remark : undefined,                                                ext1 : undefined,                                                ext2 : undefined,                                                ext3 : undefined                        },
        rules: {
                                                                            customerCode: [
                    {
                        required: true,
                        message: '请输入客户编码',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 customerName: [
                    {
                        required: true,
                        message: '请输入客户名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 type: [
                    {
                        required: true,
                        message: '请输入类型:1报关，2仓储',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 typeName: [
                    {
                        required: true,
                        message: '请输入节点名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 orderUuid: [
                    {
                        required: true,
                        message: '请输入订单UUID',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 orderNo: [
                    {
                        required: true,
                        message: '请输入订单号',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 logisticsNo: [
                    {
                        required: true,
                        message: '请输入运单号',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 isCount: [
                    {
                        required: true,
                        message: '请输入是否已计算:0否，1是',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 price: [
                    {
                        required: true,
                        message: '请输入价格',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 tariff: [
                    {
                        required: true,
                        message: '请输入关税',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 saleTax: [
                    {
                        required: true,
                        message: '请输入消费税',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 valueAddedTax: [
                    {
                        required: true,
                        message: '请输入增值税',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 noCashDeduction: [
                    {
                        required: true,
                        message: '请输入非现金抵扣',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 orderTotalFee: [
                    {
                        required: true,
                        message: '请输入订单总费用',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 orderTotalTax: [
                    {
                        required: true,
                        message: '请输入订单总税费',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 orderTotalValue: [
                    {
                        required: true,
                        message: '请输入订单总货值',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 shippingFee: [
                    {
                        required: true,
                        message: '请输入运费',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 createTime: [
                    {
                        required: true,
                        message: '请输入创建时间',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 completeTime: [
                    {
                        required: true,
                        message: '请输入作业完成时间',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 countTime: [
                    {
                        required: true,
                        message: '请输入计算时间',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 remark: [
                    {
                        required: true,
                        message: '请输入备注',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 ext1: [
                    {
                        required: true,
                        message: '请输入扩展字段1',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 ext2: [
                    {
                        required: true,
                        message: '请输入扩展字段2',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 ext3: [
                    {
                        required: true,
                        message: '请输入扩展字段3',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ]                    },
        formEdit: true,
         updateView: true,
    }
    },
    computed: {
        lineHeight () {
            return (window.screen.height)
        }
    },
    methods: {
        // 清空表单
        resetFormFields () {
            this.$refs['form'].resetFields();
        },
        update(formName) {
            const set = this.$refs;
            set[formName].validate(valid => {
                if (valid) {
                    putObj(this.form.id, this.form).then(() => {
                        // 调用父组件的方法， 第一个参数名为调用的方法名，第二个参数为需要传递的参数
                        this.$emit('childMethod', '');
                    this.$notify({
                        title: '成功',
                        message: '创建成功',
                        type: 'success',
                        duration: 2000
                    });
                });
                } else {
                    return false;
        }
        })
        },
        // 点击修改 改变状态，变为编辑模式
        change() {
            this.formEdit = false
            this.updateView = false
//            this.disabledForm = true
        }
    }
    }
</script>
