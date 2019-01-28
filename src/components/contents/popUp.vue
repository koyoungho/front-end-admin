<template>
  <div>
    <div class="popup_header3">
      <!-- h2 -->
      <h2>사이트 개편 안내</h2>
      <a class="btn_close b-close" v-on:click="closePop()">Close</a>
    </div>
    <div class="popup_body3">
      <!-- popup content -->
      <div class="popup_content">
        <div class="complete_box">
          <div>
            <!-- cont_mobile -->
            <div class="cont_mobile">
              <!-- bbs view box -->
              <div class="bbs_view_box">
                <!-- bbs view -->
                <dl class="bbs_view">
                  <dt>
                            <span class="sub">
                                <i class="icon notice" v-if="listData.importantYn == 'Y'">공지</i>
                                {{listData.title}}
                            </span>
                    <i class="icon new" v-if="listData.newYn == 'Y'">new</i>
                    <span class="col_date"><strong class="sub">등록일 : </strong>{{moment(listData.regDt, 'YYYYMMDDHHmmss').format('YYYY.MM.DD')}}</span>
                  </dt>

                  <dd class="row_sub" v-if="listData.attFileYn =='Y' ">
							<span class="col_left" >
                                <strong class="sub">첨부파일 : </strong>
                                <span class="file_area">
                                    <template v-for="attFiles in listData.attFiles">
                                        <a v-on:click="download(attFiles.fileName, attFiles.fileOrigin)">{{attFiles.fileOrigin}}<i
                                            class="icon_file"/></a>
                                    </template>
                                </span>
							</span>
                    <span class="col_right"><strong class="sub">등록자 : </strong>{{listData.regRoll}} </span>
                  </dd>
                  <dd class="row_cont">
                    <div class="cont_data" v-html="listData.content" style="height: 420px"></div>
                  </dd>
                </dl>
                <!-- //bbs view -->
              </div>
              <!-- //bbs view box -->
              <!--<div class="btn_bot" style="padding-top:0px">-->
                <!--<button type="button" class="btn_b01 bg01" v-on:click="closePop">닫기</button>-->
              <!--</div>-->
            </div>

            <!-- //cont_mobile -->

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {CommonBoardService} from '../../api/common.service';

    @Component({
        components: {
            popUp
        }
    })
    export default class popUp extends Vue {
        @Prop() listSeq !: any;

        seqNum: string = this.listSeq;

        listData: any = {};

        closePop() {
            this.$emit('close');
        }

        create() {
            window.addEventListener('hashchange', () => {
                var currentPath = window.location.hash.slice(1)
                if (this.$route.path !== currentPath) {
                    this.$router.push(currentPath)
                }
            }, false)
        }

        mounted() {
            CommonBoardService.getListDatas('notice', this.seqNum, null).then(e => {
                if (e.data) {
                    this.listData = e.data;
                }
            });
        }

        regFanchise() {
            this.$router.push('/home/cashInstitution');
        }


    }
</script>

<style scoped>

</style>