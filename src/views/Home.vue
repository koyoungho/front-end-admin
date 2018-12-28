<template>
  <div id="wrapper">
    <header id="header">
      <!-- top -->
      <Top></Top>
      <!-- //top -->
      <!-- menu -->
      <Menu  v-on:parentEvent="updateView" v-if="menuShow" v-bind:setMenu="routerMenuChange"></Menu>
      <!-- //menu -->
    </header>
    <router-view></router-view>
    <bottom msg="로그인페이지 데코레이터"/>
  </div>
</template>



<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import Top from '@/views/main/Top.vue'; // @ is an alias to /src
    import Menu from '@/views/main/Menu.vue'; // @ is an alias to /src
    import Bottom from '@/views/main/Bottom.vue';
    import {CommonBoardService} from "../api/common.service";

    @Component({
        components: {
            Menu,
            Top,
            Bottom
        }
    })
    export default class Home extends Vue {
        //@Prop() private menuShow: boolean = true;
        menuShow: any = true;
        routerMenuChange : any = '';
        routerPath : any = {};
        //menuShow = this.menuShow
        routerHistory :any = "";
        // 메뉴 콤포넌트에서 이벤트 처리
        updateView (e: string) {
            // 라우터의 경로를 이동시켜준다
            this.$router.push('/home/'+e);
        }

        // 라우터 경로 변경시 이벤트 발생
        @Watch('$route') onChange(now,pre){
            window.scrollTo(0,0);

            if(this.$route.path.slice(this.$route.path.lastIndexOf('/')+1) =='main'){
                this.routerMenuChange = 'main';
            }
            else{
                this.routerMenuChange = this.$route.path.slice(this.$route.path.lastIndexOf('/')+1);
            }
        }

        created() {
            //console.log("Home created :: "+this.menuShow)

            //20분마다 sessionStorage.accessToken 갱신
            setInterval(this.tokenRefresh, (1000 * 60) * 10 );
        }
        mounted() {
            //console.log("Home mounted :: " +this.menuShow)
        }

        //20분마다 accessToken 갱신
        tokenRefresh() {
            if(sessionStorage.accessToken) { //로그인을 한 상태 확인
                // api 데이터 호출
                CommonBoardService.getListDatas('auth', null, '').then((response) => {
                        let result: any = response.data;
                        if (result != null) {
                            sessionStorage.accessToken = result.accesstoken;
                        } else {
                        }
                    }
                    , (error) => {
                    }
                ).catch((response) => {
                });
            }
        }
    }
</script>