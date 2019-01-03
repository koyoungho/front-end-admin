<template>
    <div>
    <!-- popup medium -->
    <div class="popup_modal"></div>
    <div id="popup_receipt" class="popup_wrapper medium" tabindex="0" style="display: block;"> <!-- large medium -->
        <!-- popup header -->
        <div class="popup_header">
            <!-- h2 -->
            <h2>사업자등록증 사본</h2>
            <a href="#" class="btn_close b-close" v-on:click="closePop">Close</a>
        </div>
        <!-- popup body -->
        <div class="popup_body">
            <!-- popup content -->
            <div class="popup_content">
                <p class="receipt">
                    <img src="../../../assets/images/img_receipt01.png" alt="사업자등록증 사본">
                </p>
            </div>
            <!-- //popup content -->
            <!-- bottom area -->
            <div class="bottom_area">
                <!-- btn -->
                <div class="btn_bot">
                    <button type="button" class="btn_b01 bg02" v-on:click="closePop">닫기</button>
                </div>
            </div>
        </div>
        <!-- //popup body -->
    </div>
    <!-- //popup -->

    </div>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({
        components: {
            previewBizLicense
        }
    })
    export default class previewBizLicense extends Vue {
        @Prop() listObject  !: any;

        reqRowData : any = this.listObject;

        closePop(){
            this.$emit('close');
        }

        created(){
            console.log('사업장 사본 확인 화면')
            console.log(this.reqRowData)
        }
    }

</script>


<style scoped>

</style>