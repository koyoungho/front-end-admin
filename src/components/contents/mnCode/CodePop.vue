<template>
    <div>
        <!-- popup small -->
        <div class="popup_modal"></div>
        <div id="popup_code" class="popup_wrapper small Pstyle" tabindex="0" style="display: block;">
            <!-- popup header -->
            <div class="popup_header">
                <!-- h2 -->
                <h2>{{div_str}} 코드 검색</h2>
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
                                    <input type="text" class="input sch_code" title="코드명">
                                </li>
                                <li>
                                    <label>{{div_str}} 코드명</label>
                                    <input type="text" class="input sch_code" title="코드명">
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
                        <button type="button" class="btn_b01 bg01">삭제</button>
                        <button type="button" class="btn_b01 bg01">추가</button>
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


    @Component({
        components: {
            CodePop
        }
    })
    export default class CodePop extends Vue {

        @Prop() dataObject  !: any;

        fuct :string = this.dataObject[0].fc;
        div :string =this.dataObject[0].div;
        div_str :string ="";

        mounted(){

            if(this.div == 'main'){
                this.div_str = '메인';
            }else{
                this.div_str = '서브';
            }

        }


        closePop(){
            this.$emit('close');
        }

    }
</script>




<style scoped>

</style>