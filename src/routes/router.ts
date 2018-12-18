import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import LoginComponent from "../views/login/login.vue"
import SecureComponent from "../views/login/secure.vue"

import Main from "../components/contents/Main.vue" //메인
import PhoneAuth from "../components/contents/login/PhoneAuth.vue" //휴대폰 본인 인증
import SearchIdInput from "../components/contents/login/SearchIdInput.vue" //아이디 찾기 입력
import SearchIdResult from "../components/contents/login/SearchIdResult.vue" //아이디 찾기 결과
import InitPass from "../components/contents/login/InitPass.vue" //비밀번호 초기화

// 정보변경
import OtpCheck from "../views/login/otpCheck.vue"
import OtpCheckm from "../views/login/otpCheckm.vue"
import MyPage from "../components/contents/login/myPage.vue" //아이디 찾기 결과

//가맹점 관리
import FranchiseList from "../components/contents/franchiseManage/FranchiseList.vue" //매장관리 리스트
import FranchiseDetl from "../components/contents/franchiseManage/FranchiseDetl.vue" //매장관리 상세
import FranchiseReg from "../components/contents/franchiseManage/FranchiseReg.vue" //매장관리 등록
import FranchiseRegCmpl from "../components/contents/franchiseManage/FranchiseRegCmpl.vue" //매장관리 등록 완료
import BranchList from "../components/contents/franchiseManage/BranchList.vue" //지점관리 리스트
import BranchDetl from "../components/contents/franchiseManage/BranchDetl.vue" //지점관리 상세
import BranchReg from "../components/contents/franchiseManage/BranchReg.vue" //지점관리 등록
import BranchRegCmpl from "../components/contents/franchiseManage/BranchRegCmpl.vue" //지점관리 등록 완료
import StoreList from "../components/contents/franchiseManage/StoreList.vue" //매장관리 리스트
import StoreDetl from "../components/contents/franchiseManage/StoreDetl.vue" //매장관리 상세
import StoreReg from "../components/contents/franchiseManage/StoreReg.vue" //매장관리 등록
import StoreRegCmpl from "../components/contents/franchiseManage/StoreRegCmpl.vue" //매장관리 등록 완료
import StoreRegBulk from "../components/contents/franchiseManage/StoreRegBulk.vue" //매장 일괄 등록
import ApprovalBandList from "../components/contents/franchiseManage/ApprovalBandList.vue" //승인대역 리스트
import ApprovalBandReg from "../components/contents/franchiseManage/ApprovalBandReg.vue" //승인대역 신청

//현금영수증 관리
import CashReceiptIssue from "../components/contents/issuanceOfCashReceipt/CashReceiptIssue.vue" //현금영수증 발급
import CashReceiptBulkIssue from "../components/contents/issuanceOfCashReceipt/CashReceiptBulkIssue.vue" //현금영수증 발급(대량)
import CashReceiptIssueView from "../components/contents/issuanceOfCashReceipt/CashReceiptIssueView.vue" //현금영수증 발급(출력)
import ReceiptViewCancel from "../components/contents/issuanceOfCashReceipt/ReceiptViewCancel.vue" //발급내역 조회및 취소
import ReceiptViewCancelDetl from "../components/contents/issuanceOfCashReceipt/ReceiptViewCancelDetl.vue" //현금영수증 발급 조회 및 취소
import ErrorList from "../components/contents/issuanceOfCashReceipt/ErrorList.vue" //오류내역 조회
import ApprovalFileSend from "../components/contents/issuanceOfCashReceipt/ApprovalFileSend.vue" //승인파일 전송
import ErrorCheck from "../components/contents/issuanceOfCashReceipt/ErrorCheck.vue" //전문 오류 체크
import SendFileResult from "../components/contents/issuanceOfCashReceipt/SendFileResult.vue" //전송파일 처리 결과

//고객지원
import NoticeList from "../components/contents/notice/NoticeList.vue" //공지사항 리스트
import NoticeDetl from "../components/contents/notice/NoticeDetl.vue" //공지사항 상세
import RegNotice from "../components/contents/notice/RegNotice.vue" //공지사항 등록
import FnqList from "../components/contents/fnq/FnqList.vue" //자주묻는질문리스트
import RegFnq from "../components/contents/fnq/RegFnq.vue" //자주묻는질문등록
import SendMail from "../components/contents/sendMail/SendMail.vue" //메일발송

