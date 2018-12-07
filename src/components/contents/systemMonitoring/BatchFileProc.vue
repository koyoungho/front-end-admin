<template>
  <div>

      <h4 class="blind">배치 파일 처리 현황</h4>

    <!-- btn tab -->
    <div class="btn_tab" v-show="buttonShow" >
        <button type="button" class="btn_m01 bg02" v-on:click="toList">배치파일 처리 결과조회</button>
        <!--v-on:click="toList"-->
    </div>


    <!-- system box -->
    <div class="system_box">
        <ul class="system_list">
            <li>
                <!-- system row -->
                <div class="system_row st_color01">
                    <div class="system_col01">
                        <h5 class="system">작업 대기</h5>
                        <span class="text_type04">파일 입수 대기</span>
                        <span class="text_type04">파일 처리 대기</span>
                    </div>
                    <div class="system_col02">
                        <span class="total">10</span>
                        <span class="num">5</span>
                        <span class="num">5</span>
                    </div>
                </div>
            </li>
            <li>
                <!-- system row -->
                <div class="system_row st_color02">
                    <div class="system_col01">
                        <h5 class="system">작업 중</h5>
                    </div>
                    <div class="system_col02">
                        <span class="total">10</span>
                    </div>
                </div>
            </li>
            <li>
                <!-- system row -->
                <div class="system_row st_color03">
                    <div class="system_col01">
                        <h5 class="system">작업 완료</h5>
                    </div>
                    <div class="system_col02">
                        <span class="total">10</span>
                    </div>
                </div>
            </li>
            <li>
                <!-- system row -->
                <div class="system_row st_color04">
                    <div class="system_col01">
                        <h5 class="system">정상 처리 건수</h5>
                    </div>
                    <div class="system_col02">
                        <span class="total">10</span>
                    </div>
                </div>
            </li>
            <li>
                <!-- system row -->
                <div class="system_row st_color05">
                    <div class="system_col01">
                        <h5 class="system">오류 처리 건수</h5>
                    </div>
                    <div class="system_col02">
                        <span class="total">10</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>

</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            BatchFileProc
        }
    })
    export default class BatchFileProc extends Vue {

        vWebType:string="";
        buttonShow:boolean=false;

        mounted(){
            let filter = "win16|win32|win64|mac";
            this.vWebType = "";

            //모바일/PC 구분
            if (navigator.platform ) {
                if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
                    this.vWebType = "MOBILE";
                    this.buttonShow = false;
                } else {
                    this.vWebType = "PC";
                    this.buttonShow = true;
                }
            }
        }

        /**
         * 리스트로 이동
         */
        toList(){
            this.$emit('toList' , 'BatchFileList');
        }

    }
</script>

<style scoped>

</style>