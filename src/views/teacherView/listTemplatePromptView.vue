<template>
  <div class="h-100" >



    <div class="container">
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label h3"
          >Prompt :</label
        >
        <textarea
          class="form-control border"
          id="exampleFormControlTextarea1"
          rows="8" disabled v-model="promptAI"
        ></textarea>
      </div>
      <div class="row my-2">
        <div class="col-6">
          <h3>Ngôn Ngữ Review</h3>
          <a href="#" data-bs-toggle="modal" @click="setStructSelect('language') " data-bs-target="#exampleModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>
      Thêm mới ngôn ngữ đánh giá 
       </a>
        </div>
        <div class="col-6">
            



<div v-for="struct in StructsConfig" :key="struct.id">
        <div v-if="struct.type==='language'"   class="form-check show-edit-icon">
  <input class="form-check-input" type="radio" :checked="struct.isActive" @click="activeStruct(struct.id)" name="language" value="" id="flexCheckDefault">
  <label class="form-check-label" for="flexCheckDefault">
   {{ struct.contentStruct }}

    <a href="#" style="text-decoration: unset" @click="setDataToEdit(struct.contentStruct,struct.type,struct.id)" class="edit-icon" data-bs-toggle="modal" data-bs-target="#exampleModal">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg> Edit
       </a>

  </label>


</div>  

</div>


    
        </div>
      </div>
      <div class="row my-2">

        <div class="col-6">
        <h3>Cấu trúc đánh giá review</h3>
       <a href="#" data-bs-toggle="modal" @click="setStructSelect('struct') " data-bs-target="#exampleModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>
      Thêm mới cấu trúc đánh giá
       </a>
      </div>
      <div class="col-6" >
       <div v-for="struct in StructsConfig" :key="struct.id"> 
        <div v-if="struct.type==='struct'" class="form-check show-edit-icon">
  <input class="form-check-input" :checked="struct.isActive"  @click="activeStruct(struct.id)"  type="checkbox" value="" id="flexCheckDefault">
  <label class="form-check-label" for="flexCheckDefault">
    {{ struct.contentStruct }}

    <a href="#" @click="setDataToEdit(struct.contentStruct,struct.type,struct.id)" style="text-decoration: unset" class="edit-icon" data-bs-toggle="modal" data-bs-target="#exampleModal">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg> Edit
       </a>

  </label>


        </div>
       </div>
       


      </div>


      </div>

    </div>

    <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> -->



<!-- Modal -->
<div class="modal  fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog mt-5">
    <div class="modal-content mt-5">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Điều chỉnh cấu trúc đánh giá</h1>
        <button type="button" @click="clearFormModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        <br>
       
      </div>
      <!-- <span class="text-center w-100">( Đang chỉnh sửa cho struct có id : {{ idStruct }} )</span> -->
      <div class="modal-body">   
          <div class=" row ">
        <span class="col-5 h5" >Cấu trúc</span>
        <textarea v-model="contentStruct"
          class=" col-6  text_area_Modal "
          id="exampleFormControlTextarea1"
          rows="5"
        ></textarea>
      <div class="row my-2">
        <div class="col-4">
          <h5>Loại cấu trúc</h5>
        </div>
        <div class="col-7 ms-4 ">
          <select class="form-select select_Modal "  v-model="selectdType" aria-label="Default select example">
  <option v-for="(type,index) in typeStruct" :key="index" :value=type >{{ type }}</option>

</select>
        </div>
      </div>



      </div>



      </div>
      <div class="modal-footer">
        <button type="button" :hidden="idStruct!=''" :disabled="contentStruct=='' || selectdType=='' "  @click="postStruct(); clearFormModal()" class="btn btn-primary"  data-bs-dismiss="modal">Thêm </button>
        <button type="button" :hidden="idStruct==''"  :disabled="contentStruct=='' && selectdType=='' "   @click="putStruct() ;clearFormModal()" class="btn btn-primary" data-bs-dismiss="modal">Sửa </button>
        <button type="button" :hidden="idStruct==''"    @click="deleteStruct() ; clearFormModal()" class="btn btn-danger" data-bs-dismiss="modal">xoá </button>
        <button type="button" @click="clearFormModal" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

        
      </div>
    </div>
  </div>
</div>



  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import * as yup from "yup";

