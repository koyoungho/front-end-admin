<template>
    <div>
        <div class="popup_modal"></div>
        <div id="popup_cash01" class="popup_wrapper5 large5 Pstyle5" tabindex="0" style="display: block;">
            <!-- popup header -->
            <div class="popup_header no_print">
                <!-- h2 -->
                <h2>현금영수증</h2>
                <a class="btn_close b-close" @click="closeAddr">Close</a>
            </div>

            <!-- popup body -->
            <div class="popup_body"  >
                <!-- popup content -->
                <div class="popup_content page_cash01">
                    <!-- tbl grid wrap -->
                    <div class="tbl_grid_wrap">
                        <!-- tbl grid01 -->
                        <table class="tbl_grid01 print_area2">
                            <caption>현금영수증</caption>
                            <colgroup>
                                <col class="col_mob" width="50%">
                                <col class="col_mob" width="50%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th scope="col" colspan="2"> 현금영수증 (고객용) {{titleSub}}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="left">
                                    <!-- tbl view02 -->
                                    <table class="tbl_view02">
                                        <caption>현금영수증</caption>
                                        <colgroup>
                                            <col class="col_mob" width="100%">
                                        </colgroup>
                                        <tbody>
                                        <tr>
                                            <th scope="row">신분확인번호</th>
                                        </tr>
                                        <tr>
                                            <td>{{ResultViewRowItem.comfirm}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">거래구분</th>
                                        </tr>
                                        <tr>
                                            <td>{{ResultViewRowItem.geoguNm}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">승인번호</th>
                                        </tr>
                                        <tr>
                                            <td>{{ResultViewRowItem.perm}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">사업자명</th>
                                        </tr>
                                        <tr>
                                            <td>{{ResultViewRowItem.shopNm}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">대표자명</th>
                                        </tr>
                                        <tr>
                                            <td>{{ResultViewRowItem.chipNm}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td class="right">
                                    <table class="tbl_view02">
                                        <caption>현금영수증</caption>
                                        <colgroup>
                                            <col class="col_mob" width="35%">
                                            <col class="col_mob" width="65%">
                                        </colgroup>
                                        <tbody>
                                        <tr>
                                            <th scope="row" colspan="2">거래일시</th>
                                        </tr>
                                        <tr>
                                            <td colspan="2">{{moment(ResultViewRowItem.saleDate,'YYYYMMDDHHmmss').format("YYYY.MM.DD HH:mm:ss")}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" class="bg01">공급가액</th>
                                            <td class="right">{{ amtComma(ResultViewRowItem.amt)}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" class="bg01">부가세</th>
                                            <td class="right">{{ amtComma(ResultViewRowItem.vat)}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" class="bg01">봉사료</th>
                                            <td class="right">{{ amtComma(ResultViewRowItem.bong)}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" class="bg01">합계</th>
                                            <td class="right">{{ amtComma(ResultViewRowItem.totamt)}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" colspan="2">사업자등록번호</th>
                                        </tr>
                                        <tr>
                                            <td colspan="2">{{saupnoFormat(ResultViewRowItem.saupId)}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" colspan="2">사업장전화번호</th>
                                        </tr>
                                        <tr>
                                            <td colspan="2">{{ResultViewRowItem.charTel}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col" colspan="2">사업장 주소</th>
                            </tr>
                            <tr>
                                <td colspan="2" class="con01">{{ResultViewRowItem.saupCaddr}}</td>
                            </tr>
                            <tr>
                                <td colspan="2" class="con01">
                                    <span class="text01">현금영수증 문의 ☎ 126-1-1</span>
                                    <span class="text01">국세청 홈택스 : <a href="http://www.hometax.go.kr" target="_blank" title="새창열기" class="link02">www.hometax.go.kr</a></span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <!-- //tbl grid01 -->
                        <!-- receipt info -->
                        <div class="receipt_info no_print">
                            <ul class="receipt">
                                <li v-if="ResultViewRowItem.canSayuNm"><span class="sub">취소사유 : </span> {{ResultViewRowItem.canSayuNm}}</li>
                            </ul>
                        </div>

                        <!-- mail info box -->
                        <div class="mail_info_box no_print">
                            <input type="text" class="input form_mailid" title="아이디 입력" v-model="mailId"> @
                            <input type="text" class="input form_mailcom" title="회사 입력" v-model="mailCompany">
                        </div>
                    </div>

                </div>
                <!-- //popup content -->
                <!-- bottom area -->
                <div class="bottom_area no_print">
                    <!-- btn -->
                    <div class="btn_bot">
                        <button type="button" class="btn_b01 bg02" @click="closeAddr">취소</button>
                        <button type="button" class="btn_b01 bg03" @click="sendMail">메일로 전송</button>
                        <button type="button" class="btn_b01 bg01" @click="printReceip">영수증 출력</button>
                    </div>
                </div>

            </div>
            <!-- //popup body -->
        </div>
        <!-- //popup -->
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';
    import moment from 'moment'
    Vue.prototype.moment = moment;
    import {environment} from '@/utill/environment';


    @Component({
        components: {
            ReceipConfirm
        }
    })
    export default class ReceipConfirm extends Vue {
        @Prop() resultRecripKey !:string;
        ResultViewRowItem : any = "";
        mailCompany : any = "";
        mailId : any = "";
        resultRecripKeyObj : any ="";
        titleSub : string ="";
        titleMail : string ="";
        originId : any = "header2";
        nowTime : string ="";

        created(){
            this.makeHeader('hide');
            this.getNow();

        }
        //돔렌더링완료시 진행
        mounted() {
            this.getNow();
        }

        @Watch('resultRecripKey') onchange(){
            if(this.resultRecripKey){
                this.getNow();
                this.onLoadData();
            }
        }
        closeAddrPop(){
            this.$emit('close');
        }

        closeAddr(){
            this.makeHeader('show')
        }
        onLoadData(){
            this.resultRecripKeyObj = this.resultRecripKey;

            if( this.resultRecripKeyObj.trgu == '1' ){
                this.titleSub =" - 현금결제취소";
                this.titleMail = " - 취소"
            }else{
                this.titleSub="";
                this.titleMail = ""
            }

            CommonBoardService.getListDatas('receipt', this.resultRecripKeyObj.regiDate+'/'+this.resultRecripKeyObj.perm , null).then((response) => {
                this.ResultViewRowItem = response.data


            }).catch();
        }
        makeHeader(val){
            if(val=='hide'){
                // let documentHeader: any = document.getElementById('header');
                // documentHeader.attributes.item(0).value = this.originId;
            }
            else{
                // let documentHeader: any = document.getElementById('header2');
                // this.originId = 'header';
                // documentHeader.attributes.item(0).value = this.originId;
                this.$emit('close');
            }


        }

        /**
         * 현재시간 가져오기
         */
        getNow(){

            CommonBoardService.getListDatas('time', null, null).then((response) => {
                    this.nowTime =response.data.time;

                    return   this.nowTime;
                }, (error) => {
                    //this.$Progress.finish();
                }
            ).catch();
        }

        sendMail() { //메일 발송

            if(this.mailId == ''){
                Vue.swal({text: '이메일 주소를 입력하세요.'});
                return;
            }else if(this.mailCompany == ''){
                Vue.swal({text: '이메일 주소를 입력하세요.'});
                return;
            }

            let mailAddress: string = this.mailId + '@' + this.mailCompany;
            if ( ! this.email_check(mailAddress) ) {
                Vue.swal({text: '입력하신 메일 주소가 올바르지 않습니다.\n메일 주소를 확인하세요.'});
                return;
            }

            //if(this.nowTime != '' && this.nowTime != undefined) {
            //let today = moment(this.nowTime, 'YYYYMMDDHHmmss').format('YYYY.MM.DD HH:mm:ss');
            let imgsrc = environment.imgApiUrl+"/img/img_logo.07141310.png"; //로고

            let mailMessage: string = ''; //메일 메시지 내용
            mailMessage = "<html lang='ko'>\n" +
                "<head>\n" +
                "\t<meta charset=\"utf-8\">\n" +
                "</head>\n" +
                "<body>\n" +
                "<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;background-color:#f0f0f0;letter-spacing:0px\">\n" +
                "\t<tbody><tr><td align=\"center\">\n" +
                "\t\t<div style=\"max-width:720px; margin:0 auto\">\n" +
                "\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;margin:40px auto;background-color:#fff; border:1px solid #dedede; border-top:2px solid #da291c; -webkit-text-size-adjust:100%;text-align:left\">\n" +
                "\t\t\t\t<tbody><tr><td width=\"30\"></td><td>\n" +
                "\t\t\t\t\t<table cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;margin:30px auto 0;background-color:#fff;-webkit-text-size-adjust:100%;text-align:left\">\n" +
                "\t\t\t\t\t\t<tbody><tr>\n" +
                "\t\t\t\t\t\t\t<td><a href=\"\" target=\"_blank\"><img src="+imgsrc+" width=\"238\" height=\"28\" alt=\"케이티/롯데정보통신 현금영수증\" style=\"border:0;margin-right:5px;\"></a></td>\n" +
                "\t\t\t\t\t\t\t<td style=\"padding-top:10px; text-align:right; padding-right:0px;padding-bottom:18px;font-size:13px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393;line-height:17px\"></td>\n" +
                "\t\t\t\t\t\t\t<td style=\"width:100px;text-align: right; padding-bottom:13px;font-size:20px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#212121;line-height:17px;font-weight: bold;\"></td>\n" +
                "\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t</tbody>\n" +
                "\t\t\t\t\t</table>\n" +
                "\t\t\t\t</td><td width=\"30\"></td></tr>\n" +
                "\t\t\t\t<tr><td colspan=\"3\" height=\"40\"></td></tr>\n" +
                "\t\t\t\t<tr><td width=\"30\"></td><td>\n" +
                "\t\t\t\t\t<div class=\"tbl_grid_wrap\">\n" +
                "\t\t\t\t\t\t<table class=\"tbl_grid01\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:584px; border-top:1px solid #dedede; margin:0 auto; border-left:1px solid #dedede; border-right:1px solid #dedede;\">\n" +
                "\t\t\t\t\t\t\t<colgroup>\n" +
                "\t\t\t\t\t\t\t\t<col width=\"50%\">\n" +
                "\t\t\t\t\t\t\t\t<col width=\"50%\">\n" +
                "\t\t\t\t\t\t\t</colgroup>\n" +
                "\t\t\t\t\t\t\t<thead>\n" +
                "\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t<th scope=\"col\" colspan=\"2\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:16px; color:#212121; padding:15px 20px 15px 20px; border-right:0px solid #dedede;border-bottom:1px solid #dedede;background:#f2f2f2; text-align: left\">현금영수증 (고객용) "+this.titleMail+"</th>\n" +
                "\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t</thead>\n" +
                "\t\t\t\t\t\t\t<tbody>\n" +
                "\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t<td style=\"color:#505050; font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; padding-left:0px; border-bottom:1px solid #dedede; background:#f7f7f7; text-align: left; vertical-align:top\">\n" +
                "\t\t\t\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"tbl_view02\" style=\"width:100%; border-top:0;\">\n" +
                "\t\t\t\t\t\t\t\t\t\t<colgroup>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<col width=\"100%\">\n" +
                "\t\t\t\t\t\t\t\t\t\t</colgroup>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tbody>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; color:#505050; height:50px; line-height: 50px; padding:0 18px 0 20px; border-right:1px solid #dedede; background:#fafafa; border-bottom:1px solid #dedede; text-align:left; vertical-align:top;\">신분확인번호</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#212121; height:50px; line-height: 50px; padding:0 18px 0 20px; border-right:1px solid #dedede; background:#ffffff; border-bottom:1px solid #dedede; text-align:left; word-wrap:break-word;\">" + this.ResultViewRowItem.comfirm + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; color:#505050; height:50px; line-height: 50px; padding:0 18px 0 20px; border-right:1px solid #dedede; border-bottom:1px solid #dedede; background:#fafafa; text-align:left; vertical-align:top;\">거래구분</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#212121; height:50px; line-height: 50px; padding:0 18px 0 20px; border-right:1px solid #dedede; background:#ffffff; border-bottom:1px solid #dedede; text-align:left; word-wrap:break-word;\">" + this.ResultViewRowItem.geoguNm + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; color:#505050; background:#fafafa; height:50px; line-height: 50px; padding:0 18px 0 20px; border-right:1px solid #dedede; background:#fafafa; border-bottom:1px solid #dedede; text-align:left; vertical-align:top;\">승인번호</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#212121; height:50px; line-height: 50px; padding:0 18px 0 20px; background:#ffffff; border-right:1px solid #dedede; border-bottom:1px solid #dedede; text-align:left; word-wrap:break-word;\">" + this.ResultViewRowItem.perm + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; color:#505050; height:50px; line-height: 50px; padding:0 18px 0 20px; background:#fafafa; border-right:1px solid #dedede; border-bottom:1px solid #dedede; background:#fafafa; text-align:left; vertical-align:top;\">사업자명</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; height:50px; line-height: 50px; padding:0 18px 0 20px; background:#ffffff; border-right:1px solid #dedede; border-bottom:1px solid #dedede;  text-align:left; word-wrap:break-word;\">" + this.ResultViewRowItem.shopNm + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; color:#505050;  background:#fafafa; height:50px; line-height: 50px; padding:0 18px 0 20px; background:#fafafa; border-right:1px solid #dedede; border-bottom:1px solid #dedede; text-align:left; vertical-align:top;\">대표자명</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; height:50px; line-height: 50px; padding:0 18px 0 20px; background:#ffffff; border-right:1px solid #dedede; border-bottom:0px solid #dedede; text-align:left; word-wrap:break-word;\">" + this.ResultViewRowItem.chipNm + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tbody>\n" +
                "\t\t\t\t\t\t\t\t\t</table>\n" +
                "\t\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t\t\t<td style=\"text-align: right; vertical-align:top;\">\n" +
                "\t\t\t\t\t\t\t\t\t<table class=\"tbl_view02\" style=\"width:100%;\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" >\n" +
                "\t\t\t\t\t\t\t\t\t\t<colgroup>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<col width=\"35%\">\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<col width=\"65%\">\n" +
                "\t\t\t\t\t\t\t\t\t\t</colgroup>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tbody>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" colspan=\"2\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; color:#505050; height:50px; line-height: 50px; padding:0 18px 0 20px; border-right:0px solid #dedede; background:#fafafa; border-bottom:1px solid #dedede; text-align:left; vertical-align:top;\">거래일시</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"2\" style=\"width:65%; font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; color:#212121; height:50px; line-height: 50px; padding:0 18px 0 20px; border-right:0px solid #dedede; border-bottom:1px solid #dedede; text-align:left; word-wrap:break-word;\">" + moment(this.ResultViewRowItem.saleDate, 'YYYYMMDDHHmmss').format("YYYY.MM.DD HH:mm:ss") + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" class=\"bg01\" style=\"color:#505050; font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size: 14px; height:50px; line-height: 50px; padding:0 18px 0 20px; border-bottom:1px solid #dedede; background:#ffffff; text-align: center;\">공급가액</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td class=\"right\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#212121; height:50px; line-height: 50px; padding:0 18px 0 20px; text-align:right;  border-left:1px solid #dedede;border-right:0px solid #dedede; border-bottom:1px solid #dedede; word-wrap:break-word;\">" + this.amtComma(this.ResultViewRowItem.amt) + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" class=\"bg01\" style=\"height:50px; color:#505050; font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size: 14px; height:50px; line-height: 50px; padding:0 18px 0 20px; border-bottom:1px solid #dedede; background:#ffffff; text-align: center;\">부가세</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td class=\"right\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#212121; padding:16px 20px 16px 20px; text-align:right;  border-left:1px solid #dedede;border-right:0px solid #dedede; border-bottom:1px solid #dedede; word-wrap:break-word;\">" + this.amtComma(this.ResultViewRowItem.vat)+ "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" class=\"bg01\" style=\"color:#505050; font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; height:50px; line-height: 50px; padding:0 18px 0 20px; border-bottom:1px solid #dedede; background:#ffffff; text-align: center;\">봉사료</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td class=\"right\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#212121; padding:16px 20px 16px 20px; text-align:right;  border-left:1px solid #dedede;border-right:0px solid #dedede; border-bottom:1px solid #dedede; word-wrap:break-word;\">" + this.amtComma(this.ResultViewRowItem.bong) + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" class=\"bg01\" style=\"color:#505050; font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; height:50px; line-height: 50px; padding:0 18px 0 20px; border-bottom:1px solid #dedede; background:#ffffff; text-align: center;\">합계</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td class=\"right\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#212121; height:50px; line-height: 50px; padding:0 18px 0 20px; text-align:right;  border-left:1px solid #dedede;border-right:0px solid #dedede; border-bottom:1px solid #dedede; word-wrap:break-word;\">" + this.amtComma(this.ResultViewRowItem.totamt) + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" colspan=\"2\" style=\"color:#505050; font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size: 14px; height:50px; line-height: 50px; padding:0 18px 0 20px; border-bottom:1px solid #dedede; background:#fafafa; text-align: left;\">사업자등록번호</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"2\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#212121; height:50px; line-height: 50px; padding:0 18px 0 20px; border-right:0px solid #dedede; border-bottom:1px solid #dedede; text-align:left; word-wrap:break-word;\">" + this.saupnoFormat(this.ResultViewRowItem.saupId) + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" colspan=\"2\" style=\"color:#505050; font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size: 14px; height:50px; line-height: 50px; padding:0 18px 0 20px; border-bottom:1px solid #dedede; background:#fafafa; text-align: left;\">사업장전화번호</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"2\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#212121; height:50px; line-height: 50px; padding:0 18px 0 20px; border-right:0px solid #dedede; border-bottom:1px solid #dedede; text-align:left; word-wrap:break-word;\">" + this.nullCheck(this.ResultViewRowItem.charTel) + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tbody>\n" +
                "\t\t\t\t\t\t\t\t\t</table>\n" +
                "\t\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t<th scope=\"col\" colspan=\"2\" style=\"height:50px; color:#505050;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; padding-left:20px; border-bottom:1px solid #dedede; background:#f7f7f7; text-align: left;\">사업장 주소</th>\n" +
                "\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t<td colspan=\"2\" class=\"con01\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; height:50px; border-bottom:1px solid #dedede; vertical-align: top; padding:15px 20px 15px 20px; line-height:20px;\">" + this.nullCheck(this.ResultViewRowItem.saupCaddr) + "</td>\n" +
                "\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t<td colspan=\"2\" class=\"con01\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; height:50px; border-bottom:1px solid #dedede; vertical-align: top;padding:15px 20px 15px 20px; line-height:20px;\">\n" +
                "\t\t\t\t\t\t\t\t\t<span class=\"text01\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; display:block; padding:5px 0; color:#212121;\">현금영수증 문의 <a href=\"#\" style=\"text-decoration:none;color:#555;\"> ☎ 126-1-1</a></span>\n" +
                "\t\t\t\t\t\t\t\t\t<span class=\"text01\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; display:block; padding:5px 0;\">국세청 홈택스 : <a href=\"http://www.hometax.go.kr\" target=\"_blank\" title=\"새창열기\" class=\"link02\" style=\"color:#008aff; font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; text-decoration:underline;\">www.hometax.go.kr</a></span>\n" +
                "\t\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t</tbody>\n" +
                "\t\t\t\t\t\t</table>\n" +
                "\t\t\t\t\t</div>\n" +
                "\t\t\t\t</td>\n" +
                "\t\t\t\t\t<td width=\"30\"></td></tr>\n" +
                "\t\t\t\t<tr><td colspan=\"3\" height=\"40\"></td></tr>\n" +
                "\t\t\t\t<tr><td colspan=\"3\" style=\"border-top:1px solid #dedede; padding-top:34px;padding-left:21px;padding-right:21px;padding-bottom:13px;background:#ffffff;font-size:12px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393;line-height:22px\">\n" +
                "\t\t\t\t\t발신전용 메일입니다. 궁금하신 사항은 현금영수증 고객센터로 연락 주시면 성심 성의껏 상담해드리겠습니다.<br>타인이 회원님의 이메일을 잘못 입력한 경우 메일이 발송될 수 있습니다.<br>잘못 수신된 메일이라면 현금영수증 고객센터 02-2674-0340 를 이용해주시기 바랍니다.\n" +
                "\t\t\t\t</td></tr>\n" +
                "\t\t\t\t<tr><td colspan=\"3\" style=\"padding-left:21px;padding-right:21px;padding-bottom:37px;background:#ffffff;font-size:12px;font-family:Helvetica;color:#939393;line-height:17px\">\n" +
                "\t\t\t\t\tCopyright ⓒ 2019 KT corporation & LDCC. All rights reserved.\n" +
                "\t\t\t\t</td></tr>\n" +
                "\t\t\t\t</tbody></table>\n" +
                "\t\t</div>\n" +
                "\t</td></tr>\n" +
                "\t</tbody></table>\n" +
                "</body>\n" +
                "</html>\n";


                        let reqData: any = {};
                        reqData['to'] = [mailAddress]; //메일 수신자
                        reqData['title'] = '현금영수증 발급' +this.titleMail; //메일 제목
                        reqData['message'] = mailMessage; //메일 내용
                        reqData['cc'] = [''];
                        // <img src="images/mail/img_tel01.png" width="16" height="16" alt="케이티/롯데정보통신 현금영수증" style="vertical-align: middle; border:0;margin-right:5px;">

                        // api 데이터 호출
                        CommonBoardService.postListDatas('mail', null, reqData).then((response) => {
                                if (response.status.toString() == '201') { //메일 전송 완료
                                    Vue.swal({text: '메일이 발송되었습니다'});
                                    // 현금영수증 발급 완료 화면 이동
                                    // this.$router.push({name:"cashReceiptIssueView", params:{reqPerm:this.perm}});
                                    this.$router.push({name: "cashReceiptIssueView", params: {reqPerm: this.resultRecripKeyObj.perm, reqDate: this.resultRecripKeyObj.regiDate   }});
                                } else { //메일 전송 실패
                                    Vue.swal({text: '메일이 발송이 실패 되었습니다'});
                                }
                            }
                            , (error) => {
                                //this.$Progress.finish();
                            }
                         ).catch();
                        // }
        }


        //메일 주소 정규표현식 체크
        email_check( email ) {
            var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            return (email != '' && email != 'undefined' && regex.test(email));
        }

        printReceip(){
            window.print();
        }
        updated(){
        }

        nullCheck(val){
            if(val == null || val == ''){
                return '';
            }else{
                return val;
            }
        }

        /**
         * 포맷팅 -
         * ex) -2,000 /
         * @param num
         */
        amtComma(num){
            if(num == null || num == ''){
                return '0';
            }else if(num == 0 || num == '0'){
                return '0';
            }else{
                if(this.resultRecripKeyObj.trgu == '1' &&  num !='0'){
                    return '-'+  Number(num).toLocaleString();
                }else {
                    return Number(num).toLocaleString();
                }
            }
        }

        saupnoFormat(val) {
            return String(val).substring(0, 3) + '-' + String(val).substring(3, 5) + '-' + String(val).substring(5, 10);
        }

    }

</script>