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
                                                        <el-form-item label="是否已计算:0否，1是" prop="isCount">
                 <el-input v-model="form.isCount" placeholder="请输入是否已计算:0否，1是" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="价格" prop="price">
                 <el-input v-model="form.price" placeholder="请输入价格" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="重量" prop="weight">
                 <el-input v-model="form.weight" placeholder="请输入重量" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="运单号" prop="logisticsNo">
                 <el-input v-model="form.logisticsNo" placeholder="请输入运单号" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="物流企业编码" prop="logisticsCompanyCode">
                 <el-input v-model="form.logisticsCompanyCode" placeholder="请输入物流企业编码" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="省" prop="province">
                 <el-input v-model="form.province" placeholder="请输入省" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="市" prop="city">
                 <el-input v-model="form.city" placeholder="请输入市" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="区" prop="county">
                 <el-input v-model="form.county" placeholder="请输入区" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="收件人" prop="addressee">
                 <el-input v-model="form.addressee" placeholder="请输入收件人" :disabled="formEdit"></el-input>
               </el-form-item>
                                                        <el-form-item label="耗材编码" prop="suppliesNo">
                 <el-input v-model="form.suppliesNo" placeholder="请输入耗材编码" :disabled="formEdit"></el-input>
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
    } from 'api/financialSys/warehouseFee/index';
    import { mapGetters } from 'vuex';
    export default {
        name: 'warehouseFee',
    data() {
        return {
            form: {
                                                        customerCode : undefined,                                                customerName : undefined,                                                type : undefined,                                                typeName : undefined,                                                orderUuid : undefined,                                                orderNo : undefined,                                                isCount : undefined,                                                price : undefined,                                                weight : undefined,                                                logisticsNo : undefined,                                                logisticsCompanyCode : undefined,                                                province : undefined,                                                city : undefined,                                                county : undefined,                                                addressee : undefined,                                                suppliesNo : undefined,                                                createTime : undefined,                                                completeTime : undefined,                                                countTime : undefined,                                                remark : undefined,                                                ext1 : undefined,                                                ext2 : undefined,                                                ext3 : undefined                        },
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
                ],                                                 weight: [
                    {
                        required: true,
                        message: '请输入重量',
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
                ],                                                 logisticsCompanyCode: [
                    {
                        required: true,
                        message: '请输入物流企业编码',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 province: [
                    {
                        required: true,
                        message: '请输入省',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 city: [
                    {
                        required: true,
                        message: '请输入市',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 county: [
                    {
                        required: true,
                        message: '请输入区',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 addressee: [
                    {
                        required: true,
                        message: '请输入收件人',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],                                                 suppliesNo: [
                    {
                        required: true,
                        message: '请输入耗材编码',
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
