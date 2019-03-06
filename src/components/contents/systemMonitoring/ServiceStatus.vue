<template>
<div>
    <h4 class="blind">서비스 상태</h4>

    <!-- system box -->
    <div class="system_box">
        <ul class="system_list">

            <li>
                <div v-bind:class="feq1Css">
                    <div class="system_col01">
                        <h5 class="system">CASH_FEP1</h5>
                    </div>
                    <div class="system_col02">
                        <span class="total">{{fep1Message}}</span>
                    </div>
                </div>
            </li>
            <li>
                <div v-bind:class="feq2Css">
                    <div class="system_col01">
                        <h5 class="system">CASH_FEP2</h5>
                    </div>
                    <div class="system_col02">
                        <span class="total">{{fep2Message}}</span>
                    </div>
                </div>
            </li>
            <li>
                <div v-bind:class="feq3Css">
                    <div class="system_col01">
                        <h5 class="system">CASH_FEP3</h5>
                    </div>
                    <div class="system_col02">
                        <span class="total">{{fep3Message}}</span>
                    </div>
                </div>
            </li>
            <li>
                <div v-bind:class="web1Css">
                    <div class="system_col01">
                        <h5 class="system">CASH_WEB1</h5>
                    </div>
                    <div class="system_col02">
                        <span class="total">{{web1Message}}</span>
                    </div>
                </div>
            </li>
            <li>
                <div v-bind:class="web2Css">
                    <div class="system_col01">
                        <h5 class="system">CASH_WEB2</h5>
                    </div>
                    <div class="system_col02">
                        <span class="total">{{web2Message}}</span>
                    </div>
                </div>
            </li>
            <li>
                <div v-bind:class="was1Css">
                    <div class="system_col01">
                        <h5 class="system">CASH_WAS1</h5>
                    </div>
                    <div class="system_col02">
                        <span class="total">{{was1Message}}</span>
                    </div>
                </div>
            </li>
            <li>
                <div v-bind:class="was2Css">
                    <div class="system_col01">
                        <h5 class="system">CASH_WAS2</h5>
                    </div>
                    <div class="system_col02">
                        <span class="total">{{was2Message}}</span>
                    </div>
                </div>
            </li>
            <li>
                <div v-bind:class="app1Css">
                    <div class="system_col01">
                        <h5 class="system">NEW_APP1</h5>
                    </div>
                    <div class="system_col02">
                        <span class="total">{{was2Message}}</span>
                    </div>
                </div>
            </li>
            <li>
                <div v-bind:class="app2Css">
                    <div class="system_col01">
                        <h5 class="system">NEW_APP2</h5>
                    </div>
                    <div class="system_col02">
                        <span class="total">{{was2Message}}</span>
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
    import {CommonBoardService} from "../../../api/common.service";

    @Component({
        components: {
            ServiceStatus

        }
    })
    export default class ServiceStatus extends Vue {

        feq1Css:any='';
        fep1Message:any='';

        feq2Css:any='';
        fep2Message:any='';

        feq3Css:any='';
        fep3Message:any='';

        web1Css:any='';
        web1Message:any='';

        web2Css:any='';
        web2Message:any='';

        was1Css:any='';
        was1Message:any='';

        was2Css:any='';
        was2Message:any='';

        app1Css:any='';
        app1Message:any='';

        app2Css:any='';
        app2Message:any='';

        interval:any = '';

        created(){

            this.interval = setInterval(this.serviceStatusApi, 3000);
        }

        mounted(){

            this.serviceStatusApi();

        }

        serviceStatusApi(){

            CommonBoardService.getListDatas('monitoring/pings', null, null).then(result=>{
                if(result.status==200){

                    //정상-system_row st_color04
                    //비정상-system_row st_color05
                    for(let i=0; i<result.data.length; i++){

                        if(result.data[i].hostName == 'CASH_FEP1'){
                            if(result.data[i].status == 'LIVE'){
                                this.fep1Message = '정상';
                                this.feq1Css='system_row st_color04';
                            }else{
                                this.fep1Message = '비정상';
                                this.feq1Css='system_row st_color05';
                            }
                        }else if(result.data[i].hostName == 'CASH_FEP2'){
                            if(result.data[i].status == 'LIVE'){
                                this.fep2Message = '정상';
                                this.feq2Css='system_row st_color04';
                            }else{
                                this.fep2Message = '비정상';
                                this.feq2Css='system_row st_color05';
                            }
                        }else if(result.data[i].hostName == 'CASH_FEP3'){
                            if(result.data[i].status == 'LIVE'){
                                this.fep3Message = '정상';
                                this.feq3Css='system_row st_color04';
                            }else{
                                this.fep3Message = '비정상';
                                this.feq3Css='system_row st_color05';
                            }
                        }else if(result.data[i].hostName == 'CASH_WEB1'){
                            if(result.data[i].status == 'LIVE'){
                                this.web1Message = '정상';
                                this.web1Css='system_row st_color04';
                            }else{
                                this.web1Message = '비정상';
                                this.web1Css='system_row st_color05';
                            }
                        }else if(result.data[i].hostName == 'CASH_WEB2'){
                            if(result.data[i].status == 'LIVE'){
                                this.web2Message = '정상';
                                this.web2Css='system_row st_color04';
                            }else{
                                this.web2Message = '비정상';
                                this.web2Css='system_row st_color05';
                            }
                        }else if(result.data[i].hostName == 'CASH_WAS1'){
                            if(result.data[i].status == 'LIVE'){
                                this.was1Message = '정상';
                                this.was1Css='system_row st_color04';
                            }else{
                                this.was1Message = '비정상';
                                this.was1Css='system_row st_color05';
                            }
                        }else if(result.data[i].hostName == 'CASH_WAS2'){
                            if(result.data[i].status == 'LIVE'){
                                this.was2Message = '정상';
                                this.was2Css='system_row st_color04';
                            }else{
                                this.was2Message = '비정상';
                                this.was2Css='system_row st_color05';
                            }
                        }else if(result.data[i].hostName == 'NEW_APP1'){
                            if(result.data[i].status == 'LIVE'){
                                this.app1Message = '정상';
                                this.app1Css='system_row st_color04';
                            }else{
                                this.app1Message = '비정상';
                                this.app1Css='system_row st_color05';
                            }
                        }else if(result.data[i].hostName == 'NEW_APP2'){
                            if(result.data[i].status == 'LIVE'){
                                this.app2Message = '정상';
                                this.app2Css='system_row st_color04';
                            }else{
                                this.app2Message = '비정상';
                                this.app2Css='system_row st_color05';
                            }
                        }
                    }

                }

            })

        }

        destroyed(){
            clearInterval(this.interval);
        }

    }

</script>

<style scoped>

</style>