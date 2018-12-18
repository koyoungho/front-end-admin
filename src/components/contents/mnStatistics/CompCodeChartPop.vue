<template>
    <div>
        <!-- popup small -->
        <div class="popup_modal"></div>
        <div id="popup_code" class="popup_wrapper small Pstyle" tabindex="0" style="display: block;">
            <!-- popup header -->
            <div class="popup_header">
                <!-- h2 -->
                <h2>정산회사코드 설정 (병의원)</h2>
                <button type="button" v-on:click="closePop" class="btn_close">Close</button>
            </div>
            <!-- popup body -->
            <div class="popup_body">
                <!-- popup content -->
                <div class="popup_content page_code">

                    <!-- content  -->
                    <div class="comcode_box">
                        <ul class="comcode_list">
                            <li><span class="chk_box"><input type="checkbox" id="aa01"><label for="aa01">100 <span class="company">KT</span></label></span></li>
                            <li><span class="chk_box"><input type="checkbox" id="aa02"><label for="aa02">107 <span class="company">(주)비지에프리테일</span></label></span></li>
                            <li><span class="chk_box"><input type="checkbox" id="aa03"><label for="aa03">100 <span class="company">KT</span></label></span></li>
                            <li><span class="chk_box"><input type="checkbox" id="aa04"><label for="aa04">107 <span class="company">(주)비지에프리테일</span></label></span></li>
                            <li><span class="chk_box"><input type="checkbox" id="aa05"><label for="aa05">100 <span class="company">KT</span></label></span></li>
                            <li><span class="chk_box"><input type="checkbox" id="aa06"><label for="aa06">107 <span class="company">(주)비지에프리테일</span></label></span></li>
                        </ul>
                    </div>
                    <!-- //popup content -->
                    <!-- bottom area -->
                    <div class="bottom_area">
                        <!-- btn bot -->
                        <div class="btn_bot">
                            <button type="button" id="" class="btn_b01 bg02">취소</button>
                            <button type="button" id="" class="btn_b01 bg01">저장</button>
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

    @Component({

        components: {
            CompCodeChartPop
        }
    })
    export default class CompCodeChartPop extends Vue {

        closePop(){
            this.$emit('close');
        }

    }
</script>

<style scoped>

</style>