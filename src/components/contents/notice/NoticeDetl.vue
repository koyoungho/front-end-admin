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
                            <template v-bind:class="{'sub icon_new': (listData.newYn == 'Y') }">
                                <i class="icon new">new</i>
                            </template>
                            <span class="col_date"><strong class="sub">등록일 : </strong>{{formatDates(listData.updDt)}}</span>
                        </dt>
                        <dd class="row_sub">
							<span class="col_left" v-if="listData.attFileYn == 'Y' ">
                                <strong class="sub">첨부파일 : </strong>
                                <span class="file_area">
                                    <template v-for="attFiles in listData.attFiles">
                                        <a v-on:click="download(attFiles.fileOrigin)" >{{attFiles.fileName}}<i class="icon_file"></i></a>
                                    </template>
                                </span>
							</span>
                            <span class="col_right"><strong class="sub">등록일 : </strong>{{listData.regRoll}} </span>
                        </dd>
                        <dd class="row_cont">
                            <div class="cont_data">{{listData.content}}</div>
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
                <button type="button" class="btn_b02 bg02" v-on:click="goRegNotice">수정</button>
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

        mounted() {
            this.seq = this.$route.params.seq; // 글번호 시퀀스
            this.getNoticeDetail()
        }

        /**
         * 상세정보 호출
         */
        getNoticeDetail(){

            // api 데이터 호출
            CommonBoardService.getListDatas('notices', this.seq, null ).then((response) => {
                let result: any = response.data;

                if (result !=null) {
                    this.listData = result;
console.log( result.attFiles.length);
                }
            }
            , (error) => {
                //this.$Progress.finish();
            }   ).catch();

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