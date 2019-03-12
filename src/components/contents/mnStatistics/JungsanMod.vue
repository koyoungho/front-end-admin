<template>
    <div class="popup_wrapperModal4 biglarge2">
        <div class="popup_header4">
            <!-- h2 -->
            <h2>정산 수정</h2>
            <a class="btn_close b-close" v-on:click="closePop()">Close</a>
        </div>
        <div class="popup_body4">
            <div class="tab_box">
                <ul class="tab01 ">
                    <li style="width:300px" v-on:click="getTemp('none')" v-bind:class="{'on': (showNone == true)}" ><a>일반</a></li>
                    <li style="width:300px" v-on:click="getTemp('store')" v-bind:class="{'on': (showStore == true)}" ><a>편의점</a></li>
                    <div class="tbl_scroll_x_box">
                        <!-- tbl list04 -->
                        <table class="tbl_list04 page_stats03">
                            <caption>현금영수증 사업자별 정산</caption>
                            <colgroup>
                                <col span="17">
                            </colgroup>
                            <thead>
                            <tr class="bg01">
                                <th scope="col" rowspan="3">날짜</th>
                                <th scope="col" colspan="8">승인</th>
                                <th scope="col" colspan="8">취소</th>
                            </tr>
                            <tr class="bg01">
                                <th scope="col" colspan="2">LDCC</th>
                                <th scope="col" colspan="2">KT</th>
                                <th scope="col" colspan="2">LB</th>
                                <th scope="col" colspan="2">KB</th>
                                <th scope="col" colspan="2">LDCC</th>
                                <th scope="col" colspan="2">KT</th>
                                <th scope="col" colspan="2">LB</th>
                                <th scope="col" colspan="2">KB</th>
                            </tr>
                            <tr class="bg01">
                                <th scope="col">온라인</th>
                                <th scope="col">비온라인</th>
                                <th scope="col">온라인</th>
                                <th scope="col">비온라인</th>
                                <th scope="col">온라인</th>
                                <th scope="col">비온라인</th>
                                <th scope="col">온라인</th>
                                <th scope="col">비온라인</th>
                                <th scope="col">온라인</th>
                                <th scope="col">비온라인</th>
                                <th scope="col">온라인</th>
                                <th scope="col">비온라인</th>
                                <th scope="col">온라인</th>
                                <th scope="col">비온라인</th>
                                <th scope="col">온라인</th>
                                <th scope="col">비온라인</th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr>
                                <td class="right">2018-11-01</td>
                                <td class="right"><input type="text" class="input form_price"  ></td>
                                <td class="right"><input type="text" class="input form_price"  ></td>
                                <td class="right"><input type="text" class="input form_price"  ></td>
                                <td class="right"><input type="text" class="input form_price"  ></td>
                                <td class="right"><input type="text" class="input form_price"  ></td>
                                <td class="right"><input type="text" class="input form_price"  ></td>
                                <td class="right"><input type="text" class="input form_price"  ></td>
                                <td class="right"><input type="text" class="input form_price"  ></td>
                                <td class="right"><input type="text" class="input form_price"  ></td>
                                <td class="right"><input type="text" class="input form_price"  ></td>
                                <td class="right"><input type="text" class="input form_price"  ></td>
                                <td class="right"><input type="text" class="input form_price"  ></td>
                                <td class="right"><input type="text" class="input form_price"  ></td>
                                <td class="right"><input type="text" class="input form_price"  ></td>
                                <td class="right"><input type="text" class="input form_price"  ></td>
                                <td class="right"><input type="text" class="input form_price"  ></td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                    <!-- tbl list04 box bot -->
                    <div class="tbl_list04_box bot">
                        <!-- tbl list04 -->
                        <td>
                        <table class="tbl_list04 type02" >
                            <caption>현금영수증 사업자별 정산</caption>
                            <colgroup>
                                <col span="6">
                            </colgroup>
                            <thead>
                            <tr>
                                <th scope="col" rowspan="2" colspan="3" style="width: 300px !important;">구분</th>
                                <th scope="col" style="width: 150px !important;">편의점</th>
                                <th scope="col" style="width: 150px !important;">온라인</th>
                                <th scope="col" style="width: 150px !important;">비온라인</th>
                                <th scope="col" style="width: 150px !important;">합계</th>
                            </tr>
                            <tr>
                                <th scope="col">롯데</th>
                                <th scope="col">KT</th>
                                <th scope="col">비온라인</th>
                                <th scope="col">합계</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row" class="left" >당월정산 ①</th>
                                <th scope="row" class="left" >당월정산 ①</th>
                                <th scope="row" class="left" >당월정산 ①</th>
                                <td class="right"><input type="text" class="input form_price"  title="금액"></td>
                                <td class="right"><input type="text" class="input form_price"  title="금액"></td>
                                <td class="right"><input type="text" class="input form_price" title="금액"></td>
                                <td class="right"><input type="text" class="input form_price"  title="금액"></td>
                                <td class="left"></td>
                            </tr>
                            </tbody>
                        </table>
                        </td>
                        <td>
                            <table class="tbl_list04 type02" >
                                <caption>현금영수증 사업자별 정산</caption>
                                <colgroup>
                                    <col span="6">
                                </colgroup>
                                <thead>
                                <tr>
                                    <th scope="col" style="width: 100px !important;">구분</th>
                                    <th scope="col" style="width: 100px !important;">편의점</th>
                                    <th scope="col" style="width: 100px !important;">온라인</th>
                                    <th scope="col" style="width: 100px !important;">비온라인</th>
                                    <th scope="col" style="width: 100px !important;">합계</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="right"><input type="text" class="input form_price"  title="금액"></td>
                                    <td class="right"><input type="text" class="input form_price"  title="금액"></td>
                                    <td class="right"><input type="text" class="input form_price" title="금액"></td>
                                    <td class="right"><input type="text" class="input form_price"  title="금액"></td>
                                    <td class="left"></td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </div>
                </ul>


            </div>



        </div>
    </div>
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import moment from "moment"
    import {CommonBoardService} from '../../../api/common.service';

    @Component({

        components: {
            JungsanMod
        }
    })
    export default class JungsanMod extends Vue {

        showNone : boolean =false;
        showStore : boolean = false;

        //서치박스
        created(){
            this.showNone = true;
        }

        closePop(){
            this.$emit('close')
        }

        getTemp(data){
            if(data=='none'){
                this.showNone = true;
                this.showStore = false;
            }else{
                this.showNone = false;
                this.showStore = true;
            }
        }
    }
</script>
