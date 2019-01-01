<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">현금영수증관리</h2>

            <h3>전문 오류 체크</h3>

            <h4>전문입력</h4>

            <!-- data check box -->
            <div class="data_check_box">
                <div class="form_sch">
                    <span class="rdo_box">
                        <input type="radio" name="chk" value="realtime" checked="checked" v-model="checkType" id="aa11" ><label for="aa11">실시간 전문</label>
                    </span>
                    <span class="rdo_box">
                        <input type="radio" name="chk" value="local" v-model="checkType" id="aa12"><label for="aa12">로컬 전문</label>
                    </span>
                    <!--<span class="rdo_box"><input type="radio" name="chk" value="2" id="aa13"><label for="aa13">세미로컬 전문</label></span>-->
                </div>
                <div class="form_cont">
                    <textarea cols="" rows="" name="" class="textarea" placeholder="전문을 복사해서 넣으세요." title="입력" v-model="checkString"></textarea>
                    <span class="btn_check_area"><button type="button" id="" class="btn_m01 bg03" v-on:click="chkError">확인</button></span>
                </div>
                <!-- data check list -->
                <ul class="data_check_list">

                    {{listData}}

                    <!--<li>-->
                        <!--<label> {{listData.}} :</label>-->
                        <!--<input type="text" class="input form_data" title="">-->
                    <!--</li>-->
                    <!---->





<!--

                    <li>
                        <label>헤더 :</label>
                        <input type="text" class="input form_data" title="">
                    </li>
                    <li>
                        <label>회사코드 :</label>
                        <input type="text" class="input form_data" title="">
                    </li>
                    <li>
                        <label>승인/취소 :</label>
                        <input type="text" class="input form_data" title="">
                    </li>
                    <li>
                        <label>발행용도 :</label>
                        <input type="text" class="input form_data" title="">
                    </li>

                    -->
                </ul>

            </div>
        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService, CommonListService} from '../../../api/common.service';
    import {environment} from '../../../utill/environment';

    @Component({
        components: {
            ErrorCheck
        },
    })
    export default class ErrorCheck extends Vue {
        message: any = '';
        checkString: string = '';
        checkType: string = "realtime";
        listData:any ="";

        //돔생성전 호출자
        created() {
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        //오류 체크
        chkError(){

            let searchData: any = {};
            searchData['checkString'] =this.checkString;
            searchData['checkType'] =this.checkType;
            // api 데이터 호출
            CommonBoardService.getListDatas('transfer/check', null, searchData).then((response) => {
                console.log(response);

                    if (response.status.toString() == '201' ) { //성공
                        let result: any = response.data;
                        this.listData=result;
                        // let resultstr = result.join(',');
                        // console.log(resultstr);
                    } else { //
                        // alert(response.msg);
                        console.log(response);
                    //
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                }
            ).catch();

        }


    }

</script>