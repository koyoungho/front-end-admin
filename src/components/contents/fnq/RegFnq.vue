<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">고객지원</h2>

            <h3>자주묻는 질문 {{div_str}}</h3>

            <!-- tbl view box -->
            <div class="bbs_write_box">
                <!-- tbl view01 -->
                <table class="bbs_write">
                    <caption>자주묻는 질문 </caption>
                    <colgroup>
                        <col width="10%">
                        <col width="90%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">제목</th>
                        <td><input type="text" class="input form_w100" title="제목"  v-model="title" ></td>
                    </tr>
                    <tr>
                        <th scope="row">구분</th>
                        <td>
                            <select id="" name="" class="select form_notice" v-model="viewType">
                                <option value="ALL">공통</option>
                                <option value="USR">사용자</option>
                                <option value="ADM">관리자</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">내용</th>
                        <td class="con_write" >
                            <tinymce id="d1" v-model="content"></tinymce>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button"  class="btn_b01 bg02" v-on:click="toList()">취소</button>
                <template v-if="div_str == '수정' ">
                    <button type="button" class="btn_b01 bg03">삭제</button>
                </template>
                <button type="button" class="btn_b01 bg01" @click="regFnq">{{div_str}}</button>
            </div>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->
    
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {CommonBoardService} from "../../../api/common.service";

    @Component({
        components: {
            RegFnq
        }
    })
    export default class RegFnq extends Vue {

        div_str : string="";
        seq : string ="";
        title : string ="";
        viewType : string ="";
        content : string ="";


        objectKey : any = "";


        mounted(){
            // this.seq = this.$route.params.seq;
            this.objectKey = this.$route.params.objectKey;
            console.log(this.$route.params.objectKey);

            if(this.objectKey == null || this.objectKey == 'undefinded') {
                this.div_str="등록";
            }else {
                this.div_str="수정";
                this.getFnqDetail();
            }
        }

        /**
         * 상세정보 호출
         */
        getFnqDetail() {

            if(!this.objectKey){
                alert('접근할수 없습니다')
                this.$router.push({name:'fnqList'});
            }else {
                this.seq = this.objectKey.seq; //가맹점 번호


                // api 데이터 호출
                CommonBoardService.getListDatas('faq', this.seq, null).then((response) => {
                        let result: any = response.data;

                        if (result != null) {
                            this.title = result.title;
                            this.viewType = result.viewType;
                            this.content = result.content;
                        }
                    }
                    , (error) => {
                        //this.$Progress.finish();
                    }).catch();
            }

        }

        /**
         * 취소(목록으로)
         */
        toList(){
            this.$router.push({name:'fnqList'})
        }

        /**
         * 등록, 수정
         */
        regFnq(){

            this.validationChk();
            let reqData ={};

            reqData['title'] = this.title;
            reqData['viewType'] = this.viewType;
            // reqData['regRole'] = this.regRole;
            reqData['content'] = this.content;

            if(this.objectKey != null || this.objectKey !=undefined){ //수정일때
                // api 데이터 호출
                CommonBoardService.updateListData('faq', this.objectKey, reqData).then((response) => {
                        if (response.status.toString() == '200') { //메일 전송 완료
                            alert("수정되었습니다.");
                            console.log('수정되었습니다');
                            console.log(response);
                            // 현금영수증 발급 완료 화면 이동
                            // this.$router.push({ name:'faq' }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                        } else { //메일 전송 실패
                            console.log('수정실패');
                            console.log(response);
                        }
                    }
                    , (error) => {
                        //this.$Progress.finish();
                        console.log(error);
                    }
                ).catch();

            }else{//등록일때
                CommonBoardService.postListDatas('faq', this.objectKey, reqData).then((response) => {
                        if (response.status.toString() == '200') { //메일 전송 완료
                            alert("등록되었습니다.");
                            console.log('등록되었습니다');
                            console.log(response);
                            // 현금영수증 발급 완료 화면 이동
                            // this.$router.push({ name:'faq' }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                        } else { //메일 전송 실패
                            console.log('등록실패');
                            console.log(response);
                        }
                    }
                    , (error) => {
                        //this.$Progress.finish();
                        console.log(error);
                    }
                ).catch();
            }

        }

        /**
         * 유효성체크
         */
        validationChk(){
            if(this.title == null || this.title==""){
                alert("제목을 입력하세요");
                return false;
            }else if(this.content ==null || this.content ==""){
                alert("내용을 입력하세요");
                return false;
            }
        }

    }
</script>

<style scoped>

</style>