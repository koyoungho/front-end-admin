import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import LoginComponent from "../views/login/login.vue"
import SecureComponent from "../views/login/secure.vue"

// import ioc from "../components/contents/issuanceOfCashReceipt/iocList.vue"

import Main from "../components/contents/Main.vue" //메인
import ChgPass from "../components/contents/login/ChgPass.vue" //비밀번호 변경
import PhoneAuth from "../components/contents/login/PhoneAuth.vue" //휴대폰 본인 인증
import SearchIdInput from "../components/contents/login/SearchIdInput.vue" //아이디 찾기 입력
import SearchIdResult from "../components/contents/login/SearchIdResult.vue" //아이디 찾기 결과
import InitPass from "../components/contents/login/InitPass.vue" //비밀번호 초기화
import Policy from "../components/contents/policy/Policy.vue" //이용약관

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

// import CashIntstitution from "../components/contents/cashReceiptSystem/CashInstitution.vue" //현금영수증 제도 안내
// import FranchiseRegStep1 from "../components/contents/cashReceiptSystem/FranchiseRegStep1.vue" //가맹점 가입
// import FranchiseRegStep2 from "../components/contents/cashReceiptSystem/FranchiseRegStep2.vue" //가맹점 가입
// import FranchiseRegStep3 from "../components/contents/cashReceiptSystem/FranchiseRegStep3.vue" //가맹점 가입 완료
//
// import CashReceiptIssue from "../components/contents/issuanceOfCashReceipt/CashReceiptIssue.vue" //현금영수증 발급
// import CashReceiptBulkIssue from "../components/contents/issuanceOfCashReceipt/CashReceiptBulkIssue.vue" //현금영수증 발급(대량)
// import CashReceiptIssueView from "../coponents/contents/issuanceOfCashReceipt/CashReceiptIssueView.vue" //현금영수증 발급(출력)
//
// import IssueViewingCancel from "../components/contents/franchiseModityCancel/IssueViewingCancel.vue" //가맹점 정보변경/해지
// import AccountCancelCompl from "../components/contents/franchiseModityCancel/AccountCancelCompl.vue" //가맹점 계정 해지 완료
// import FranchiseCancelCompl from "../components/contents/franchiseModityCancel/FranchiseCancelCompl.vue" //가맹점 해지 신청 완료
//
import NoticeList from "../components/contents/notice/NoticeList.vue" //공지사항 리스트
import NoticeDetl from "../components/contents/notice/NoticeDetl.vue" //공지사항 상세
import RegNotice from "../components/contents/notice/RegNotice.vue" //공지사항 상세
// import Faq from "../components/contents/faq/Faq.vue" //자주묻는질문
// import Camera from "../components/contents/Camera.vue" //공지사항 상세
// import FranchiseRegStep1Result from "../components/contents/cashReceiptSystem/FranchiseRegStep1Result.vue" //공지사항 상세
//
// import Kt from "../components/common/introduce/Kt.vue" //사업자 소개(KT)
// import Lotte from "../components/common/introduce/Lotte.vue" //사업자 소개(LOTTE)

import ManageShopList from "../components/contents/manageFranchise/ManageShopList.vue" //매장관리

Vue.use(Router)

