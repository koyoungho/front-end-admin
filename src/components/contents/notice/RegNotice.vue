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
                        <td><input type="text" class="input form_w100" title="제목" v-model="title" maxlength="100"> </td>
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
                                <input type="checkbox" id="aa01" v-model="importantYn"><label for="aa01">중요공지</label>
                            </span>
                            <span class="chk_box right">
                            <input type="checkbox" id="aa02" v-model="popupYn"><label for="aa02">팝업</label>
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
                                        <span>{{file.name}}</span>
                                        <a class="btn_close" @click.prevent="$refs.upload.remove(file)"><img src="../../../assets/images/btn_file_close01.png" alt="닫기"></a>
                                    </li>
                                </ul>
                                <span class="btn_file_area">
                                     <file-upload
                                             :multiple="true"
                                             :size="1024 * 1024 * 10"
                                             :headers="{'Accept-Charset': 'utf-8'}"
                                             v-model="files"
                                             accept="*"
                                             @input-filter="inputFilter"
                                             @input-file="inputFile"
                                             ref="upload">
                                    <button type="button"  class="btn_m01 bg03">파일추가</button>
                                     </file-upload>
                                </span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">내용</th>
                        <td class="con_write" >
                            <tinymce id="d1" v-model="content" :other_options="{height:400}"></tinymce>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" class="btn_b01 bg02" v-on:click="toList">취소</button>
                <template v-if="div == '수정' && delShow == true">
                    <button type="button" class="btn_b01 bg03" v-on:click="delNotice">삭제</button>
                </template>
                <button type="button" class="btn_b01 bg01" v-on:click="reg" v-show="regShow">{{div}}</button>
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
        //importantYnB : boolean =false;
        importantYn : boolean = false;
        popupYn : boolean = false;
        files:any=[];
        uploadFileNames: any=[];
        regShow : boolean= false;
        delShow : boolean= false;
        showModal:boolean= true;

        mounted(){
            this.seq=this.$route.params.seq;
            if(  this.seq == undefined ||  this.seq == ''){
                this.div ="등록";
            }else{
                this.div="수정";
                this.getNoticeDetail();
            }
            // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'noticeList'; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y' || menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].updateYn == 'Y') {
                        this.regShow = true;
                    }
                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].deleteYn == 'Y') {
                        this.delShow = true;
                    }
                }
            }

        }

        /**
         * 상세정보 호출
         */
        getNoticeDetail(){

            // api 데이터 호출
            CommonBoardService.getListDatas('notice', this.seq, null ).then((response) => {
                    let result: any = response.data;
                    if (result !=null) {
                        this.title = result.title;
                        this.viewType = result.viewType;
                        this.content = result.content;
                        this.attFileYn = result.attFileYn;

                        let oldFile :any =[];
                        if(result.uploadFileNames.length >0) {
                            for (let i = 0; i < result.uploadFileNames.length; i++) {
                                oldFile.push({name: result.uploadFileNames[i].fileOrigin, id: result.uploadFileNames[i].fileName});
                                this.uploadFileNames.push({fileName: result.uploadFileNames[i].fileName, fileOrigin: result.uploadFileNames[i].fileOrigin});
                            }
                        }
                        this.files = oldFile;

                        if(result.importantYn =='Y'){
                            //this.importantYnB = true;
                            this.importantYn = true;
                        }
                        if(result.popupYn =='Y'){
                            //this.importantYnB = true;
                            this.popupYn = true;
                        }
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                }   ).catch();

        }

        /**
         * 체크박스 제어
         *//*
        changeYn(){
            if(this.importantYnB==false){
                this.importantYnB = true;
                this.importantYn = "Y";
            }else{
                this.importantYnB = false
                this.importantYn = "N";
            }
        }*/

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
                    Vue.swal({text:"업로드 할수 없는 파일입니다."});
                    // return false;
                    return prevent()
                }
            }
        }
        inputFile(newFile, oldFile) {

            if (newFile && !oldFile) {
                // add
                this.addFile(newFile);
            }
            if (newFile && oldFile) {
                // update
                console.log('update', newFile)
            }
            if (!newFile && oldFile) {
                // remove
                const idx = this.uploadFileNames.findIndex(function(item) {return item.fileName == oldFile.id}) // findIndex = find + indexOf
                if (idx > -1) this.uploadFileNames.splice(idx,1);
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
    reqData['uploadFileNames'] = this.uploadFileNames;
    //qData['importantYn'] = this.importantYn;
    if(this.importantYn == true){
        reqData['importantYn'] = 'Y'
    }else{
        reqData['importantYn'] = 'N'
    }
    if(this.popupYn == true){
        reqData['popupYn'] = 'Y'
    }else{
        reqData['popupYn'] = 'N'
    }

            if(this.seq == undefined ||  this.seq == '') {//등록
                CommonBoardService.postListDatas('notice', null, reqData).then((response) => {
                        if (response.status.toString() == '201') { //성공

                            Vue.swal({ text: '등록되었습니다',
                            }).then((result) => {
                                // 리스트로 이동
                                this.$router.push({ name:'noticeList' }) // 라우터 주소를 넣어줘야 히스토리모드 인식
                            });

                        } else {
                            Vue.swal({ text: '등록 실패 되었습니다.'});
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
                        Vue.swal({text: '수정되었습니다' ,
                            // text: '수정되었습니다',
                            // type: 'success',
                            }).then((result) => {
                                // 리스트로 이동
                                this.$router.push({name: 'noticeList'}) // 라우터 주소를 넣어줘야 히스토리모드 인식
                        });

                    } else {
                        Vue.swal({ text: '수정 실패 되었습니다.'});
                        console.log(response);
                    }
                }, (error) => {
                    //this.$Progress.finish();
                    console.log(error);
                }
                ).catch();

            }

        }

        /**
         * 공지사항 삭제
         */
        delNotice(){

            Vue.swal({
                text: '삭제하시겠습니까',
                showCancelButton: true,
                showCloseButton: true,
                reverseButtons: true

            }).then((result) => {
                CommonBoardService.deleteListDatas('notice', this.seq, null).then((response) => {
                        if (response.status.toString() == '200') { //성공

                            if (result.value) {
                                Vue.swal({
                                    text: '삭제되었습니다.',
                                }).then((result) => {
                                    // 리스트로 이동
                                    this.$router.push({name: 'noticeList'}) // 라우터 주소를 넣어줘야 히스토리모드 인식
                                })
                            }
                        } else { //
                            Vue.swal({ text: '삭제실패'});
                            console.log(response);
                        }
                    }, (error) => {
                        //this.$Progress.finish();
                        console.log(error);
                    }
                ).catch();
            })
        }

        /**
         * 유효성체크
         */
        validationChk(){
            if(this.title == null || this.title==""){
                Vue.swal({text:"제목을 입력하세요"});
                return false;
            }else if(this.content ==null || this.content ==""){
                Vue.swal({text:"내용을 입력하세요"});
                return false;
            }
        }

        /**
         * 파일 등록
         * @param newFile
         */
        addFile(newFile){
            let formData = new FormData();
            formData.append('Accept-Charset', ' utf-8');
            formData.append('file', newFile.file);

            CommonBoardService.postListDatas('file', null, formData).then((response) => {
                    let result: any = response.data;

                    let addFile ={};

                    if (response.status.toString() =='200') {

                        addFile['fileName']= result.fileName;
                        addFile['fileOrigin']= result.originFileName;

                        this.uploadFileNames.push(addFile);

                    } else {
                        Vue.swal({text:'파일 등록 실패'});
                    }
                }
                , (error) => {
                    console.log(error)
                }
            ).catch();
        }

    }

</script>

<style>

</style>

