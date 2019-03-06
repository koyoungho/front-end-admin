<template>
<div>
    <h4 class="blind">시스템 자원</h4>

    <!-- system box -->
    <div class="system_box w100">
        <!-- system info -->
        <div class="system_info first">
            <span class="title">FEP #1</span>
            <ul class="system_list">
                <li>
                    <!-- system row -->
                    <div class="system_row st_color04">
                        <div class="system_col01">
                            <h5 class="system">CPU 사용률</h5>
                            <!--<span class="text_type04">CPU 최대</span>-->
                        </div>
                        <div class="system_col02">
                            <span class="total">{{fep1Cpu}}%</span>
                            <!--<span class="num">90%</span>-->
                        </div>
                    </div>
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row st_color02">
                        <div class="system_col01">
                            <h5 class="system">메모리 사용률</h5>
                            <!--<span class="text_type04">메모리 최대</span>-->
                        </div>
                        <div class="system_col02">
                            <span class="total">{{fep1Mem}}%</span>
                            <!--<span class="num">90%</span>-->
                        </div>
                    </div>
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row st_color03">
                        <div class="system_col01">
                            <h5 class="system">Net Rx</h5>
                            <h5 class="system">Net Tx</h5>
                        </div>
                        <div class="system_col02">
                            <span class="total">{{fep1NetRx}}KB</span>
                            <span class="total">{{fep1NetTx}}KB</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- //system info -->

        <!-- system info -->
        <div class="system_info">
            <span class="title">FEP #2</span>
            <ul class="system_list">
                <li>
                    <!-- system row -->
                    <div class="system_row st_color04">
                        <div class="system_col01">
                            <h5 class="system">CPU 사용률</h5>
                            <!--<span class="text_type04">CPU 최대</span>-->
                        </div>
                        <div class="system_col02">
                            <span class="total">{{fep2Cpu}}%</span>
                            <!--<span class="num">90%</span>-->
                        </div>
                    </div>
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row st_color02">
                        <div class="system_col01">
                            <h5 class="system">메모리 사용률</h5>
                            <!--<span class="text_type04">메모리 최대</span>-->
                        </div>
                        <div class="system_col02">
                            <span class="total">{{fep2Mem}}%</span>
                            <!--<span class="num">90%</span>-->
                        </div>
                    </div>
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row st_color03">
                        <div class="system_col01">
                            <h5 class="system">Net Rx</h5>
                            <h5 class="system">Net Tx</h5>
                        </div>
                        <div class="system_col02">
                            <span class="total">{{fep2NetRx}}KB</span>
                            <span class="total">{{fep2NetTx}}KB</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- //system info -->

        <!-- system info -->
        <div class="system_info">
            <span class="title">FEP #3</span>
            <ul class="system_list">
                <li>
                    <!-- system row -->
                    <div class="system_row st_color04">
                        <div class="system_col01">
                            <h5 class="system">CPU 사용률</h5>
                            <!--<span class="text_type04">CPU 최대</span>-->
                        </div>
                        <div class="system_col02">
                            <span class="total">{{fep3Cpu}}%</span>
                            <!--<span class="num">90%</span>-->
                        </div>
                    </div>
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row st_color02">
                        <div class="system_col01">
                            <h5 class="system">메모리 사용률</h5>
                            <!--<span class="text_type04">메모리 최대</span>-->
                        </div>
                        <div class="system_col02">
                            <span class="total">{{fep3Mem}}%</span>
                            <!--<span class="num">90%</span>-->
                        </div>
                    </div>
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row st_color03">
                        <div class="system_col01">
                            <h5 class="system">Net Rx</h5>
                            <h5 class="system">Net Tx</h5>
                        </div>
                        <div class="system_col02">
                            <span class="total">{{fep3NetRx}}KB</span>
                            <span class="total">{{fep3NetTx}}KB</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- //system info -->
    </div>

    <!-- 2번쨰 줄 -->
    <!-- system box -->
    <div class="system_box w100">
        <!-- system info -->
        <div class="system_info">
            <span class="title">WAS #1</span>
            <ul class="system_list">
                <li>
                    <!-- system row -->
                    <div class="system_row st_color04">
                        <div class="system_col01">
                            <h5 class="system">CPU 사용률</h5>
                            <!--<span class="text_type04">CPU 최대</span>-->
                        </div>
                        <div class="system_col02">
                            <span class="total">{{was1Cpu}}%</span>
                            <!--<span class="num">90%</span>-->
                        </div>
                    </div>
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row st_color02">
                        <div class="system_col01">
                            <h5 class="system">메모리 사용률</h5>
                            <!--<span class="text_type04">메모리 최대</span>-->
                        </div>
                        <div class="system_col02">
                            <span class="total">{{was1Mem}}%</span>
                            <!--<span class="num">90%</span>-->
                        </div>
                    </div>
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row st_color03">
                        <div class="system_col01">
                            <h5 class="system">Net Rx</h5>
                            <h5 class="system">Net Tx</h5>
                        </div>
                        <div class="system_col02">
                            <span class="total">{{was1NetRx}}KB</span>
                            <span class="total">{{was1NetTx}}KB</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- //system info -->

        <!-- system info -->
        <div class="system_info">
            <span class="title">WAS #2</span>
            <ul class="system_list">
                <li>
                    <!-- system row -->
                    <div class="system_row st_color04">
                        <div class="system_col01">
                            <h5 class="system">CPU 사용률</h5>
                            <!--<span class="text_type04">CPU 최대</span>-->
                        </div>
                        <div class="system_col02">
                            <span class="total">{{was2Cpu}}%</span>
                            <!--<span class="num">90%</span>-->
                        </div>
                    </div>
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row st_color02">
                        <div class="system_col01">
                            <h5 class="system">메모리 사용률</h5>
                            <!--<span class="text_type04">메모리 최대</span>-->
                        </div>
                        <div class="system_col02">
                            <span class="total">{{was2Mem}}%</span>
                            <!--<span class="num">90%</span>-->
                        </div>
                    </div>
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row st_color03">
                        <div class="system_col01">
                            <h5 class="system">Net Rx</h5>
                            <h5 class="system">Net Tx</h5>
                        </div>
                        <div class="system_col02">
                            <span class="total">{{was2NetRx}}KB</span>
                            <span class="total">{{was2NetTx}}KB</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- //system info -->

        <!-- system info -->
        <div class="system_info">
            <span class="title">WEB #1</span>
            <ul class="system_list">
                <li>
                    <!-- system row -->
                    <div class="system_row st_color04">
                        <div class="system_col01">
                            <h5 class="system">CPU 사용률</h5>
                            <!--<span class="text_type04">CPU 최대</span>-->
                        </div>
                        <div class="system_col02">
                            <span class="total">{{web1Cpu}}%</span>
                            <!--<span class="num">90%</span>-->
                        </div>
                    </div>
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row st_color02">
                        <div class="system_col01">
                            <h5 class="system">메모리 사용률</h5>
                            <!--<span class="text_type04">메모리 최대</span>-->
                        </div>
                        <div class="system_col02">
                            <span class="total">{{web1Mem}}%</span>
                            <!--<span class="num">90%</span>-->
                        </div>
                    </div>
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row st_color03">
                        <div class="system_col01">
                            <h5 class="system">Net Rx</h5>
                            <h5 class="system">Net Tx</h5>
                        </div>
                        <div class="system_col02">
                            <span class="total">{{web1NetRx}}KB</span>
                            <span class="total">{{web1NetTx}}KB</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- //system info -->
    </div>

    <!-- 3번쨰 줄 -->
    <!-- system box -->
    <div class="system_box w100">
        <!-- system info -->
        <div class="system_info">
            <span class="title">WEB #2</span>
            <ul class="system_list">
                <li>
                    <!-- system row -->
                    <div class="system_row st_color04">
                        <div class="system_col01">
                            <h5 class="system">CPU 사용률</h5>
                            <!--<span class="text_type04">CPU 최대</span>-->
                        </div>
                        <div class="system_col02">
                            <span class="total">{{web2Cpu}}%</span>
                            <!--<span class="num">90%</span>-->
                        </div>
                    </div>
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row st_color02">
                        <div class="system_col01">
                            <h5 class="system">메모리 사용률</h5>
                            <!--<span class="text_type04">메모리 최대</span>-->
                        </div>
                        <div class="system_col02">
                            <span class="total">{{web2Mem}}%</span>
                            <!--<span class="num">90%</span>-->
                        </div>
                    </div>
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row st_color03">
                        <div class="system_col01">
                            <h5 class="system">Net Rx</h5>
                            <h5 class="system">Net Tx</h5>
                        </div>
                        <div class="system_col02">
                            <span class="total">{{web2NetRx}}KB</span>
                            <span class="total">{{web2NetTx}}KB</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- //system info -->

        <!-- system info -->
        <div class="system_info">
            <span class="title">APP #1</span>
            <ul class="system_list">
                <li>
                    <!-- system row -->
                    <div class="system_row st_color04">
                        <div class="system_col01">
                            <h5 class="system">CPU 사용률</h5>
                            <!--<span class="text_type04">CPU 최대</span>-->
                        </div>
                        <div class="system_col02">
                            <span class="total">{{app1Cpu}}%</span>
                            <!--<span class="num">90%</span>-->
                        </div>
                    </div>
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row st_color02">
                        <div class="system_col01">
                            <h5 class="system">메모리 사용률</h5>
                            <!--<span class="text_type04">메모리 최대</span>-->
                        </div>
                        <div class="system_col02">
                            <span class="total">{{app1Mem}}%</span>
                            <!--<span class="num">90%</span>-->
                        </div>
                    </div>
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row st_color03">
                        <div class="system_col01">
                            <h5 class="system">&nbsp;</h5>
                            <h5 class="system">Net Tx</h5>
                        </div>
                        <div class="system_col02">
                            <span class="total">&nbsp;</span>
                            <span class="total">{{app1NetTx}}KB</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- //system info -->

        <!-- system info -->
        <div class="system_info">
            <span class="title">APP #2</span>
            <ul class="system_list">
                <li>
                    <!-- system row -->
                    <div class="system_row st_color04">
                        <div class="system_col01">
                            <h5 class="system">CPU 사용률</h5>
                            <!--<span class="text_type04">CPU 최대</span>-->
                        </div>
                        <div class="system_col02">
                            <span class="total">{{app2Cpu}}%</span>
                            <!--<span class="num">90%</span>-->
                        </div>
                    </div>
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row st_color02">
                        <div class="system_col01">
                            <h5 class="system">메모리 사용률</h5>
                            <!--<span class="text_type04">메모리 최대</span>-->
                        </div>
                        <div class="system_col02">
                            <span class="total">{{app2Mem}}%</span>
                            <!--<span class="num">90%</span>-->
                        </div>
                    </div>
                </li>
                <li>
                    <!-- system row -->
                    <div class="system_row st_color03">
                        <div class="system_col01">
                            <h5 class="system">&nbsp;</h5>
                            <h5 class="system">Net Tx</h5>
                        </div>
                        <div class="system_col02">
                            <span class="total">&nbsp;</span>
                            <span class="total">{{app2NetTx}}KB</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- //system info -->
    </div>

