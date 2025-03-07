import React from 'react'
import Modal from '../ui/modal'
import useStoreModal from '@/stores/store-modal'

const DialogComponent = () => {
    const storeModel = useStoreModal();

    
    return (
        <Modal
            title={storeModel.title}
            isOpen={storeModel.open}
            onClose={storeModel.closeModal}
            description={storeModel.description!}
        >
            {storeModel.content}
        </Modal>
    )
}

export default DialogComponent