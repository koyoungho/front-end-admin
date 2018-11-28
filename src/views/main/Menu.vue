<template>
  <nav class="gnb">
    <span class="gnb_bg"></span>
      <ul class="gnb_list">
        <!--<li v-for="menu in menuItem" v-bind:class="menu.on" ><a href="typescript:void()">{{menu.name}}</a>-->
        <li v-for="menu in menuItem" v-bind:class="menu.on"><a >{{menu.name}}</a></li>
        <!--<li v-for="menu in menuItem" v-bind:class="menu.on"><a v-on:click="menuClick(menu.id)">{{menu.name}}</a></li>-->
          <!--style="display: block"-->
          <!--<div class="depth02">-->
            <!--<ul>-->
              <!--<li><a href="04_01_store.html"><span class="sub">가맹점 관리</span></a></li>-->
              <!--<li><a href="04_02_store.html"><span class="sub">지점 관리</span></a></li>-->
              <!--<li><a href="04_03_store.html"><span class="sub">매장 관리</span></a></li>-->
              <!--<li><a href="04_04_store.html"><span class="sub">매장 일괄 등록</span></a></li>-->
              <!--<li><a href="04_05_store.html"><span class="sub">승인 대역 관리</span></a></li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</li>-->
      </ul>
  </nav>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    // import {CommonBoardService} from 'api/common.service';
    @Component({
        components: {
            Menu
        }
    })
    export default class Menu extends Vue {
        @Prop() private msg!: string;
        @Prop() setMenu !: string;
        menuItem: any = null;


        menuClick(menuId: string) {

            /* 로그인 필수 메뉴
             *  cashReceiptIssue        현금영수증 발급
             *  ioc                     발급 조회 및 취소
             *  IssueViewingCancel      가맹점 정보변경/해지
             */
            if (menuId == 'cashReceiptIssue' || menuId == 'ioc' || menuId == 'IssueViewingCancel') {
                if (localStorage.accessToken) {
                    this.menuSelected(menuId);
                    this.$emit('parentEvent', menuId);
                } else {
                    this.$router.push('/login');
                }
            } else {
                this.menuSelected(menuId);
                this.$emit('parentEvent', menuId);
            }
            //this.menuSelected(menuId);
            //this.$emit('parentEvent', menuId);
        }

        @Watch('setMenu') oncahnge(){
            this.menuChangeed()
        }

        created() {
            if (this.menuItem == null) {
                this.menuItem = [
                    {id: 'cashInstitution', name: '가맹점관리',  value: '', dept: '', auth: '', on: 'sub'
                        ,subMenu:[
                        {name:'가맹점 관리', value: '',on: 'sub'},
                        {name:'지점 관리', value: '',on: 'sub'},
                        {name:'매장 관리', value: '',on: 'sub'},
                        {name:'매장 일괄 등록', value: '',on: 'sub'},
                        {name:'승인 대역 관리', value: '',on: 'sub'}
                        ]
                    },
                    {id: 'cashReceiptIssue', name: '현금영수증 관리', value: '', dept: '', auth: '', on: 'sub'
                        ,subMenu:[
                            {name:'현금영수증 발급', value: '',on: 'sub'},
                            {name:'발급 내역 조회/취소', value: '',on: 'sub'},
                            {name:'오류 내역 조회', value: '',on: 'sub'},
                            {name:'승인 파일 전송', value: '',on: 'sub'},
                            {name:'전문 오류 체크', value: '',on: 'sub'},
                            {name:'전송파일 처리결과', value: '',on: 'sub'}
                        ]
                    },
                    {id: 'ioc', name: '통계 관리', value: '', dept: '', auth: '', on: 'sub'
                        ,subMenu:[
                            {name:'회사코드별 거래현황', value: '',on: 'sub'},
                            {name:'사업자번호별 거래현황', value: '',on: 'sub'},
                            {name:'현금영수증 사업자별 정산', value: '',on: 'sub'},
                            {name:'가맹점 증감 현황', value: '',on: 'sub'},
                            {name:'가맹점수 현황 조회', value: '',on: 'sub'}
                        ]
                    },
                    {id: 'IssueViewingCancel', name: '고객지원', value: '', dept: '', auth: '', on: 'sub'
                        ,subMenu:[
                            {name:'공지사항', value: '',on: 'sub'},
                            {name:'자주 묻는 질문', value: '',on: 'sub'},
                            {name:'메일 발송', value: '',on: 'sub'},
                        ]
                    },
                    {id: 'noticeList', name: '시스템 관리', value: '', dept: '', auth: '', on: 'sub'
                        ,subMenu:[
                            {name:'약관 관리', value: '',on: 'sub'},
                            {name:'개인정보처리방침', value: '',on: 'sub'},
                            {name:'계정 권한 관리', value: '',on: 'sub'},
                            {name:'메뉴 권한 관리', value: '',on: 'sub'},
                            {name:'코드관리', value: '',on: 'sub'},
                            {name:'시스템 모니터링', value: '',on: 'sub'}
                        ]}
                ];
            } else {
                // CommonBoardService.getListDatas('/receipt','/10').then(response => {
                //
                //     }
                // ).catch();
            }

        }

        mounted() {


            this.menuChangeed()
        }

        menuChangeed(){

            if (this.$route.path.slice(this.$route.path.lastIndexOf('/') + 1) == 'main') {
                this.menuSelected('main');
            }else {
                this.menuSelected(this.$route.path.slice(this.$route.path.lastIndexOf('/') + 1));
            }
            // this.$route.path.split('/')[this.$route.path.lastIndexOf('/')]
        }

        menuSelected(menuId) {

            this.menuItem.filter(e => {

                if (e.id == menuId) {
                    e.on = 'sub on';
                }else {
                    if(e.id == this.$route.path.split('/')[2]){
                        e.on = 'sub on';
                    }else{
                        e.on = 'sub';
                    }
                }
            });
        }

        updated() {
            this.$nextTick(function () {
            });
        }

    }

</script>