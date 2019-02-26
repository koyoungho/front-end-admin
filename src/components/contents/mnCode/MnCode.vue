<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>코드 관리</h3>

            <!-- code mgt -->
            <div class="code_mgt">
                <!-- sch form -->
                <!--<div class="sch_form">-->
                    <!--<span class="rdo_box"><input type="radio" name="chk" value="2" id="aa11" checked="checked"><label for="aa11">회사코드 관리</label></span>-->
                    <!--<span class="rdo_box"><input type="radio" name="chk" value="2" id="aa12"><label for="aa12">공통코드 관리</label></span>-->
                <!--</div>-->
                <div class="tab_box">
                    <ul class="tab01">
                        <li :class="{'on': (company == true) } " @click="show('company')"><a >{{title1}}</a></li>
                        <li  :class="{'on': (common == true) } " @click="show('common')"><a >{{title2}}</a></li>
                    </ul>
                </div>
                <!-- grid box -->
                <div class="grid_box col02">
                    <!-- code col -->
                    <div class="code_col">
                        <!-- sub -->
                        <h4 class="first">{{company == true ? title1 : title2}}</h4>
                        <!-- btn mgt area -->
                        <div class="btn_mgt_area">
                          <template v-if="company==false">
                            <button type="button" v-on:click="viewPop('add','main')" class="btn_s01 bg03 add" v-show="regShow">추가</button>
                            <button type="button" v-on:click="removeData('main')" class="btn_s01 bg03 del" v-show="delShow">삭제</button>
                          </template>
                        </div>

                        <!-- code list box -->
                        <div class="code_list_box">
                            <!-- code head -->
                            <div class="code_head">
                                <template v-if="company == true">
                                    <div class="title">회사코드</div>
                                    <div class="title">코드명</div>
                                </template>
                                <template v-else>
                                    <div class="title">공통코드</div>
                                    <div class="title">공통코드명</div></template>
                            </div>
                            <!-- code body -->
                            <div class="code_body tbl_scroll">
                                <template v-for="cCode in data">
                                    <a>
                                        <template v-if="company==true">
                                        <div class="cont" :class="{highlight:cCode.code == selectedp}"  @click="subCodeList(cCode.code),onSelectedParentCompany(cCode.code)">{{cCode.code}}</div>
                                            <div class="cont" :class="{highlight:cCode.code == selectedp}"  @click="subCodeList(cCode.code),onSelectedParentCompany(cCode.code)" >{{cCode.codeNm}}</div>
                                        </template>
                                        <template v-if="company==false">
                                            <div class="cont" :class="{highlight:cCode.code == selectedp}"  @click="subCodeList(cCode.code),onSelectedParent(cCode.code,cCode.groupCode)">{{cCode.code}}</div>
                                            <div class="cont" :class="{highlight:cCode.code == selectedp}"  @click="subCodeList(cCode.code),onSelectedParent(cCode.code,cCode.groupCode)" v-on:dblclick="counter += 1, viewPopCommon('upd','main' ,cCode.code , cCode.codeNm , 'ROOT')">{{cCode.codeNm}}</div>
                                        </template>
                                    </a>
                                </template>
                            </div>
                        </div>
                    </div>
                    <!-- //code col -->
                    <!-- code col -->
                    <div class="code_col">
                        <!-- sub -->
                        <h4 class="first">{{company == true ? subTitle1 : subTitle2}}</h4>
                        <!-- btn mgt area -->
                        <div class="btn_mgt_area">
                            <button type="button" v-on:click="viewPop('add','sub')" class="btn_s01 bg03 add"  v-show="regShow">추가</button>
                            <button type="button" v-on:click="removeData('sub')" class="btn_s01 bg03 del"  v-show="delShow">삭제</button>
                        </div>

                        <!-- code list box -->
                        <div class="code_list_box">
                            <!-- code head -->
                            <div class="code_head">
                                <template v-if="company == true">
                                    <div class="title2">회사 서브코드</div>
                                    <div class="title2">회사 서브코드명</div>
                                    <div class="title2">구분</div>
                                </template>
                                <template v-else>
                                    <div class="title2">공통 서브코드</div>
                                    <div class="title2">공통 서브코드명</div>
                                    <div class="title2">구분</div>
                                </template>
                            </div>
                            <!-- code body -->
                            <div class="code_body tbl_scroll">
                                <template v-for="cCode,index in subData" >
                                    <a >
                                        <!--<div :class="cCode.cssClass" @click="onSelected(cCode.code)">{{cCode.code}}</div>-->
                                        <template v-if="company==true">
                                        <div class='cont2' :class="{highlight:cCode.code == selecteds}" @click="onSelectedSub(cCode.code)">{{cCode.code}}</div>
                                        <div class='cont2' :class="{highlight:cCode.code == selecteds}" @click="onSelectedSub(cCode.code)" v-on:dblclick="counter += 1, viewPopCompany('upd','sub', cCode.code , cCode.name , cCode.upjongCode , cCode.saupId, cCode.viewGb)" >{{cCode.name}}</div>
                                        <div class='cont2' :class="{highlight:cCode.code == selecteds}" @click="onSelectedSub(cCode.code)">&nbsp;&nbsp;&nbsp;&nbsp;{{cCode.viewGb!=null?cCode.viewGb:'-'}}</div>
                                        </template>
                                        <template v-if="company==false">
                                            <div class='cont2' :class="{highlight:cCode.code == selecteds}" @click="onSelectedSub(cCode.code)">{{cCode.code}}</div>
                                            <div class='cont2' :class="{highlight:cCode.code == selecteds}" @click="onSelectedSub(cCode.code,cCode.groupCode)" v-on:dblclick="counter += 1, viewPopCommon('upd','sub',cCode.code , cCode.codeNm, cCode.groupCode,cCode.viewGb)"  >{{cCode.codeNm}}</div>
                                            <div class='cont2' :class="{highlight:cCode.code == selecteds}" @click="onSelectedSub(cCode.code,cCode.groupCode)">&nbsp;&nbsp;&nbsp;&nbsp;{{cCode.viewGb!=null?cCode.viewGb:'-'}}</div>
                                        </template>
                                    </a>
                                </template>
                            </div>
                        </div>
                    </div>
                    <!-- //code col -->
                </div>

            </div>

        </div>
        <!-- //content -->
        <codePop v-if="popupYn" @close="popupYn=false" v-bind:dataObject="dataSet" v-bind:dataSelected="dataSet" v-on:regEvents="regEvents" v-on:regEventp="regEventp"></codePop>
    </section>
    <!-- //container -->
    
