<template>
  <nav class="gnb" v-on:mouseleave="menuLeave">
    <!-- main menu box -->

      <span class="gnb_bg" v-bind:style="menuStyle"></span>
      <ul class="gnb_list" >
        <!--<li v-for="menu in menuItem" v-bind:class="menu.on"><a >{{menu.name}}</a></li>-->
        <template v-for="menu in menuItem" >
        <li><a href="" title="페이지 이동"  v-bind:id="menu.id" v-on:mouseover="menuOver" v-on:click="menuClick(sub.id,menu.id)" v-bind:class="menu.on">{{menu.name}}</a>
          <div class="depth02"  v-bind:style="menuStyle " >
            <ul>
              <li v-for="sub in menu.subMenu"><a v-on:click="menuClick(sub.id,menu.id)" ><span class="sub" v-on:mouseover="menuOver" v-bind:id="menu.id">{{sub.name}}</span></a></li>
            </ul>
          </div>
        </li>
        </template>
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
        menuStyle : any = "display: none;";
        subMenuStyle : any = "display: none;";
        subHeigth : any = "";

        menuClick(subId: string , menuId) {

            if(subId == ''){
                return;
            }
            /* 로그인 필수 메뉴
             *  cashReceiptIssue        현금영수증 발급
             *  ioc                     발급 조회 및 취소
             *  IssueViewingCancel      가맹점 정보변경/해지
             */
            // if (menuId == 'cashReceiptIssue' || menuId == 'ioc' || menuId == 'IssueViewingCancel') {
            //     if (localStorage.accessToken) {
            //         this.menuSelected(menuId);
            //         this.$emit('parentEvent', menuId);
            //     } else {
            //         this.$router.push('/login');
            //     }
            // } else {
            //     this.menuSelected(menuId);
            //     this.$emit('parentEvent', menuId);
            // }
            this.menuSelected(menuId);
            this.menuStyle = "display : none;"
            this.subMenuStyle = "display : none;"
            this.$emit('parentEvent', subId);
            this.menuSelected(menuId);
            /*
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
            */
        }

        @Watch('setMenu') oncahnge(){
        }

        created() {
            if (this.menuItem == null) {
                this.menuItem = [
                    {id:'franchiseList', name: '가맹점관리' , on: 'sub',subMenu:[
                            {name:'가맹점 관리',id:'franchiseList',on: 'sub'}  ,
                            {name:'지점 관리', id:'branchList',on: 'sub'},
                            {name:'매장 관리', id:'storeList',on: 'sub'},
                            {name:'매장 일괄 등록', id:'storeRegBulk',on: 'sub'},
                            {name:'승인 대역 관리', id : 'approvalBandList',on: 'sub'}
                        ]
                    },
                    {id:'cashReceiptIssue', name: '현금영수증 관리', value : '', dept: '', auth: '', on: 'sub'
                        ,subMenu:[
                            {name:'현금영수증 발급', id : 'cashReceiptIssue',on: 'sub'},
                            {name:'발급 내역 조회/취소', id : 'ReceiptViewCancel',on: 'sub'},
                            {name:'오류 내역 조회', id : 'errorList',on: 'sub'},
                            {name:'승인 파일 전송', id : 'approvalFileSend',on: 'sub'},
                            {name:'전문 오류 체크', id : 'errorCheck',on: 'sub'},
                            {name:'전송파일 처리결과', id : 'sendFileResult',on: 'sub'},
                        ]
                    },
                    {id: 'noticeList', name: '고객지원', value : '', dept: '', auth: '', on: 'sub'
                        ,subMenu:[
                            {name:'공지사항', id : 'noticeList',on: 'sub'},
                            {name:'자주 묻는 질문', id : 'fnqList',on: 'sub'},
                            {name:'메일 발송', id : 'sendMail',on: 'sub'},
                        ]
                    },
                    {id: 'ioc', name: '통계 관리', value : '', dept: '', auth: '', on: 'sub'
                        ,subMenu:[
                            {name:'회사코드별 거래현황', id : '',on: 'sub'},
                            {name:'사업자번호별 거래현황', id : '',on: 'sub'},
                            {name:'현금영수증 사업자 정산', id : '',on: 'sub'},
                            {name:'가맹점 증감 현황', id : '',on: 'sub'},
                            {name:'가맹점수 현황 조회', id : '',on: 'sub'}
                        ]
                    },
                    {id:'policyList', name: '시스템관리', value : '', dept: '', auth: ''
                        ,subMenu:[
                            {name:'약관 관리', id : 'policyList',on: 'sub'},
                            {name:'개인정보처리방침', id : 'personalList',on: 'sub'},
                            {name:'계정 권한 관리', id : 'mnUser',on: 'sub'},
                            {name:'메뉴 권한 관리', id : 'mnMenu',on: 'sub'},
                            {name:'코드관리', id : '',on: 'mnCode'},
                            {name:'시스템 모니터링', id : 'systemMonitoring',on: 'sub'}
                        ]}
                ];
            } else {
                // CommonBoardService.getListDatas('/receipt','/10').then(response => {
                //
                //     }
                // ).catch();
            }
            this.menuHeight();
        }

        mounted() {
        }

        menuHeight(){
            let count = 0;
            this.menuItem.filter(e=>{

                if(count < e.subMenu.length){
                    count = e.subMenu.length;
                }

            })
            this.subHeigth = count * 40 + 20;
        }

        menuLeave(e){
            this.menuStyle='display:none';
            this.subMenuStyle='display:none';
        }

        menuOver(e){
            e.target.class='sub on'
            this.menuSelected(e.target.id)
            this.menuStyle='display:block ; height : '+this.subHeigth+'px';
            this.subMenuStyle='display:none';
            // this.subHeigth = 'heigth : '+ (40 * .subMenu.length)+'px';
        }

        menuSelected(menuId) {
            this.menuItem.filter(e => {
                if (e.id == menuId) {
                    e.on = 'sub on';
                }else {
                    e.on = 'sub';
                }
            });
        }

        updated() {
            this.$nextTick(function () {
            });
        }

    }

</script>