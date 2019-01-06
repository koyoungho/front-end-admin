<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">현금영수증관리</h2>

            <h3>승인 파일 전송</h3>

            <!-- search box -->
            <div class="search_file_box label01">
                <ul class="search_list">
                    <li>
                        <label class="sub_filereq" for="">오프라인 승인 파일 업로드</label>
                        <div class="input_file_form">
                            <input class="upload_path" readonly="readonly" v-model="uploadFileNm">
                            <label class="upload btn_m01 bg02">
                                <input type="file" @change="uploadFile($event)" >
                                <span>파일찾기</span>
                            </label>
                        </div>
                    </li>
                </ul>
                <span class="btn_req_area"><button type="button" id="" class="btn_m01 bg01" v-on:click="approvalFile" v-show="regShow">등록</button></span>
            </div>
            <!-- //search box -->

            <!-- sch info bot -->
            <div class="sch_info_bot">
                <p class="text_file">
                    모든 파일 업로드 시 DRM 해제 후 파일 업로드 하시기 바랍니다.
                </p>
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
            ApprovalFileSend
        },
    })
    export default class ApprovalFileSend extends Vue {
        message: any = '';
        file: any = ''; //파일 객체
        uploadFileNm : any=""; //업로드 파일 명
        regShow:boolean = false;

        //돔생성전 호출자
        created() {
            // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'cashReceiptIssue'; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].createYn == 'Y') {
                        this.regShow = true;
                    }
                }
            }
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        uploadFile(event: any) { //파일 업로드
            this.file = '';
            this.uploadFileNm = '';
            this.file = event.target.files[0];
            this.uploadFileNm = this.file.name;
            console.log(this.file);
            //let formData = new FormData();
            //formData.append('file',this.file);
        }

        //파일 등록
        approvalFile(){

            if(this.file != null && this.file != '') {

                //파일 확장자 확인(text 파일만 등록 가능)
                let fileExt = this.file.name.split('.');
                let fileNm = fileExt[0].toLowerCase();
                let lowerExt = fileExt[1].toLowerCase();

                if (!lowerExt.includes('txt')) {
                    alert('txt파일만 등록 가능합니다');
                    return;
                }

               //파일명 체크
               let check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
               if(check.test(fileNm)){
                   alert("한글파일명을 사용할 수 없습니다.");
                   return;
               }

                //파일사이즈체크
               let fileSize = this.file.size;
               let standardSize = 5 * 1024 * 1024; //5MB

               if(fileSize>standardSize){
                   alert("첨부하실 파일 사이즈는 5MB 이내로 등록 가능합니다.");
                   return;
               }

                let formData = new FormData();
                formData.append('file', this.file);

                CommonBoardService.postListDatas('approval/file', null, formData).then((response) => {
                        let result: any = response.status;
                        // console.log(response);

                        if (result=='201') {
                            alert("파일이 등록 되었습니다.");
                            this.uploadFileNm ="";

                        } else {
                            console.log('파일 등록 실패');
                        }
                    }
                    , (error) => {
                        console.log(error)
                    }
                ).catch();
            }

        }


    }

</script>