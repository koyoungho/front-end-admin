<template>
    <div>
        <!-- popup small -->
        <div class="popup_modal"></div>
        <div id="popup_code" class="popup_wrapper small Pstyle" tabindex="0" style="display: block;">
            <!-- popup header -->
            <div class="popup_header">
                <!-- h2 -->
                <h2>분기별 현금영수증 정산 생성</h2>
                <button type="button" v-on:click="closePop" class="btn_close">Close</button>
            </div>
            <!-- popup body -->
            <div class="popup_body">
                <!-- popup content -->
                <div class="popup_content page_code">

                    <!-- search box -->
                    <div class="search_box code01">
                        <div class="search_inner">
                            <ul class="search_list">
                                <li>
                                    <label for="">연도</label>
                                    <select  class="select sch_w100" title="회사코드" v-model="quarterYear" >
                                        <option value="">전체</option>
                                        <template v-for="e,index in 100">
                                            <option  :value="index+2000">{{index+2000}}</option>
                                        </template>
                                    </select>
                                </li>
                                <li>
                                    <label for="">분기</label>
                                    <select  class="select sch_w100" title="회사코드" v-model="quarter" >
                                        <option value="">전체</option>
                                        <option  value="1">1/4분기</option>
                                        <option  value="2">2/4분기</option>
                                        <option  value="3">3/4분기</option>
                                        <option  value="4">4/4분기</option>
                                    </select>
                                </li>
                                <li>
                                    <label for="">구분</label>
                                    <select  class="select sch_w100" title="회사코드" v-model="gubun" >
                                        <option value="">전체</option>
                                        <option value="TAX">국세청</option>
                                        <option value="TEMP">가정산</option>
                                    </select>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- //search box -->

                </div>
                <!-- //popup content -->
                <!-- bottom area -->
                <div class="bottom_area">
                    <!-- btn -->
                    <div class="btn_bot">
                            <button type="button" class="btn_b01 bg02" v-on:click="closePop">취소</button>
                            <button type="button" class="btn_b01 bg01" @click="codeAdd" v-show="regShow">추가</button>
                    </div>
                </div>

            </div>
            <!-- //popup body -->
        </div>
        <!-- //popup -->
    </div>

</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {CommonBoardService} from '../../../api/common.service';


    @Component({
        components: {
            Quarter
        }
    })
    export default class Quarter extends Vue {

        @Prop() dataObject  !: any;

        regShow:boolean = false;
        quarterYear :string = "2019";
        quarter :string = "";
        gubun :string = "";

        created(){

            // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'mnCode'; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                        this.regShow = true;
                    }
                }
            }

        }

        mounted(){
        }

        closePop(){
            this.$emit('close');
        }

        codeAdd(){
            let Object :any = [];
            // CommonBoardService.postListDatas('statistics/saupjajungsan','addbungi',Object).then(result=>{
            //     if(result.status==201){
            //         Vue.swal({text: '저장되었습니다'});
            //     }
            // })
        }

    }
</script>




<style scoped>

</style>