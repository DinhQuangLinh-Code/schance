const RootURI = 'https://api-dev.schance.com.vn/api/front'
// const RootURI = 'http://localhost:5000/api/front'
const APIConstant = Object.freeze({
    ProductListURL: RootURI + '/product',
    CompanyListURL: RootURI + '/company',
    ProjectListURL: RootURI + '/project',
    UserFrontURL: RootURI + '/user/front',
    DonateListURL: RootURI + '/donate',
    OrderListURL: RootURI + '/order',
    LoginURL: RootURI + '/auth/login-fb',
    registListURL: RootURI + '/regist',
    FundCountURL: RootURI + '/fund/count'
})

export default APIConstant
