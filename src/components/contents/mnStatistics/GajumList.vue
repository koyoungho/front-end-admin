<template>
<div>
    <h4>가맹점 현황</h4>
    <!-- tbl list box -->
    <div class="tbl_scroll_x_box">
        <!-- tbl list01 -->
        <table class="tbl_list04 type03 page_stats04">
            <caption>가맹점 현황</caption>
            <colgroup>
                <col width="120px">
                <col span="13" width="80px">
            </colgroup>
            <thead>
            <tr>
                <th scope="col">영수증 사업자</th>
                <th scope="col">항목</th>
                <template v-for="data,index in dateArray">
                <th scope="col">{{dateFormats(data)}}</th>
                </template>
                <th scope="col">합계</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="data,index in gajumList">
                <tr>
                <template v-if="index==0 || index==3">
                <th scope="row" rowspan="3">{{data.SOLU=='0002' ? 'KT':'롯데'}}</th>
                </template>
                <th scope="row">{{changeVal(data.TYPE)}}</th>
                <template v-for="da,indexs in dateArray">
                <td class="right">{{data[dateArray[indexs]]}}</td>
                </template>
                <td>{{data.total}}</td>
                </tr>
            </template>

            </tbody>
        </table>
    </div>
    <!-- //tbl list box -->

    <h4>현금영수증 발행 현황</h4>
    <!-- tbl list box -->
    <div class="tbl_scroll_x_box">
        <!-- tbl list01 -->
        <table class="tbl_list04 type03 page_stats04">
            <caption>현금영수증 발행 현황</caption>
            <colgroup>
                <col width="120px">
                <col span="13" width="80px">
            </colgroup>
            <thead>
            <tr>
                <th scope="col">항목</th>
                <template v-for="data,index in dateArray2">
                    <th scope="col">{{dateFormats(data)}}</th>
                </template>
                <th scope="col">합계</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="data,index in receiptList">
                <tr>
                  <template v-if="index==0">
                    <th scope="row" rowspan="1">{{checkOner(data.SOLU)}}</th>
                  </template>
                  <template v-if="index==1 || index==3">
                    <th scope="row" rowspan="2">{{checkOner(data.SOLU)}}</th>
                  </template>
                    <template v-for="da,indexs in dateArray2">
                        <td class="right">{{data[dateArray2[indexs]]}}</td>
                    </template>
                    <td>{{data.total}}</td>
                </tr>
            </template>
            </tbody>
        </table>
    </div>
    <!-- //tbl list box -->
</div>


</template>

<script lang="ts">

    import {addMonths, differenceInCalendarMonths, differenceInMonths, format} from 'date-fns';
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';

    @Component({

        components: {
            GajumList
        }
    })
    export default class GajumList extends Vue {
        @Prop() searchStartDate !:string
        gajumList : any = [];
        gajumCount : number = 0;
        receiptList : any = [];
        receiptCount : number = 0;
        nowDate : any = new Date();
        dateArray : any = [];
        dateArrayCount : number = 0;
        dateArray2 : any = [];
        dateArray2Count : number = 0;

        dateFormats(date) {
            let dates = '';
            dates = date.substr(2,2)+'.'+date.substr(4,2)+'월'
            return dates
        }

        changeVal(data){
            if(data=='SUM'){
                return '누계'
            }else if(data=='APRV'){
                return '가입'
            }else{
                return '해지'
            }
        }
        checkOner(data){
            if(data=='0001'){
                return '롯데'
            }else if(data=='0002'){
                return 'KT'
            }else{
                return '전체(승인-취소)'
            }
        }

        created(){
        }

        mounted(){

        }

        gajumStatistics(date1,date2){
             CommonBoardService.getListDatas('statistics','gajum',{responseType:'GRID',searchStartDate: date1 , searchEndDate: date2}).then(result=>{
                  if(result.status==200){
                      console.log(result)
                      this.gajumList =[];
                      this.gajumList = result.data
                      let ObjectData : any = [];
                      result.data.filter((e,index)=>{
                          if(index==0){
                            Object.keys(e).forEach(s=>{
                                if(s=='SOLU' || s=='TYPE'){
                                }
                                else{
                                    ObjectData.push(s)
                                }
                            })
                          }
                      })
                      this.dateArray = ObjectData
                      let data : any = []
                      this.gajumList.filter((e,index)=>{
                          let totalCount = 0;

                          this.dateArray.filter((s,indexs)=>{
                              let val =0;
                              if(e[s]){
                                  val = e[this.dateArray[indexs]];
                              }else{
                                  val = 0;
                              }
                              totalCount += val
                          })
                          e['total'] = totalCount
                      })
                  }
             }).catch(e=>{
             })
        }

        receuptStatistics(date1,date2){
            CommonBoardService.getListDatas('statistics','receipt',{responseType:'GRID',searchStartDate: date1 , searchEndDate: date2}).then(result=>{
                if(result.status==200){
                    console.log(result)
                    this.receiptList =[];
                    this.receiptList = result.data
                    let ObjectData : any = [];
                    let totalcount = 0;
                    result.data.filter((e,index)=>{
                        if(index==0){
                            Object.keys(e).forEach(s=>{
                                if(s=='SOLU' || s=='TYPE'){
                                }
                                else{
                                    ObjectData.push(s)
                                }
                            })
                        }
                    })
                    this.dateArray2 = ObjectData
                    let data : any = []
                    this.receiptList.filter((e,index)=>{
                        let totalCount = 0;
                        this.dateArray2.filter((s,indexs)=>{
                            let val =0;
                            if(e[s]){
                                val = e[this.dateArray2[indexs]];
                            }else{
                                val = 0;
                            }
                            totalCount += val
                        })
                        e['total'] = totalCount
                    })
                }
            }).catch(e=>{
            })
        }

    }
</script>

<style scoped>

</style>