export default new Router({
     mode : 'history' ,
    base: '',
    routes: [
        {
            path: "/home",
            name: "home",
            component: Home,
            children : [
                {path:'main',component: Main }, //메인
                // {path:'chgPass',component: ChgPass }, //비밀번호 변경
                {path:'phoneAuth',component: PhoneAuth }, //핸드폰 인증
                {path:'searchIdInput',component: SearchIdInput }, //아이디 찾기
                {path:'searchIdResult',component: SearchIdResult }, //아이디 찾기 결과
                {path:'initPass',component: InitPass }, //비밀번호 초기화
                {path:'policy', name:'policy', component: Policy }, //이용약관 및 개인보호처리방침

                {path:'franchiseList', name:'franchiseList', component: FranchiseList }, //가맹점관리-가맹점관리 리스트
                {path:'franchiseDetl', name:'franchiseDetl', component: FranchiseDetl }, //가맹점관리-가맹점 상세
                {path:'franchiseReg', name:'franchiseReg', component: FranchiseReg }, //가맹점관리-가맹점 등록
                {path:'franchiseRegCmpl', name:'franchiseRegCmpl', component: FranchiseRegCmpl }, //가맹점관리-가맹점 등록 완료

                {path:'branchList', name:'branchList', component: BranchList }, //가맹점관리-지점관리 리스트
                {path:'branchDetl', name:'branchDetl', component: BranchDetl }, //가맹점관리-지점 상세
                {path:'branchReg', name:'branchReg', component: BranchReg }, //가맹점관리-지점 등록
                {path:'branchRegCmpl', name:'branchRegCmpl', component: BranchRegCmpl }, //가맹점관리-지점 등록 완료

                {path:'storeList', name:'storeList', component: StoreList }, //가맹점관리-매장관리 리스트
                {path:'storeDetl', name:'storeDetl', component: StoreDetl }, //가맹점관리-매장 상세
                {path:'storeReg', name:'storeReg', component: StoreReg }, //가맹점관리-매장 등록
                {path:'storeRegCmpl', name:'storeRegCmpl', component: StoreRegCmpl }, //가맹점관리-매장 등록 완료

                {path:'storeRegBulk', name:'storeRegBulk', component: StoreRegBulk }, //가맹점관리-매장 일괄 등록 완료

                {path:'approvalBandList', name:'approvalBandList', component: ApprovalBandList }, //가맹점관리-승인대역 리스트
                {path:'approvalBandReg', name:'approvalBandList', component: ApprovalBandReg }, //가맹점관리-승인대역 신청

                // {path:'cashInstitution',component: CashIntstitution }, //현금영수증 제도 안내
                // {path:'franchiseRegStep1',component: FranchiseRegStep1 }, //가맹점 약관 동의
                // {path:'franchiseRegStep1Result',component: FranchiseRegStep1Result }, //가맹점 약관 동의
                // {path:'franchiseRegStep2',component: FranchiseRegStep2 }, //가맹점 신청
                // {path:'franchiseRegStep3',component: FranchiseRegStep3 }, //가맹점 가입 완료
                // {path:'cashReceiptIssue',component: CashReceiptIssue }, //현금영수증 발급
                // {path:'cashReceiptBulkIssue',component: CashReceiptBulkIssue }, //현금영수증 발급(대량)
                // {path:'cashReceiptIssueView',component: CashReceiptIssueView }, //현금영수증 발급(출력)
                // {path:'cashReceiptBulkIssue',component: CashReceiptBulkIssue }, //현금영수증 발급 조회 및 취소
                // {path:'ioc',component: ioc }, //현금영수증 발급 조회 및 취소
                // //{path:'cashReceiptIssueView',component: CashReceiptIssueView }, //현금영수증 발급 조회 및 취소 상세
                // {path:'accountCancelCompl',component: AccountCancelCompl }, //가맹점 정보변경/해지
                // {path:'franchiseCancelCompl',component: FranchiseCancelCompl }, //가맹점 정보변경/해지 상세
                // {path:'issueViewingCancel',component: IssueViewingCancel }, //가맹점 정보변경/해지 상세
                {path:'noticeList',component: NoticeList }, //공지사항 리스트
                {path:'noticeDetl',component: NoticeDetl, name:'noticeDetl' }, //공지사항 상세
                {path:'regNotice',component: RegNotice, name: 'regNotice' }, //공지사항 등록/수정
                // {path:'Faq',component: Faq }, //자주묻는질문
                // {path:'camera',component: Camera }, //카메라
                // {path:'kt',component: Kt }, //사업자 소개(KT)
                // {path:'lotte',component: Lotte }, //사업자 소개(LOTTE)

                // {path: '', redirect: "/home/main"},
                {path:'manageShop',name:"manageShop", component: ManageShopList }, //매장관리 목록
            ]
        },
        { path: "/login", name: "login",  component: LoginComponent},
        // {path: "/franchiseRegStep1Result", name: "franchiseRegStep1Result", component: FranchiseRegStep1Result},

        { path: '/',  redirect: "/login" },
        // { path: '/',  redirect: "/home/main" },
        {
            path: "/secure",
            name: "secure",
            component: SecureComponent
        },
        {
            // path: '', redirect: "/home/main"
            path: '', redirect: "/login"
        },
        {
            path: "**", redirect: "/login"
            // path: "**", redirect: "/home/main"

        },
        { path: 'error' , redirect: "/error"},

    ]
})

