<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">현금영수증 발급</h2>

            <h3>현금영수증 (소득공제)</h3>

            <!-- tbl grid wrap -->
            <div class="tbl_grid_wrap">
                <!-- tbl grid01 -->
                <table class="tbl_grid01">
                    <caption>현금영수증</caption>
                    <colgroup>
                        <col class="col_mob" width="50%">
                        <col class="col_mob" width="50%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col" colspan="2">현금영수증 (고객용)</th>
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
                                    <td>{{comfirm}}</td>
                                </tr>
                                <tr>
                                    <th scope="row">거래구분</th>
                                </tr>
                                <tr>
                                    <td>{{geoguNm}}</td>
                                </tr>
                                <tr>
                                    <th scope="row">승인번호</th>
                                </tr>
                                <tr>
                                    <td>{{perm}}</td>
                                </tr>
                                <tr>
                                    <th scope="row">사업자명</th>
                                </tr>
                                <tr>
                                    <td>{{shopNm}}</td>
                                </tr>
                                <tr>
                                    <th scope="row">대표자명</th>
                                </tr>
                                <tr>
                                    <td>{{chipNm}}</td>
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
                                    <td colspan="2">{{saleDate}}</td>
                                </tr>
                                <tr>
                                    <th scope="row" class="bg01">공급가액</th>
                                    <td class="right">{{amt}}</td>
                                </tr>
                                <tr>
                                    <th scope="row" class="bg01">부가세</th>
                                    <td class="right">{{vat}}</td>
                                </tr>
                                <tr>
                                    <th scope="row" class="bg01">봉사료</th>
                                    <td class="right">{{bong}}</td>
                                </tr>
                                <tr>
                                    <th scope="row" class="bg01">거래금액</th>
                                    <td class="right">{{totalAmt}}</td>
                                </tr>
                                <tr>
                                    <th scope="row" colspan="2">사업자등록번호</th>
                                </tr>
                                <tr>
                                    <td colspan="2">{{saupId}}</td>
                                </tr>
                                <tr>
                                    <th scope="row" colspan="2">사업장전화번호</th>
                                </tr>
                                <tr>
                                    <td colspan="2">{{charTel}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <th scope="col" colspan="2">사업장 주소</th>
                    </tr>
                    <tr>
                        <td colspan="2" class="con01">{{saupCaddr}} {{saupAddr}}</td>
                    </tr>
                    <tr id="mailCon">
                        <td colspan="2" class="con01">
                            <span class="text01">현금영수증 문의 <a href="#"><i class="icon tel"></i> 126-1-1</a></span>
                            <span class="text01">국세청 홈택스 : <a href="http://www.hometax.go.kr" target="_blank" title="새창열기" class="link02">www.hometax.go.kr</a></span>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <!-- //tbl grid01 -->

                <!-- receipt info -->
                <div class="receipt_info no_print">
                    <ul class="receipt">
                        <li><span class="sub">지출구분 : </span> {{cultGbNm}}</li>
                        <li><span class="sub">메모 : </span> {{memo}}</li>
                    </ul>
                </div>

                <!-- mail info box -->
                <div class="mail_info_box no_print">
                    <input type="text" class="input form_mailid" title="아이디 입력" v-model="mailId"> @
                    <input type="text" class="input form_mailcom" title="회사 입력" v-model="mailCompany">
                    <button type="button" class="btn_m01 bg03" v-on:click="sendMail">메일로 전송</button>
                </div>
            </div>

            <!-- btn bot -->
            <div class="btn_bot no_print">
                <button type="button" id="" class="btn_b01 bg01" v-on:click="receiptPrint">영수증 출력</button>
                <button type="button" id="" class="btn_b01 bg02" v-on:click="receiptConfirm">확인</button>
            </div>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->


</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';
    import moment from 'moment'
    Vue.prototype.moment = moment;

    @Component({
        components: {
            CashReceiptIssueView
        }
    })
    export default class CashReceiptIssueView extends Vue {
        perm: string = ''; //현금영수증 승인번호
        amt: any = ''; //공급가액
        bong: any = ''; //봉사료
        charTel: any = ''; //사업장전화번호
        chipNm: any = ''; //사업장명
        comfirm: any = ''; //신분확인
        geogu: any = ''; //발급용도
        geoguNm: any = ''; //거래구분
        saupAddr: any = ''; //사업장주소
        saupCaddr: any = ''; //사업장
        saupId: any = ''; //사업자ID
        shopNm: any = ''; //사업자명
        totalAmt: any = ''; //거래금액(합계)
        vat: any = ''; //부가세
        //cultGb: any = ''; //지출구분
        cultGbNm: any = ''; //지출구분명
        memo: any = ''; //메모
        saleDate : any = '';

        mailId: any = ''; //이메일 아이디
        mailCompany: any = ''; //이메일 회사 주소
        nowTime : string ="";
        nowTimehms : string = '';

        mailAddr : any = '';

        /**
         * 현재시간 가져오기
         */
        getNow(){

            CommonBoardService.getListDatas('time', null, null).then((response) => {
                if(response.status == 200) {
                    this.nowTime = moment(response.data.time, 'YYYYMMDDHHmmss').format('YYYY.MM.DD');
                    this.nowTimehms = moment(response.data.time, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:MM:SS');
                }

                }, (error) => {
                    //this.$Progress.finish();
                }
            ).catch();
        }

        created() {
            this.getNow();

            this.perm = this.$route.params.reqPerm; //현금영수증 승인번호
            this.saleDate = this.$route.params.reqDate; //현금영수증 발급날짜

            //let reqParams = this.$route.params;
            //this.perm = 'C39044964';

            if(this.perm == '' || this.perm == undefined){
                Vue.swal({text:'접근할수 없습니다'})
                //this.perm='C39025154'
                //this.saleDate='20190215'
                this.$router.push({name:'cashReceiptIssue'});
            }

            // api 데이터 호출
            CommonBoardService.getListDatas('receipt' , this.saleDate+"/"+this.perm, '').then((response) => {
                    let result: any = response.data;
                    console.log(result)

                    if (result != null) {
                        this.amt = this.amtComma(result.amt); //공급가액
                        this.bong = this.amtComma(result.bong); //봉사료
                        this.charTel = this.nullCheck(result.charTel); //사업장전화번호
                        this.chipNm = result.chipNm; //사업장명
                        this.comfirm = result.comfirm; //신분확인
                        this.geogu = result.geogu; //발급용도
                        this.geoguNm = result.geoguNm; //거래구분
                        this.saleDate = this.dateFormat(result.saleDate); //거래일시
                        this.saupAddr = this.nullCheck(result.saupAddr); //사업장주소
                        this.saupCaddr = this.nullCheck(result.saupCaddr); //사업장
                        this.saupId = this.saupnoFormat(result.saupId); //사업자ID
                        this.shopNm = result.shopNm; //사업자명
                        this.totalAmt = this.amtComma(result.totamt); //거래금액(합계)
                        this.vat = this.amtComma(result.vat); //부가세
                        //this.cultGb = result.cultGb; //지출구분
                        this.cultGbNm = this.nullCheck(result.cultGbNm); //지출구분
                        this.memo = this.nullCheck(result.memo); //메모
                    } else {
                        console.log(result);
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                    console.log(error);
                }
            ).catch((response) =>  {
                console.log('response code check!!');
                console.log(response);
                if(response.status.toString() == '401'){ // 토큰오류(401)면 로그인 이동
                    this.$router.push('/login')
                }
            });
        }

        mounted() {
                //거래일자(현재 일자) 가져오기
                /*CommonBoardService.getListDatas('time', null, null).then((response) => {

                        console.log(response)

                        this.nowTime = moment(response.data.time,'YYYYMMDDHHmmss').format('YYYYMMDD')


                    }, (error) => {
                        //this.$Progress.finish();
                    }
                ).catch();*/

        }

        //취소
        passCancel() {
            this.$router.push('/login')
        }

        receiptPrint() { //영수증 출력
            console.log('영수증 출력')
            /*let initBody = document.body.innerHTML;
            window.onbeforeprint = function(){
                document.body.innerHTML = document.getElementById('container').innerHTML;
            };
            window.onafterprint = function(){
                document.body.innerHTML = initBody ;
            }; */
            window.print();
        }

        receiptConfirm() { //확인
            this.$router.push('/home/cashReceiptIssue'); //메인이동
        }

        sendMail() { //메일 발송

            // let dt = new Date();
            // let sendDate = moment(dt).format('YYYY-MM-DD HH:mm:ss'); //메일 발송일자
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
            }else{
                this.mailAddr = mailAddress;
            }


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
                "\t\t\t\t\t\t\t<td><a href=\"\" target=\"_blank\"><img src=\"http://211.39.150.112/img/img_logo.07141310.png\" width=\"238\" height=\"28\" alt=\"케이티/롯데정보통신 현금영수증\" style=\"border:0;margin-right:5px;\"></a></td>\n" +
                "\t\t\t\t\t\t\t<td style=\"padding-top:10px; text-align:right; padding-right:0px;padding-bottom:18px;font-size:13px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#939393;line-height:17px\">" + this.nowTime + "</td>\n" +
                "\t\t\t\t\t\t\t<td style=\"width:100px;text-align: right; padding-bottom:13px;font-size:20px;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;color:#212121;line-height:17px;font-weight: bold;\">사용자용</td>\n" +
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
                "\t\t\t\t\t\t\t\t<th scope=\"col\" colspan=\"2\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:16px; color:#212121; padding:15px 20px 15px 20px; border-right:0px solid #dedede;border-bottom:1px solid #dedede;background:#f2f2f2; text-align: left\">현금영수증 (고객용)</th>\n" +
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
                "\t\t\t\t\t\t\t\t\t\t\t<td style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#212121; height:50px; line-height: 50px; padding:0 18px 0 20px; border-right:1px solid #dedede; background:#ffffff; border-bottom:1px solid #dedede; text-align:left; word-wrap:break-word;\">" + this.comfirm + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; color:#505050; height:50px; line-height: 50px; padding:0 18px 0 20px; border-right:1px solid #dedede; border-bottom:1px solid #dedede; background:#fafafa; text-align:left; vertical-align:top;\">거래구분</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#212121; height:50px; line-height: 50px; padding:0 18px 0 20px; border-right:1px solid #dedede; background:#ffffff; border-bottom:1px solid #dedede; text-align:left; word-wrap:break-word;\">" + this.geoguNm + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; color:#505050; background:#fafafa; height:50px; line-height: 50px; padding:0 18px 0 20px; border-right:1px solid #dedede; background:#fafafa; border-bottom:1px solid #dedede; text-align:left; vertical-align:top;\">승인번호</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#212121; height:50px; line-height: 50px; padding:0 18px 0 20px; background:#ffffff; border-right:1px solid #dedede; border-bottom:1px solid #dedede; text-align:left; word-wrap:break-word;\">" + this.perm + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; color:#505050; height:50px; line-height: 50px; padding:0 18px 0 20px; background:#fafafa; border-right:1px solid #dedede; border-bottom:1px solid #dedede; background:#fafafa; text-align:left; vertical-align:top;\">사업자명</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; height:50px; line-height: 50px; padding:0 18px 0 20px; background:#ffffff; border-right:1px solid #dedede; border-bottom:1px solid #dedede;  text-align:left; word-wrap:break-word;\">" + this.shopNm + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; color:#505050;  background:#fafafa; height:50px; line-height: 50px; padding:0 18px 0 20px; background:#fafafa; border-right:1px solid #dedede; border-bottom:1px solid #dedede; text-align:left; vertical-align:top;\">대표자명</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; height:50px; line-height: 50px; padding:0 18px 0 20px; background:#ffffff; border-right:1px solid #dedede; border-bottom:0px solid #dedede; text-align:left; word-wrap:break-word;\">" + this.chipNm + "</td>\n" +
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
                "\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"2\" style=\"width:65%; font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; color:#212121; height:50px; line-height: 50px; padding:0 18px 0 20px; border-right:0px solid #dedede; border-bottom:1px solid #dedede; text-align:left; word-wrap:break-word;\">" + this.nowTimehms + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" class=\"bg01\" style=\"color:#505050; font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size: 14px; height:50px; line-height: 50px; padding:0 18px 0 20px; border-bottom:1px solid #dedede; background:#ffffff; text-align: center;\">공급가액</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td class=\"right\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#212121; height:50px; line-height: 50px; padding:0 18px 0 20px; text-align:right;  border-left:1px solid #dedede;border-right:0px solid #dedede; border-bottom:1px solid #dedede; word-wrap:break-word;\">" + this.amt + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" class=\"bg01\" style=\"height:50px; color:#505050; font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size: 14px; height:50px; line-height: 50px; padding:0 18px 0 20px; border-bottom:1px solid #dedede; background:#ffffff; text-align: center;\">부가세</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td class=\"right\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#212121; padding:16px 20px 16px 20px; text-align:right;  border-left:1px solid #dedede;border-right:0px solid #dedede; border-bottom:1px solid #dedede; word-wrap:break-word;\">" + this.vat + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" class=\"bg01\" style=\"color:#505050; font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; height:50px; line-height: 50px; padding:0 18px 0 20px; border-bottom:1px solid #dedede; background:#ffffff; text-align: center;\">봉사료</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td class=\"right\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#212121; padding:16px 20px 16px 20px; text-align:right;  border-left:1px solid #dedede;border-right:0px solid #dedede; border-bottom:1px solid #dedede; word-wrap:break-word;\">" + this.bong + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" class=\"bg01\" style=\"color:#505050; font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; height:50px; line-height: 50px; padding:0 18px 0 20px; border-bottom:1px solid #dedede; background:#ffffff; text-align: center;\">거래금액</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td class=\"right\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#212121; height:50px; line-height: 50px; padding:0 18px 0 20px; text-align:right;  border-left:1px solid #dedede;border-right:0px solid #dedede; border-bottom:1px solid #dedede; word-wrap:break-word;\">" + this.totalAmt + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" colspan=\"2\" style=\"color:#505050; font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size: 14px; height:50px; line-height: 50px; padding:0 18px 0 20px; border-bottom:1px solid #dedede; background:#fafafa; text-align: left;\">사업자등록번호</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"2\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#212121; height:50px; line-height: 50px; padding:0 18px 0 20px; border-right:0px solid #dedede; border-bottom:1px solid #dedede; text-align:left; word-wrap:break-word;\">" + this.saupId + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<th scope=\"row\" colspan=\"2\" style=\"color:#505050; font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size: 14px; height:50px; line-height: 50px; padding:0 18px 0 20px; border-bottom:1px solid #dedede; background:#fafafa; text-align: left;\">사업장전화번호</th>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"2\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px;color:#212121; height:50px; line-height: 50px; padding:0 18px 0 20px; border-right:0px solid #dedede; border-bottom:1px solid #dedede; text-align:left; word-wrap:break-word;\">" + this.charTel + "</td>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t\t\t\t</tbody>\n" +
                "\t\t\t\t\t\t\t\t\t</table>\n" +
                "\t\t\t\t\t\t\t\t</td>\n" +
                "\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t<th scope=\"col\" colspan=\"2\" style=\"height:50px; color:#505050;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; padding-left:20px; border-bottom:1px solid #dedede; background:#f7f7f7; text-align: left;\">사업장 주소</th>\n" +
                "\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t<td colspan=\"2\" class=\"con01\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; height:50px; border-bottom:1px solid #dedede; vertical-align: top; padding:15px 20px 15px 20px; line-height:20px;\">" + this.saupCaddr + " " + this.saupAddr + "</td>\n" +
                "\t\t\t\t\t\t\t</tr>\n" +
                "\t\t\t\t\t\t\t<tr>\n" +
                "\t\t\t\t\t\t\t\t<td colspan=\"2\" class=\"con01\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; height:50px; border-bottom:1px solid #dedede; vertical-align: top;padding:15px 20px 15px 20px; line-height:20px;\">\n" +
                "\t\t\t\t\t\t\t\t\t<span class=\"text01\" style=\"font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif; font-size:14px; display:block; padding:5px 0; color:#212121;\">현금영수증 문의 <a href=\"#\" style=\"text-decoration:none;color:#555;\"> : 126-1-1</a></span>\n" +
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
                "\t\t\t\t\t발신전용 메일입니다. 궁금하신 사항은 현금영수증 <a href=\"#\" style=\"color:#212121;text-decoration:underline\" target=\"_blank\">고객센터</a>로 연락 주시면 성심 성의껏 상담해드리겠습니다.<br>타인이 회원님의 이메일을 잘못 입력한 경우 메일이 발송될 수 있습니다.<br>잘못 수신된 메일이라면 현금영수증 고객센터 1:1 문의하기를 이용해주시기 바랍니다.\n" +
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
            reqData['to'] = [this.mailAddr]; //메일 수신자
            reqData['title'] = '현금영수증 발급 완료'; //메일 제목
            reqData['message'] = mailMessage; //메일 내용
            reqData['cc'] = [''];

            // api 데이터 호출
            CommonBoardService.postListDatas('mail', null, reqData).then((response) => {
                    if (response.status.toString() == '201' || response.status.toString() == '200') { //메일 전송 완료
                        Vue.swal({text: '현금영수증 메일 발송이 완료되었습니다.'});
                    } else { //메일 전송 실패
                        Vue.swal({text: '현금영수증 메일 발송이 실패되었습니다.'});
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                    console.log(error);
                }
            ).catch();

        }
        //메일 주소 정규표현식 체크
        email_check( email ) {
            var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            return (email != '' && email != 'undefined' && regex.test(email));
        }

        // 날짜 포맷
        dateFormat(val){
            if(val == null || val == ''){
                return '';
            }else{
                return moment(val, 'YYYYMMDDHHmmss').format('YYYY.MM.DD HH:mm:ss')
            }
        }

        amtComma(num){
            if(num == null || num == ''){
                return '';
            }else{
                let len, point, str;

                num = num + "";
                point = num.length % 3 ;
                len = num.length;

                str = num.substring(0, point);
                while (point < len) {
                    if (str != "") str += ",";
                    str += num.substring(point, point + 3);
                    point += 3;
                }
                return str;
            }
        }

        saupnoFormat(val) {
            return val.substring(0, 3) + '-' + val.substring(3, 5) + '-' + val.substring(5, 10);
        }

        nullCheck(val){
            if(val == null || val == ''){
                return '';
            }else{
                return val;
            }
        }

    }
</script>
