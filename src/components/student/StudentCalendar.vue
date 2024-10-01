<template>
  <div class="student-calendar">
    <div class="container">
      <div class="row mb-4">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <h2 class="mb-0">{{ !stateButtonFormStudent ? 'Lịch học' : 'Lịch giảng viên' }}</h2>
          <button @click="toggleCalendarForm" :class="['btn', stateButtonFormStudent ? 'btn-danger' : 'btn-primary']">
            <i v-if="!stateButtonFormStudent" class="fas fa-plus me-2"></i>
            <i v-else class="fas fa-times me-2"></i>
            {{ stateButtonFormStudent ? 'Đóng form' : 'Tạo lịch' }}
          </button>
        </div>
      </div>

      <div v-if="stateButtonFormStudent" class="card mb-4">
        <div class="card-body">
          <h5 class="card-title mb-4">Tìm kiếm lịch</h5>
          <form @submit.prevent="searchCalendar" class="calendar-search-form">
            <div class="row g-3 align-items-end">
              <div class="col-md-3">
                <label class="form-label" for="course">Khóa học</label>
                <select class="form-select" name="course" v-model="course" @change="onCourseChange">
                  <option :value="null" disabled selected hidden>Chọn Khóa học</option>
                  <option class="modify-option" v-for="course in listCourse" :key="course.id" :value="course">
                    {{ course.name }}
                  </option>
                </select>
                <small class="text-danger">{{ courseError }}</small>
              </div>
              <div class="col-md-3">
                <label class="form-label" for="chapter">Chương</label>
                <select class="form-select" id="chapter" v-model="chapter" @change="onChuongChange">
                  <option :value="null" disabled selected hidden>Chọn chương</option>
                  <option class="modify-option" v-for="chapter in listChapters" :key="chapter.id" :value="chapter">
                    {{ chapter.name }}
                  </option>
                </select>
                <small class="text-danger">{{ chapterError }}</small>
              </div>
              <div class="col-md-3">
                <label class="form-label" for="teacher">Giảng viên</label>
                <select class="form-select" id="teacher" v-model="teacher">
                  <option :value="null" selected>Chọn giảng viên</option>
                  <option class="modify-option" v-for="teacher in teachers" :key="teacher.Id" :value="teacher">
                    {{ teacher.OwnerText }}
                  </option>
                </select>
              </div>
              <div class="col-md-3">
                <button type="submit" class="btn btn-primary w-100">
                  <i class="fas fa-filter"></i> &nbsp; Lọc
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <Calendar :url="stateButtonFormStudent ? url : urlCalendarOfStudent" :clickable="isFilterApplied"
            :calendarType="stateButtonFormStudent ? 'other' : 'mine'" :ownerId="stateButtonFormStudent ? ownerId : ''" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useField, useForm } from 'vee-validate';
import { onMounted, watch, ref, computed } from 'vue';
import { toast } from 'vue3-toastify';
import * as yup from 'yup';
import Calendar from '../Calendar/Calendar.vue';
import { useStore } from 'vuex';

const rootApi = process.env.VUE_APP_ROOT_API;
const store = useStore();

const stateButtonFormStudent = ref(false);
const accessToken = localStorage.getItem("accessToken");

const { handleSubmit, resetForm } = useForm({
    initialValues: {
        course: null,
        chapter: null,
        teacher: null,
    },
    validationSchema: yup.object({
        course: yup
            .object().nullable()
            .required('*bắt buộc'),
        chapter: yup
            .object().nullable()
            .required('*bắt buộc'),
    }),
});

const { value: course, errorMessage: courseError } = useField('course');
const { value: chapter, errorMessage: chapterError } = useField('chapter');
const { value: teacher, errorMessage: teacherError } = useField('teacher');
const url = ref("");
const urlCalendarOfStudent = ref("");
const teachers = ref([]);
const ownerId = ref();
const listCourse = ref([]);
const listChapters = ref([]);
const user = computed(() => store.getters.user);
const isFilterApplied = ref(false);

const toggleCalendarForm = () => {
    stateButtonFormStudent.value = !stateButtonFormStudent.value;
};

const getAllCalendars = () => {
    urlCalendarOfStudent.value = `${rootApi}/student/${user.value.id}/calendar`;
};

const onCourseChange = async () => {
    await getChapters();
    await getTeachers();
}

const getChapters = async () => {
    try {
        const res = await axios.get(`${rootApi}/chapters?idCourse=${course._value.id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        listChapters.value = res.data.result.items.data;
    } catch (error) {
        console.log(error);
    }
}

const getTeachers = async () => {
    try {
        const res = await axios.get(`${rootApi}/teachers/course/${course.value.id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        teachers.value = res.data.result;
    } catch (error) {
        console.error("Error fetching teachers:", error);
        toast.error("Không thể lấy danh sách giảng viên");
    }
};

const searchCalendar = handleSubmit(async (formData) => {

    try {
        isFilterApplied.value = true;
        const { course, chapter, teacher } = formData;

        if (teacher === null) {
            url.value = `${rootApi}/teacher/calendar/${course.id}/chapter/${chapter.id}/`;
        } else {
            url.value = `${rootApi}/teacher/${teacher.Id}/calendar`;
            ownerId.value = teacher.Id;
        }

    } catch (error) {
        isFilterApplied.value = false;
        toast.error("Không có khung giờ giảng viên!");
    }
});

const fetchCoursesByUser = async () => {
    try {
        const res = await axios.get(`${rootApi}/courses`, {
            params: { id: user.value.id, page: 1, pageSize: 10 },
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (res.status === 200) {
            listCourse.value = res.data.result.items.data;
        } else {
            console.error("Error fetching courses");
            toast.error("Không thể lấy danh sách khóa học");
        }
    } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Lỗi khi lấy danh sách khóa học");
    }
};

const fetchChaptersByCourseId = async (courseId) => {
    try {
        const res = await axios.get(`${rootApi}/chapters`, {
            params: { idCourse: courseId },
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (res.status === 200) {
            listChapters.value = res.data.result.items.data;
        } else {
            console.error("Error fetching chapters");
            toast.error("Không thể lấy danh sách chương");
        }
    } catch (error) {
        console.error("Error fetching chapters:", error);
        toast.error("Lỗi khi lấy danh sách chương");
    }
};

watch(course, (newCourse) => {
    if (newCourse) {
        const selectedCourse = listCourse.value.find(c => c.name === newCourse);
        if (selectedCourse) {
            fetchChaptersByCourseId(selectedCourse.id);
        }
    }
});

watch(user, (newUser) => {
    if (newUser) {
        fetchCoursesByUser();
    }
}, { immediate: true });

onMounted(() => {
    if (!store.getters.isLoggedIn) {
        store.dispatch('fetchUser');
    }

    watch(user, (newUser) => {
        if (newUser) {
            getAllCalendars();
        }
    }, { immediate: true });
});

</script>

<style scoped>
.student-calendar {
  margin-top: 2rem;
}

.calendar-search-form .row {
  position: relative;
}

.calendar-search-form .text-danger {
  position: absolute;
  top: 100%;
  left: 0;
}

.calendar-search-form .col-md-3 {
  display: flex;
  flex-direction: column;
}

@media (max-width: 767.98px) {
  .student-calendar h2 {
    font-size: 1.5rem;
  }
}
</style>