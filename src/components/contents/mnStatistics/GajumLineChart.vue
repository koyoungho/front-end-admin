<template>
    <div>
        <h4>가맹점 현황</h4>
        <!-- grid chart box -->
        <div class="grid_chart_box col02">
            <div class="col">
                <ul class="chart_list">
                    <li class="on"><a href="#">전체</a></li>
                    <li><a href="#">KT</a></li>
                    <li><a href="#">롯데</a></li>
                    <li><a href="#">가입</a></li>
                    <li><a href="#">해지</a></li>
                </ul>
            </div>
            <div class="col">
                <div class="chart_box">
                    <img src="images/img_chart01.png" alt="" style="margin:30px 50px 0 50px">
                </div>
            </div>
        </div>

        <h4>현금영수증 발행 현황</h4>
        <!-- grid chart box -->
        <div class="grid_chart_box col02">
            <div class="col">
                <ul class="chart_list">
                    <li class="on"><a href="#">전체</a></li>
                    <li><a href="#">KT 가맹점 발행</a></li>
                    <li><a href="#">롯데 가맹점 발행</a></li>
                    <li><a href="#">일반 발행</a></li>
                    <li><a href="#">웹 발행</a></li>
                </ul>
            </div>
            <div class="col">
                <div class="chart_box">
                    <img src="images/img_chart01.png" alt="" style="margin:30px 50px 0 50px">
                </div>
            </div>
        </div>

    </div>

</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';

    @Component({

        components: {
            GajumLineChart
        }
    })
    export default class GajumLineChart extends Vue {

    }
</script>

<style scoped>

</style>