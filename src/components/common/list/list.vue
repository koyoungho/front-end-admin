<template>
  <div>
    <!-- tbl search box -->
    <search v-bind:searchItemDetail=searchItems v-on:SearchToList="searchEvent" v-on:dateCheck ='searchDateEvent' ></search>
    <!-- //tbl search box -->

    <!-- tbl list box -->
    <DataGrid v-bind:dataGridDetail="searchItems" v-bind:listOnLoad ="listOnLoad" v-on:dataToPaging="dataEvent" v-on:checkBoxEvent="checkEvent" v-on:rowClick="viewEvent" v-on:authCompl="pageReload"></DataGrid>
    <!-- //tbl list box -->

    <!-- pagination -->
    <Paging v-bind:pagingDetail=searchItems.paging v-on:pageToList="pagingEvent" ></Paging>
    <!-- //pagination -->
  </div>
</template>


<script lang="ts">


    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import DataGrid from '@/components/common/list/dataGrid/dataGrid.vue';
    import Paging from '@/components/common/list/paging/paging.vue';
    import Search from '@/components/common/list/search/serch.vue';


    @Component({
        components: {
            Search,
            DataGrid,
            Paging
        }

    })

    export default class ListComponent extends Vue {
        @Prop() listObject  !: any;
        @Prop() onLoadList !: boolean ;

        listOnLoad : boolean = false;
        searchItems : any =  this.listObject;
        searchItemsOrigin : any =  this.listObject;

        @Watch('onLoadList') onChange(){
            if(this.onLoadList==true){
                this.listOnLoad = true;
            }
            else{
                this.listOnLoad = false;
            }
        }
        @Watch('listObject') onChange2(){
            this.searchItems = this.listObject;
        }

        //돔생성전 호출자
        created() {

            if(this.onLoadList==true){
                this.listOnLoad = true;
            }
            else{
                this.listOnLoad = false;
            }
        }
        //돔렌더링완료시 진행
        mounted(){
        }

        dataEvent(es){
            //데이터 로딩된후 이벤트를 받으면  변경된 페이지 정보를 전달해준다.
            if(es.lastPage > 0){
            this.$children['2'].defaultPaging(es)
            this.$children['2'].arrayPaging(es);
            }
        }
        // eventOnline(data){
        //     this.$emit('eventOnline' , data)
        // }

        searchDateEvent(data){
            this.$emit('searchDateChange' , data)
        }

        checkEvent(data){
            this.$emit('listCheckEvent' , data)
        }

        viewEvent(row){
            this.$emit('listView' , row)
        }

        searchReset(){
            this.$children['0'].getSearchData();
        }

        pagingEvent(page) {
            this.$children['1'].getCommonListData();
        }
        searchEvent(es){
            // 로컬스토리지에 해당하는 검색정보를 담고 쓴다.
            let Value = this.$route.name+''
            sessionStorage.setItem(Value, JSON.stringify(es))
            this.$children['1'].getCommonListData();
        }
        updated () {
            this.$nextTick(function () {
            })
        }
        pageReload(){
            console.log('list asd;flasjdfa;sdjfak;jsdkfa;sdfjk')

            this.$children['0'].SearchButton();
        }
    }

</script>
