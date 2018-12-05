<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>메뉴 권한 관리</h3>

            <!-- btn top -->
            <div class="btn_top">
                <button type="button" class="btn_m01 bg02" v-on:click="regMenu">메뉴 권한 등록</button>
            </div>

            <!-- tbl list box -->
            <div class="tbl_list_box">
                <!-- tbl list01 -->
                <table class="tbl_list01">
                    <caption>메뉴 권한 목록</caption>
                    <colgroup>
                        <col width="10%">
                        <col width="21%">
                        <col width="21%">
                        <col width="16%">
                        <col width="16%">
                        <col width="16%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">순번</th>
                        <th scope="col">메뉴명 (1Depth)</th>
                        <th scope="col">메뉴명 (2Depth)</th>
                        <th scope="col">메뉴코드</th>
                        <th scope="col">사용여부</th>
                        <th scope="col">권한설정</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>50</td>
                        <td v-on:click="regMenu">가맹점관리</td>
                        <td>가맹점관리</td>
                        <td>0002</td>
                        <td>Y</td>
                        <td>Y</td>
                    </tr>
                    <tr>
                        <td colspan="6" class="no_data">조회된 내용이 없습니다.</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl list box -->

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>


<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            MnMenuList
        }
    })
    export default class MnMenuList extends Vue {

        regMenu(){
            //seq여부
            this.$router.push({name:'regMenu'})
        }


    }
</script>

<style scoped>

</style>