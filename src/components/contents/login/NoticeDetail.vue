<template>
    <div>
        <div class="popup_modal"></div>
        <div id="popup1" class="popup_wrapper medium Pstyle" tabindex="0" style="display: block;">
            <!-- popup header -->
            <div class="popup_header">
                <!-- h2 -->
                <h2>공지사항</h2>
                <button type="button" v-on:click="closePop" class="btn_close">Close</button>
            </div>
            <!-- popup body -->
            <div class="popup_body">
                <!-- popup content -->
                <!-- bbs view box -->
                <div class="bbs_view_box">
                    <!-- bbs view -->
                    <dl class="bbs_view">
                        <dt>
                            <span class="sub" >
                                <i class="icon notice"v-if="listData.importantYn == 'Y'">공지</i>
                                {{listData.title}}
                            </span>
                            <i class="icon new" v-if="listData.newYn == 'Y'">new</i>
                            <span class="col_date"><strong class="sub">등록일 : </strong>{{moment(listData.regDt, "YYYYMMDDHHmmss").format("YYYY.MM.DD")}}</span>
                        </dt>

                        <dd class="row_sub">
							<span class="col_left" v-if="listData.fileYn =='Y' ">
                                <strong class="sub">첨부파일 : </strong>
                                <span class="file_area">
                                    <template v-for="attFiles in listData.uploadFileNames">
                                        <a v-on:click="download(attFiles.fileName, attFiles.fileOrigin)">{{attFiles.fileOrigin}}<i class="icon_file"/></a>
                                    </template>
                                </span>
							</span>
                            <!--<span class="col_right"><strong class="sub">등록자 : </strong>{{listData.regRoll}} </span>-->
                        </dd>
                        <dd class="row_cont">
                            <div class="cont_data" v-html="listData.content"></div>
                        </dd>
                    </dl>
                    <!-- //bbs view -->
                </div>
                <!-- //bbs view box -->
            </div>
        </div>
    </div>

</template>

<script lang="ts">

    import {Component, Vue, Prop} from "vue-property-decorator";
    import {CommonBoardService} from '../../../api/common.service';

    @Component({
        components: {
            NoticeDetail
        }
    })

    export default class NoticeDetail extends Vue {
        @Prop() seq  !: any;
        listData: any = [];
        objectKey: any = "";

        closePop(){
            this.$emit('close');
        }

        mounted() {
            // this.seq = this.$route.params.seq; // 글번호 시퀀스
            // console.log(this.seq)

            if (this.seq == undefined) {
                Vue.swal({text: '조회하지 못했습니다. 다시 확인해 주세요 '})
                .then((result) => {
                    this.closePop();
                })

                // this.$router.push({path: 'noticeList'});
            } else {
                this.getNoticeDetail()
            }
        }

        /**
         * 상세정보 호출
         */
        getNoticeDetail() {

            if (this.seq == null || this.seq == undefined) {
                Vue.swal({text: '조회하지 못했습니다. 다시 시도 해 주십시요'});
            } else {
                // api 데이터 호출
                CommonBoardService.getListDatas('notice', this.seq, null).then((response) => {
                        let result: any = response.data;

                        console.log(result.uploadFileNames);

                        if (result != null) {
                            this.listData = result;
                        }
                    }
                    , (error) => {
                    }).catch();

            }
        }
    }
</script>

<style scoped>

</style>