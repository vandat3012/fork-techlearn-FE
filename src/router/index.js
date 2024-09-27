import { createRouter, createWebHistory } from 'vue-router'
import Students from '@/components/student/Students.vue'
import StudentUpdate from '@/components/student/StudentUpdate.vue'
import NotFound from '@/components/NotFound/NotFound.vue'
import StudentCreate from '@/components/student/StudentCreate.vue'

import Assignment from '@/views/Assignment.vue'
import ConfigPromptAIView from '@/views/teacherView/ConfigPromptAIView.vue'
import SubmitAssignment from '@/views/SubmitAssignment.vue'
import ListTemplatePromptView from '@/views/teacherView/listTemplatePromptView.vue'
// import Calendar from '@/components/Calendar/Calendar.vue'
import { checkRole } from "@/components/Middleware/AuthenticateTeacher";
import Teacher from '@/components/Teacher/Teacher.vue'
import StudentCalendar from '@/components/student/StudentCalendar.vue'
// import { component } from 'vue/types/umd'
import CoursePage from '@/views/CoursePage.vue'
import Login from '@/components/login/Login.vue'

const routes = [
  {
    path: '/',
    name: 'StudentList',
    component: Students
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/student/:id',
    name: 'StudentDetail',
    component: StudentUpdate,
    props: true
  },
  {
    path: '/create-student',
    name: 'StudentCreate',
    component: StudentCreate,
    props: true,
    meta: {
      middleware: [checkRole],
    },
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: Teacher,
    props: true
  }, {
    path: '/configPrompt',
    name: 'configPrompt',
    component: ConfigPromptAIView,
    props: true
  }, {
    path: '/listPrompt',
    name: 'listPrompt',
    component: ListTemplatePromptView,
    props: true
  },
  {
    path: "/submitAssignment/:id",
    name: "submitAssignment",
    component: SubmitAssignment,
    props: true
  },
  {
    path: "/student",
    name: "studentCalendar",
    component: StudentCalendar,
    props: true
  },
  {
    path:"/coursePage",
    name: "coursePage",
    component: CoursePage,
    props:true
  },
  {
    path: "/:catchAll(.*)",
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/coursePage/:id',
    name: 'assignment',
    component: Assignment,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
// onMounted(() => {
//   myModal.value = new bootstrap.Modal(document.getElementById("exampleModal"));
//   fetchStudents();
// });

// const handleDelete = async (data) => {
//   try {
//     await axios.delete(`${rootApi}/api/v1/users/${data.id}`);
//     list.value = list.value.filter((item) => item.id !== data.id);
//     closeModal();
//   } catch (error) {
//     console.error('Error deleting student:', error);
//   }
// };

// const openModal = (student) => {
//   seletedObject.value = student;
//   myModal.value.show();
// };

// const closeModal = () => {
//   myModal.value.hide();
// };
