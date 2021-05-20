import React from 'react';
import "./modal.css"

const Modal = ({active,setActive,children}) => {
    return (
        <div>
            <div className={active?"modal active":"modal"} >
                <div className={active?"modal-content active":"modal-content"} onClick={e=>e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;