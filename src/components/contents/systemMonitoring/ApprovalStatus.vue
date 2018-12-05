<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <!-- cont_mobile -->
            <div class="cont_mobile page_system0601">
                <!-- title area -->
                <div class="title_area">
                    <div class="fleft">
                        <h3>시스템 모니터링</h3>
                    </div>
                </div>

                <!-- tab box -->
                <div class="tab_box">
                    <ul class="tab01 col04">
                        <li class="on"><a href="#">승인 현황</a></li>
                        <li><a href="#">배치 파일 처리 현황</a></li>
                        <li><a href="#">시스템 자원</a></li>
                        <li><a href="#">서비스 상태</a></li>
                    </ul>
                </div>
                <content-view></content-view>



            </div>
            <!-- //cont_mobile -->

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>


<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            ApprovalStatus
        }
    })
    export default class ApprovalStatus extends Vue {

    }
</script>

<style scoped>

</style>