export default {
  mounted() {
    this.getAllStruct();
    this.getAllTypeStruct();
    this.getPrompt();
   
  },
  data() {
    return {
      mockApi: "http://localhost:3000/prompt",
      rootApi: process.env.VUE_APP_ROOT_API,
      contentStruct : "",
      selectdType :"",
      idStruct:"",
      promptAI: "",
      StructsConfig:[],
      typeStruct:[],

    };
  },

  methods: {
    //===============new update=================
   
    async getPrompt() {
      try {
        const response = await axios.get(
          this.rootApi + "/admin/review-config/active"
        );

        if (response.status == 200) {
          this.promptAI = response.data.result.promptStructure;

   
          this.fillFormPrompt();  
        } else {
          toast.error("Update Failed !");
        }
      } catch (error) {
        toast.error("An error occurred while fill prompt!");
      }
    },

    fillFormPrompt(){
      
      let sizeLoop = this.StructsConfig.length;

   

      for (let index = 0; index < sizeLoop; index++) {
        if(this.StructsConfig[index].type=='language' && this.StructsConfig[index].isActive==true){
        this.promptAI= this.promptAI.replace("{language}",this.StructsConfig[index].contentStruct)
      }

      if(this.StructsConfig[index].type=='struct' && this.StructsConfig[index].isActive==true){
        this.promptAI= this.promptAI.replace("{struct}"," + "+ this.StructsConfig[index].contentStruct  + "\n{struct}")
      }

      if(index == sizeLoop-1){
        this.promptAI= this.promptAI.replace("{struct}", "")
      }

        
      }
    
    },

    async getAllStruct() {
      try {
        const response = await axios.get(
          this.rootApi + "/struct-responses"
        );

        if (response.status == 200) {
          this.StructsConfig = response.data.result;
          this.getPrompt();
  
        } else {
          toast.error("Update Failed !");
        }
      } catch (error) {
        toast.error("An error occurred while fill prompt!");
      }
    },

    async getAllTypeStruct() {
      try {
        const response = await axios.get(
          this.rootApi + "/struct-responses/type-struct"
        );

        if (response.status == 200) {
          this.typeStruct = response.data.result;


        } else {
          toast.error("Update Failed !");
        }
      } catch (error) {
        toast.error("An error occurred while fill prompt!");
      }
    },
    async putStruct() {
  
      try {
        const response = await axios.put(
          this.rootApi + "/struct-responses/"+this.idStruct,null,
          {params :{ contentStruct: this.contentStruct,
            struct : this.selectdType
            }}
        );

        if (response.status == 200) {
          

          toast.success("Update  Success !", {
            autoClose: 2000,
          });
      
          this.getAllStruct();
          this.getPrompt();
        } else {
          toast.error("Update Failed !");
        }
      } catch (error) {
        toast.error("An error occurred while fill prompt!");
      }
    },
    async postStruct() {

      try {
        const response = await axios.post(
          this.rootApi + "/struct-responses",null,
          {params :{ contentStruct: this.contentStruct,
            struct : this.selectdType
            }}
        );

        if (response.status == 200) {
          

          toast.success("Add  Success !", {
            autoClose: 2000,
          });
         
          this.getAllStruct();
          this.getPrompt();
        } else {
          toast.error("Add Failed !");
        }
      } catch (error) {
        toast.error("An error occurred while Add!");
      }
    },
    async deleteStruct() {
      try {
        const response = await axios.delete(
          this.rootApi + "/struct-responses/"+this.idStruct,null,
        
        );

        if (response.status == 200) {
          

          toast.success("Delete  Success !", {
            autoClose: 2000,
          });
          this.getAllStruct();
          this.getPrompt();
        } else {
          toast.error("Delete Failed !");
        }
      } catch (error) {
        toast.error("An error occurred while Delete!");
      }
    },
    async activeStruct(id) {
    
      try {
        const response = await axios.patch(
          this.rootApi + "/struct-responses/"+id,null,
         
        );

        if (response.status == 200) {
          
          toast.success("Add  Success !", {
            autoClose: 2000,
          });
          this.getAllStruct();
          this.getPrompt() 
      
        
        } else {
          toast.error("Add Failed !");
        }
      } catch (error) {
        toast.error("An error occurred while Add!");
      }
    },

    setStructSelect(type){
      this.selectdType = type
    },

    clearFormModal(){
      this.contentStruct = "",
      this.selectdType ="",
      this.idStruct=""
    },

    setDataToEdit(content,type,id){
    this.contentStruct = content,
      this.selectdType =type,
      this.idStruct=id
    },

    // ==================================
    // async getAllPromt() {
    //   try {
    //     const response = await axios.get(
    //       this.rootApi + "/admin/review-config",
    //       { page: 1, pageSize: 10 }
    //     );

    //     if (response.status == 200) {
    //       this.promptAI = response.data.result.items;

    //       console.log(response.data.result.items);
    //     } else {
    //       toast.error("Update Failed !");
    //     }
    //   } catch (error) {
    //     toast.error("An error occurred while fill prompt!");
    //   }
    // },


    
    // async activePrompt(idPrompt) {
    //   try {
    //     const response = await axios.patch(
    //       this.rootApi + "/admin/review-config/" + idPrompt
    //     );
    //     console.log(response.data);
    //     if (response.status === 200) {
    //       this.getAllPromt();
    //       toast.success("Update  Success !", {
    //         autoClose: 2000,
    //       });
    //     } else {
    //       toast.error("Update Failed !");
    //     }
    //   } catch (error) {
    //     toast.error("An error occurred while update prompt!");
    //     console.log(error);
    //   }
    // },
  },
};
</script>

<style scoped>

.select_Modal{
margin-left: 12px ;

width: 99%;

}
.edit-icon{
  display: none  ;

}
.show-edit-icon:hover .edit-icon{
  display: inline;

}


</style>