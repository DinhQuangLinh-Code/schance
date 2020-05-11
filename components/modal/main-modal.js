import { Modal } from 'antd'

const MainModal = props => {
    return (
        <Modal
            title={props.title}
            visible={props.visible}
            onCancel={props.onCancel}
            destroyOnClose={true}
            maskClosable={false}>
            {props.children}
        </Modal>
    )
}

export default MainModal