//시스템관리
import PolicyHistoryList from "../components/contents/policy/PolicyHistoryList.vue" //약관관리/개인정보처리 이력목록
import PolicyReg from "../components/contents/policy/PolicyReg.vue" // 약관 등록/수정
import Policy from "../components/contents/policy/Policy.vue" //약관,개인 뷰
import PolicyDetail from "../components/contents/policy/PolicyDetail.vue" //이용약관 상세
import PolicyList from "../components/contents/policy/PolicyList.vue" //이력에 따른 약관관리/개인정보처리 목록

import MnUserList from "../components/contents/mnUser/MmUserList.vue"//계정관리
import RegUser from "../components/contents/mnUser/RegUser.vue"//계정등록
import ModUser from "../components/contents/mnUser/ModUser.vue"//계정수정
import PreviewBizLicense from "../components/contents/mnUser/previewBizLicense.vue"//사업자등록증 미리보기

import MnMenuList from "../components/contents/mnMenu/MnMenuList.vue"//메뉴관리
import RegMenu from "../components/contents/mnMenu/RegMenu.vue"//메뉴등록
import FranchiseRegStep1Result from "../components/common/kmc/FranchiseRegStep1Result.vue"

import MnCode from "../components/contents/mnCode/MnCode.vue"//코드관리

import CompCodeChart from "../components/contents/mnStatistics/CompCodeChart.vue"//회사코드별거래현황
import SaupNumberChart from "../components/contents/mnStatistics/SaupNumberChart.vue"//사업자번호별 거래현황
import ReceipSaupCount from "../components/contents/mnStatistics/ReceipSaupCount.vue"//현금영수증사업자정산
import JungsanRuleSearch from "../components/contents/mnStatistics/JungsanRuleSearch.vue"//정산룰조회
import JungsanReg from "../components/contents/mnStatistics/JungsanReg.vue"//정산등록
import JungsanRuleReg from "../components/contents/mnStatistics/JungsanRuleReg.vue"//정산룰등록
import JungsanDetail from "../components/contents/mnStatistics/JungsanDetail.vue"//정산룰등록
import GajumChart from "../components/contents/mnStatistics/GajumChart.vue"//가맹점증감현황
import GajumTotal from "../components/contents/mnStatistics/GajumTotal.vue"//가맹점수현황조회

import SystemMonitoring from "../components/contents/systemMonitoring/SystemMonitoring.vue"// 시스템모니터링


Vue.use(Router)

