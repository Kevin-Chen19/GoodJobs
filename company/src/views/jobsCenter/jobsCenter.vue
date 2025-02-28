<template>
  <div class="Title">我的发布</div>
  <el-scrollbar max-height="490px">
    <div class="jobTable">
      <el-table :data="filterTableData" style="width: 100%">
        <el-table-column label="发布日期" width="150px">
          <template #default="scope">
            {{ editTimeFormat(scope.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column label="基本招聘信息">
          <template #default="scope">
            <div class="jobBox">
              <div class="firstLine">
                <p class="jobName">{{ scope.row.jobName }}</p>
                <p class="jobSalary">{{ scope.row.salary }}</p>
              </div>
              <div class="secondLine">
                <div class="tagsSty">
                  <div v-for="item in scope.row.tags">{{ item }}</div>
                </div>
                <div>{{ scope.row.address }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="right" width="210px">
          <template #header>
            <el-input
              v-model="search"
              size="small"
              placeholder="输入工作名查找"
            />
          </template>
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="您确定要删除该工作吗?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row._id)"
            >
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="noMore">暂无更多职位...</div>
  </el-scrollbar>
  <div class="addBtn">
    <el-button type="primary" @click="pubJob">发布新职位</el-button>
  </div>

  <el-dialog
    v-model="centerDialogVisible"
    title="发布职位"
    width="50%"
    align-center
  >
    <div class="jobForm">
      <el-form
        ref="jobFormRef"
        style="max-width: 600px"
        :model="jobForm"
        status-icon
        :rules="jobRules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="工作名" prop="jobName">
          <el-input v-model="jobForm.jobName" />
        </el-form-item>
        <el-form-item label="薪资" prop="salary">
          <el-input v-model="jobForm.salary" />
        </el-form-item>
        <el-form-item label="工作地点" prop="address">
          <el-input v-model="jobForm.address" placeholder="如：广州 越秀" />
        </el-form-item>
        <el-form-item label="工作性质" prop="type">
          <el-select
            v-model="jobForm.type"
            placeholder="点击选择"
            style="width: 280px"
          >
            <el-option
              v-for="item in types"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属专业" prop="subject">
          <el-cascader
            v-model="jobForm.subject"
            :options="subjectsOptions"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="所属职类" prop="jobKinds"> 
          <el-cascader
             v-model="jobForm.jobKinds"
            :options="jobKindsOptions"
            :props="props"
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="3"
            clearable
          />
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-select-v2
            v-model="jobForm.tags"
            :options="options"
            placeholder="点击选择"
            style="width: 280px"
            multiple
          />
        </el-form-item>
        <el-form-item label="岗位职责" prop="responsibility">
          <el-input
            v-model="jobForm.responsibility"
            style="width: 280px"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="岗位要求" prop="requirements">
          <el-input
            v-model="jobForm.requirements"
            style="width: 280px"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item>
          <div class="formBtn">
            <el-button
              v-if="selectItem"
              type="primary"
              @click="submitForm(jobFormRef)"
            >
              发布
            </el-button>
            <el-button
              v-if="!selectItem"
              type="primary"
              @click="updateForm(jobFormRef)"
            >
              修改
            </el-button>
            <el-button @click="resetForm(jobFormRef)">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import store from "@/store/index.js";
import axios from "axios";
import moment from "moment";
moment.locale("zh-cn");
const centerDialogVisible = ref(false); //发布职位弹窗
const selectItem = ref(true); //ture表示弹窗类型为发布工作，false表示弹窗类型为修改工作
const search = ref("");
const props = { multiple: true };
const pubJob = () => {
  selectItem.value = true;
  jobForm.jobName = "";
  jobForm.salary = "";
  jobForm.address = "";
  jobForm.subject = [];
  jobForm.jobKinds = [];
  jobForm.type = "全职";
  jobForm.tags = [];
  jobForm.responsibility = "";
  jobForm.requirements = "";
  centerDialogVisible.value = true;
};
const tableData = ref([]);
const pubUser = store.state.userInfo.username;
const jobForm = reactive({
  _id: "",
  pubUser: pubUser,
  jobName: "",
  salary: "",
  address: "",
  subject: [],
  jobKinds: [],
  type: "全职",
  tags: [],
  responsibility: "",
  requirements: "",
  companyMessage: store.state.companyMessage,
});
const jobRules = reactive({
  jobName: [{ required: true, message: "请输入工作名", trigger: "blur" }],
  salary: [{ required: true, message: "请输入工资", trigger: "blur" }],
  address: [{ required: true, message: "请输入工作地点", trigger: "blur" }],
  type: [{ required: true, message: "请输入工作性质", trigger: "blur" }],
  tags: [{ required: true, message: "请输入标签", trigger: "blur" }],
  subject: [{ required: true, message: "请选择所属专业", trigger: "blur" }],
  jobKinds: [{ required: true, message: "请选择所属职类", trigger: "blur" }],
  responsibility: [
    { required: true, message: "请输入岗位职责", trigger: "blur" },
  ],
  requirements: [
    { required: true, message: "请输入岗位要求", trigger: "blur" },
  ],
});
const jobFormRef = ref();
const initials = [
  "本科",
  "211",
  "985",
  "大专",
  "无经验",
  "1-3年经验",
  "3-5年经验",
  "计算机类",
  "前端开发",
  "后端开发",
];
const subjectsOptions = [
  {
    value: "工学",
    label: "工学",
    children: [
      {
        value: "计算机类",
        label: "计算机类",
        children: [
          {
            value: "前端开发",
            label: "前端开发"
          },
          {
            value: "区块链工程",
            label: "区块链工程"
          },
          {
            value: "人工智能",
            label: "人工智能"
          },
          {
            value: "软件工程",
            label: "软件工程"
          },
          {
            value: "信息安全",
            label: "信息安全"
          },
          {
            value: "计算机科学与技术",
            label: "计算机科学与技术"
          }
        ]
      },
      {
        value: "测绘类",
        label: "测绘类",
        children: [
          {
            value: "测绘工程",
            label: "测绘工程"
          },
          {
            value: "导航工程",
            label: "导航工程"
          },
          {
            value: "遥感科学与技术",
            label: "遥感科学与技术"
          },
        ],
      },
    ],
  },
  {
    value: "理学",
    label: "理学",
    children: [
      {
        value: "数学类",
        label: "数学类",
        children: [
          {
            value: "数据计算及应用",
            label: "数据计算及应用",
          },
          {
            value: "数理基础科学",
            label: "数理基础科学",
          },
          {
            value: "数学与应用数学",
            label: "数学与应用数学",
          },
          {
            value: "信息与计算科学",
            label: "信息与计算科学",
          },
        ],
      },
      {
        value: "物理学类",
        label: "物理学类",
        children: [
          {
            value: "核物理",
            label: "核物理",
          },
          {
            value: "量子信息科学",
            label: "量子信息科学",
          },
          {
            value: "应用物理学",
            label: "应用物理学",
          },
          {
            value: "声学",
            label: "声学",
          },
        ],
      },
    ],
  },
];
const jobKindsOptions = [
  {
    value: "互联网/通信及硬件",
    label: "互联网/通信及硬件",
    children:[
      {
        value: "软件开发",
        label: "软件开发",
        children:[
          {
            value: "Java",
            label: "Java",
          },
          {
            value: "Python",
            label: "Python",
          },
          {
            value: "C/C++",
            label: "C/C++",
          },
          {
            value: "C#",
            label: "C#",
          },
          {
            value: "架构师",
            label: "架构师",
          },
          {
            value: "全栈工程师",
            label: "全栈工程师",
          }
        ]
      },
      {
        value: "前端开发",
        label: "前端开发",
        children:[
          {
            value: "web前端",
            label: "web前端",
          },
          {
            value: "前端开发",
            label: "前端开发",
          },
          {
            value: "Android",
            label: "Android",
          },
          {
            value: "iOS",
            label: "iOS",
          },
          {
            value: "小程序开发",
            label: "小程序开发",
          },
          {
            value: "鸿蒙开发工程师",
            label: "鸿蒙开发工程师",
          }        
        ]
      }
    ]
  },
  {
    value: "运维/测试",
    label: "运维/测试",
    children:[
    {
        value: "运维支持",
        label: "运维支持",
        children:[
          {
            value: "运维工程师",
            label: "运维工程师",
          },
          {
            value: "运维开发工程师",
            label: "运维开发工程师",
          },
          {
            value: "系统工程师",
            label: "系统工程师",
          },
          {
            value: "系统安全",
            label: "系统安全",
          }
        ]
      },
      {
        value: "测试工程师",
        label: "测试工程师",
        children:[
          {
            value: "软件测试",
            label: "软件测试",
          },
          {
            value: "硬件测试",
            label: "硬件测试",
          },
          {
            value: "系统测试",
            label: "系统测试",
          },
          {
            value: "协议测试",
            label: "协议测试",
          }
        ]
      }
    ]
  },
]
const types = ["全职", "兼职", "实习"];
const options = ref(
  Array.from({ length: 10 }).map((_, idx) => ({
    value: `${initials[idx % 10]}`,
    label: `${initials[idx % 10]}`,
  }))
);
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.jobName.toLowerCase().includes(search.value.toLowerCase())
  )
);

const handleEdit = (jobMessage) => {
  selectItem.value = false;
  centerDialogVisible.value = true;
  console.log(jobMessage);
  jobForm._id = jobMessage._id;
  jobForm.jobName = jobMessage.jobName;
  jobForm.salary = jobMessage.salary;
  jobForm.address = jobMessage.address;
  jobForm.jobKinds = jobMessage.jobKinds;
  jobForm.subject = jobMessage.subject;
  jobForm.type = jobMessage.type;
  jobForm.tags = jobMessage.tags;
  jobForm.responsibility = jobMessage.responsibility;
  jobForm.requirements = jobMessage.requirements;
};

const handleDelete = (_id) => {
  axios.post("/companyapi/jobs/jobsDelete/" + _id).then((res) => {
    if (res.data.ActionType == "ok") {
      alert("删除成功");
      getList();
    } else {
      alert("删除失败");
    }
  });
};
const resetForm = (formRef) => {
  formRef.resetFields();
  centerDialogVisible.value = false;
};
const submitForm = (formRef) => {
  formRef.validate((valid) => {
    if (valid) {
      console.log("submit!", jobForm);
      axios.post("/companyapi/jobs/jobsAdd", jobForm).then((res) => {
        if (res.data.ActionType == "ok") {
          alert("发布成功");
          formRef.resetFields();
          centerDialogVisible.value = false;
          getList();
        } else {
          alert("发布失败");
        }
      });
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
const updateForm = (formRef) => {
  formRef.validate((valid) => {
    if (valid) {
      console.log("submit!", jobForm);
      axios.post("/companyapi/jobs/jobsUpdate", jobForm).then((res) => {
        if (res.data.ActionType == "ok") {
          alert("修改成功");
          formRef.resetFields();
          centerDialogVisible.value = false;
          getList();
        } else {
          alert("修改失败");
        }
      });
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
const editTimeFormat = (editTime) => {
  const date = new Date(editTime);
  return moment(date).format("YYYY-MM-DD");
};
onMounted(() => {
  getList();
});
const getList = async () => {
  const res = await axios.get("/companyapi/jobs/list/" + pubUser);
  tableData.value = res.data.jobsList;
};
</script>
<style lang="scss" scoped>
.el-input {
  width: 280px;
}
.jobTable {
  width: 80%;
  margin-left: 10%;
}
.jobBox {
  border-radius: 10px;
  background-color: rgba(242, 244, 246, 0.33);
}
.firstLine,
.secondLine {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.jobName {
  font-size: 16px;
  font-weight: 600;
}
.jobSalary {
  font-size: 16px;
  color: blue;
}
.tagsSty {
  display: flex;
  div {
    margin-right: 10px;
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
    background-color: rgba(229, 230, 231, 0.76);
  }
  div:first-child {
    color: rgb(4, 99, 215);
    background-color: rgba(112, 171, 243, 0.58);
  }
}
.el-scrollbar {
  height: 490px;
}
::v-deep .el-input__wrapper {
  width: 180px;
  flex-grow: 0;
}
.noMore {
  margin-top: 20px;
  margin-left: 45%;
}
.addBtn {
  margin-left: 45%;
}
.jobForm {
  margin-top: 10px;
  margin-left: 25%;
}
.formBtn {
  margin-left: 70%;
}
</style>
