import Loading from './loading/loading'

const PageLoading = _ => (
    <div
        style={{
            position: 'relative',
            backgroundColor: '#FFF',
            zIndex: 99,
            top: 0,
            justifyContent: 'center',
            display: 'flex',
            height: '84vh',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%'
        }}>
        <Loading />
    </div>
)

export default PageLoading