export default new Router({
    // mode : 'history' ,
    base: '',
    routes: [
        {
            path: "/home",
            name: "home",
            component: Home,
            meta : {permission: 'any',
                fail: '/error'},
            children : [
                {path:'main', name:'main', component: Main ,meta: {authRequired: true} }, //메인
                // {path:'chgPass',component: ChgPass }, //비밀번호 변경
                {path:'phoneAuth', name:'phoneAuth', component: PhoneAuth ,meta: {authRequired: true} }, //핸드폰 인증
                {path:'policy', name:'policy', component:Policy ,meta: {authRequired: false}}, //이용약관 및 개인보호처리방침
                
                //정보변경
                {path:'myPage', name:'myPage', component: MyPage ,meta: {authRequired: true}}, //이용약관 및 개인보호처리방침

                //가맹점관리
                {path:'franchiseList', name:'franchiseList', component: FranchiseList ,meta: {authRequired: true}}, //가맹점관리 리스트
                {path:'franchiseDetl', name:'franchiseDetl', component: FranchiseDetl ,meta: {authRequired: true}}, //가맹점 상세
                {path:'franchiseReg', name:'franchiseReg', component: FranchiseReg ,meta: {authRequired: true}}, //가맹점 등록
                {path:'franchiseRegCmpl', name:'franchiseRegCmpl', component: FranchiseRegCmpl,meta: {authRequired: true} }, //가맹점 등록 완료
                {path:'branchList', name:'branchList', component: BranchList ,meta: {authRequired: true}}, //지점관리 리스트
                {path:'branchDetl', name:'branchDetl', component: BranchDetl,meta: {authRequired: true} }, //지점 상세
                {path:'branchReg', name:'branchReg', component: BranchReg ,meta: {authRequired: true}}, //지점 등록
                {path:'branchRegCmpl', name:'branchRegCmpl', component: BranchRegCmpl ,meta: {authRequired: true}}, //지점 등록 완료
                {path:'storeList', name:'storeList', component: StoreList ,meta: {authRequired: true}}, //매장관리 리스트
                {path:'storeDetl', name:'storeDetl', component: StoreDetl ,meta: {authRequired: true}}, //매장 상세
                {path:'storeReg', name:'storeReg', component: StoreReg ,meta: {authRequired: true}}, //매장 등록
                {path:'storeRegCmpl', name:'storeRegCmpl', component: StoreRegCmpl ,meta: {authRequired: true}}, //매장 등록 완료
                {path:'storeRegBulk', name:'storeRegBulk', component: StoreRegBulk ,meta: {authRequired: true}}, //매장 일괄 등록 완료
                {path:'approvalBandList', name:'approvalBandList', component: ApprovalBandList ,meta: {authRequired: true}}, //승인대역 리스트
                {path:'approvalBandReg', name:'approvalBandReg', component: ApprovalBandReg ,meta: {authRequired: true}}, //승인대역 신청

                //현금영수증 관리
                {path:'cashReceiptIssue', name:'cashReceiptIssue', component: CashReceiptIssue ,meta: {authRequired: true}}, //현금영수증 발급
                {path:'cashReceiptIssueView', name:'cashReceiptIssueView', component: CashReceiptIssueView ,meta: {authRequired: true}}, //현금영수증 발급(출력)
                {path:'cashReceiptBulkIssue', name:'cashReceiptBulkIssue', component: CashReceiptBulkIssue ,meta: {authRequired: true}}, //현금영수증 발급(대량)
                {path:'receiptViewCancel', name:'receiptViewCancel', component: ReceiptViewCancel ,meta: {authRequired: true}}, //발급 내역 조회/취소
                {path:'receiptViewCancelDetl', name:'receiptViewCancelDetl', component: ReceiptViewCancelDetl ,meta: {authRequired: true}}, //현금영수증 발급 조회 및 취소
                {path:'errorList', name:'errorList', component: ErrorList ,meta: {authRequired: true}}, //오류 내역 조회
                {path:'approvalFileSend', name:'approvalFileSend', component: ApprovalFileSend ,meta: {authRequired: true}}, //승인파일전송
                {path:'errorCheck', name:'errorCheck', component: ErrorCheck ,meta: {authRequired: true}},//전문 오류 체크
                {path:'sendFileResult', name:'sendFileResult', component: SendFileResult ,meta: {authRequired: true}}, //전송 파일 처리결과

                //고객지원>공지사항
                {path:'noticeList',component: NoticeList, name:'noticeList' ,meta: {authRequired: true}}, //공지사항 리스트
                {path:'noticeDetl',component: NoticeDetl, name:'noticeDetl' ,meta: {authRequired: true}}, //공지사항 상세
                {path:'regNotice',component: RegNotice, name: 'regNotice' ,meta: {authRequired: true}}, //공지사항 등록/수정
                //고객지원>자주묻는질문
                {path:'fnqList',component: FnqList, name:'fnqList' ,meta: {authRequired: true}}, //자주묻는질문리스트
                {path:'regFnq',component: RegFnq, name:'regFnq' ,meta: {authRequired: true}}, //자주묻는질문 등록
                //고객지원>메일발송
                {path:'sendMail',component: SendMail, name:'sendMail' ,meta: {authRequired: true}}, //자주묻는질문 등록

                //통계관리
                //통계관리>회사코드별 거래현황
                {path:'compCodeChart',component: CompCodeChart, name:'compCodeChart' ,meta: {authRequired: true}},
                //통계관리>사업자번호별 거래현황
                {path:'saupNumberChart',component: SaupNumberChart, name:'saupNumberChart' ,meta: {authRequired: true}},
                //통계관리>현금영수증 사업자 정산
                {path:'receipSaupCount',component: ReceipSaupCount, name:'receipSaupCount' ,meta: {authRequired: true}},
                {path:'jungsanRuleSearch',component: JungsanRuleSearch, name:'jungsanRuleSearch' ,meta: {authRequired: true}},//정산룰조회
                {path:'jungsanRuleReg',component: JungsanRuleReg, name:'jungsanRuleReg' ,meta: {authRequired: true}},//정산룰조회
                {path:'jungsanReg',component: JungsanReg, name:'jungsanReg' ,meta: {authRequired: true}},//신규정산등록
                {path:'jungsanDetail',component: JungsanDetail, name:'jungsanDetail' ,meta: {authRequired: true}},//정산상세보기
                //통계관리>가맹점 증감 현황
                {path:'gajumChart',component: GajumChart, name:'gajumChart' ,meta: {authRequired: true}},
                //통계관리>가맹점수 현황 조회
                {path:'gajumTotal',component: GajumTotal, name:'gajumTotal' ,meta: {authRequired: true}},


                //시스템관리>약관처리
                {path:'policyHistoryList',component: PolicyHistoryList, name:'policyHistoryList' ,meta: {authRequired: true}}, //약관이력목록
                {path:'policyReg',component: PolicyReg, name:'policyReg' ,meta: {authRequired: true}}, //약관 등록/수정
                {path:'policyList',component: PolicyList, name:'policyList' ,meta: {authRequired: true}}, //약관목록
                {path:'policyDetail',component: PolicyDetail, name:'policyDetail' ,meta: {authRequired: true}}, //약관상세
                //시스템관리>개인정보처리방침
                {path:'personalHistoryList',component: PolicyHistoryList, name:'personalHistoryList' ,meta: {authRequired: true}}, //개인정보처리방침 이력 목록
                {path:'personalReg',component: PolicyReg, name:'personalReg' ,meta: {authRequired: true} }, //개인정보처리방침 등록/수정
                {path:'personalList',component:PolicyList, name:'personalList' ,meta: {authRequired: true}}, //개인정보처리방침 목록
                {path:'personalDetail',component:PolicyDetail, name:'personalDetail' ,meta: {authRequired: true}}, //개인정보처리방침 상세
                // 시스템관리>계정 권한 관리,
                {path:'mnUser',component: MnUserList, name:'mnUserList' ,meta: {authRequired: true}}, //계정리스트
                {path:'regUser',component: RegUser, name:'regUser' ,meta: {authRequired: true}}, //계정 등록
                {path:'modUser',component: ModUser, name:'modUser' ,meta: {authRequired: true}}, //계정수정
                {path:'previewBizLicense',component: PreviewBizLicense, name:'previewBizLicense' ,meta: {authRequired: true}}, //사업자 등록증 미리보기
                //시스템관리>메뉴 권한 관리
                {path:'mnMenu',component: MnMenuList, name:'mnMenuList' ,meta: {authRequired: true}}, //
                {path:'regMenu',component: RegMenu, name:'regMenu' ,meta: {authRequired: true}}, //
                //시스템관리>코드관리
                {path:'mnCode',component: MnCode, name:'mnCode' ,meta: {authRequired: true}}, //
                //시스템관리>시스템 모니터링,
                {path:'systemMonitoring',component: SystemMonitoring, name:'systemMonitoring' ,meta: {authRequired: true}}, //시스템모니터링
            ]
        },
        { path: "/login", name: "login",  component: LoginComponent},

        { path: "/otpCheck", name: "otpCheck",  component: OtpCheck ,meta: {authRequired: false}},
        { path: "/otpCheckm", name: "otpCheckm",  component: OtpCheckm ,meta: {authRequired: false}},
        {path:'/searchIdInput', name:'searchIdInput', component: SearchIdInput ,meta: {authRequired: false}}, //아이디 찾기
        {path:'/searchIdResult', name:'searchIdResult', component: SearchIdResult ,meta: {authRequired: false}}, //아이디 찾기 결과
        {path:'/initPass', name:'initPass',component: InitPass ,meta: {authRequired: false}}, //비밀번호 초기화

        {path: "/franchiseRegStep1Result", name: "franchiseRegStep1Result", component: FranchiseRegStep1Result},
        {
            path: "/secure",
            name: "secure",
            component: SecureComponent
        },
        {
            path: '', redirect: "/login"
        },
        {
            path: "**", redirect: "/login"
        },
        { path: 'error' , redirect: "/error"},

    ]
})



