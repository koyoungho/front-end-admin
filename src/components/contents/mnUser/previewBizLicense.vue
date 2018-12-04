<template>
    <div>
    <!-- popup medium -->
    <div class="popup_modal"></div>
    <div id="popup_receipt" class="popup_wrapper medium" tabindex="0" style="display: block;"> <!-- large medium -->
        <!-- popup header -->
        <div class="popup_header">
            <!-- h2 -->
            <h2>사업자등록증 사본</h2>
            <a href="#" class="btn_close b-close">Close</a>
        </div>
        <!-- popup body -->
        <div class="popup_body">
            <!-- popup content -->
            <div class="popup_content">
                <p class="receipt">
                    <!--<img src="images/img_receipt01.png" alt="사업자등록증 사본">-->
                </p>
            </div>
            <!-- //popup content -->
            <!-- bottom area -->
            <div class="bottom_area">
                <!-- btn -->
                <div class="btn_bot">
                    <button type="button" class="btn_b01 bg02">닫기</button>
                </div>
            </div>
        </div>
        <!-- //popup body -->
    </div>
    <!-- //popup -->

    </div>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            previewBizLicense
        }
    })
    export default class previewBizLicense extends Vue {

    }

</script>


<style scoped>

</style>