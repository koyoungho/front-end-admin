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
                            <span class="col_date"><strong class="sub">등록일 : </strong>{{formatDates(listData.regDt)}}</span>
                        </dt>
                        <dd class="row_sub">
							<span class="col_left" v-if="listData.fileYn == 'Y' ">
							<!--<span class="col_left" v-if="listData.uploadFileNames>0">-->
                                <strong class="sub">첨부파일 : </strong>
                                <span class="file_area">
                                    <template v-for="attFiles in listData.uploadFileNames">
                                        <a v-on:click="download(attFiles.fileName)" >{{attFiles.fileOrigin}}<i class="icon_file"></i></a>
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

        mounted() {
            this.objectKey = this.$route.params.objectKey;

            this.seq = this.objectKey.seq;// 글번호 시퀀스
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
            if(!this.objectKey){
                alert('접근할수 없습니다')
                this.$router.push({name:'notice'});
            }else {
                this.seq = this.objectKey.seq;

                // api 데이터 호출
                CommonBoardService.getListDatas('notice', this.seq, null).then((response) => {
                        let result: any = response.data;

                        if (result != null) {
                            this.listData = result;
                            console.log( this.listData);
                        }
                    }
                    , (error) => {
                        //this.$Progress.finish();
                    }).catch();
            }
        }

        /**
         * 날짜 포맷 변경
         * @param date
         */
        formatDates(date) {

            let date_str = ''+date;
            let formattedDates = '';
            formattedDates = moment(date_str.substr(0, 8)).format("YYYY.MM.DD");
            return formattedDates
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
            this.$router.push({name:'regNotice',  params:{seq:this.seq}});
        }

        /**
         * 파일다운로드
         * @param fileNm
         */
        download(fileNm){
            window.open( environment.apiUrl+"/file/"+fileNm);
        }




    }


</script>

<style scoped>

</style>