</div>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from "vue-property-decorator";
    import {CommonBoardService} from "../../../api/common.service";

    @Component({
        components: {
            ResourceSystem
        }
    })
    export default class ResourceSystem extends Vue {

        @Prop() resourceGbn !: any;

        fep1Cpu : any = '0';
        fep1Mem : any = '0';
        fep1NetTx : any = '0';
        fep1NetRx : any = '0';

        fep2Cpu : any = '0';
        fep2Mem : any = '0';
        fep2NetTx : any = '0';
        fep2NetRx : any = '0';

        fep3Cpu : any = '0';
        fep3Mem : any = '0';
        fep3NetTx : any = '0';
        fep3NetRx : any = '0';

        was1Cpu : any = '0';
        was1Mem : any = '0';
        was1NetTx : any = '0';
        was1NetRx : any = '0';

        was2Cpu : any = '0';
        was2Mem : any = '0';
        was2NetTx : any = '0';
        was2NetRx : any = '0';

        web1Cpu : any = '0';
        web1Mem : any = '0';
        web1NetTx : any = '0';
        web1NetRx : any = '0';

        web2Cpu : any = '0';
        web2Mem : any = '0';
        web2NetTx : any = '0';
        web2NetRx : any = '0';

        app1Cpu : any = '0';
        app1Mem : any = '0';
        app1NetTx : any = '0';

        app2Cpu : any = '0';
        app2Mem : any = '0';
        app2NetTx : any = '0';

        interval:any = '';

        created(){

            this.interval = setInterval(this.systemResourceApi, 5000);
        }

        mounted(){

            this.systemResourceApi();

        }

        systemResourceApi(){

            if(this.resourceGbn){

                CommonBoardService.getListDatas('monitoring/performance', null, null).then(result=>{
                    if(result.status==200){

                        for(let i=0; i<result.data.length; i++){

                            if(result.data[i] != null){

                                if(result.data[i].objName == '/CASH-FEP1'){

                                    if(result.data[i].type == 'Cpu'){
                                        this.fep1Cpu = result.data[i].value;
                                    }else if(result.data[i].type == 'Mem'){
                                        this.fep1Mem = result.data[i].value;
                                    }else if(result.data[i].type == 'NetRxBytes'){
                                        this.fep1NetRx = Math.floor(result.data[i].value/1024);
                                    }else if(result.data[i].type == 'NetTxBytes'){
                                        this.fep1NetTx = Math.floor(result.data[i].value/1024);
                                    }

                                }else if(result.data[i].objName == '/CASH-FEP2'){

                                    if(result.data[i].type == 'Cpu'){
                                        this.fep2Cpu = result.data[i].value;
                                    }else if(result.data[i].type == 'Mem'){
                                        this.fep2Mem = result.data[i].value;
                                    }else if(result.data[i].type == 'NetRxBytes'){
                                        this.fep2NetRx = Math.floor(result.data[i].value/1024);
                                    }else if(result.data[i].type == 'NetTxBytes'){
                                        this.fep2NetTx = Math.floor(result.data[i].value/1024);
                                    }

                                }else if(result.data[i].objName == '/CASH-FEP3'){

                                    if(result.data[i].type == 'Cpu'){
                                        this.fep3Cpu = result.data[i].value;
                                    }else if(result.data[i].type == 'Mem'){
                                        this.fep3Mem = result.data[i].value;
                                    }else if(result.data[i].type == 'NetRxBytes'){
                                        this.fep3NetRx = Math.floor(result.data[i].value/1024);
                                    }else if(result.data[i].type == 'NetTxBytes'){
                                        this.fep3NetTx = Math.floor(result.data[i].value/1024);
                                    }

                                }else if(result.data[i].objName == '/CASH-WAS1'){

                                    if(result.data[i].type == 'Cpu'){
                                        this.was1Cpu = result.data[i].value;
                                    }else if(result.data[i].type == 'Mem'){
                                        this.was1Mem = result.data[i].value;
                                    }else if(result.data[i].type == 'NetRxBytes'){
                                        this.was1NetRx = Math.floor(result.data[i].value/1024);
                                    }else if(result.data[i].type == 'NetTxBytes'){
                                        this.was1NetTx = Math.floor(result.data[i].value/1024);
                                    }

                                }else if(result.data[i].objName == '/CASH-WAS2'){

                                    if(result.data[i].type == 'Cpu'){
                                        this.was2Cpu = result.data[i].value;
                                    }else if(result.data[i].type == 'Mem'){
                                        this.was2Mem = result.data[i].value;
                                    }else if(result.data[i].type == 'NetRxBytes'){
                                        this.was2NetRx = Math.floor(result.data[i].value/1024);
                                    }else if(result.data[i].type == 'NetTxBytes'){
                                        this.was2NetTx = Math.floor(result.data[i].value/1024);
                                    }

                                }else if(result.data[i].objName == '/CASH-WEB1'){

                                    if(result.data[i].type == 'Cpu'){
                                        this.web1Cpu = result.data[i].value;
                                    }else if(result.data[i].type == 'Mem'){
                                        this.web1Mem = result.data[i].value;
                                    }else if(result.data[i].type == 'NetRxBytes'){
                                        this.web1NetRx = Math.floor(result.data[i].value/1024);
                                    }else if(result.data[i].type == 'NetTxBytes'){
                                        this.web1NetTx = Math.floor(result.data[i].value/1024);
                                    }

                                }else if(result.data[i].objName == '/CASH-WEB2'){

                                    if(result.data[i].type == 'Cpu'){
                                        this.web2Cpu = result.data[i].value;
                                    }else if(result.data[i].type == 'Mem'){
                                        this.web2Mem = result.data[i].value;
                                    }else if(result.data[i].type == 'NetRxBytes'){
                                        this.web2NetRx = Math.floor(result.data[i].value/1024);
                                    }else if(result.data[i].type == 'NetTxBytes'){
                                        this.web2NetTx = Math.floor(result.data[i].value/1024);
                                    }

                                }else if(result.data[i].objName == '/new-app1'){

                                    if(result.data[i].type == 'Cpu'){
                                        this.app1Cpu = result.data[i].value;
                                    }else if(result.data[i].type == 'Mem'){
                                        this.app1Mem = result.data[i].value;
                                    }else if(result.data[i].type == 'NetTxBytes'){
                                        this.app1NetTx = Math.floor(result.data[i].value/1024);
                                    }

                                }else if(result.data[i].objName == '/new-app2'){

                                    if(result.data[i].type == 'Cpu'){
                                        this.app2Cpu = result.data[i].value;
                                    }else if(result.data[i].type == 'Mem'){
                                        this.app2Mem = result.data[i].value;
                                    }else if(result.data[i].type == 'NetTxBytes'){
                                        this.app2NetTx = Math.floor(result.data[i].value/1024);
                                    }

                                }

                            }

                        }

                    }
                })

            }

        }

        destroyed(){
            clearInterval(this.interval);
        }

    }
</script>

<style scoped>

</style>