   <template>
    <div v-if="isOpen" class="custom-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cập nhật thông tin người dùng</h5>
            <button type="button" class="close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitUpdate">
              <div class="form-group">
                <label for="fullName">Tên</label>
                <input
                  type="text"
                  v-model.number="updatedUser.fullName"
                  class="form-control"
                  id="fullName"
                />
                <div v-if="errors.fullName" class="text-danger">{{ errors.fullName }}</div>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="text"
                  v-model="updatedUser.email"
                  class="form-control"
                  id="email"
                />
                <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
              </div>
              <div class="form-group">
                <label for="age">Tuổi</label>
                <input
                  type="number"
                  v-model="updatedUser.age"
                  class="form-control"
                  id="age"
                />
                <div v-if="errors.age" class="text-danger">{{ errors.age }}</div>
              </div>
              <div class="form-group" v-if="!isMentorOrTeacher">
                <label for="points">Điểm</label>
                <input
                  type="number"
                  v-model="updatedUser.points"
                  class="form-control"
                  id="points"
                />
                <div v-if="errors.points" class="text-danger">{{ errors.points }}</div>
              </div>
  
              <button type="submit" class="btn btn-secondary save-btn">Lưu</button>
              <button type="button" class="btn btn-secondary" @click="closeModal">Đóng</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, computed, watch } from 'vue';
  import { toast } from 'vue3-toastify';
  import * as yup from 'yup';
  
  export default {
    props: {
      isOpen: {
        type: Boolean,
        default: false,
      },
      userInfo: {
        type: Object,
        required: true,
      },
    },
    setup(props, { emit }) {
      const updatedUser = ref({ ...props.userInfo });
      const errors = ref({});
  
      watch(
        () => props.userInfo,
        (newVal) => {
          updatedUser.value = { ...newVal };
        }
      );
  
      const isMentorOrTeacher = computed(() => {
        return (
          Array.isArray(props.userInfo.roles) &&
          props.userInfo.roles.some(
            (role) => role.name === 'MENTOR' || role.name === 'TEACHER'
          )
        );
      });
  
      
      const userSchema = yup.object().shape({
        fullName: yup.string().required('Tên không được để trống'),
        email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
        age: yup
          .number()
          .transform((value, originalValue) => (originalValue === '' ? undefined : value))
          .positive('Tuổi phải là số dương')
          .integer('Tuổi phải là số nguyên')
          .required('Tuổi là bắt buộc'),
        points: yup.number().when('roles', {
          is: (roles) => !isMentorOrTeacher.value,
          then: yup
            .number()
            .min(0, 'Điểm phải lớn hơn hoặc bằng 0')
            .required('Điểm là bắt buộc'),
        }),
      });
  
   
    const validateForm = async () => {
  try {
    await userSchema.validate(updatedUser.value, { abortEarly: false });
    errors.value = {}; 
    return true;
  } catch (validationErrors) {
    errors.value = {};
    
    if (validationErrors.inner && Array.isArray(validationErrors.inner)) {
      validationErrors.inner.forEach((err) => {
        errors.value[err.path] = err.message;
      });
    }
    return false;
  }
};

      const submitUpdate = async () => {
        const isValid = await validateForm();
        if (!isValid) {
          toast.error('Vui lòng kiểm tra lại thông tin đã nhập!');
          return;
        }
  
        try {
          const response = await axios.put(
            `${process.env.VUE_APP_ROOT_API}/users/me`,
            updatedUser.value,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              }
            }
          );
          toast.success('Cập nhật thành công!');
          emit('update:userInfo', response.data.result);
          emit('update:isOpen', false);
          closeModal();
        } catch (error) {
          console.error('Error updating user info', error);
          toast.error('Cập nhật thất bại!');
        }
      };
  
      const closeModal = () => {
        emit('update:isOpen', false);
      };
  
      return {
        isMentorOrTeacher,
        updatedUser,
        submitUpdate,
        closeModal,
        errors,
      };
    },
  };
  </script>
  
  <style scoped>
 .custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  position: relative;
  margin: 5% auto;
  max-width: 600px; 
  width: 90%;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); 
  max-height: 75vh; 
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 10px 0;
}

.modal-footer {
  text-align: right;
}


.modal-title {
  font-size: 1.25rem; 
  font-weight: 600;
}

p {
  font-size: 0.95rem; 
  line-height: 1.4;
}

button.close {
  border: none;
  background: none;
  font-size: 1.2rem;
}

.img-fluid {
  max-width: 100px; 
  border-radius: 50%; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
  transition: transform 0.2s ease-in-out;
}

.img-fluid:hover {
  transform: scale(1.05); 
}


button.btn {
  font-size: 0.9rem; 
  padding: 5px 15px; 
  border-radius: 5px;
}

button.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}


.user-info {
  display: grid;
  grid-template-columns: max-content 1fr; 
  gap: 5px 10px; 
  font-size: 0.95rem;
  line-height: 1.5;
}


.label {
  text-align: left; 
  width: 100px;
  
}

.value {
  text-align: left; 
  flex-grow: 1;
}


.info-item {
  display: contents; 
}


.info-item strong {
  font-weight: 600; 
  text-align: left; 
}


.info-item span {
  text-align: left; 
}


.img-fluid:hover {
  transform: scale(1.05);
}


.modal-footer {
  text-align: right;
}

.save-btn {
  margin-right: 10px; 
}

button.close {
  border: none;
  background: none;
  font-size: 1.2rem;
}

button.btn {
  font-size: 0.9rem;
  padding: 5px 15px;
  border-radius: 5px;
}

button.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}
  </style>
  