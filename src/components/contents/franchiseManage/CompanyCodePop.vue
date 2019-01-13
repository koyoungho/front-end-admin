<template>
    <div>
        <!-- popup small -->
        <div class="popup_modal"></div>
        <div id="popup_code" class="popup_wrapper Pstyle" tabindex="0" style="display: block;">
            <!-- popup header -->
            <div class="popup_header">
                <!-- h2 -->
                <h2>회사코드</h2>
                <button type="button" v-on:click="closePop" class="btn_close">Close</button>
            </div>
            <!-- popup body -->
            <div class="popup_body">
                <!-- popup content -->
                <div class="popup_content page_code scroll_no">

                    <!-- content  -->
                    <div class="comcode_box">
                        <ul class="comcode_list">
                            <template v-for="ar in companyCodeList">
                                <li>
                                    <span class="">
                                        <input type="checkbox"  v-model="checkBoxList" :value="ar.code" :id="ar.code" @change="checkData(ar.code)"><label :for="ar.code">{{ar.code}}<span class="company">{{ar.name}}</span></label>
                                        <!--<input type="checkbox"  v-model="ar.favYn"  :checked="ar.favYn=='Y'"  @click="checkData(ar.code,index)">{{ar.code}}<span class="company">{{ar.name}}|{{ar.code}}|{{ar.favYn}}</span>-->
                                    </span>
                                </li>
                            </template>
                        </ul>
                    </div>
                    <!-- //popup content -->
                    <!-- bottom area -->
                    <div class="bottom_area">
                        <!-- btn bot -->
                        <div class="btn_bot">
                            <button type="button" id="" class="btn_b01 bg02" v-on:click="closePop">취소</button>
                            <button type="button" id="" class="btn_b01 bg01" v-on:click="closePopAndSave()">선택</button>
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
    import {Component, Vue, Prop} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';

    @Component({

        components: {
            CompanyCodePop
        }
    })
    export default class CompanyCodePop extends Vue {
        @Prop() companyCodeVal  !: string;

        companyCodeList : any = [];
        checkBoxList : any = [];

        closePop(){
            this.$emit('closeCompany');
        }
        closePopAndSave(){
            console.log('체크된 값 확인')
            console.log(this.checkBoxList)
            this.$emit('listSend' , this.checkBoxList)
            this.$emit('closeCompany');
        }

        created(){
            this.codeList()

            console.log('회사코드 받은 값')
            console.log(this.companyCodeVal)
        }

        mounted(){

        }

        codeList(){
            console.log('리스트 조회 전')
            console.log(this.companyCodeVal.toString())
            let str : string = '001'
            console.log('111 : '+str.indexOf(this.companyCodeVal))
            console.log('222 : '+this.companyCodeVal.indexOf(str))

            CommonBoardService.getListDatas('company',null,null).then(response=>{
                if(response.status==200){
                    //this.companyCodeList = response.data
                    let rowData : any = {};
                    response.data.filter(data=>{
                        rowData = {};

                        rowData['code'] = data.code;
                        rowData['name'] = data.name;

                        if(this.companyCodeVal.indexOf(data.code) > -1){
                            console.log(data.code)
                            //console.log(data.code.indexOf(this.companyCodeVal))
                            //this.checkBoxList.push(data.code)
                            //this.companyCodeList
                            rowData['checkGbn'] = true;
                        }
                        this.companyCodeList.push(rowData)
                    })
                }
            })
        }

        checkData(data){
            console.log('선택한 회사코드')
            /*if(event.currentTarget.checked == true){

            }else{

            }*/

            console.log(data)
            console.log('선택한 회사코드 전체 : ' + this.checkBoxList)
            /*let remove = 'N'
            this.checkBoxList = this.checkBoxList;
            this.checkBoxList.find(e=>{
                if(e==data){ // 체크박스데이터안에 데이터있을경우
                    remove='Y'
                }
            })*/

            /*if(remove=='Y'){
                console.log('존재하니 삭제하라')
                CommonBoardService.deleteListDatas('company/account',data,null).then(response =>{
                    if(response.status==200){
                    }else{
                        alert('저장 오류가 발생하였습니다')
                    }
                })
            }else{
                console.log('없으니 인서트하라')
                CommonBoardService.postListDatas('company/account',data,null).then(response =>{
                    if(response.status==201){
                    }else{
                        alert('저장 오류가 발생하였습니다')
                    }
                })
            }*/
        }

    }
</script>

<style scoped>

</style>