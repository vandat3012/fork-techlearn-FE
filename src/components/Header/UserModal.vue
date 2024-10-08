  
  <template>
    <div v-if="isOpen" class="custom-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userModalLabel"></h5>
            <button type="button" class="close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="userInfo">
              <div class="text-center">
                <img :src="userInfo.avatar" alt="Avatar" class="img-fluid rounded-circle mb-3" />
              </div>           

              <div class="user-info">
                <div class="label"><strong>Tên:</strong></div>
                <div class="value">{{ userInfo.fullName }}</div>
              </div>
            
              <div class="user-info">
                <div class="label"><strong>Email:</strong></div>
                <div class="value">{{ userInfo.email }}</div>
              </div>

              <div class="user-info">
                <div class="label"><strong>Tuổi:</strong></div>
                <div class="value">{{ userInfo.age }}</div>
              </div>
              <div class="user-info">
                <div class="label"><strong>Vai trò:</strong></div>
                <div class="value">{{ userInfo.roles.map(role => role.name).join(', ') }}</div>
              </div>
              <div class="user-info">
                <div class="label" v-if="!isMentorOrTeacher"><strong>Điểm:</strong></div>
                <div class="value" v-if="!isMentorOrTeacher">{{ userInfo.points }}</div>
              </div>

              <div class="user-info" v-if="userInfo.courses">
                <div class="label"><strong>Các khóa học:</strong></div>
                <div class="value">{{ userInfo.courses.map(course =>course.name).join(', ') }}</div>
              </div>
              
              <div class="user-info" v-if="isMentorOrTeacher && userInfo.chapters">
                <div class="label"><strong>Các chương:</strong></div>
                <div class="value">{{ userInfo.chapters.map(chapter =>chapter.name).join(', ') }}</div>
              </div>
          
        </div>
            <div v-else>
              <p>Đang tải thông tin người dùng...</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="openUpdateModal">Cập nhật</button>
            <button type="button" class="btn btn-secondary" @click="closeModal">Đóng</button>
          </div>
        </div>
      </div>
      
<UpdateUserModal 
  :isOpen="isUpdateModalOpen" 
  :userInfo="userInfo" 
  @update:isOpen="isUpdateModalOpen = false" 
  @update:userInfo="userInfo = $event" 
/>
    </div>
  </template>
  
  <script>
  import { ref, watch,computed } from 'vue';
  import axios from 'axios';
  import UpdateUserModal from './UpdateUserModal.vue';
  import { toast } from 'vue3-toastify';

  export default {
    props: {
      isOpen: {
        type: Boolean,
        default: false
      }
    },
    components: {
    UpdateUserModal
  },
    setup(props, { emit }) {
      const userInfo = ref(null);
      const isUpdateModalOpen = ref(false);
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(`${process.env.VUE_APP_ROOT_API}/users/me`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          });
          userInfo.value = response.data.result;
        } catch (error) {
          console.error("Error fetching user info", error);
          toast.error("Không thể tải thông tin người dùng!");
        }
      };
  
    const openUpdateModal = () => {
  isUpdateModalOpen.value = true;  
};

      const isMentorOrTeacher = computed(() => {
      if (!userInfo.value) return false;
      
      return userInfo.value.roles.some(role => role.name === 'MENTOR' || role.name === 'TEACHER' );
    });
    
      watch(() => props.isOpen, (newVal) => {
        if (newVal) {
          fetchUserInfo();
        }
      });
      const closeModal = () => {
        emit('update:isOpen', false);
      };
      return {
        userInfo,
        closeModal,
        openUpdateModal,
        isMentorOrTeacher,
        isUpdateModalOpen
      };
    }
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
  