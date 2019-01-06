<template>
    <div>
        <!-- popup small -->
        <div class="popup_modal"></div>
        <div id="popup_code" class="popup_wrapper small Pstyle" tabindex="0" style="display: block;">
            <!-- popup header -->
            <div class="popup_header">
                <!-- h2 -->
                <h2>{{div_str}} 코드 {{action}}</h2>
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
                                    <label>{{div_str}} 코드</label>
                                    <input type="text" class="input sch_code" title="코드명" v-model="getCodes">
                                </li>
                                <li>
                                    <label>{{div_str}} 코드명</label>
                                    <input type="text" class="input sch_code" title="코드명" v-model="getNames">
                                </li>
                              <template v-if="type">
                                <li>
                                  <label> 사업자아이디</label>
                                  <input type="text" class="input sch_code" title="코드명" v-model="getSaupId">
                                </li>
                                <li>
                                  <label> 업종 코드</label>
                                  <input type="text" class="input sch_code" title="코드명" v-model="getUpjong">
                                </li>
                              </template>
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
                        <template v-if="fuct=='add'">
                      <button type="button" class="btn_b01 bg02" v-on:click="closePop">취소</button>
                      <button type="button" class="btn_b01 bg01" @click="codeAdd" v-show="regShow">추가</button>
                        </template>
                        <template v-if="fuct=='upd'">
                      <button type="button" class="btn_b01 bg02" v-on:click="closePop">취소</button>
                      <button type="button" class="btn_b01 bg01" @click="update" v-show="updShow">수정</button>
                        </template>

                    </div>
                </div>

            </div>
            <!-- //popup body -->
        </div>
        <!-- //popup -->
    </div>
    
</template>

<script lang="ts"f>
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {CommonBoardService} from '../../../api/common.service';


    @Component({
        components: {
            CodePop
        }
    })
    export default class CodePop extends Vue {

        @Prop() dataObject  !: any;

        fuct :string = this.dataObject.fc;
        div :string =this.dataObject.div;
        type :boolean =this.dataObject.type;  // true 이면 회사코드 false 이면 공통
        getCodes : string = !this.dataObject.code ? '':this.dataObject.code
        getNames : string = !this.dataObject.name ? '':this.dataObject.name
        getUpjong : string =!this.dataObject.upjongCode ? '':this.dataObject.upjongCode
        getSaupId : string =!this.dataObject.saupId ? '':this.dataObject.saupId
        getGroupCode : string =this.dataObject.groupCode
        div_str :string ="";
        action : string = "";
        regShow:boolean = false;
        updShow:boolean = false;


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
                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].updateYn == 'Y') {
                        this.updShow = true;
                    }
                }
            }

        }

        mounted(){
            this.titleChange()
        }

        closePop(){
            this.$emit('close');
        }

        codeAdd(){
            let Object :any=[];
            let apiAddr = "";

            if(this.type){
                // 컴퍼니
                apiAddr = 'company';
                Object = {code : this.getCodes , name: this.getNames , saupId : this.getSaupId , upjongCode : this.getUpjong}
                console.log(Object)
            }
            else{
                apiAddr = 'code';
                Object = {code : this.getCodes , codeNm: this.getNames , groupCode : this.getGroupCode};
                // 공통  그룹부모는 ROOT 차일드는 부모코드
            }

            CommonBoardService.postListDatas(apiAddr,null,Object).then(result=>{
                if(result.status==201){
                    if(this.type){
                        this.$emit('regEventp' , 'company')
                        this.$emit('regEvents' , this.getUpjong)
                    }else{
                        this.$emit('regEventp' , 'common')
                        this.$emit('regEvents' , this.getGroupCode)
                    }
                    this.closePop()
                }
                else{
                    alert('오류가발생하였습니다')
                    this.closePop()
                }
            }).catch(e=>{
                alert(e.message);
            })
        }
        update(){
            let Object :any=[];
            let apiAddr = "";
            if(this.type){
                // 컴퍼니
                apiAddr = 'company'+'/'+ this.getCodes;
                Object = {name: this.getNames}
            }
            else{
                apiAddr = 'code';
                Object = {code : this.getCodes , codeNm: this.getNames , groupCode : this.getGroupCode};
                // 공통  그룹부모는 ROOT 차일드는 부모코드
            }

            CommonBoardService.putListData(apiAddr,null,Object).then(result=>{
                if(result.status==200){
                    alert('수정되었습니다')
                    if(this.type){
                        this.$emit('regEventp' , 'company')
                        this.$emit('regEvents' , this.getUpjong)
                    }else{
                        this.$emit('regEventp' , 'common')
                        this.$emit('regEvents' , this.getGroupCode)
                    }


                    this.closePop()
                }
                else{
                    alert('오류가발생하였습니다')
                    this.closePop()
                }
            })
        }

        titleChange(){
                if(this.fuct =='add'){
                    this.action ='추가'
                }else if(this.fuct=='upd'){
                    this.action ='수정'
                }else{
                    this.action ='삭제'
                }

                if(this.div == 'main'){
                    if(this.type){
                        this.div_str = '회사'
                    }
                    else{
                        this.div_str = '공통'
                    }
                }else{
                    this.div_str = '서브'
                }
        }

    }
</script>




<style scoped>

</style>