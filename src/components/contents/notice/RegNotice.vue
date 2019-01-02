<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">고객지원</h2>

            <h3>공지사항 {{div}}</h3>

            <!-- tbl view box -->
            <div class="bbs_write_box">
                <!-- tbl view01 -->
                <table class="bbs_write">
                    <caption>공지사항 입력</caption>
                    <colgroup>
                        <col width="10%">
                        <col width="90%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">제목</th>
                        <td><input type="text" class="input form_w100" title="제목" v-model="title" maxlength="80"> </td>
                    </tr>
                    <tr>
                        <th scope="row">구분</th>
                        <td>
                            <select  name="" class="select form_notice" v-model="viewType">
                                <option value="ALL">공통</option>
                                <option value="USR">사용자</option>
                                <option value="ADM">관리자</option>

                            </select>
                            <span class="form_area">
                            <span class="chk_box right">
                                <input type="checkbox" id="aa01" v-model="importantYnB" v-on:click="changeYn"><label for="aa01">중요공지</label>
                            </span>
                        </span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">첨부파일</th>
                        <td>
                            <div class="file_add_box">
                                <ul >
                                    <li v-for="(file, index) in files" :key="file.id">
                                        <!--<span>{{file.fileName}}</span>-->
                                        <span>{{file.name}}</span>
                                        <a href="#" class="btn_close" @click.prevent="$refs.upload.remove(file)"><img src="../../../assets/images/btn_file_close01.png" alt="닫기"></a>
                                        <!--<span>{{file.size | formatSize}}</span> - -->
                                        <!--<span v-if="file.error">{{file.error}}</span>-->
                                        <!--<span v-else-if="file.success">success</span>-->
                                        <!--<span v-else-if="file.active">active</span>-->
                                        <!--<span v-else-if="file.active">active</span>-->
                                        <!--<span v-else></span>-->
                                    </li>
                                </ul>
                                <span class="btn_file_area">
                                     <file-upload
                                             :multiple="true"
                                             :size="1024 * 1024 * 10"
                                             v-model="files"
                                             accept="*"
                                             @input-filter="inputFilter"
                                             @input-file="inputFile"
                                             ref="upload">
                                    <button type="button"  class="btn_m01 bg03">파일추가</button>
                                     </file-upload>
                                </span>

                                <!--<template v-if="attFileYn == 'Y' ">-->
                                    <!--<li>-->
                                    <!--<a>가이드2.pdf</a>-->
                                    <!--<a  class="btn_close"><img src="../../../assets/images/btn_file_close01.png" alt="닫기"></a>-->
                                    <!--</li>-->
<!--</template>-->


                            </div>
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
                <button type="button" class="btn_b01 bg02" v-on:click="toList">취소</button>
                <template v-if="div == '수정' ">
                    <button type="button" class="btn_b01 bg03" v-on:click="delNotice">삭제</button>
                </template>
                <button type="button" class="btn_b01 bg01" v-on:click="reg">{{div}}</button>
            </div>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {CommonBoardService} from "../../../api/common.service";
    import FileUpload from 'vue-upload-component';


    @Component({

        components: {
            RegNotice, FileUpload,
        }
    })
    export default class RegNotice extends Vue {
        seq: string="";
        div: string="";
        listData:any =[];
        title:string="";
        viewType:string="ALL";
        content:string="";
        attFileYn : string ="";
        importantYnB : boolean =false;
        importantYn : string ="N";
        files:any=[];
        uploadFileNames: any=[];


        mounted(){
            this.seq=this.$route.params.seq;
            if(  this.seq == undefined ||  this.seq == ''){
                this.div ="등록";
            }else{
                this.div="수정";
                this.getNoticeDetail();
            }

        }

        /**
         * 상세정보 호출
         */
        getNoticeDetail(){

            // api 데이터 호출
            CommonBoardService.getListDatas('notice', this.seq, null ).then((response) => {
                    let result: any = response.data;
console.log(result);
                    if (result !=null) {
                        this.title = result.title;
                        this.viewType = result.viewType;
                        this.content = result.content;
                        this.attFileYn = result.attFileYn;
                        this.files =result.uploadFileNames;
                        if(result.importantYn =='Y'){
                            this.importantYnB = true;
                        }
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                }   ).catch();

        }

        /**
         * 체크박스 제어
         */
        changeYn(){
            if(this.importantYnB==false){
                this.importantYnB = true;
                this.importantYn = "Y";
            }else{
                this.importantYnB = false
                this.importantYn = "N";
            }
        }

        /**
         * 취소(목록으로)
         */
        toList(){
            this.$router.push({name:'noticeList'})
        }

        /**
         * 파일업로드 (멀티파트)
         */
        inputFilter(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                // Before adding a file
                // Filter system files or hide files
                if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                    return prevent()
                }
                // Filter php html js file
                if (/\.(php5?|html?|jsx?|jsp?|java?|asp?|exe?|class?|js?|sh?|cgi?)$/i.test(newFile.name)) {
                    alert("업로드 할수 없는 파일입니다.");
                    // return false;
                    return prevent()
                }
            }
        }
        inputFile(newFile, oldFile) {
            if (newFile && !oldFile) {

                let formData = new FormData();
                formData.append('file', this.files);

                CommonBoardService.postListDatas('file', null, formData).then((response) => {
                        let result: any = response.status;
                        console.log(response);

                        if (result=='200') {
                            console.log('파일 등록');
                        } else {
                            console.log('파일 등록 실패');
                        }
                    }
                    , (error) => {
                        console.log(error)
                    }
                ).catch();


                // add
                console.log('add', newFile)

            }
            if (newFile && oldFile) {
                // update
                console.log('update', newFile)
            }
            if (!newFile && oldFile) {
                // remove
                console.log('remove', oldFile)
            }
        }

/**
 * 등록 및 수정
 */
        reg(){
            this.validationChk();
            let reqData ={};

            reqData['title'] = this.title;
            reqData['viewType'] = this.viewType;
            reqData['content'] = this.content;
            reqData['uploadFileNames'] = this.files;
            reqData['importantYn'] = this.importantYn;

    //         for(){
    //
    // }
    //
    //         this.uploadFileNames.fileName =   this.files

            console.log(this.files)

            if(this.seq == undefined ||  this.seq == '') {//등록
                CommonBoardService.postListDatas('notice', null, reqData).then((response) => {
                        if (response.status.toString() == '201') { //성공
                            alert("등록되었습니다.");
                            console.log(response);
                            this.$router.push({ name:'noticeList' }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                        } else {
                            console.log(response);
                        }
                    }
                    , (error) => {
                        //this.$Progress.finish();
                        console.log(error);
                    }
                ).catch();

            }else{//수정
                CommonBoardService.updateListData('notice', this.seq, reqData).then((response) => {
                    if (response.status.toString() == '200') { //성공
                        alert("수정되었습니다.");
                        // 리스트로 이동
                        this.$router.push({ name:'noticeList' }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                    } else {
                        console.log('수정실패');
                        console.log(response);
                    }
                }, (error) => {
                    //this.$Progress.finish();
                    console.log(error);
                }
                ).catch();

            }

        }

        delNotice(){
            CommonBoardService.deleteListDatas('notice', this.seq, null).then((response) => {
                if (response.status.toString() == '200') { //성공
                    alert("삭제되었습니다.");
                    // 리스트로 이동
                    this.$router.push({ name:'noticeList' }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                } else { //
                    console.log('삭제실패');
                    console.log(response);
                }
            }, (error) => {
                //this.$Progress.finish();
                console.log(error);
            }
            ).catch();
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

<style>
</style>

