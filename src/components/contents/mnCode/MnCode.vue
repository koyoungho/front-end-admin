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
                        <li :class="{'on': (company == true) } " @click="show('company')"><a >회사코드관리</a></li>
                        <li  :class="{'on': (common == true) } " @click="show('common')"><a >공통코드관리</a></li>
                    </ul>
                </div>
                <!-- grid box -->
                <div class="grid_box col02">
                    <!-- code col -->
                    <div class="code_col">
                        <!-- sub -->
                        <div class="sub">회사 메인코드 그룹</div>
                        <!-- btn mgt area -->
                        <div class="btn_mgt_area">
                            <button type="button" v-on:click="viewPop('add','main')" class="btn_s01 bg03 add">추가</button>
                            <button type="button" v-on:click="viewPop('del','main')" class="btn_s01 bg03 del">삭제</button>
                        </div>

                        <!-- code list box -->
                        <div class="code_list_box">
                            <!-- code head -->
                            <div class="code_head">
                                <div class="title">코드그룹</div>
                                <div class="title">코드명</div>
                            </div>
                            <!-- code body -->
                            <div class="code_body tbl_scroll">
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- //code col -->
                    <!-- code col -->
                    <div class="code_col">
                        <!-- sub -->
                        <div class="sub">회사 서브 코드</div>
                        <!-- btn mgt area -->
                        <div class="btn_mgt_area">
                            <button type="button" v-on:click="viewPop('add','sub')" class="btn_s01 bg03 add">추가</button>
                            <button type="button" v-on:click="viewPop('del', 'sub')" class="btn_s01 bg03 del">삭제</button>
                        </div>

                        <!-- code list box -->
                        <div class="code_list_box">
                            <!-- code head -->
                            <div class="code_head">
                                <div class="title">상세코드</div>
                                <div class="title">코드명</div>
                            </div>
                            <!-- code body -->
                            <div class="code_body tbl_scroll">
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- //code col -->
                </div>

            </div>

        </div>
        <!-- //content -->
        <codePop v-if="popupYn" @close="popupYn=false" v-bind:dataObject="data"></codePop>
    </section>
    <!-- //container -->
    
</template>


<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import CodePop from "@/components/contents/mnCode/CodePop.vue";

    @Component({
        components: {
            MnCode, CodePop
        }
    })
    export default class MnCode extends Vue {
        popupYn:boolean =false;
        data:any=[]

        company:boolean=true;
        common:boolean=false;

        mounted(){
            // this.company=false;
            // this.common=false;
        }

        /**
         * 표로보기
         */
        show(div){

            this.company=false;
            this.common=false;

            if(div == 'company'){
                this.company =true;
            }else if(div == 'common'){
                this.common =true;
            }
        }

        /**
         * 팝업기능
         * @param fc
         */
        viewPop(fc, div){
            this.data.push({'fc': fc, 'div':div});

            console.log( this.data);
            console.log( this.data[0]);

            this.popupYn = true;

        }


    }
</script>

<style scoped>

</style>