</template>


<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import CodePop from "@/components/contents/mnCode/CodePop.vue";
    import {CommonBoardService} from '../../../api/common.service';

    @Component({
        components: {
            MnCode, CodePop
        }
    })
    export default class MnCode extends Vue {
        popupYn:boolean =false;
        data:any=[]
        subData:any=[]
        dataSet : any =[]
        originData : any =[]
        rowClass : string = "cont";
        company:boolean=true;
        common:boolean=false;
        clickCode :string = "";
        saupId : string ="";
        upjongCode : string = "";
        title1: string ="회사코드 관리";
        subTitle1: string ="회사 서브 관리";
        title2: string ="공통 관리";
        subTitle2: string ="공통 서브 관리";
        counter : number =0;
        selecteds : string = "";
        selectedp : string = "";
        pDelCode : string ="";
        sDelCode : string ="";
        pDelGroupCode : string ="";
        sDelGroupCode : string ="";

        regShow : boolean =false;
        delShow : boolean =false;

        created(){
            this.callCodeList('company')

            // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'mnCode'; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].updateYn == 'Y') {
                        this.regShow = true;
                    }
                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].deleteYn == 'Y') {
                        this.delShow = true;
                    }
                }
            }


        }

        mounted(){

        }


        callCodeList(type){
            let val = "";
            if(type=='company'){
                 val='code/upjong';
            }else{
                 val='code/group';
            }
            CommonBoardService.getListDatas(val,null,null).then(result=>{
                if(result.status==200){
                    this.data = result.data
                }
            })
        }

        subCodeList(code){
            let val='';
            let columN :any=[];
            this.clickCode=code;

            if(this.company){ //회사코드
                val='company'
                columN ={upjongCode:code};
            }
            else{
                val='code'
                columN ={groupCode:code};
            }
            CommonBoardService.getListDatas(val,null,columN).then(result=>{
                if(result.status==200){
                    this.subData = result.data
                }
            })
        }

        /**
         * 표로보기
         */
        show(div){ // 영역바뀌면 초기화
            this.data =[]
            this.subData =[];
            this.clickCode='';
            this.company=false;
            this.common=false;
            this.selectedp = '';
            this.selecteds = '';
            this.sDelCode = '';
            this.pDelCode = '';
            this.sDelGroupCode = '';
            this.pDelGroupCode = '';
            if(div == 'company'){
                this.company =true;
                this.callCodeList('company')
            }else if(div == 'common'){
                this.common =true;
                this.callCodeList('common')
            }
        }

        onSelectedSub(data,groupCode){
            this.selecteds = data;
            this.sDelCode = data;
            this.sDelGroupCode = groupCode;
        }
        onSelectedParent(data,groupCode){
            this.selectedp = data;
            this.pDelCode = data;
            this.pDelGroupCode = groupCode;
            this.selecteds = "";
        }

        onSelectedParentCompany(data,saupId,upjongCode){
            this.selectedp = data;
            this.pDelCode = data;
        }

        regEvents(data){
            this.subCodeList(data)
        }
        regEventp(data){
            this.callCodeList(data)
        }

        /**
         * 팝업기능
         * @param fc
         */
        viewPop(fc,div){
            if(div=='main' && this.company==false){ // 메인공통
                this.dataSet = {fc: fc, div:div , groupCode: 'ROOT' ,delCode : this.pDelCode}
            }else if(div=='sub' && this.company==false){ // 메인서브
                this.dataSet = {fc: fc, div:div , groupCode: this.clickCode ,delCode : this.sDelCode}
            }else{ // 서브 회사코드
                this.dataSet = {fc: fc, div:div ,type:this.company, groupCode: this.clickCode ,delCode : this.sDelCode}
            }
            this.popupYn = true;
            }
        viewPopCommon(fc,div,code,name,groupCode,viewGb){
            this.dataSet = {fc: fc, div:div ,type: this.company, code : code , name : name , groupCode : groupCode , viewGb : viewGb };
            this.popupYn = true;
        }

        viewPopCompany(fc,div,code,name,upjoinCode,saupId,viewGb){
        this.dataSet = {fc: fc, div:div ,type: this.company , code : code , name : name , upjongCode : upjoinCode , saupId : saupId, viewGb : viewGb };
        this.popupYn = true;
        }

        removeData(fc){
            let apiAddr = "";
            let Object :any = [];

            if(this.company){ // 회사코드 일때
                  if(fc=='main'){ // 회사코드는 메인삭제가 없음
                  }else{ // 컴퍼니 서브코드
                      if(!this.sDelCode){
                          Vue.swal({text: '코드를 선택해주세요'});
                          return;
                      }
                      apiAddr = 'company'+'/'+ this.sDelCode;
                      Object = {code : this.sDelCode}
                  }
            }else{ // 공통코드일떄
                 if(fc=='main'){
                     if(!this.pDelCode){
                         Vue.swal({text: '코드를 선택해주세요'});
                         return;
                     }
                     apiAddr = 'code/group'+'/'+ this.pDelCode
                     Object = { groupCode : this.pDelCode}
                  }else{ // 컴퍼니 서브코드
                     if(!this.sDelCode){
                         Vue.swal({text: '코드를 선택해주세요'});
                         return;
                     }
                     apiAddr = 'code'+'/'+ this.sDelCode
                     Object = {code : this.pDelCode , groupCode : this.sDelGroupCode}
                  }
            }
            CommonBoardService.deleteListDatas(apiAddr,null,Object).then(result=>{
                if(result.status==200){
                    Vue.swal({text: '삭제 되었습니다'});
                    if(this.company){
                    this.callCodeList('company')
                    }else{
                    this.callCodeList('common')
                    }
                    this.sDelCode ='';
                    this.pDelCode = '';
                    this.subCodeList(this.clickCode);
                }else{

                }
            }).catch(e=>{
                Vue.swal({text: e.data.message});
            })
        }



    }
</script>

<style scoped>
    div.highlight {
        background: #f0f8f9;
    }
</style>