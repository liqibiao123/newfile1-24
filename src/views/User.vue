<template>
  <div class="manage">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 用户的表单信息 -->
      <el-form
        ref="form"
        :rules="rules"
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="age" label="年龄">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-DD"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item prop="addr" label="地址">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-button">
      <el-button @click="handleAdd" type="primary" size="small"
        >+新增</el-button
      >

      <!-- form搜索区域 -->

      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input
            placeholder="输入搜索名称"
            v-model="userForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table stripe :data="tableData" style="width: 100%" height="90%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sexLabel" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column prop="addr" label="地址">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="pageControl">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handlePage"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getUser, addUser, delUser, editUser } from "../api";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请填写日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      modalType: 0, //表示新增弹窗，1是编辑
      total: 0, //当前的总条数
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name: "",
      },
    };
  },

  methods: {
    submit() {
      //提交用户表单
      this.$refs.form.validate((valid) => {
        // console.log(valid);
        if (valid) {
          if (this.modalType === 0) {
            addUser(this.form).then(() => {
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              this.getList();
            });
          }
          //为真才后续处理
          this.$refs.form.resetFields();
          // 填写成功就关闭弹窗
          this.dialogVisible = false;
        }
      });
    },
    handleClose(done) {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
      //   this.$confirm("确认关闭？")
      //     .then((_) => {
      //       done();
      //     })
      //     .catch((_) => {});
    },
    cancel() {
      this.handleClose();
    },
    handleEdit(row) {
      this.modalType = 1;
      this.dialogVisible = true;
      // 对当前数据进行深拷贝
      this.form = JSON.parse(JSON.stringify(row));
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //重新获取列表的接口
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getList() {
      getUser({ params: { ...this.pageData, ...this.userForm } }).then(
        ({ data }) => {
          console.log(data, "data");
          this.tableData = data.list;
          this.total = data.count || 0;
        }
      );
    },
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    handlePage(val) {
      //选择页面的回调函数
      console.log(val);
      this.pageData.page = val;
      this.getList();
    },
    onSubmit() {
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.manage {
  .manage-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  height: 90%;
  .common-table {
    position: relative;
    height: calc(100% - 62px);
    .pageControl {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>



