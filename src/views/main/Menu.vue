<template>
  <nav class="gnb" v-on:mouseleave="menuLeave">
    <!-- main menu box -->

      <span class="gnb_bg" v-bind:style="menuStyle"></span>
      <ul class="gnb_list" >
        <!--<li v-for="menu in menuItem" v-bind:class="menu.on"><a >{{menu.name}}</a></li>-->
        <template v-for="menu in menuItem" >
        <li><a  title="페이지 이동"  v-bind:id="menu.groupCode" v-on:mouseover="menuOver" v-on:click="menuClick(sub.groupCode,menu.groupCode)" v-bind:class="menu.sub">{{menu.name}}</a>
          <div class="depth02"  v-bind:style="menuStyle " >
            <ul>
              <li v-for="sub in menu.subMenuDtos"><a v-on:click="menuClick(sub.progId,menu.groupCode)" ><span class="sub" v-on:mouseover="menuOver" v-bind:id="menu.groupCode">{{sub.name}}</span></a></li>
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

        menuClick(subId: string , menuId : string) {
            if(subId == ''){
                return;
            }
            if(menuId ==''){
                return;
            }
            this.menuStyle = "display : none;"
            this.subMenuStyle = "display : none;"
            this.$emit('parentEvent', subId);
            this.menuSelected(menuId);
        }

        @Watch('setMenu') oncahnge(){
        }

        created() {
            // this.menuItem = JSON.parse(sessionStorage.authMenu)
            if (this.menuItem == null) {
                this.menuItem = [
                    {progId:'franchiseList',groupCode : '0001', name: '가맹점관리' , sub: 'sub',subMenuDtos:[
                            {name:'가맹점 관리',progId:'franchiseList',sub: 'sub'}  ,
                            {name:'지점 관리', progId:'branchList',sub: 'sub'},
                            {name:'매장 관리', progId:'storeList',sub: 'sub'},
                            {name:'매장 일괄 등록', progId:'storeRegBulk',sub: 'sub'},
                            {name:'승인 대역 관리', progId : 'approvalBandList',sub: 'sub'}
                        ]
                    },
                    {progId:'cashReceiptIssue' ,groupCode : '0002' ,name: '현금영수증 관리', value : '', dept: '', auth: '', sub: 'sub'
                        ,subMenuDtos:[
                            {name:'현금영수증 발급', progId : 'cashReceiptIssue',sub: 'sub'},
                            {name:'발급 내역 조회/취소', progId : 'ReceiptViewCancel',sub: 'sub'},
                            {name:'오류 내역 조회', progId : 'errorList',sub: 'sub'},
                            {name:'승인 파일 전송', progId : 'approvalFileSend',sub: 'sub'},
                            {name:'전문 오류 체크', progId : 'errorCheck',sub: 'sub'},
                            {name:'전송파일 처리결과', progId : 'sendFileResult',sub: 'sub'},
                        ]
                    },
                    {progId: 'noticeList',groupCode : '0003', name: '고객지원', value : '', dept: '', auth: '', sub: 'sub'
                        ,subMenuDtos:[
                            {name:'공지사항', progId : 'noticeList',sub: 'sub'},
                            {name:'자주 묻는 질문', progId : 'fnqList',sub: 'sub'},
                            {name:'메일 발송', progId : 'sendMail',sub: 'sub'},
                        ]
                    },
                    {progId: 'ioc',groupCode : '0004',name: '통계 관리', value : '', dept: '', auth: '', sub: 'sub'
                        ,subMenuDtos:[
                            {name:'회사코드별 거래현황', progId : 'compCodeChart',sub: 'sub'},
                            {name:'사업자번호별 거래현황', progId : 'saupNumberChart',sub: 'sub'},
                            {name:'현금영수증 사업자 정산', progId : 'receipSaupCount',sub: 'sub'},
                            {name:'가맹점 증감 현황', progId : 'gajumChart',sub: 'sub'},
                            // {name:'가맹점수 현황 조회', progId : 'gajumTotal',sub: 'sub'}
                        ]
                    },
                    {progId:'policyList',groupCode : '0005', name: '시스템관리', value : '', dept: '', auth: ''
                        ,subMenuDtos:[
                            {name:'약관 관리', progId : 'policyList',sub: 'sub'},
                            {name:'개인보호처리방침', progId : 'personalList',sub: 'sub'},
                            {name:'계정 권한 관리', progId : 'mnUser',sub: 'sub'},
                            {name:'메뉴 권한 관리', progId : 'mnMenu',sub: 'sub'},
                            {name:'코드관리', progId : 'mnCode',sub: 'sub'},
                            {name:'시스템 모니터링', progId : 'systemMonitoring',sub: 'sub'}
                        ]}
                ];
            }
            this.menuHeight();
        }

        mounted() {
        }

        menuHeight(){
            let count = 0;
            this.menuItem.filter(e=>{

                if(count < e.subMenuDtos.length){
                    count = e.subMenuDtos.length;
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
            // this.menuSelected(e.target.id)
            this.menuStyle='display:block ; height : '+this.subHeigth+'px';
            this.subMenuStyle='display:none';
        }

        menuSelected(menuId) {
            this.menuItem.filter(e => {
                if (e.groupCode == menuId) {
                    e.sub = 'sub on';
                }else {
                    e.sub = 'sub';
                }
            });
        }

        updated() {
            this.$nextTick(function () {
            });
        }

    }

</script>