<template>
<div>
    <h4 class="blind">서비스 상태</h4>

    <!-- system box -->
    <div class="system_box">
        <ul class="system_list">
            <li>
                <!-- system row -->
                <div class="system_row st_color04">
                    <div class="system_col01">
                        <h5 class="system">웹서비스</h5>
                        <span class="text_type04">응답속도</span>
                        <span class="text_type04 fc_pt01">세션 수</span>
                    </div>
                    <div class="system_col02">
                        <span class="total">정상</span>
                        <span class="num">4ns</span>
                        <span class="num fc_pt01">100명</span>
                    </div>
                </div>
            </li>
            <li>
                <!-- system row -->
                <div class="system_row st_color02">
                    <div class="system_col01">
                        <h5 class="system">DB 서버</h5>
                        <span class="text_type04">응답속도</span>
                    </div>
                    <div class="system_col02">
                        <span class="total">주의</span>
                        <span class="num">4ns</span>
                    </div>
                </div>
            </li>
            <li>
                <!-- system row -->
                <div class="system_row st_color05">
                    <div class="system_col01">
                        <h5 class="system">실시간 승인 1</h5>
                        <span class="text_type04">응답속도</span>
                    </div>
                    <div class="system_col02">
                        <span class="total">오류</span>
                        <span class="num">4ns</span>
                    </div>
                </div>
            </li>
            <li>
                <!-- system row -->
                <div class="system_row st_color04">
                    <div class="system_col01">
                        <h5 class="system">실시간 승인 2</h5>
                        <span class="text_type04">응답속도</span>
                    </div>
                    <div class="system_col02">
                        <span class="total">정상</span>
                        <span class="num">4ns</span>
                    </div>
                </div>
            </li>
            <li>
                <!-- system row -->
                <div class="system_row st_color04">
                    <div class="system_col01">
                        <h5 class="system">FEP 서버 1</h5>
                        <span class="text_type04">응답속도</span>
                        <span class="text_type04 fc_pt01">Server Connect  Err</span>
                    </div>
                    <div class="system_col02">
                        <span class="total">정상</span>
                        <span class="num">4ns</span>
                        <span class="num fc_pt01">00</span>
                    </div>
                </div>
            </li>
            <li>
                <!-- system row -->
                <div class="system_row st_color04">
                    <div class="system_col01">
                        <h5 class="system">FEP 서버 2</h5>
                        <span class="text_type04">응답속도</span>
                        <span class="text_type04 fc_pt01">Server Connect  Err</span>
                    </div>
                    <div class="system_col02">
                        <span class="total">정상</span>
                        <span class="num">4ns</span>
                        <span class="num fc_pt01">00</span>
                    </div>
                </div>
            </li>
            <li>
                <!-- system row -->
                <div class="system_row st_color04">
                    <div class="system_col01">
                        <h5 class="system">TMAX  서버 1</h5>
                        <span class="text_type04">응답속도</span>
                        <span class="text_type04 fc_pt01">RDY / NRDY</span>
                    </div>
                    <div class="system_col02">
                        <span class="total">정상</span>
                        <span class="num">4ns</span>
                        <span class="num fc_pt01">00</span>
                    </div>
                </div>
            </li>
            <li>
                <!-- system row -->
                <div class="system_row st_color04">
                    <div class="system_col01">
                        <h5 class="system">TMAX  서버 2</h5>
                        <span class="text_type04">응답속도</span>
                        <span class="text_type04 fc_pt01">RDY / NRDY</span>
                    </div>
                    <div class="system_col02">
                        <span class="total">정상</span>
                        <span class="num">4ns</span>
                        <span class="num fc_pt01">00</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>

</div>
<!-- //cont_mobile -->

</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            ServiceStatus

        }
    })
    export default class ServiceStatus extends Vue {

    }
</script>

<style scoped>

</style>