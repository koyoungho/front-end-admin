<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">공지사항</h2>

            <h3>공지사항</h3>

            <!-- cont_mobile -->
            <div class="cont_mobile">
                <!-- bbs view box -->
                <div class="bbs_view_box">
                    <!-- bbs view -->
                    <dl class="bbs_view">
                        <dt>
                            <span class="sub" >
                                <template v-if="listData.importantYn == 'Y'"> <i class="icon notice">공지</i></template>
                                {{listData.title}}
                            </span>
                                <i class="icon new" v-if="listData.newYn == 'Y'">new</i>
                            <span class="col_date"><strong class="sub">등록일 : </strong> {{moment(listData.regDt).format("YYYY.MM.DD")}}</span>
                        </dt>
                        <dd class="row_sub">
							<span class="col_left" v-if="listData.fileYn == 'Y' ">
							<!--<span class="col_left" v-if="listData.uploadFileNames>0">-->
                                <strong class="sub">첨부파일 : </strong>
                                <span class="file_area">
                                    <template v-for="attFiles in listData.uploadFileNames">
                                        <a v-on:click="download(attFiles.fileName, attFiles.fileOrigin)" >{{attFiles.fileOrigin}}<i class="icon_file"></i></a>
                                    </template>
                                </span>
							</span>
                            <span class="col_right"><strong class="sub">등록자 : </strong>{{listData.regRoleNm}} </span>
                        </dd>
                        <dd class="row_cont">
                            <div class="cont_data" v-html="listData.content"></div>
                        </dd>
                    </dl>
                    <!-- //bbs view -->
                </div>
                <!-- //bbs view box -->
            </div>
            <!-- //cont_mobile -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" class="btn_b02 bg02" v-on:click="toList">목록</button>
                <button type="button" class="btn_b02 bg02" v-on:click="goRegNotice" v-show="regShow">수정</button>
            </div>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import {CommonBoardService} from "../../../api/common.service";
    import {environment} from '@/utill/environment';
    import moment from 'moment'
    Vue.prototype.moment = moment;
    import axios from 'axios';

    @Component({
        components: {
            NoticeDetl
        }
    })
    export default class NoticeDetl extends Vue {
        seq:string ="";
        listData:any=[];
        attachFiles:any=[];
        objectKey : any = "";
        regShow: boolean = false;
        role: any = sessionStorage.getItem('role');
        modOk : boolean = false;

        mounted() {
            this.objectKey = this.$route.params.objectKey;
            this.getNoticeDetail();

            // 메뉴별 권한 확인
            let menuList = JSON.parse(sessionStorage.authMenu);
            let programId = 'noticeList'; //메뉴ID
            for (let i = 0; i < menuList.length; i++) {
                for (let j = 0; j < menuList[i].subMenuDtos.length; j++) {

                    //권한(조회-readYn/ 등록-createYn/ 수정-updateYn/ 삭제-deleteYn)
                    if (menuList[i].subMenuDtos[j].progId == programId && menuList[i].subMenuDtos[j].updateYn == 'Y') {
                        this.regShow = true;
                    }
                }
            }

        }

        /**
         * 상세정보 호출
         */
        getNoticeDetail(){
            this.seq =  this.$route.params.seq;
            if(!this.objectKey && (this.seq == null ||  this.seq == undefined)){
                Vue.swal({text: '접근할수 없습니다'});
                this.$router.push({name:'noticeList'});
            }else {
                if(this.objectKey != null || this.objectKey  !=undefined) {
                    this.seq = this.objectKey.seq;// 글번호 시퀀스
                }else{
                    this.seq =  this.$route.params.seq;
                }

                // api 데이터 호출
                CommonBoardService.getListDatas('notice', this.seq, null).then((response) => {
                        let result: any = response.data;

                        if (result != null) {
                            this.listData = result;
                            let rl = Number(result.regRole)
                            if(Number(this.role) <= rl){
                                this.modOk = true;
                            }
                        }
                    }
                    , (error) => {
                    }).catch();
            }
        }

        /**
         * 이동 - 목록
         */
        toList(){
            this.$router.push({path:'noticeList'});
        }
        /**
         * 이동 - 수정
         */
        goRegNotice(){
            if(this.modOk==true){
            this.$router.push({name:'regNotice',  params:{seq:this.seq}});
            }
            else{
                Vue.swal({text: '수정권한이 없습니다'});
            }
        }

        /**
         * 파일다운로드
         * @param fileNm
         */
        download(fileNm, fileOrigin) {
            axios({
                url: environment.apiUrl +"/file/"+fileNm,
                method: 'GET',
                responseType: 'blob', // important
                headers: {"x-auth-token": sessionStorage.accessToken}
            }).then((response) => {
                // It is necessary to create a new blob object with mime-type explicitly set
                // otherwise only Chrome works like it should
                var newBlob = new Blob([response.data],{type: 'application/stream'})

                // IE doesn't allow using a blob object directly as link href
                // instead it is necessary to use msSaveOrOpenBlob
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(newBlob,fileOrigin)
                    return
                }

                // For other browsers:
                // Create a link pointing to the ObjectURL containing the blob.
                const data = window.URL.createObjectURL(newBlob)
                var link = document.createElement('a')

                link.href = data
                link.download = fileOrigin

                link.click()
                setTimeout(function () {
                    // For Firefox it is necessary to delay revoking the ObjectURL
                    window.URL.revokeObjectURL(data)
                }, 100)



            })

        }

    }


</script>

<style scoped>

</style>