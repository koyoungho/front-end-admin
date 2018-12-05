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
                        <li v-on:click="getTemp('Approval')" v-bind:class="{'on': (showApproval == true) } "><a>승인 현황</a></li>
                        <li v-on:click="getTemp('BatchFile')" v-bind:class="{'on': (showBatchFile == true || showBatchFileList == true)}" ><a>배치 파일 처리 현황</a></li>
                        <li v-on:click="getTemp('Resource')" v-bind:class="{'on': (showResource == true)}" ><a>시스템 자원</a></li>
                        <li v-on:click="getTemp('Service')" v-bind:class="{'on': (showService == true)}" ><a>서비스 상태</a></li>
                    </ul>
                </div>
                <ApprovalStatus v-show="showApproval"></ApprovalStatus>
                <BatchFileProc v-show="showBatchFile" v-on:toList="getTemp"></BatchFileProc>
                <BatchFileProcList v-show="showBatchFileList" ></BatchFileProcList>
                <ResourceSystem v-show="showResource"></ResourceSystem>
                <ServiceStatus v-show="showService"></ServiceStatus>



            </div>
            <!-- //cont_mobile -->

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import ApprovalStatus from "@/components/contents/systemMonitoring/ApprovalStatus.vue";
    import BatchFileProc from "@/components/contents/systemMonitoring/BatchFileProc.vue";
    import BatchFileProcList from "@/components/contents/systemMonitoring/BatchFileProcList.vue";
    import ResourceSystem from "@/components/contents/systemMonitoring/ResourceSystem.vue";

    import ServiceStatus from "@/components/contents/systemMonitoring/ServiceStatus.vue";

    @Component({
        components: {
            SystemMonitoring,
            ApprovalStatus, BatchFileProc, BatchFileProcList, ResourceSystem, ServiceStatus
        }
    })
    export default class SystemMonitoring extends Vue {

        showApproval : boolean=true;
        showBatchFile : boolean=false;
        showBatchFileList : boolean=false;
        showResource : boolean=false;
        showService : boolean=false;

        /**
         * 탭변경
         * @param comp
         */
        getTemp(comp){

            this.showApproval =false;
            this.showBatchFile =false;
            this.showBatchFileList =false;
            this.showResource =false;
            this.showService =false;

            if(comp == 'Approval' ){
                this.showApproval =true;
            }else if(comp =='BatchFile'){
                this.showBatchFile =true;
            }else if(comp =='BatchFileList'){
                this.showBatchFileList =true;
            }else if(comp =='Resource') {
                this.showResource =true;
            }else if(comp == 'Service') {
                this.showService =true;
            }
        }





    }
</script>


<style scoped>

</style>