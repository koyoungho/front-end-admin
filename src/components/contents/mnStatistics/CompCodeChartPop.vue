<template>
    <div>
        <!-- popup small -->
        <div class="popup_modal"></div>
        <div id="popup_code" class="popup_wrapper Pstyle" tabindex="0" >
            <!-- popup header -->
            <div class="popup_header">
                <!-- h2 -->
                <h2>정산회사코드 설정 (병의원)</h2>
                <button type="button" v-on:click="closePop" class="btn_close">Close</button>
            </div>
            <!-- popup body -->
            <div class="popup_body">
                <!-- popup content -->
                <div class="popup_content page_code scroll_no">

                    <!-- content  -->
                    <div class="comcode_box">
                        <ul class="comcode_list">
                            <template v-for="ar,index in companyCodeList">
                            <!--<li><span class="chk_box"><input type="checkbox"  v-model="checkBoxList" v-bind:value="ar.code"  @click="checkData(ar.code)"><label>{{ar.code}}<span class="company">{{ar.name}}|{{ar.code}}|{{ar.favYn}}</span></label></span></li>-->
                                <li><span class="chk_box"><input type="checkbox"  v-model="ar.favYn" @click="checkData(ar.code,index)"><label>{{ar.code}}<span class="company">{{ar.name}}|{{ar.code}}|{{ar.favYn}}</span></label></span></li>
                            </template>
                        </ul>
                    </div>
                    <!-- //popup content -->
                    <!-- bottom area -->
                    <div class="bottom_area">
                        <!-- btn bot -->
                        <div class="btn_bot">
                            <button type="button" id="" class="btn_b01 bg02" v-on:click="closePop">취소</button>
                            <button type="button" id="" class="btn_b01 bg01" v-on:click="closePopAndSave()">저장</button>
                        </div>
                    </div>
                </div>

            </div>
            <!-- //popup body -->
        </div>
        <!-- //popup -->
    </div>
</template>


<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';

    @Component({

        components: {
            CompCodeChartPop
        }
    })
    export default class CompCodeChartPop extends Vue {
        companyCodeList : any = [];
        checkBoxList : any = [];

        closePop(){
            this.$emit('close');
        }
        closePopAndSave(){
            this.$emit('listSend' , this.checkBoxList)
            this.$emit('close');
        }

        created(){
           this.codeList()
        }

        mounted(){

        }

        codeList(){
            CommonBoardService.getListDatas('company',null,null).then(response=>{
                  if(response.status==200){
                      this.companyCodeList = response.data
                      // response.data.filter(data=>{
                      //     if(data.favYn=='Y'){
                      //         this.checkBoxList.push(data.code)
                      //     }
                      // })
                  }
            })
        }

        checkData(data,index){
            console.log(this.companyCodeList[index].favYn);
            if(this.companyCodeList[index].favYn =='Y'){
                this.companyCodeList[index].favYn = 'N'
            }else{
                this.companyCodeList[index].favYn = 'Y'
            }
            console.log(this.companyCodeList[index].favYn);
            let remove = 'N'
            // this.checkBoxList.find(e=>{
            //     if(e==data){ // 체크박스데이터안에 데이터있을경우
            //      remove='Y'
            //     }
            // })


            // if(remove=='Y'){
            //     console.log('존재하니 삭제하라')
            //     CommonBoardService.deleteListDatas('company/account',data,null).then(response =>{
            //         if(response.status==200){
            //         }else{
            //             alert('저장 오류가 발생하였습니다')
            //         }
            //     })
            // }else{
            //     console.log('없으니 인서트하라')
            //     CommonBoardService.postListDatas('company/account',data,null).then(response =>{
            //         if(response.status==201){
            //         }else{
            //             alert('저장 오류가 발생하였습니다')
            //         }
            //     })
            // }
        }

    }
</script>

<style scoped>

</style>