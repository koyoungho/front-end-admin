<template>
      <!-- pagination -->
      <div class="pagination" v-show="pageShow">
    <!--{{pagingDetail}} <br>-->
    <a href="#" class="btn_fprev"  v-on:click="firstPageClick()">맨앞</a>
    <a href="#" class="btn_prev" v-on:click="prePageClick()">이전 {{prePage}}</a>
    <span class="num">
          <a v-for="n in pageBound" v-on:click="onPaging(n.value)">
            <template v-if="n.key==pageNum" readOnly><strong style="color: red">{{n.value}}</strong></template>
            <template v-if="n.key!=pageNum">{{n.value}}</template>
          </a>
        </span>
    <a href="#" class="btn_next"  v-on:click="nextPageClick()">다음 {{lastPage}}</a>
    <a href="#" class="btn_enext" v-on:click="lastPageClick()">맨뒤</a>
    </div>
    <!-- //pagination -->
</template>
<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';


    @Component({
        components: {
            Paging
        },
    })
    export default class Paging extends Vue {
        @Prop() private pagingDetail!: any;

        pageShow : boolean = false;
        pageBound : any =[] ;

        total : number = 0;
        pageNum : number = 0;
        PAGEBLOCK : number = 0;
        pageSize : number = 0;
        totalPages : number = 0;
        lastPage : number = 0;
        nextPage : number = 0;
        prePage : number = 0;
        firstPage : number = 0;


        created(){

        }
        mounted(){

        }

        defaultPaging(es) {
            if (es.lastPage > 0) {
                // 라스트페이지가 존재할경우
                this.pageShow =true;
                this.total = this.pagingDetail.totalRecords; // 총건수
                this.pageNum = this.pagingDetail.currentPage;// 현재페이지
                this.PAGEBLOCK = this.pagingDetail.perPage;
                this.pageSize = this.pagingDetail.viewPageSize;
                this.totalPages = this.pagingDetail.lastPage;
                this.firstPage = ((this.pageNum - 1) / this.PAGEBLOCK) * this.PAGEBLOCK + 1;
                if (this.firstPage <= 0) this.firstPage = 1;
                this.lastPage = this.pageNum;
                this.nextPage = this.lastPage + 1;
                this.prePage = this.pageNum -1 ;
            }
            else {
            }
        }
        firstPageClick(){
            this.onPaging(1)
        }
        //이전페이지
        prePageClick(){
            if( this.firstPage > this.PAGEBLOCK ){
                this.onPaging(this.prePage)
            }
        }
        //다음페이지
            nextPageClick(){
                if( this.lastPage < this.totalPages ){
                    alert(this.nextPage);
                    this.onPaging(this.nextPage)
                }
        }
        //마지막페이지
        lastPageClick(){
            this.onPaging(this.totalPages)
        }

        arrayPaging(es){
                this.pageBound =[];
                for(let i = this.pagingDetail.from ; i<=this.pagingDetail.to; i++){
                    this.pageBound.push({key:i,value:i});
                }
        }

        onPaging(e : number){
            //전체 오브젝트변경후
            this.pagingDetail.currentPage = e;
            //현재페이지 체크
            this.pageNum = e;
            this.$emit('pageToList' ,  e)
        }
        updated(){
        }


    }

</script>

<style>

</style>